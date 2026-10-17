/* 作品集网页：按 data.js 渲染，再接上动效。任何一步出错都显示在页面顶部，不留空白。 */
(() => {
  'use strict';
  const D = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c]);
  const src = (key) => `assets/img/${key}.webp`;
  const fmt = (n) => n.toLocaleString('en-US');
  const ext = (u) => (u.startsWith('#') ? '' : ' target="_blank" rel="noopener"');
  const linkBtns = (links, cls = 'btn') =>
    links.map((l) => `<a class="${cls}" href="${esc(l.u)}"${ext(l.u)}>${esc(l.t)}</a>`).join('');

  function fail(err) {
    const el = $('#fatal');
    el.hidden = false;
    el.textContent = `页面有一部分没显示出来：${err && err.message ? err.message : err}。可以先看 PDF 版。`;
  }

  /* ───────── 渲染 ───────── */

  function tagsOf(p) {
    const t = [`<span class="tag ${p.status}">${D.statusText[p.status]}</span>`];
    if (p.qoder) t.push('<span class="tag qoder">Qoder 参与</span>');
    if (p.tag) t.push(`<span class="tag extra">${esc(p.tag)}</span>`);
    return t.join('');
  }

  function captionOf(key) {
    if (key.endsWith('cover')) return '视频封面（原图缩小）';
    if (key.startsWith('embryo')) return '动画静帧（未公开作品）';
    if (key === 'chem') return '线上页面截图 · 2026-10-17';
    if (key === 'qoder-case') return '原始截图 · Qoder CN 桌面会话 · 2026-10-06（侧栏其他文件夹、账号名已打码）';
    return '项目截图（原图缩小，未改内容）';
  }

  function renderHero() {
    const h = D.hero;
    $('#hero-copy').innerHTML = `
      <p class="eyebrow">${esc(h.eyebrow)}</p>
      <h1>${h.title.map((t) => `<span>${esc(t)}</span>`).join('')}</h1>
      <p class="who">${esc(D.person.school)} · ${esc(D.person.major)}</p>
      <p class="lede">${esc(h.lede[0])}</p>
      <p class="lede dim">${esc(h.lede[1])}</p>
      <ul class="proofs">${h.proofs.map((p) => `<li><b>${esc(p.k)}</b><span>${esc(p.v)}</span></li>`).join('')}</ul>`;
    $('#timeline').innerHTML = D.timeline
      .map((t) => `<li class="${t.mark ? 'mark' : ''}${t.plan ? 'plan' : ''}"><b>${esc(t.when)}</b>${esc(t.what)}</li>`)
      .join('');
    $('#pdf-link').href = D.pdfName;
  }

  // 首屏截图群的摆位：x/y 是中心点（占舞台百分比），z 是纵深。
  const PANES = [
    ['deepread', 'deepread-reader', 46, 30, 62, 60, -4, -2],
    ['judou', 'judou-profile', 31, 64, 52, 10, 3, 2],
    ['phase', 'phase', 86, 33, 21, 120, -8, 4],
    ['embryo', 'embryo-1', 70, 76, 48, 90, 0, -3],
    ['shiji', 'shiji-today', 9, 30, 19, -40, 10, -5],
    ['qingjian', 'qingjian', 60, 6, 40, -90, 0, 3],
    ['chem', 'chem', 93, 72, 17, 30, -6, 6],
    ['videos', 'judou-cover', 13, 82, 18, 150, 6, -6],
    ['twin', 'twin-cover', 3, 54, 15, -110, 12, 4],
  ];

  function renderStage() {
    const byId = Object.fromEntries(D.projects.map((p) => [p.id, p]));
    $('#orbit').innerHTML = PANES.map(([id, key, x, y, w, z, ry, rz], i) => `
      <button class="pane" type="button" data-project="${id}"
        style="--x:${x}%;--y:${y}%;--w:${w}%;--z:${z}px;--ry0:${ry}deg;--rz:${rz}deg;--dur:${6 + (i % 4)}s;--delay:-${i * 0.9}s">
        <img src="${src(key)}" alt="${esc(byId[id].title)} 截图" loading="${i < 4 ? 'eager' : 'lazy'}">
        <span>${esc(byId[id].title)}</span>
      </button>`).join('');
  }

  const FILTERS = [
    ['all', '全部', () => true],
    ['public', '已公开', (p) => p.status === 'public'],
    ['demo', '可演示', (p) => p.status === 'demo'],
    ['unreleased', '未公开', (p) => p.status === 'unreleased'],
    ['qoder', 'Qoder 参与', (p) => p.qoder],
  ];

  function renderMap() {
    $('#filters').innerHTML = FILTERS.map(([k, t, f], i) =>
      `<button class="chip" type="button" data-filter="${k}" aria-pressed="${i === 0}">${t}<i>${D.projects.filter(f).length}</i></button>`,
    ).join('');
    $('#domains').innerHTML = D.domains.map((d) => `
      <button class="domain" type="button" data-cat="${esc(d.k)}" aria-pressed="false">
        <b>${esc(d.k)}</b><span>${esc(d.q)}</span><i>${D.projects.filter((p) => p.cat === d.k).length} 项</i>
      </button>`).join('');
    $('#grid').innerHTML = D.projects.map(cardHtml).join('');
  }

  function cardHtml(p) {
    const thumb = p.kind === 'text'
      ? `<span class="card-thumb text"><span>${p.snippet.map(esc).join('<br>')}</span></span>`
      : `<span class="card-thumb"><img src="${src(p.img)}" alt="" loading="lazy"></span>`;
    return `<button class="card reveal${p.wide ? ' wide' : ''}" type="button" data-project="${p.id}">
      ${thumb}
      <span class="card-body"><span class="card-cat">${esc(p.cat)}</span><span class="card-title">${esc(p.title)}</span><span class="card-line">${esc(p.line)}</span><span class="tags">${tagsOf(p)}</span></span>
    </button>`;
  }

  function renderQoder() {
    const q = D.qoder;
    const nodes = [[85, 19], [151, 85], [85, 151], [19, 85]];
    const max = Math.max(...q.tasks.map((t) => t.n));
    $('#qoder').innerHTML = `<div class="wrap">
      <p class="kicker">02 · Qoder 实践</p>
      <h2 class="reveal">在 Qoder 里，我怎样把一个问题改到满意</h2>
      <p class="sub reveal">DeepRead · ${esc(q.date)}的一次真实会话</p>
      <div class="q-grid">
        <figure class="shot reveal">
          <button class="shot-frame" type="button" data-image="qoder-case" aria-label="放大查看原始截图">
            <span class="badge">原始截图 · 2026-10-06 · 已打码</span>
            <img src="${src('qoder-case')}" alt="Qoder CN 桌面会话原始截图：DeepRead 书架标题与篇号修改">
          </button>
          <figcaption>${esc(q.note)}</figcaption>
        </figure>
        <div class="reveal">
          <div class="loop">
            <svg viewBox="0 0 170 170" aria-hidden="true">
              <circle class="ring" cx="85" cy="85" r="66"></circle>
              ${nodes.map(([x, y], i) => `<circle class="node" cx="${x}" cy="${y}" r="9" style="animation-delay:${i * 1.6}s"></circle>`).join('')}
              <g class="spin"><circle class="dot" cx="85" cy="19" r="5"></circle></g>
              <text x="85" y="89" text-anchor="middle">直到满意</text>
            </svg>
            <ol class="steps loop-list">${q.loop.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>
          </div>
          <ol class="steps">${q.steps.map((s) => `<li><b>${esc(s.k)}</b>${esc(s.v)}</li>`).join('')}</ol>
        </div>
      </div>
      <div class="q-row">
        <div class="panel reveal">
          <h3>我在 Qoder 里做什么</h3>
          <p class="sub">当前任务列表可见 ${q.taskTotal} 条，最早一条 ${esc(q.taskEarliest)}</p>
          <ul class="bars">${q.tasks.map((t) =>
            `<li><span>${esc(t.k)}</span><span class="track"><span class="fill" style="--w:${(t.n / max) * 100}%"></span></span><b class="num">${t.n}</b></li>`).join('')}</ul>
        </div>
        <div class="panel reveal">
          <h3>我对 Qoder 的判断</h3>
          <div class="views">${q.views.map((v) => `<div><b>${esc(v.k)}</b>${esc(v.v)}</div>`).join('')}</div>
        </div>
      </div>
    </div>`;
  }

  function statSet(rows, note, cls, label) {
    const items = rows.map(([k, v]) => v === null
      ? `<div><dt>${k}</dt><dd class="na">未显示</dd></div>`
      : `<div><dt>${k}</dt><dd class="num" data-to="${v}">${fmt(v)}</dd></div>`).join('');
    return `<div class="stats-set ${cls}"><dl>${items}</dl><p class="note">${label} · ${esc(note)}</p></div>`;
  }

  function vidHtml(v) {
    const extra = v.asks
      ? `<div class="asks">${v.asks.map((a, i) => `<span style="--i:${i}">${esc(a)}</span>`).join('')}</div>
         <p class="asks-note">评论区的提问（概括）。${esc(v.askNote)}</p>`
      : `<ul class="handoff">${v.handoff.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>`;
    return `<article class="vid reveal">
      <div class="cover"><a href="${esc(v.links[0].u)}" target="_blank" rel="noopener" aria-label="看视频：${esc(v.title)}">
        <img src="${src(v.cover)}" alt="《${esc(v.title)}》视频封面" loading="lazy"></a></div>
      <div>
        <h3>《${esc(v.title)}》</h3>
        <p class="when">${esc(v.name)} · 抖音 ${esc(v.published)}发布</p>
        <p class="line">${esc(v.line)}</p>
        <div class="stats" data-on="douyin">
          ${statSet(v.douyin, v.douyinNote, 'douyin', '抖音')}
          ${statSet(v.xhs, v.xhsNote, 'xhs', '小红书')}
        </div>
        ${extra}
        <div class="btns">${linkBtns(v.links.slice(0, 1))}${linkBtns(v.links.slice(1), 'btn ghost')}</div>
      </div>
    </article>`;
  }

  function renderPublic() {
    const emb = D.projects.find((p) => p.id === 'embryo');
    $('#public').innerHTML = `<div class="wrap">
      <p class="kicker">03 · 开始公开</p>
      <h2 class="reveal">10 月，我开始把项目讲给别人听</h2>
      <p class="intro reveal">两部项目视频在抖音分别发于 10 月 13 日和 10 月 15 日，是我开始公开记录后的头两部，小红书也已发布。以下是 ${esc(D.checkedAt)} 核对的数据。账号还很新，我更看重评论区里的具体提问。</p>
      <div class="toggle" id="platform" data-on="douyin" role="group" aria-label="切换平台数据">
        <span class="knob"></span>
        <button type="button" data-p="douyin" aria-pressed="true">抖音</button>
        <button type="button" data-p="xhs" aria-pressed="false">小红书</button>
      </div>
      <div class="vids">${D.videos.map(vidHtml).join('')}</div>
      <div class="accounts">${D.accounts.map((a) =>
        `<span>${a.p} <b>${esc(a.name)}</b>（${esc(a.id)}）· ${esc(a.stat)}${a.u ? ` · <a href="${esc(a.u)}" target="_blank" rel="noopener">主页</a>` : ''}</span>`).join('')}</div>
      <p class="attrib">两部视频由 Claude Code 等工具辅助制作，不是 Qoder 的制作案例。</p>
      <div class="unrel" id="unreleased">
        <div class="clip reveal">
          <span class="badge">未公开 · 无声片段</span>
          <video id="clip" muted loop playsinline preload="metadata" poster="${src('embryo-1')}" aria-label="胚胎发育科普动画片段：内陷">
            <source src="assets/video/embryo.mp4" type="video/mp4">
          </video>
          <span class="clip-state" id="clip-state">片段加载中…</span>
        </div>
        <div class="reveal">
          <h3>做好了、还没发的：${esc(emb.title)}</h3>
          ${emb.detail.map((t) => `<p>${esc(t)}</p>`).join('')}
          <div class="stills">
            <img src="${src('embryo-2')}" alt="胚胎发育动画静帧：胚盘" loading="lazy">
            <img src="${src('embryo-3')}" alt="胚胎发育动画静帧：中胚层" loading="lazy">
          </div>
        </div>
      </div>
    </div>`;
  }

  function caseHtml(c) {
    return `<article class="case reveal">
      <p class="case-meta">${esc(c.project)} · ${esc(c.date)}</p>
      <div class="case-lead">${c.lead.map((l) => `<p>${esc(l)}</p>`).join('')}${c.leadNote ? `<span>${esc(c.leadNote)}</span>` : ''}</div>
      ${c.body.map((b) => `<p>${esc(b)}</p>`).join('')}
      <p class="case-after"><b>后来</b>${esc(c.after)}</p>
    </article>`;
  }

  function renderMethod() {
    $('#method').innerHTML = `<div class="wrap">
      <p class="kicker">04 · 我的做法</p>
      <h2 class="reveal">${esc(D.casesTitle)}</h2>
      <p class="intro reveal">${esc(D.casesIntro)}</p>
      <div class="cases">${D.cases.map(caseHtml).join('')}</div>
      <p class="cases-end reveal">${esc(D.casesEnd)}</p>
      <blockquote class="quote reveal"><p>${esc(D.quote)}</p><cite>—— ${esc(D.quoteSource)}</cite></blockquote>
      <p class="end reveal">${esc(D.rulesEnd)}</p>
    </div>`;
  }

  function renderPlan() {
    const p = D.plan;
    $('#plan').innerHTML = `<div class="wrap">
      <p class="kicker">05 · 接下来</p>
      <div class="plan-head"><h2 class="reveal">用 Qoder 从零做一个作品，完整记录</h2><span class="tag plan">以下为计划，尚未开始</span></div>
      <div class="plan-grid">
        <div class="reveal"><h3>做什么</h3><p>${esc(p.what)}</p></div>
        <div class="reveal"><h3>给谁看</h3><p>${esc(p.who)}</p>
          <h3 style="margin-top:18px">选题标准</h3><div class="criteria">${p.criteria.map((c) => `<span>${esc(c)}</span>`).join('')}</div></div>
      </div>
      <ol class="weeks reveal">${p.weeks.map((w) => `<li><b>${esc(w.w)}</b>${esc(w.v)}</li>`).join('')}</ol>
      <div class="plan-grid">
        <div class="reveal"><h3>平台和材料</h3><p>${esc(p.channels)}</p></div>
        <div class="reveal"><h3>连接人</h3><p>${esc(p.connect)}</p></div>
      </div>
    </div>`;
  }

  function renderFoot() {
    $('#links').innerHTML = `<div class="wrap">
      <h2>链接与说明</h2>
      <div class="btns" style="margin-top:22px">${linkBtns(D.links, 'btn ghost')}
        <a class="btn" href="${esc(D.pdfName)}" download>下载 PDF 版</a></div>
      <ul class="notes">${D.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>
      <p class="version">版本 ${esc(D.version)} · 数据核对 ${esc(D.checkedAt)} · ${esc(D.person.name)}</p>
    </div>`;
  }

  /* ───────── 交互 ───────── */

  function setupReveal() {
    const targets = $$('.reveal, .bars, .asks, .num');
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('in'));
      return;
    }
    document.documentElement.classList.add('js-motion');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        if (e.target.matches('.num[data-to]')) countUp(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12 });
    targets.forEach((el) => io.observe(el));
  }

  // 最终数字一开始就写在页面上；动画只在看见时从 0 跑回原值，中途出错也停在正确数字。
  function countUp(el) {
    const to = Number(el.dataset.to);
    if (!Number.isFinite(to) || to < 10) return;
    const t0 = performance.now();
    const dur = 1100;
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(tick); else el.textContent = fmt(to);
    };
    requestAnimationFrame(tick);
  }

  function tilt(el, max = 7) {
    if (reduced || !finePointer) return;
    let raf = 0;
    const S = { rx: 0, ry: 0 };
    const T = { rx: 0, ry: 0 };
    const step = () => {
      S.rx += (T.rx - S.rx) * 0.14;
      S.ry += (T.ry - S.ry) * 0.14;
      el.style.transform = `rotateX(${S.rx.toFixed(2)}deg) rotateY(${S.ry.toFixed(2)}deg)`;
      raf = Math.abs(T.rx - S.rx) + Math.abs(T.ry - S.ry) > 0.02 ? requestAnimationFrame(step) : 0;
    };
    el.addEventListener('pointermove', (e) => {
      const b = el.getBoundingClientRect();
      const nx = (e.clientX - b.left) / b.width;
      const ny = (e.clientY - b.top) / b.height;
      T.ry = (nx - 0.5) * max * 2;
      T.rx = -(ny - 0.5) * max * 2;
      el.style.setProperty('--gx', `${nx * 100}%`);
      el.style.setProperty('--gy', `${ny * 100}%`);
      if (!raf) raf = requestAnimationFrame(step);
    });
    el.addEventListener('pointerleave', () => { T.rx = 0; T.ry = 0; if (!raf) raf = requestAnimationFrame(step); });
  }

  function setupStageTilt() {
    const orbit = $('#orbit');
    const hero = $('.hero');
    if (reduced || !finePointer) return;
    const S = { rx: 6, ry: -10 };
    const T = { ...S };
    let raf = 0;
    const step = () => {
      S.rx += (T.rx - S.rx) * 0.08;
      S.ry += (T.ry - S.ry) * 0.08;
      orbit.style.setProperty('--rx', `${S.rx.toFixed(2)}deg`);
      orbit.style.setProperty('--ry', `${S.ry.toFixed(2)}deg`);
      raf = Math.abs(T.rx - S.rx) + Math.abs(T.ry - S.ry) > 0.02 ? requestAnimationFrame(step) : 0;
    };
    hero.addEventListener('pointermove', (e) => {
      T.ry = (e.clientX / innerWidth - 0.5) * 26 - 8;
      T.rx = -(e.clientY / innerHeight - 0.5) * 16 + 6;
      if (!raf) raf = requestAnimationFrame(step);
    });
  }

  // 两组筛选叠加：状态（全部/已公开/…）× 碰到的问题（再点一次取消）。
  function setupFilters() {
    let status = 'all';
    let cat = null;
    const apply = () => {
      const test = FILTERS.find(([k]) => k === status)[2];
      $$('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.filter === status)));
      $$('.domain').forEach((d) => d.setAttribute('aria-pressed', String(d.dataset.cat === cat)));
      $$('#grid .card').forEach((card) => {
        const p = D.projects.find((x) => x.id === card.dataset.project);
        card.classList.toggle('dim', !(test(p) && (!cat || p.cat === cat)));
      });
    };
    $('#filters').addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (chip) { status = chip.dataset.filter; apply(); }
    });
    $('#domains').addEventListener('click', (e) => {
      const d = e.target.closest('.domain');
      if (d) { cat = cat === d.dataset.cat ? null : d.dataset.cat; apply(); }
    });
  }

  function openDetail(html) {
    const dlg = $('#detail');
    $('#detail-body').innerHTML = html;
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
  }

  function openProject(id) {
    const p = D.projects.find((x) => x.id === id);
    if (!p) return;
    const gallery = p.gallery || [];
    const media = gallery.length ? `
      <div class="detail-main"><img id="detail-img" src="${src(gallery[0])}" alt="${esc(p.title)}"></div>
      <p class="detail-cap" id="detail-cap">${captionOf(gallery[0])}</p>
      ${gallery.length > 1 ? `<div class="thumbs">${gallery.map((k, i) =>
        `<button type="button" data-thumb="${k}" aria-current="${i === 0}"><img src="${src(k)}" alt=""></button>`).join('')}</div>` : ''}` : '';
    openDetail(`${media}
      <h3 id="detail-title">${esc(p.title)}</h3>
      <div class="tags" style="margin-top:8px">${tagsOf(p)}</div>
      ${p.detail.map((t) => `<p>${esc(t)}</p>`).join('')}
      ${p.links.length ? `<div class="btns">${linkBtns(p.links)}</div>` : '<p class="detail-cap">本地在用，暂无公开链接；可以录屏演示。</p>'}`);
  }

  function setupDialog() {
    const dlg = $('#detail');
    document.addEventListener('click', (e) => {
      const proj = e.target.closest('[data-project]');
      if (proj) { openProject(proj.dataset.project); return; }
      const shot = e.target.closest('[data-image]');
      if (shot) {
        const key = shot.dataset.image;
        openDetail(`<div class="detail-main"><img src="${src(key)}" alt="${captionOf(key)}"></div>
          <p class="detail-cap" id="detail-title">${captionOf(key)}</p>`);
      }
    });
    dlg.addEventListener('click', (e) => {
      if (e.target === dlg || e.target.closest('[data-close]')) { dlg.close(); return; }
      const link = e.target.closest('a[href^="#"]');
      if (link) dlg.close();
      const th = e.target.closest('[data-thumb]');
      if (!th) return;
      $('#detail-img').src = src(th.dataset.thumb);
      $('#detail-cap').textContent = captionOf(th.dataset.thumb);
      $$('[data-thumb]', dlg).forEach((b) => b.setAttribute('aria-current', String(b === th)));
    });
  }

  function setupPlatform() {
    const box = $('#platform');
    box.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      box.dataset.on = b.dataset.p;
      $$('button', box).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      $$('.stats').forEach((s) => { s.dataset.on = b.dataset.p; });
    });
  }

  // 片段的三种状态分开显示：加载中 / 在播 / 没加载出来。
  function setupClip() {
    const v = $('#clip');
    const state = $('#clip-state');
    const show = (t) => { state.textContent = t; state.hidden = !t; };
    v.addEventListener('playing', () => show(''));
    v.addEventListener('error', () => show('片段没加载出来，右侧有静帧'), true);
    if (reduced) {
      v.controls = true;
      show('已暂停：系统设置了减少动态效果');
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => { v.controls = true; show('点播放键观看'); });
      else v.pause();
    }, { threshold: 0.3 });
    io.observe(v);
  }

  /* ───────── 水面：鱼游、涟漪。只在看得见时跑，30fps 封顶 ───────── */

  function setupPond() {
    const canvas = $('#pond');
    const host = $('.hero');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let W = 0; let H = 0; let raf = 0; let last = 0; let clock = 0; let visible = true; let nextDrop = 2;
    let seed = 20261017;
    const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    const ripples = [];
    const pointer = { x: -1e4, y: -1e4, lx: -1e4, ly: -1e4, t: 0 };
    const fish = Array.from({ length: 7 }, (_, i) => ({
      x: rnd(), y: rnd(), dir: rnd() * Math.PI * 2, len: 26 + rnd() * 16,
      speed: 16 + rnd() * 10, phase: rnd() * 6.28, turn: 0, boost: 1, koi: i % 3 === 0,
    }));

    const resize = () => {
      const dpr = Math.min(2, devicePixelRatio || 1);
      W = host.clientWidth; H = host.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const drop = (x, y, amp) => {
      if (ripples.length > 12) ripples.shift();
      ripples.push({ x, y, born: clock, amp });
    };

    const paintWater = () => {
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, '#F6F8FB');
      g.addColorStop(1, '#E8EFF7');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        const r = ripples[i];
        const age = clock - r.born;
        if (age > 2.8) { ripples.splice(i, 1); continue; }
        const env = Math.sin((age / 2.8) * Math.PI) * r.amp;
        for (let k = 0; k < 4; k += 1) {
          const rad = age * 90 - k * 22;
          if (rad <= 2) continue;
          const a = env * (1 - k * 0.22) * Math.max(0, 1 - rad / 420);
          if (a < 0.01) continue;
          ctx.lineWidth = 4;
          ctx.strokeStyle = `rgba(20,32,58,${(a * 0.05).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(r.x + 1.2, r.y + 1.2, rad, 0, Math.PI * 2); ctx.stroke();
          ctx.lineWidth = 2.2;
          ctx.strokeStyle = `rgba(255,255,255,${(a * 0.85).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(r.x - 1, r.y - 1, rad, 0, Math.PI * 2); ctx.stroke();
        }
      }
    };

    const paintFish = (f) => {
      const L = f.len;
      const x = f.x * W; const y = f.y * H;
      const wag = Math.sin(clock * 5 * f.boost + f.phase) * 0.38;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(f.dir);
      ctx.fillStyle = f.koi ? 'rgba(214,112,44,.26)' : 'rgba(26,52,110,.14)';
      ctx.beginPath();
      ctx.moveTo(L * 0.5, 0);
      ctx.bezierCurveTo(L * 0.32, -L * 0.22, -L * 0.28, -L * 0.15, -L * 0.48, 0);
      ctx.bezierCurveTo(-L * 0.28, L * 0.15, L * 0.32, L * 0.22, L * 0.5, 0);
      ctx.fill();
      ctx.translate(-L * 0.46, 0);
      ctx.rotate(wag);
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(-L * 0.34, -L * 0.2); ctx.lineTo(-L * 0.26, 0); ctx.lineTo(-L * 0.34, L * 0.2);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    };

    const swim = (dt) => {
      fish.forEach((f) => {
        const px = f.x * W; const py = f.y * H;
        const dx = px - pointer.x; const dy = py - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150) {
          const away = Math.atan2(dy, dx);
          let diff = away - f.dir;
          diff = Math.atan2(Math.sin(diff), Math.cos(diff));
          f.dir += diff * Math.min(1, dt * 6);
          f.boost = Math.min(3.4, f.boost + dt * 8);
        } else {
          f.turn += (rnd() - 0.5) * dt * 2.2;
          f.turn *= 0.97;
          f.dir += f.turn * dt;
          f.boost += (1 - f.boost) * Math.min(1, dt * 1.5);
        }
        f.x += (Math.cos(f.dir) * f.speed * f.boost * dt) / W;
        f.y += (Math.sin(f.dir) * f.speed * f.boost * dt) / H;
        if (f.x < -0.06) f.x = 1.06; else if (f.x > 1.06) f.x = -0.06;
        if (f.y < -0.08) f.y = 1.08; else if (f.y > 1.08) f.y = -0.08;
      });
    };

    const frame = (now) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = Math.min(0.1, (now - last) / 1000 || 0.033);
      if (now - last >= 33) {
        last = now;
        clock += dt;
        swim(dt);
        nextDrop -= dt;
        if (nextDrop <= 0) {
          const f = fish[Math.floor(rnd() * fish.length)];
          drop(f.x * W, f.y * H, 0.55);
          nextDrop = 2.6 + rnd() * 2.6;
        }
        paintWater();
        fish.forEach(paintFish);
      }
      raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf && visible) raf = requestAnimationFrame(frame); };

    resize();
    addEventListener('resize', resize);
    if (reduced) { paintWater(); fish.forEach(paintFish); return; }

    host.addEventListener('pointermove', (e) => {
      const b = host.getBoundingClientRect();
      pointer.x = e.clientX - b.left; pointer.y = e.clientY - b.top;
      const moved = Math.hypot(pointer.x - pointer.lx, pointer.y - pointer.ly);
      if (moved > 90 && performance.now() - pointer.t > 160) {
        drop(pointer.x, pointer.y, 0.5);
        pointer.lx = pointer.x; pointer.ly = pointer.y; pointer.t = performance.now();
      }
    });
    host.addEventListener('pointerleave', () => { pointer.x = -1e4; pointer.y = -1e4; });
    host.addEventListener('pointerdown', (e) => {
      const b = host.getBoundingClientRect();
      drop(e.clientX - b.left, e.clientY - b.top, 1);
    });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); }).observe(host);
    document.addEventListener('visibilitychange', kick);
    kick();
  }

  /* ───────── 启动 ───────── */

  const steps = [
    renderHero, renderStage, renderMap, renderQoder, renderPublic, renderMethod, renderPlan, renderFoot,
    setupReveal, setupFilters, setupDialog, setupPlatform, setupClip, setupPond, setupStageTilt,
    () => ['.shot-frame', '.cover a'].forEach((s) => $$(s).forEach((el) => tilt(el))),
  ];
  for (const step of steps) {
    try { step(); } catch (err) { fail(err); }
  }
})();
