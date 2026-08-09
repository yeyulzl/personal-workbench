// ============================================================
// 板绘学习计划数据
// ============================================================

const DRAWING_PHASES = [
  {
    id: 1,
    title: "工具适应与线条基础",
    duration: "1-2 周",
    goal: "能稳定地画出干净的线条，熟悉 SAI2 / PS 的图层、笔刷、压感与快捷键。",
    practices: [
      "软件基础过一遍：图层、钢笔图层、抖动修正、水彩边界、画笔预设、混合模式、剪贴蒙版",
      "压感调试：确认数位板驱动压感曲线，找到顺手手感",
      "线条专项：排线（横/竖/斜）、长线、接线、椭圆与正圆，每天15-20分钟热手",
      "临摹简单线稿：Q版头像、简单物件，重点是线条干净+闭合"
    ],
    work: "临摹一张结构清晰的线稿头像（线全部闭合、粗细有变化）",
    resources: [
      { name: "B站SAI2基础教程", url: "https://search.bilibili.com/all?keyword=SAI2%E5%9F%BA%E7%A1%80%E6%95%99%E7%A8%8B" },
      { name: "B站PS板绘入门", url: "https://search.bilibili.com/all?keyword=PS%E6%9D%BF%E7%BB%98%E5%85%A5%E9%97%A8" }
    ],
    color: "#7C5CFC"
  },
  {
    id: 2,
    title: "造型与明暗巩固",
    duration: "2-3 周",
    goal: "用板绘画出有体积感的黑白稿，掌握基础透视，为人体阶段打基础。",
    practices: [
      "几何体光影重画：球、方、柱的黑白稿，体会压感控制明暗过渡",
      "静物黑白稿：3-5个简单静物照片画单色稿，只抓大明暗",
      "透视基础：一点透视、两点透视，徒手画透视方盒",
      "方块旋转：空间中旋转方块画各种角度——人体体块化的前置练习"
    ],
    work: "用一点或两点透视画一个简单的室内/街景黑白稿，含基本光影",
    resources: [
      { name: "《透视画法入门》— 约瑟夫·德·阿梅里奥", url: "https://search.douban.com/book/subject_search?search_text=%E9%80%8F%E8%A7%86%E7%94%BB%E6%B3%95%E5%85%A5%E9%97%A8" }
    ],
    color: "#7C5CFC"
  },
  {
    id: 3,
    title: "人体结构基础（核心）",
    duration: "5-7 周",
    goal: "能凭记忆画出标准比例的站姿人体，并能用体块概括出有动感的姿势。",
    practices: [
      "比例与体块（1周）：7-8头身标准比例，火柴人→体块→简笔人体",
      "骨骼与关键骨点（1周）：锁骨、肩峰、胸廓下缘、骨盆髂嵴、肘、腕、膝、踝",
      "肌肉概括（1-2周）：按肌群学，记起止点+大致形状，用PoseManiacs 3D观察",
      "头部与五官（1周）：三庭五眼、十字定位法、五官逐一练",
      "手与脚（1周）：手掌当方块、手指当圆柱，每天画5-10只不同角度的手",
      "动态速写（1-2周）：Line of Action定时速写，先抓动势线再套体块"
    ],
    work: "凭记忆画一张标准比例站姿人体 + 一张有动感的速写姿势",
    resources: [
      { name: "PoseManiacs", url: "https://www.posemaniacs.com" },
      { name: "Line of Action", url: "https://line-of-action.com/" },
      { name: "Bodies in Motion", url: "https://www.bodiesinmotion.photo" },
      { name: "Quickposes", url: "https://www.quickposes.com" },
      { name: "《人体素描》— 安德鲁·路米斯", url: "https://search.douban.com/book/subject_search?search_text=%E8%B7%AF%E7%B1%B3%E6%96%AF%20%E4%BA%BA%E4%BD%93%E7%B4%A0%E6%8F%8F" }
    ],
    color: "#7C5CFC",
    isCore: true
  },
  {
    id: 4,
    title: "色彩与上色技法",
    duration: "3-4 周",
    goal: "掌握一套完整的上色流程，能为一幅线稿配上协调的色彩。",
    practices: [
      "色彩三要素：色相、明度、纯度——明度最关键，彩色图转黑白检查",
      "冷暖与配色：邻近色、互补色、三角配色各画一张色稿",
      "上色流程：线稿→铺底色→二分光影→细化→后期调色",
      "配色分析：找喜欢的图，吸色还原主色板，分析为什么好看"
    ],
    work: "把阶段三的人体线稿完整上色，光源明确、配色协调",
    resources: [
      { name: "Khroma - AI配色", url: "https://khroma.co" },
      { name: "LOL Colors", url: "https://www.webdesignrankings.com/resources/lolcolors" },
      { name: "Color Claim", url: "https://colorclaim.org" },
      { name: "NIPPON COLORS", url: "https://nipponcolors.com" },
      { name: "《贝蒂的色彩》", url: "https://search.douban.com/book/subject_search?search_text=%E8%B4%9D%E8%92%82%E7%9A%84%E8%89%B2%E5%BD%A9" }
    ],
    color: "#FF6B9D"
  },
  {
    id: 5,
    title: "构图与完整作品",
    duration: "持续",
    goal: "独立完成从构思到后期的完整插画，建立可复用的创作流程。",
    practices: [
      "构图法则：三分法、黄金比例、引导线、负空间、框中框",
      "缩略图：正式画前先画5-8个指甲盖大小的构图小稿",
      "完整流程实战：草图→线稿→铺色→光影→细化→后期",
      "观察训练：学会看负形与整体关系"
    ],
    work: "完成一张带背景、有光影氛围的角色插画，全流程独立完成",
    resources: [
      { name: "《像艺术家一样思考》— 贝蒂·爱德华", url: "https://search.douban.com/book/subject_search?search_text=%E5%83%8F%E8%89%BA%E6%9C%AF%E5%AE%B6%E4%B8%80%E6%A0%B7%E6%80%9D%E8%80%83" }
    ],
    color: "#FF6B9D"
  },
  {
    id: 6,
    title: "风格化与原创创作",
    duration: "持续",
    goal: "能稳定输出原创作品，并开始建立个人画风与作品集。",
    practices: [
      "分析式临摹：挑2-3位喜欢的画师，记录他们的线条、配色、明暗处理特征",
      "风格融合：把不同画师的特征混进自己的原创",
      "主题创作：定主题（如四季、一组情绪），连续创作形成系列",
      "建立作品集：在Pixiv/Lofter/微博持续发布，公开输出倒逼质量"
    ],
    work: "完成一组主题系列作品（3-5张），建立个人作品集",
    resources: [
      { name: "Pixiv", url: "https://www.pixiv.net" },
      { name: "ArtStation", url: "https://www.artstation.com" },
      { name: "花瓣网", url: "https://huaban.com" },
      { name: "Pinterest", url: "https://www.pinterest.com" },
      { name: "Behance", url: "https://www.behance.net" }
    ],
    color: "#FF6B9D"
  }
];

