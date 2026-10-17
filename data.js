/* 作品集唯一的事实来源。网页 index.html 和 PDF 底稿 print.html 都从这里读，
   改数字只改这一处，避免两个版本对不上。
   数据核对：2026-10-17（抖音、小红书页面；GitHub；Qoder CN 任务列表）。
   null 表示平台没有显示该数值，页面上写“未显示”，不能写成 0。 */
window.PORTFOLIO = {
  version: 'v2',
  checkedAt: '2026-10-17',
  siteUrl: 'https://xzyj50609.github.io/qoder-portfolio/',
  pdfName: '张艳捷_QoderCN大使申请作品集_v2.pdf',

  person: {
    name: '张艳捷',
    school: '江苏海洋大学',
    major: '水产养殖学专业 2023级本科生',
  },

  hero: {
    eyebrow: 'Qoder CN 大使申请 · 张艳捷',
    title: ['做过的东西不少，', '公开讲才刚开始'],
    lede: [
      '我习惯把学习和生活里碰到的具体问题，和 AI 一起做成能用的东西：读英语长难句的 DeepRead、按睡眠周期定闹钟的“相位”、为补考高中生做的化学符号练习站、分析 QQ 聊天记录的句豆。有的已经开源发布，有的我自己在用。',
      '2026 年 10 月，我开始把这些项目做成视频公开发布，目前发了两部。接下来，我想以 Qoder 为主要工具，从一个真实需求开始，完整记录一个作品怎样做出来，并附上别人能跟着做的材料。',
    ],
    proofs: [
      { k: '做过', v: '已开源发布安卓应用、Windows 桌面应用、在线练习站和两篇排障文章' },
      { k: '用 Qoder', v: '9 月起用 Qoder CN 处理项目和学习资料任务，当前任务列表可见 16 条' },
      { k: '开始公开', v: '10 月中旬起在抖音和小红书发布两部项目视频' },
    ],
  },

  timeline: [
    { when: '2026.03', what: '第一个公开仓库：考研真题分类' },
    { when: '2026.06', what: '两篇 CC Switch 排障文章、session-exporter' },
    { when: '2026.08', what: '拾级（学习打卡应用）早期版本开源' },
    { when: '2026.09', what: '化学符号练习站公开；Qoder 任务列表最早一条（9 月 3 日）' },
    { when: '2026.10 初', what: '句豆 1.0.0 正式发布' },
    { when: '10.13', what: '第一部项目视频：句豆（抖音）', mark: true },
    { when: '10.15', what: '第二部项目视频：数字分身（抖音）；相位 1.3.1 发布', mark: true },
    { when: '接下来', what: '用 Qoder 从零记录一个作品', plan: true },
  ],

  statusText: {
    public: '已公开',
    demo: '可演示',
    unreleased: '未公开',
  },

  domains: [
    { k: '学习', q: '读英语、背大题、记进度、补化学' },
    { k: '生活', q: '按睡眠周期起床' },
    { k: '聊天记录', q: '看懂聊天，做一个 AI 版的我' },
    { k: '内容创作', q: '把项目讲出来，把知识做成动画' },
    { k: '工具与排查', q: '工具出了问题，自己查到底' },
  ],

  projects: [
    {
      id: 'deepread', cat: '学习', status: 'demo', qoder: true, wide: true,
      title: 'DeepRead 英语深度阅读',
      line: '点任意一个词，显示它属于哪个短语、在这句里是什么意思。',
      detail: [
        '解决“每个词都认识，连起来读不懂”。一般的查词工具要你先划出短语才能查，可你要是知道那是短语，就不用查了。DeepRead 反过来：点一个词，告诉你它跟前后哪几个词凑成一个短语，合起来什么意思。',
        '我用它读考研英语真题。项目由多种 AI 工具参与开发，其中一部分迭代在 Qoder 中完成。',
      ],
      img: 'deepread-reader', gallery: ['deepread-reader', 'deepread-structure', 'deepread-desk'],
      links: [],
    },
    {
      id: 'chem', cat: '学习', status: 'public',
      title: '化学符号记忆练习站',
      line: '为一名需要补考的高中生做的闪卡网站，5 条支线 35 关，全部点选作答。',
      detail: [
        '使用者初三化学没学好，要参加学业水平考试补考。所以不需要键盘输入，默写用字母块点选完成；以手机为主，手表也能用。',
        '纯静态网页，挂在 GitHub Pages 上，进度只存在使用者自己的浏览器里。',
      ],
      img: 'chem', gallery: ['chem'],
      links: [
        { t: '打开练习站', u: 'https://xzyj50609.github.io/chem-cram/' },
        { t: 'GitHub', u: 'https://github.com/xzyj50609/chem-cram' },
      ],
    },
    {
      id: 'qingjian', cat: '学习', status: 'demo',
      title: '青简 · 大题背诵',
      line: '生态学和动物学大题背诵网页，按轮次记录进度，平板上可以分点背。',
      detail: [
        '题目不遮挡，名词保持显示，只把解释和小点藏起来。每背完一题才记一次覆盖，可以撤销。',
        '进度可以在不同设备之间同步。题目来自我自己整理的考研资料。',
      ],
      img: 'qingjian', gallery: ['qingjian'],
      links: [],
    },
    {
      id: 'shiji', cat: '学习', status: 'demo',
      title: '拾级 · 学习打卡',
      line: '多科目学习打卡安卓应用，记录阅读、背词和各科复习进度，可备份到坚果云。',
      detail: [
        '原名“夜读”。英语、生态学、动物学、政治分科目按轮次打卡，日历就是进度表。',
        '早期版本开源在 GitHub，现在用的是之后继续改的版本。',
      ],
      img: 'shiji-today', gallery: ['shiji-today', 'shiji-zoology'],
      links: [{ t: 'GitHub（早期版本）', u: 'https://github.com/xzyj50609/study-board' }],
    },
    {
      id: 'phase', cat: '生活', status: 'public', tag: 'MIT 开源',
      title: '相位 Phase · 睡眠周期闹钟',
      line: '按睡眠周期推荐几个起床时间，闹钟交给系统时钟去响。',
      detail: [
        '想睡的时候打开，它按睡眠周期给出几个起床时间，选一个就设成系统闹钟。',
        'GitHub 已发布 1.3.1 安装包，MIT 开源。',
      ],
      img: 'phase', gallery: ['phase'],
      links: [
        { t: 'GitHub', u: 'https://github.com/xzyj50609/phase-sleep-alarm' },
        { t: '下载 1.3.1', u: 'https://github.com/xzyj50609/phase-sleep-alarm/releases/tag/v1.3.1' },
      ],
    },
    {
      id: 'judou', cat: '聊天记录', status: 'public',
      title: '句豆 ChatBean',
      line: '基于 WechatVibe 改造的 QQ 聊天记录分析工具：检索记录、标注情绪和意图、生成人物画像。',
      detail: [
        'Windows 桌面应用，单聊和群聊都能分析，也可以接本地模型。',
        '10 月初发布 1.0.0，之后修了群成员和引用回复导入的问题，现在是 1.1.1。上游项目是 WechatVibe。',
      ],
      img: 'judou-profile', gallery: ['judou-profile', 'judou-chat'],
      links: [
        { t: 'GitHub', u: 'https://github.com/xzyj50609/QQVibe' },
        { t: '看视频', u: 'https://www.douyin.com/video/7696160405038664994' },
      ],
    },
    {
      id: 'twin', cat: '聊天记录', status: 'public',
      title: 'QQ 数字分身',
      line: '把两年聊天记录整理成人格说明书，结合 SnowLuma、AstrBot 等开源项目接入 QQ。',
      detail: [
        '没有重新训练模型，是把“我平时怎么说话”整理成说明书，交给现成的开源项目去用。',
        '评论区给了两份跟做文档：A 给 AI 助手照着部署，B 给普通人一步步操作。',
      ],
      img: 'twin-cover', gallery: ['twin-cover'],
      links: [
        { t: '跟做文档', u: 'https://xzyj50609.github.io/qq-digital-twin/' },
        { t: '看视频', u: 'https://www.douyin.com/video/7697153387665673507' },
      ],
    },
    {
      id: 'videos', cat: '内容创作', status: 'public',
      title: '两部项目视频',
      line: '抖音 10 月 13 日、15 日先后发布，小红书也已发布。',
      detail: ['数据和观众提问见“开始公开”一节。两部视频由 Claude Code 等工具辅助制作。'],
      img: 'judou-cover', gallery: ['judou-cover', 'twin-cover'],
      links: [{ t: '跳到“开始公开”', u: '#public' }],
    },
    {
      id: 'embryo', cat: '内容创作', status: 'unreleased',
      title: '胚胎发育科普动画（四部）',
      line: '讲囊胚腔、原肠胚、中胚层和三胚层，知识点对照《普通动物学》核对。',
      detail: [
        '用代码做动画、合成配音，四部共约 33 分钟。外胚层蓝、中胚层红、内胚层黄，全系列统一。',
        '已经做完，还没有公开发布。这里放一段无声片段和静帧。',
      ],
      img: 'embryo-1', gallery: ['embryo-1', 'embryo-2', 'embryo-3'],
      links: [{ t: '看片段', u: '#unreleased' }],
    },
    {
      id: 'ccswitch', cat: '工具与排查', status: 'public', kind: 'text',
      snippet: ["'/d' 不是内部或外部命令", '→ 换行符混用 · 已修复'],
      title: 'CC Switch 排障文章两篇',
      line: '中文路径报错、打开的 Claude Code 权限模式不对：写清复现、原因和修复办法。',
      detail: ['一篇是启动脚本的换行符混用，导致中文路径下命令解析错位；另一篇是 CC Switch 打开的 Claude Code 不是完全访问模式。两篇都写了排查过程、修复和回滚方法。'],
      links: [
        { t: '中文路径报错', u: 'https://github.com/xzyj50609/cc-switch-chinese-path-crlf-bug' },
        { t: '权限模式不对', u: 'https://github.com/xzyj50609/cc-switch-bypass-permissions' },
      ],
    },
    {
      id: 'exporter', cat: '工具与排查', status: 'public', kind: 'text',
      snippet: ['codex + claude code', '→ 对话记录统一导出'],
      title: 'session-exporter',
      line: '同时导出 Codex 和 Claude Code 的对话记录。',
      detail: ['我同时用几个 AI 编程工具，这个小工具把它们的对话记录统一导出，方便回看和交接。'],
      links: [{ t: 'GitHub', u: 'https://github.com/xzyj50609/session-exporter' }],
    },
  ],

  qoder: {
    date: '2026 年 10 月 6 日',
    steps: [
      { k: '我看到的问题', v: '书架上的标题和书本重叠。' },
      { k: '用着用着又发现', v: '文章缺了 Text 篇号；按年份筛选后，列表是空的。' },
      { k: '继续往下改', v: 'Qoder 给出修改和检查说明，我回到页面上看效果，不对就接着说。' },
    ],
    loop: ['提出问题', 'Qoder 修改', '我回页面检查', '不对就接着说'],
    note: 'DeepRead 由多种 AI 工具参与开发，这里展示的是由 Qoder 负责的一段迭代。截图中的测试结论是当时 Agent 的报告。',
    taskTotal: 16,
    taskEarliest: '9 月 3 日',
    tasks: [
      { k: 'DeepRead', n: 8 },
      { k: '考研化学和动物学资料', n: 3 },
      { k: '句豆项目', n: 2 },
      { k: '学习应用迁移', n: 1 },
      { k: '其他', n: 2 },
    ],
    views: [
      { k: '适合', v: '在已有项目里，拿着具体现象（截图、哪一步不对）持续往下改。它能直接读项目文件，我不用来回复制代码。' },
      { k: '不只写代码', v: '我也用它处理考研化学真题记录、动物学题目导语这类学习资料任务。' },
      { k: '要自己把关', v: 'Agent 说“完成了、测试通过”，不等于我在页面上看到的效果是对的。我会自己打开检查，重要的改动再交给另一个工具复查。' },
    ],
  },

  videos: [
    {
      id: 'judou', title: 'QQ 也能看好感度了？', name: '句豆', published: '10 月 13 日',
      cover: 'judou-cover',
      line: '从一句“行”开始，展示情绪分析、意图分析和人物画像，也保留了模型判断不准的例子。',
      douyin: [['播放', 5347], ['赞', 82], ['收藏', 36], ['分享', 33], ['评论', 22]],
      douyinNote: '评论含我的回复',
      xhs: [['赞', 5], ['收藏', 1], ['评论', 1]],
      xhsNote: '这条评论是我留的下载入口',
      asks: ['怎么下载？', '用的什么模型？', '安不安全？', '评判标准是什么？'],
      askNote: '我回复了下载入口和开源情况。',
      links: [
        { t: '看视频', u: 'https://www.douyin.com/video/7696160405038664994' },
        { t: 'GitHub · QQVibe', u: 'https://github.com/xzyj50609/QQVibe' },
      ],
    },
    {
      id: 'twin', title: '我用两年聊天记录，做了 AI 版的我', name: '数字分身', published: '10 月 15 日',
      cover: 'twin-cover',
      line: '把聊天记录整理成人格说明书，再结合 SnowLuma、AstrBot 等开源项目接入 QQ。没有重新训练模型。',
      douyin: [['播放', 371], ['赞', 4], ['收藏', 1], ['分享', null], ['评论', 5]],
      douyinNote: '分享数平台未显示',
      xhs: [['赞', null], ['收藏', null], ['评论', 1]],
      xhsNote: '评论是我留的文档入口；赞和收藏未显示数字',
      handoff: ['A 文档：给 AI 助手照着部署', 'B 文档：给普通人一步步操作'],
      links: [
        { t: '看视频', u: 'https://www.douyin.com/video/7697153387665673507' },
        { t: '跟做文档', u: 'https://xzyj50609.github.io/qq-digital-twin/' },
      ],
    },
  ],

  accounts: [
    { p: '抖音', name: '牛爷爷8848', id: '23451570923', stat: '22 粉丝 · 86 获赞' },
    { p: '小红书', name: '豆浆粉加冰', id: '3031689262', stat: '12 粉丝 · 全账号获赞与收藏 13（含旧笔记）', u: 'https://www.xiaohongshu.com/user/profile/651b8a1f0000000024015908' },
  ],

  casesTitle: '几次真的卡住，后来怎么解开的',
  casesIntro: '下面几件事摘自项目的接手文档和我的排查笔记，日期和经过都能对上记录。',
  cases: [
    {
      project: '背词指南灯（后来并入“拾级”）',
      date: '2026 年 7 月 30 日',
      lead: ['“我 29 号想勾选 30 号勾不了。”', '“……你就是一直压着不实现。过去的也改不了。”'],
      leadNote: '我当时的原话',
      body: [
        '同一天我报了两个“用不了”。第一个原因不在按钮：这台电脑的系统时区是太平洋时间，比北京时间晚 16 小时。每天早上 8 点到半夜，程序都以为还是“昨天”，当天那一格被当成未来的日期挡住了。',
        '第二个是我第三次提“以前记过的个数改不了”。实际跑一遍，功能其实在，但日期格子看起来不像能点，界面上一个字的提示都没有；而且它做的是“再加一条”，我要的是“29 号那天背了 4 个”，把 20 改成 4。代码是通的，对我来说等于不存在。',
      ],
      after: '日期改成固定按北京时间算；单日面板改成“改成 [4] 词 [保存]”。这件事也写进了给 AI 的规矩：我说功能没有时，先查入口找不找得到、按下去的结果是不是我要的，不许先解释“其实能用”。',
    },
    {
      project: '两个学习应用合并（现在的“拾级”）',
      date: '2026 年 8 月 6 日',
      lead: ['AI 给的头号理由是：网页改一行，双击就能看效果。'],
      body: [
        '当时要在两个学习应用里留一个做底座。我指出：背词指南灯早就打成安装包了，我要验收照样得传到手机、装上再看，这条好处对我等于零。去掉这条理由，整个推荐反了过来：留下原生的“夜读”，把网页那个搬进去。合并出来的，就是我现在每天用的“拾级”。',
      ],
      after: '现在 AI 给理由时，我会追问一句：这条省的是谁的时间？',
    },
    {
      project: 'ChatGPT 化学式显示脚本',
      date: '2026 年 7 月 30 日',
      lead: ['本地模拟页全部通过，装到真网页上，一处都没渲染。'],
      body: [
        'ChatGPT 网页里的化学式（\\ce 写法）显示成红字。AI 第一次以为是化学扩展的下载地址失效，第二次以为是网站的安全策略拦住了脚本，改完之后本地测试全过，真网页上依旧没变。',
        '最后我照它说的，在浏览器里把那段文字的源码复制给它，一行就定案：公式已经被网站拆碎了，从拆碎的结果拼不回原文；但网页里本来就藏着一份原文备份，直接读那份就行。',
      ],
      after: '8 月 ChatGPT 改版，那份原文备份大多没了，又改了第四版，新版还没在真网页上验收。我从这件事记下两条：从结果反推原始内容之前，先找结果里有没有自带的原文；本地全过不算数，真网页说了算。',
    },
    {
      project: '相位 · 睡眠周期闹钟',
      date: '2026 年 9 月 21 日',
      lead: ['旧版本写着“已完成”。在我的一加 13 上一试：同一时间连发三次，系统时钟新建了三条。'],
      body: [
        '需求是同一时间别重复建闹钟，设完能直接跳到那一条。拆开系统时钟一看，它收到请求就新建，根本不先查重；之前的“已完成”只代表代码写完、能打包。在我同意后，改用手机的无障碍服务，在真机上把创建、复用、重新启用、删除重建、熄屏响铃都实测了一遍。',
      ],
      after: '现在接手文档里，“代码做完了”和“我在手机上用过”分开记。',
    },
  ],
  casesEnd: '这些经过都记在项目的接手文档和我的“疑难杂症笔记”里，按“看到什么、先猜了什么、错在哪、真正的原因、下次先查什么”来写。换个对话、换个 AI，接手前先读这些。',
  quote: '喜欢把踩过的坑写成“排查路径”而不是“标准答案”——因为下次遇到的现象大概率不一样，但收敛思路是通用的。',
  quoteSource: '我的 GitHub 主页',
  rulesEnd: '这也是我想在 Qoder 系列里讲的：不只是让 AI 把东西写出来，还有卡住的时候怎么判断、怎么推着它找到真正的原因。',

  plan: {
    what: '选一个范围适中的真实需求，以 Qoder 为主要工具，从空白开始记录：怎样拆需求、做出第一版、遇到什么问题、怎样改到能用，最后交付。走不通的地方也保留。',
    who: '有想法、但不是计算机专业，不知道怎样用 AI 把东西做出来的人。',
    criteria: ['一到两周能做出第一版', '我自己真的要用', '观众能照着做'],
    weeks: [
      { w: '第 1 周', v: '选题，写清楚给谁用、做到什么程度算完成' },
      { w: '第 2 周', v: '做出第一版，发布第一期' },
      { w: '第 3 周', v: '自己真实使用，记录问题和修改，补充跟做步骤' },
      { w: '第 4 周', v: '发布第二期和跟做文档，整理观众提问和遇到的产品问题' },
    ],
    channels: '优先抖音和小红书，视内容适配 B 站。每期附跟做文档，延续数字分身的做法：一份给 AI 助手，一份给人。',
    connect: '跟做的人遇到问题，我在评论区和文档里回答；问题多了就整理成答疑合集，有条件时办一次小范围线上答疑。遇到 Qoder 的产品问题，按“复现步骤、预期结果、实际结果”整理后反馈。',
  },

  links: [
    { t: 'GitHub · xzyj50609', u: 'https://github.com/xzyj50609' },
    { t: '句豆视频', u: 'https://www.douyin.com/video/7696160405038664994', qr: 'judou' },
    { t: '数字分身视频', u: 'https://www.douyin.com/video/7697153387665673507' },
    { t: '数字分身跟做文档', u: 'https://xzyj50609.github.io/qq-digital-twin/', qr: 'twin-docs' },
    { t: '句豆开源项目', u: 'https://github.com/xzyj50609/QQVibe' },
    { t: '小红书主页', u: 'https://www.xiaohongshu.com/user/profile/651b8a1f0000000024015908' },
  ],

  notes: [
    '数据为 2026 年 10 月 17 日页面所见，会随平台变化。播放数不等于观看人数，评论包含作者回复。平台没有显示的数值写作“未显示”，不记为 0。',
    'Qoder 任务数是当前任务列表可见的条目，最早一条为 9 月 3 日，不等于注册日期。',
    '句豆基于 WechatVibe 改造；数字分身使用了 SnowLuma、AstrBot 等开源项目；DeepRead 由多种 AI 工具参与开发；两部视频由 Claude Code 等工具辅助制作。',
    '截图标有“原始截图”的未做改动；数据卡是按页面数字重新排版的。',
    '本作品集由我确定内容和取舍，用 AI 辅助编写。联系方式见申请表。',
  ],
};