const DRAWING_PRINCIPLES = [
  "练习量 > 看教程。每天动手1.5-2小时，比周末看8小时视频有效",
  "分析式临摹。临摹时问「为什么这么画」，而不是只抄形状",
  "阶段闭环。每阶段以一张「阶段作品」收尾，能独立画出来才算过关",
  "SAI2用于线稿和平涂上色，PS用于厚涂和后期特效",
  "人体本质上是方块、圆柱、球的组合",
  "临摹时边画边问：线条粗细节奏？明暗光源在哪？配色主色几个？哪里实哪里虚？"
];

const DRAWING_WEEKLY_PLAN = [
  { day: "周一", content: "速写热身（Line of Action 60s×20）+ 当周肌群学习", hours: "1.5h" },
  { day: "周二", content: "肌群临摹 + 体块人练习", hours: "2h" },
  { day: "周三", content: "速写热身 + 头部/五官专项", hours: "1.5h" },
  { day: "周四", content: "手或脚专项（每天5-10只）", hours: "1.5h" },
  { day: "周五", content: "速写热身 + 动态速写（5min×10）", hours: "2h" },
  { day: "周六", content: "阶段作品深入（凭记忆画人体）", hours: "2-3h" },
  { day: "周日", content: "复盘：对比一周前后作品 + 轻量速写", hours: "1h" }
];

// ============================================================
// 笔友数据 - 语言练习伙伴
// ============================================================

const PEN_PALS = [
  {
    id: "lena",
    name: "Lena",
    avatar: "👩‍🎓",
    language: "德语",
    flag: "🇩🇪",
    city: "慕尼黑，德国",
    bio: "大学生，学习文学。喜欢阅读、徒步和烘焙。愿意帮你练习德语！",
    level: "A2-B1",
    topics: ["日常生活", "美食", "旅行", "德国文化"],
    starter: "Hallo! Wie geht es dir heute? Ich habe heute einen schönen Spaziergang im Englischen Garten gemacht. Das Wetter war wunderbar! Was hast du heute gemacht?"
  },
  {
    id: "max",
    name: "Max",
    avatar: "👨‍💻",
    language: "德语",
    flag: "🇩🇪",
    city: "柏林，德国",
    bio: "软件工程师，热爱科技和电子音乐。喜欢讨论新技术和柏林的夜生活。",
    level: "B1-B2",
    topics: ["科技", "音乐", "电影", "工作"],
    starter: "Hi! Ich bin Max aus Berlin. Ich arbeite als Programmierer. In meiner Freizeit höre ich gerne elektronische Musik. Was machst du gerne in deiner Freizeit?"
  },
  {
    id: "emma",
    name: "Emma",
    avatar: "👩‍🎨",
    language: "英语",
    flag: "🇬🇧",
    city: "伦敦，英国",
    bio: "插画师，喜欢艺术和咖啡。在画廊工作，业余时间画画和看展。",
    level: "B1-C1",
    topics: ["艺术", "绘画", "咖啡", "旅行"],
    starter: "Hi there! I'm Emma from London. I work as an illustrator and I love visiting art galleries. Do you like art? What kind of things do you enjoy creating?"
  },
  {
    id: "jake",
    name: "Jake",
    avatar: "🧑‍🍳",
    language: "英语",
    flag: "🇺🇸",
    city: "纽约，美国",
    bio: "厨师兼美食博主。热爱尝试各国料理，最近在学习亚洲烹饪。",
    level: "A2-B2",
    topics: ["美食", "文化", "日常生活", "旅行"],
    starter: "Hey! I'm Jake from New York. I'm a chef and I love cooking food from different countries. What's your favorite food? Have you tried cooking any foreign dishes?"
  }
];

// 写作提示语（按语言和主题）
const WRITING_PROMPTS = {
  "德语": [
    "Beschreibe deinen heutigen Tag. Was hast du gemacht? (描述你今天的一天，你做了什么？)",
    "Was ist dein Lieblingsessen und warum? (你最喜欢的食物是什么？为什么？)",
    "Erzähle von deiner Stadt oder deinem Dorf. (讲讲你的城市或村庄)",
    "Was möchtest du in der Zukunft erreichen? (你未来想实现什么？)",
    "Beschreibe ein Buch oder einen Film, der dir gefällt. (描述一本你喜欢的书或电影)",
    "Was machst du gerne in deiner Freizeit? (你空闲时间喜欢做什么？)",
    "Wie sieht deine Morgenroutine aus? (你的早晨日常是怎样的？)",
    "Was ist dein größtes Ziel für dieses Jahr? (你今年最大的目标是什么？)"
  ],
  "英语": [
    "Describe your typical day. What do you usually do? (描述你的典型一天)",
    "What's your favorite hobby and why do you enjoy it? (你最喜欢的爱好是什么？)",
    "Tell me about a place you'd love to visit. (讲讲一个你想去的地方)",
    "What did you do last weekend? (你上周末做了什么？)",
    "Describe a skill you want to learn and why. (描述一个你想学的技能)",
    "What's your favorite season and what do you like about it? (你最喜欢的季节是什么？)",
    "If you could have dinner with anyone, who would it be? (如果你能和任何人共进晚餐，你会选谁？)",
    "What are you grateful for today? (你今天感恩什么？)"
  ]
};

// 常用短语库
const PHRASE_BANK = {
  "德语": {
    "问候": ["Hallo!", "Guten Morgen!", "Guten Tag!", "Wie geht es dir?", "Mir geht es gut, danke!"],
    "日常": ["Ich habe heute... gemacht", "Ich möchte...", "Ich finde... sehr interessant", "Kannst du mir helfen?"],
    "告别": ["Tschüss!", "Bis bald!", "Schönen Tag noch!", "Gute Nacht!"]
  },
  "英语": {
    "问候": ["Hi!", "Good morning!", "How are you?", "I'm doing well, thanks!", "What's up?"],
    "日常": ["Today I...", "I would like to...", "I find... very interesting", "Can you help me?"],
    "告别": ["Bye!", "See you soon!", "Have a great day!", "Good night!"]
  }
};
