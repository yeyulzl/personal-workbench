// ============================================================
// 个人工作台 - 数据库
// 包含：理论库、激励语录、英文学习资源、新闻源
// ============================================================

// === 每日理论库（生活与学习方面） ===
const THEORIES = [
  {
    title: "费曼学习法",
    category: "学习方法",
    summary: "如果你不能用简单的语言把一个概念解释清楚，说明你还没有真正理解它。",
    detail: "物理学家理查德·费曼提出的学习方法：选择一个概念，假装你要把它教给一个小孩，用最简单的语言解释。遇到卡壳的地方就回去重新学习，直到能流畅地简化表达。这种方法能暴露知识的盲区，加深理解。",
    action: "今天学完德语语法后，试着用最简单的话向 imaginary 朋友解释这个语法点。"
  },
  {
    title: "艾宾浩斯遗忘曲线",
    category: "学习方法",
    summary: "人类在学习后的20分钟内就会遗忘42%的内容，1天后遗忘74%。",
    detail: "德国心理学家艾宾浩斯发现，遗忘是有规律的：初期遗忘速度极快，之后逐渐减缓。最佳复习节点为：20分钟、1小时、9小时、1天、2天、6天、31天。在这些节点复习，可以大幅提升记忆保持率。",
    action: "今天背的德语单词，设置20分钟后和今晚睡前的两次复习提醒。"
  },
  {
    title: "番茄工作法",
    category: "效率方法",
    summary: "25分钟专注工作 + 5分钟休息 = 一个番茄钟，每4个番茄钟休息15-30分钟。",
    detail: "由弗朗西斯科·西里洛在1980年代创立。核心理念是通过短时间的深度专注和定时休息来保持高效。使用物理计时器（最初是番茄形状）来倒计时，期间不可中断。如果被打断，该番茄钟作废重来。",
    action: "今天的板绘练习尝试用番茄工作法：画25分钟，休息5分钟，做4个循环。"
  },
  {
    title: "心流理论",
    category: "心理学",
    summary: "当挑战难度与技能水平匹配时，人会进入全神贯注、忘记时间的最佳体验状态。",
    detail: "心理学家米哈里·契克森米哈伊提出。心流的条件：明确的目标、即时的反馈、挑战与技能的平衡。在心流状态下，人的效率和创造力达到巅峰。太简单会无聊，太难会焦虑，找到那个'刚刚好'的区间。",
    action: "板绘时选择一个略高于当前水平的主题，尝试进入心流状态。"
  },
  {
    title: "成长型思维",
    category: "心理学",
    summary: "能力不是固定的，而是可以通过努力和策略来发展的。",
    detail: "斯坦福大学卡罗尔·德韦克教授的研究发现，拥有成长型思维的人相信智力才能可以通过努力培养，他们拥抱挑战、从批评中学习、从他人的成功中获得启发。而固定型思维的人认为才能是天生的，逃避挑战。",
    action: "当德语学得困难时，告诉自己'我只是现在还不会'，而不是'我不擅长语言'。"
  },
  {
    title: "刻意练习",
    category: "学习方法",
    summary: "单纯重复不等于练习，有目标、有反馈、有调整的练习才能进步。",
    detail: "心理学家安德斯·艾利克森提出。刻意练习的要素：明确的特定目标、全神贯注的投入、即时反馈、不断突破舒适区。1万小时定律的核心不是时间堆砌，而是在这些条件下进行的高质量练习。",
    action: "板绘时不要只画自己擅长的，选择一个薄弱环节（如手部、透视）进行针对性练习。"
  },
  {
    title: "二八定律（帕累托法则）",
    category: "生活哲学",
    summary: "80%的结果来自20%的原因，少数关键努力决定了大部分成果。",
    detail: "意大利经济学家帕累托发现，意大利80%的土地被20%的人拥有。这个法则广泛适用：80%的销售额来自20%的客户，80%的收获来自20%的努力。找到那关键的20%，集中精力投入。",
    action: "审视你的德语学习，找出带来最大进步的20%活动（比如口语对话），多投入时间。"
  },
  {
    title: "习惯回路",
    category: "行为科学",
    summary: "每个习惯由提示、行为、奖励三部分组成，改变习惯要保留提示和奖励，替换行为。",
    detail: "查尔斯·杜希格在《习惯的力量》中提出。大脑将重复行为自动化以节省能量。要养成新习惯，需要设计明确的提示（如固定时间）、简单的行为、即时的奖励。习惯不能被消除，只能被替换。",
    action: "设定一个触发器：每天早餐后立刻打开德语教材（提示→行为→完成打卡的满足感→奖励）。"
  },
  {
    title: "微习惯策略",
    category: "行为科学",
    summary: "从'小到不可能失败'的目标开始，比如每天做1个俯卧撑、背1个单词。",
    detail: "斯蒂芬·盖斯提出。大脑对大目标会产生抵抗，而微小目标不会触发威胁反应。关键是降低启动门槛，一旦开始往往会做得更多。即使真的只做了最小量，也在维持习惯的连续性。",
    action: "设定最低目标：每天至少画1笔、背1个德语单词。完成后想继续就继续，不想也不算失败。"
  },
  {
    title: "复利效应",
    category: "生活哲学",
    summary: "每天进步1%，一年后将变为原来的37倍；每天退步1%，一年后趋近于零。",
    detail: "詹姆斯·克莱尔在《原子习惯》中强调。微小改变在时间维度上会产生指数级影响。复利效应的关键不在于单次努力的大小，而在于持续的时间和不被中断的积累。时间是习惯的朋友，也是坏习惯的敌人。",
    action: "不要追求每天学5小时德语，而是追求每天都能学一点，坚持100天比突击3天有效得多。"
  },
  {
    title: "达克效应",
    category: "心理学",
    summary: "能力越低的人越容易高估自己，能力越高的人反而容易低估自己。",
    detail: "康奈尔大学邓宁和克鲁格的研究。初学者因为缺乏元认知能力，不知道自己不知道什么，容易产生盲目自信（愚昧之巅）。随着学习深入，会进入绝望之谷，然后缓慢爬升到真正的精通。认识到这一点，能在低谷期不放弃。",
    action: "德语学习到中级时可能会感觉'越学越不会'，这是正常的，说明你在进步。"
  },
  {
    title: "沉没成本谬误",
    category: "决策思维",
    summary: "已经投入的时间、金钱不应影响未来的决策，只有未来收益才应被考虑。",
    detail: "行为经济学中的经典概念。人们倾向于因为已经投入了某事而继续投入，即使继续做并不理性。比如看了30分钟不好看的电影还要看完。正确的做法是问自己：如果现在从零开始，我还会做这个选择吗？",
    action: "如果某本德语教材不适合自己，不要因为'已经学了3章'就硬撑，果断换更适合的。"
  },
  {
    title: "第一性原理",
    category: "思维方式",
    summary: "把事物拆解到最基本的、不可再分的真理，然后从这些真理出发重新推导。",
    detail: "亚里士多德提出，被埃隆·马斯克发扬光大。类比思维是'别人怎么做我就怎么做'，而第一性原理思维是'这个问题的本质是什么？'。比如马斯克计算电池的原材料成本，发现可以大幅降低电池价格。",
    action: "学德语不要只跟着教材走，思考：学一门语言最核心的要素是什么？词汇、语法、输入量、输出量。"
  },
  {
    title: "破窗效应",
    category: "社会心理学",
    summary: "一扇未被修理的破窗会传递'无人管理'的信号，导致更多窗户被打破。",
    detail: "犯罪学家詹姆斯·威尔逊和乔治·凯林提出。环境中微小的不秩序如果被忽视，会引发更大的失序。这个原理也适用于个人生活：桌面杂乱、计划拖延一天，都会产生'可以不遵守'的心理暗示，最终瓦解自律。",
    action: "今天的打卡如果完成了，在日历上标记一下——维护好每一扇'窗户'。"
  },
  {
    title: "冒名顶替综合征",
    category: "心理学",
    summary: "成功的人经常觉得自己的成就不是靠实力获得的，害怕被'识破'是个骗子。",
    detail: "约70%的人在某个阶段会经历这种感觉。待业期间尤其容易产生。人们倾向于将自己的成功归结于运气，将失败归结于能力不足。实际上，感到'不配'恰恰说明你在认真对待自己的责任，这是成长的信号。",
    action: "如果你觉得学德语/板绘进步太慢，提醒自己：感到不足说明你知道方向在哪，继续走就好。"
  },
  {
    title: "SMART目标法则",
    category: "目标管理",
    summary: "好的目标应该是具体的、可衡量的、可实现的、相关的、有时间限制的。",
    detail: "SMART = Specific（具体）、Measurable（可衡量）、Achievable（可实现）、Relevant（相关）、Time-bound（有时限）。'学好德语'不是好目标，'3个月内通过德语A1考试'才是。明确的目标让行动更有方向。",
    action: "给自己定一个SMART目标，例如：'8月底前完成板绘基础教程的20个练习'。"
  },
  {
    title: "奥卡姆剃刀",
    category: "思维方式",
    summary: "当有多个解释都能说明问题时，选择最简单的那个。",
    detail: "14世纪哲学家奥卡姆的威廉提出：'如无必要，勿增实体'。在学习和解决问题时，不要一开始就追求复杂的方法论。最简单的方案往往是最有效的。学语言不需要10个APP，一本好书+坚持就够了。",
    action: "检查你的学习工具箱，砍掉那些'听起来不错但很少用'的工具，只保留最核心的。"
  },
  {
    title: "幸存者偏差",
    category: "思维方式",
    summary: "我们只看到了成功者的故事，因为失败者没有机会被看见。",
    detail: "二战时期，军方想给返航飞机的弹孔处加固装甲。统计学家亚伯拉罕·沃尔德指出：应该加固没有弹孔的地方，因为那些地方中弹的飞机根本没有返航。在生活中，我们容易高估成功方法的普适性，因为只看到了幸存者。",
    action: "不要因为某个博主'零基础3个月学会德语'就觉得自己也能做到，每个人的条件和环境不同。"
  },
  {
    title: "锚定效应",
    category: "心理学",
    summary: "人们在做判断时，会过度依赖最先获得的信息（锚点），即使它并不相关。",
    detail: "特沃斯基和卡尼曼的经典实验：先转一个随机数字轮盘，再问'联合国成员中非洲国家的比例'。人们给出的答案会被轮盘数字显著影响。在生活中，第一印象、最初的价格、别人对你的评价都会成为锚点。",
    action: "不要被'我以前学英语就学不好'这个锚点限制，语言学习的方法和动机不同，结果也不同。"
  },
  {
    title: "确认偏误",
    category: "心理学",
    summary: "人们倾向于寻找和记住支持自己观点的证据，忽略反对的证据。",
    detail: "如果你认为'我没有语言天赋'，就会注意到每次说错的德语，忽略进步的时刻。对抗确认偏误的方法是主动寻找反面证据：刻意记录每一次小小的成功。这不是自欺欺人，而是校正认知偏差。",
    action: "今天记录3件学习上的小进步，不管多小——记住了一个单词、画对了一条线都算。"
  },
  {
    title: "GROW模型",
    category: "目标管理",
    summary: "通过Goal（目标）、Reality（现状）、Options（选择）、Will（意愿）四步实现目标。",
    detail: "由约翰·惠特默爵士开发。先明确你想要什么（Goal），再客观评估现在的位置（Reality），然后头脑风暴所有可能的路径（Options），最后选择行动方案并承诺执行（Will）。这个框架适合做周计划或月度回顾。",
    action: "用GROW模型规划本周：我的目标是？现状是？有哪些选择？我决定怎么做？"
  },
  {
    title: "双曲贴现",
    category: "行为经济学",
    summary: "人们更偏好即时的小奖励，而非未来的大奖励，即使后者更优。",
    detail: "今天给你100元，还是明天给你110元？很多人选今天。但如果是一年后100元还是一年零一天后110元，同样的差距人们却愿意等。这说明我们对'现在'赋予了过高的权重。对抗方法：预先承诺，比如今天先安排好明天的学习计划。",
    action: "不要等到'有状态'才学习，状态是行动之后才来的。先坐下打开书，状态自然就来了。"
  },
  {
    title: "自我决定理论",
    category: "心理学",
    summary: "人类有三种基本心理需求：自主感、胜任感、归属感。满足它们就能激发内在动力。",
    detail: "德西和瑞安提出。自主感（我选择做这个）、胜任感（我能做好这个）、归属感（我和他人有连接）。外在奖励（如打卡积分）可能在短期内有效，但长期来看，将行为与内在需求对齐才能持久。",
    action: "想想你学德语和板绘的内在原因——是为了自我表达？探索世界？把这个原因写下来贴在桌上。"
  },
  {
    title: "机会成本",
    category: "经济学",
    summary: "选择做一件事的代价，是放弃的所有其他选项中价值最高的那一个。",
    detail: "你花2小时刷手机的机会成本，是这2小时本可以学德语、画画、锻炼带来的价值。这不是说每分钟都要做'有用'的事，而是要清醒地知道：休闲也是正当选择，但无意识的消磨时间是对机会成本的浪费。",
    action: "今天花时间做每件事时问自己：这是我主动选择的，还是在无意识中消耗的？"
  },
  {
    title: "峰终定律",
    category: "心理学",
    summary: "人们对一段体验的评价，主要取决于最高峰和结束时的感受，而非整个过程。",
    detail: "诺贝尔奖得主丹尼尔·卡尼曼的实验：受试者经历60秒冷水泡手 vs 90秒（最后30秒水温略升），人们更愿意重复90秒版本。这说明：结尾很重要。在安排学习时，把最喜欢的部分放在最后，会让你对整个学习体验印象更好。",
    action: "每次德语学习的最后5分钟，做一件你喜欢的德语活动（听歌、看短视频），让学习以愉悦结束。"
  },
  {
    title: "最小可行性产品（MVP）",
    category: "方法论",
    summary: "用最少的资源做出一个能验证核心假设的最简版本，然后根据反馈迭代。",
    detail: "精益创业的核心概念。不是等一切完美才发布，而是快速上线最简版本，收集真实反馈来改进。应用到个人学习：不要等'准备好了'才开始画完整的作品，先画一个粗糙的草图，从反馈中学习。",
    action: "画一张不完美但完整的板绘作品分享出去，接受反馈，而不是反复练习基础从不创作。"
  },
  {
    title: "邓巴数",
    category: "社会心理学",
    summary: "人类大脑能维持的稳定社交关系上限约为150人，亲密关系约5人。",
    detail: "人类学家罗宾·邓巴提出。大脑新皮层的大小限制了社交圈的规模。在待业期间，社交可能减少，但维持3-5个核心关系比广泛社交更重要。质量优于数量。",
    action: "今天和1-2个重要的人聊聊天，不必多，保持连接就好。"
  },
  {
    title: "蔡格尼克效应",
    category: "心理学",
    summary: "人们更容易记住未完成的事情，而忘记已完成的事情。",
    detail: "苏联心理学家蔡格尼克发现，服务员能记住未结账的订单，结账后就忘了。未完成的任务会在大脑中持续占据注意力。利用这一点：学习时故意留一点'尾巴'（比如一个未做完的练习），第二天更容易进入状态。",
    action: "今天的德语学习故意留一道题不做，明天的你会迫不及待想完成它。"
  },
  {
    title: "齐加尼克效应与休息的力量",
    category: "心理学",
    summary: "适度休息不是浪费时间，而是让大脑在后台处理信息、整合记忆的必要过程。",
    detail: "神经科学研究发现，休息时大脑的默认模式网络（DMN）会活跃，进行记忆巩固和创意连接。连续学习2小时的效果，往往不如学50分钟+休息10分钟+学50分钟。散步、发呆、洗澡时的灵感，就是大脑在后台工作的成果。",
    action: "学习感到卡住时，起身走动5分钟。休息也是学习的一部分。"
  },
  {
    title: "舒适区-学习区-恐慌区",
    category: "学习方法",
    summary: "在舒适区做事不会成长，在恐慌区会焦虑崩溃，在学习区才能高效进步。",
    detail: "心理学家维果茨基提出'最近发展区'：最有效的学习发生在略高于当前水平的区域。太简单=无聊，太难=焦虑，刚刚好的挑战=成长。随着能力提升，原来的学习区变成舒适区，需要不断调整难度。",
    action: "板绘时选择一个你'有点不会但努努力能做到'的题材，而不是画100遍已经会的东西。"
  }
];

// === 激励语录库 ===
const QUOTES = [
  { text: "种一棵树最好的时间是十年前，其次是现在。", author: "中国谚语" },
  { text: "你不必很厉害才能开始，但你必须开始才能很厉害。", author: "齐格·齐格勒" },
  { text: "成功不是终点，失败不是末日，重要的是继续前行的勇气。", author: "丘吉尔" },
  { text: "日日行，不怕千万里；常常做，不怕千万事。", author: "格言联璧" },
  { text: "今天是你余生中最年轻的一天。", author: "佚名" },
  { text: "不要等待机会，而要创造机会。", author: "萧伯纳" },
  { text: "行动是治愈恐惧的良药，犹豫拖延将不断滋养恐惧。", author: "诺曼·文森特·皮尔" },
  { text: "你的现在是你过去所有选择的总和，你的未来是你现在所有行动的总和。", author: "佚名" },
  { text: "学习不是为了考试，而是为了成为更好的自己。", author: "佚名" },
  { text: "每一步都算数，即使你看不到脚印。", author: "佚名" },
  { text: "不是因为有希望才坚持，而是因为坚持了才有希望。", author: "佚名" },
  { text: "慢慢来，比较快。", author: "佚名" },
  { text: "不怕慢，就怕站。", author: "中国谚语" },
  { text: "种下梧桐树，引得凤凰来。", author: "中国谚语" },
  { text: "你想拥有你从未拥有过的东西，就必须去做你从未做过的事情。", author: "佚名" },
  { text: "人生没有白走的路，每一步都算数。", author: "李宗盛" },
  { text: "自律的本质不是惩罚自己，而是爱护自己。", author: "佚名" },
  { text: "与其用泪水悔恨今天，不如用汗水拼搏今天。", author: "佚名" },
  { text: "真正的强者不是没有眼泪的人，而是含着眼泪依然奔跑的人。", author: "佚名" },
  { text: "生活不会亏待每一个努力的人。", author: "佚名" },
  { text: "今天流下的汗水，是明天浇灌成功的养分。", author: "佚名" },
  { text: "不积跬步，无以至千里；不积小流，无以成江海。", author: "荀子" },
  { text: "千里之行，始于足下。", author: "老子" },
  { text: "天行健，君子以自强不息。", author: "周易" },
  { text: "宝剑锋从磨砺出，梅花香自苦寒来。", author: "古训" },
  { text: "业精于勤，荒于嬉；行成于思，毁于随。", author: "韩愈" },
  { text: "不要因为走得太远，而忘了为什么出发。", author: "纪伯伦" },
  { text: "生命的意义不在于活了多少天，而在于有多少天是有意义的。", author: "佚名" },
  { text: "改变，从今天开始，从此刻开始。", author: "佚名" },
  { text: "你现在的态度，决定你十年后的高度。", author: "佚名" },
  { text: "把每一天都当作生命的第一天来过。", author: "佚名" },
  { text: "什么是失败？无非是迈向更好境界的第一步。", author: "温德尔·菲利普斯" },
  { text: "每一个不曾起舞的日子，都是对生命的辜负。", author: "尼采" },
  { text: "一个人至少拥有一个梦想，有一个理由去坚强。", author: "三毛" },
  { text: "世界以痛吻我，要我报之以歌。", author: "泰戈尔" },
  { text: "所谓万丈深渊，下去，也是前程万里。", author: "木心" },
  { text: "你若盛开，蝴蝶自来。", author: "佚名" },
  { text: "将来的你，一定会感谢现在拼命的自己。", author: "佚名" },
  { text: "所有的努力都不会完全白费，你付出的每一点滴都有意义。", author: "佚名" },
  { text: "我相信，路虽远行则可至，事虽难做则可成。", author: "佚名" },
  { text: "生活就像海洋，只有意志坚强的人才能到达彼岸。", author: "马克思" },
  { text: "光不向你走来，你就向光走去。", author: "佚名" },
  { text: "保持热爱，奔赴山海。", author: "佚名" },
  { text: "做你害怕做的事情，然后你会发现，不过如此。", author: "佚名" },
  { text: "人生最大的荣耀不在于从不跌倒，而在于每次跌倒后都能爬起来。", author: "曼德拉" },
  { text: "当你感到悲哀痛苦时，最好是去学些什么东西。学习会使你永远立于不败之地。", author: "佚名" },
  { text: "没有一个冬天不可逾越，没有一个春天不会来临。", author: "佚名" },
  { text: "山高路远，看世界，也找自己。", author: "佚名" },
  { text: "热爱可抵岁月漫长。", author: "佚名" },
  { text: "愿你不负韶华，不负自己。", author: "佚名" }
];

// === 英文学习资源（B站可访问） ===
const ENGLISH_RESOURCES = [
  {
    type: "播客",
    title: "BBC 6分钟英语（全系列）",
    source: "B站搬运",
    level: "初中级",
    description: "BBC经典6 Minute English合集，每集6分钟讨论有趣话题，带中英字幕，适合日常磨耳朵。",
    url: "https://www.bilibili.com/video/BV1RRcSzQE1W",
    duration: "6分钟/集"
  },
  {
    type: "播客",
    title: "英语播客248集合集",
    source: "B站UP主",
    level: "初级-中级",
    description: "B站最全英语播客合集，248集听力口语素材，3个月磨耳朵计划，从易到难。",
    url: "https://www.bilibili.com/video/av114976442488314",
    duration: "10-20分钟/集"
  },
  {
    type: "播客",
    title: "8分钟英语·180集",
    source: "B站UP主",
    level: "初中级",
    description: "每天坚持听30分钟，180集系统训练，涵盖日常对话、新闻话题等多种场景。",
    url: "https://www.bilibili.com/video/BV1xaKG6hEJS",
    duration: "8分钟/集"
  },
  {
    type: "视频",
    title: "English with Lucy（搬运）",
    source: "B站搬运",
    level: "初中级",
    description: "英国英语老师Lucy的教学视频，讲解发音、词汇、语法，清晰易懂，B站可看。",
    url: "https://search.bilibili.com/all?keyword=English%20with%20Lucy",
    duration: "5-15分钟/集"
  },
  {
    type: "视频",
    title: "Rachel's English 发音（搬运）",
    source: "B站搬运",
    level: "中级",
    description: "专注美式英语发音，逐音素详细讲解，适合纠正发音，B站搜索观看。",
    url: "https://search.bilibili.com/all?keyword=Rachel%27s%20English%20%E5%8F%91%E9%9F%B3",
    duration: "5-20分钟/集"
  },
  {
    type: "视频",
    title: "TED-Ed 动画短片（搬运）",
    source: "B站搬运",
    level: "中级-高级",
    description: "TED教育动画短片，话题涵盖科学、历史、文学等，配精良动画，兼具知识和语言学习。",
    url: "https://search.bilibili.com/all?keyword=TED-Ed%20%E5%AD%97%E5%B9%95",
    duration: "5-8分钟/集"
  },
  {
    type: "视频",
    title: "TED演讲合集（中英字幕）",
    source: "B站搬运",
    level: "中高级",
    description: "经典TED演讲合集，带中英双语字幕，适合高级学习者挑战真实语料和学术表达。",
    url: "https://search.bilibili.com/all?keyword=TED%E6%BC%94%E8%AE%B2%20%E5%8F%8C%E8%AF%AD%E5%AD%97%E5%B9%95",
    duration: "10-20分钟/集"
  },
  {
    type: "视频",
    title: "Easy English 街头采访（搬运）",
    source: "B站搬运",
    level: "初中级",
    description: "街头采访形式，真实日常对话，带双语字幕，感受地道口语表达。",
    url: "https://search.bilibili.com/all?keyword=Easy%20English%20%E8%A1%97%E5%A4%B4%E9%87%87%E8%AE%BF",
    duration: "5-10分钟/集"
  },
  {
    type: "视频",
    title: "Crash Course（中英字幕）",
    source: "B站搬运",
    level: "高级",
    description: "快节奏学术科普频道，涵盖历史、科学、文学等，语速快词汇量大，适合挑战。",
    url: "https://search.bilibili.com/all?keyword=Crash%20Course%20%E5%AD%97%E5%B9%95",
    duration: "10-15分钟/集"
  },
  {
    type: "视频",
    title: "英语口语训练1个月计划",
    source: "B站UP主",
    level: "初中级",
    description: "系统化口语听力训练课程，1个月提升计划，涵盖发音、对话、听力全方位练习。",
    url: "https://www.bilibili.com/video/BV1KsHXzYEPS",
    duration: "15-30分钟/集"
  }
];

// === 新闻源（国内可访问） ===
const NEWS_SOURCES = [
  { name: "澎湃新闻", url: "https://www.thepaper.cn/", region: "综合/全球" },
  { name: "观察者网", url: "https://www.guancha.cn/", region: "国际/全球" },
  { name: "界面新闻", url: "https://www.jiemian.com/", region: "财经/全球" },
  { name: "环球网", url: "https://www.huanqiu.com/", region: "全球" },
  { name: "参考消息", url: "https://www.cankaoxiaoxi.com/", region: "全球" },
  { name: "中国新闻网", url: "https://www.chinanews.com.cn/", region: "全球" },
  { name: "第一财经", url: "https://www.yicai.com/", region: "财经/全球" },
  { name: "财新网", url: "https://www.caixin.com/", region: "财经/全球" }
];

// === 今日新闻摘要（2026年8月5日） ===
const TODAY_NEWS = [
  {
    headline: "美伊海峡谈判拉锯，口头缓和伴随零星交火",
    summary: "美方财长乐观预判8月5-6日前后有望敲定霍尔木兹海峡通航协议，但双方围绕通航的外交表态出现矛盾，局势依然紧张。",
    tag: "国际",
    source: "环球网"
  },
  {
    headline: "央行开展5000亿元买断式逆回购操作",
    summary: "中国人民银行开展5000亿元、期限3个月的买断式逆回购操作，以保持银行体系流动性合理充裕。",
    tag: "财经",
    source: "第一财经"
  },
  {
    headline: "国际油价明显回落，市场关注中东局势",
    summary: "国际油价出现较大幅度下跌，市场关注全球需求预期以及中东局势变化对能源供应的影响。",
    tag: "经济",
    source: "界面新闻"
  },
  {
    headline: "自动驾驶迎来强制性国家标准",
    summary: "中国出台自动驾驶强制性国家标准，行业规范化迈出重要一步，相关产业链受到关注。",
    tag: "科技",
    source: "澎湃新闻"
  },
  {
    headline: "AI基础设施竞争升温，科技板块表现强劲",
    summary: "全球AI基础设施建设竞争加剧，国内科技板块表现强劲，相关企业市值持续增长。",
    tag: "科技",
    source: "观察者网"
  },
  {
    headline: "中国新能源汽车海外热度持续提升",
    summary: "中国新能源汽车在海外市场的关注度和销量持续攀升，多家车企加速全球化布局。",
    tag: "产业",
    source: "中国新闻网"
  }
];

// === 细化任务系统 ===
const TASK_CATEGORIES = [
  { id: "german", name: "德语", icon: "🇩🇪", color: "#f59e0b" },
  { id: "drawing", name: "板绘", icon: "🎨", color: "#ec4899" },
  { id: "english", name: "英语", icon: "🎧", color: "#3b82f6" },
  { id: "reading", name: "阅读", icon: "📚", color: "#10b981" }
];

const DETAILED_TASKS = [
  // 德语（german）
  { id: "de_words", cat: "german", name: "背10个新单词", icon: "📝", drops: 2, desc: "记忆并默写10个德语新词" },
  { id: "de_grammar", cat: "german", name: "学习1个语法/时态", icon: "📖", drops: 3, desc: "学习一个新语法点或时态，做配套练习" },
  { id: "de_speak", cat: "german", name: "练习10分钟口语", icon: "🗣️", drops: 2, desc: "跟读或自言自语练习口语表达" },
  { id: "de_listen", cat: "german", name: "听10分钟德语听力", icon: "👂", drops: 2, desc: "听德语播客或音频，做泛听练习" },
  { id: "de_reading", cat: "german", name: "阅读1篇德语短文", icon: "📄", drops: 2, desc: "阅读适合当前水平的德语文章并查生词" },
  { id: "de_writing", cat: "german", name: "写1段德语日记", icon: "✍️", drops: 3, desc: "用德语写5-8句日记，记录今天的生活" },
  { id: "de_review", cat: "german", name: "复习昨日单词", icon: "🔄", drops: 1, desc: "用艾宾浩斯曲线复习之前背过的单词" },
  { id: "de_video", cat: "german", name: "看1个德语短视频", icon: "🎬", drops: 2, desc: "看德语YouTube或短视频，练习泛听" },
  { id: "de_song", cat: "german", name: "跟唱1首德语歌", icon: "🎵", drops: 2, desc: "找一首德语歌，边听边学歌词" },
  { id: "de_news", cat: "german", name: "阅读1篇德语新闻", icon: "📰", drops: 3, desc: "阅读DW或Tagesschau的新闻，了解时事" },
  { id: "de_diary", cat: "german", name: "德语主题写作练习", icon: "📔", drops: 3, desc: "就一个主题写150字德语短文，注意语法" },
  { id: "de_dubbing", cat: "german", name: "德语配音练习", icon: "🎤", drops: 3, desc: "给德语视频片段配音，模仿语调语气" },
  // 板绘（drawing）
  { id: "draw_warmup", cat: "drawing", name: "线条热身15分钟", icon: "✏️", drops: 2, desc: "排线、长线、椭圆等基础线条练习" },
  { id: "draw_copy", cat: "drawing", name: "临摹1张参考图", icon: "🖼️", drops: 3, desc: "选择与当前阶段匹配的参考图进行临摹" },
  { id: "draw_concept", cat: "drawing", name: "学习1个新技法", icon: "💡", drops: 2, desc: "看教程并理解一个新绘画概念" },
  { id: "draw_sketch", cat: "drawing", name: "完成1张速写", icon: "🎨", drops: 3, desc: "限时速写，培养抓形和概括能力" },
  { id: "draw_anatomy", cat: "drawing", name: "人体结构练习", icon: "🧍", drops: 3, desc: "练习人体比例、骨骼或肌肉结构" },
  { id: "draw_color", cat: "drawing", name: "色彩搭配练习", icon: "🌈", drops: 2, desc: "练习配色方案，画色板或上色小图" },
  { id: "draw_perspective", cat: "drawing", name: "透视场景练习", icon: "📐", drops: 3, desc: "练习一点/两点透视，画室内或街景" },
  { id: "draw_light", cat: "drawing", name: "光影关系练习", icon: "🔆", drops: 3, desc: "练习光影分布，画明暗交界线和投影" },
  { id: "draw_composition", cat: "drawing", name: "构图布局练习", icon: "🔲", drops: 2, desc: "练习三分法、黄金分割等构图技巧" },
  { id: "draw_material", cat: "drawing", name: "材质表现练习", icon: "💎", drops: 3, desc: "练习金属、布料、皮肤等不同材质质感" },
  { id: "draw_expression", cat: "drawing", name: "表情刻画练习", icon: "😊", drops: 2, desc: "练习不同情绪下的面部表情刻画" },
  { id: "draw_original", cat: "drawing", name: "原创角色尝试", icon: "🦄", drops: 3, desc: "不参考他人作品，独立设计一个原创角色" },
  // 英语（english）
  { id: "en_listen", cat: "english", name: "听1集播客/视频", icon: "🎧", drops: 2, desc: "利用B站英语听力资源磨耳朵" },
  { id: "en_shadow", cat: "english", name: "跟读5个句子", icon: "🗣️", drops: 2, desc: "模仿母语者发音和语调跟读" },
  { id: "en_phrases", cat: "english", name: "学习5个新表达", icon: "📝", drops: 2, desc: "记录实用表达并各造一个句子" },
  { id: "en_ted", cat: "english", name: "看1个TED演讲", icon: "🎥", drops: 3, desc: "看TED演讲，记笔记并复述要点" },
  { id: "en_news", cat: "english", name: "阅读英语新闻1篇", icon: "📰", drops: 2, desc: "阅读BBC或Reuters新闻，积累词汇" },
  { id: "en_diary", cat: "english", name: "写1篇英语日记", icon: "✍️", drops: 3, desc: "用英语写当天见闻，至少100词" },
  { id: "en_words", cat: "english", name: "记忆10个新单词", icon: "📚", drops: 2, desc: "记忆10个英语单词并用卡片复习" },
  { id: "en_speak", cat: "english", name: "口语练习15分钟", icon: "💬", drops: 2, desc: "用英语自言自语或对话练习口语" },
  { id: "en_shadow_pro", cat: "english", name: "影子跟读练习", icon: "👥", drops: 3, desc: "同步跟读音频，训练语感和流利度" },
  { id: "en_song", cat: "english", name: "学唱1首英语歌", icon: "🎶", drops: 2, desc: "学唱一首英文歌，注意连读和发音" },
  { id: "en_movie", cat: "english", name: "电影片段配音", icon: "🎬", drops: 3, desc: "选电影片段配音，模仿角色语气" },
  { id: "en_debate", cat: "english", name: "辩论话题练习", icon: "⚔️", drops: 3, desc: "选一个话题用英语列出正反方论点" },
  // 阅读（reading）
  { id: "book_read", cat: "reading", name: "阅读20分钟书籍", icon: "📚", drops: 3, desc: "选一本感兴趣的书，专注阅读20分钟" },
  { id: "book_en_article", cat: "reading", name: "读1篇英语文章", icon: "🇬🇧", drops: 2, desc: "阅读英语原版文章，查生词做笔记" },
  { id: "book_de_article", cat: "reading", name: "读1篇德语文章", icon: "🇩🇪", drops: 2, desc: "阅读德语文章，提升德语阅读理解" },
  { id: "book_news_review", cat: "reading", name: "读1篇新闻评论", icon: "📰", drops: 2, desc: "阅读深度新闻评论，培养批判思维" },
  { id: "book_essay", cat: "reading", name: "读1篇散文", icon: "🍂", drops: 2, desc: "阅读散文作品，感受文字之美" },
  { id: "book_science", cat: "reading", name: "读1篇科普文章", icon: "🔬", drops: 2, desc: "阅读科普文章，拓展知识边界" },
  { id: "book_history", cat: "reading", name: "读1个历史故事", icon: "🏛️", drops: 2, desc: "阅读历史故事，以史为鉴" },
  { id: "book_poetry", cat: "reading", name: "读3首诗", icon: "🌹", drops: 1, desc: "读古诗或现代诗，品味韵律与意境" },
  { id: "book_biography", cat: "reading", name: "读1篇传记片段", icon: "👤", drops: 2, desc: "阅读人物传记，汲取他人智慧" },
  { id: "book_philosophy", cat: "reading", name: "读1篇哲学随笔", icon: "🤔", drops: 3, desc: "阅读哲学文章，锻炼思辨能力" },
  { id: "book_review", cat: "reading", name: "读1篇书评", icon: "✍️", drops: 1, desc: "阅读书评，发现下一本好书" },
  { id: "book_blog", cat: "reading", name: "读3篇优质博客", icon: "💻", drops: 1, desc: "阅读行业博客或技术文章，保持更新" }
];

// 每日任务最大数量（每个大类）
var MAX_TASKS_PER_CATEGORY = 4;

// === 小树成长系统 ===
const GROWTH_STAGES = [
  { id: 0, name: "种子", emoji: "🌰", dropsNeeded: 0, desc: "一切从一颗种子开始" },
  { id: 1, name: "发芽", emoji: "🌱", dropsNeeded: 5, desc: "嫩芽破土而出！" },
  { id: 2, name: "幼苗", emoji: "🌿", dropsNeeded: 15, desc: "茁壮成长的幼苗" },
  { id: 3, name: "小树", emoji: "🪴", dropsNeeded: 30, desc: "已经初具树形" },
  { id: 4, name: "大树", emoji: "🌳", dropsNeeded: 50, desc: "枝繁叶茂，可以收获啦！" }
];

const TREE_SPECIES = [
  { id: "default", name: "常青树", emoji: "🌳", sprout: "🌱", seedling: "🌿", young: "🪴", cost: 0, desc: "四季常青的默认树种", color: "#10b981" },
  { id: "cherry", name: "樱花树", emoji: "🌸", sprout: "🌱", seedling: "🌿", young: "🪴", cost: 50, desc: "春天开满粉色樱花", color: "#FF6B9D" },
  { id: "pine", name: "松树", emoji: "🌲", sprout: "🌱", seedling: "🌿", young: "🪴", cost: 80, desc: "坚韧挺拔的苍松", color: "#0d9488" },
  { id: "ginkgo", name: "银杏", emoji: "🍂", sprout: "🌱", seedling: "🌿", young: "🪴", cost: 120, desc: "秋天金黄的银杏", color: "#f59e0b" },
  { id: "maple", name: "枫树", emoji: "🍁", sprout: "🌱", seedling: "🌿", young: "🪴", cost: 150, desc: "秋日火红的枫叶", color: "#ef4444" },
  { id: "palm", name: "椰子树", emoji: "🌴", sprout: "🌱", seedling: "🌿", young: "🪴", cost: 200, desc: "热带风情的椰子树", color: "#14b8a6" },
  { id: "bamboo", name: "竹子", emoji: "🎋", sprout: "🌱", seedling: "🌿", young: "🪴", cost: 250, desc: "节节高升的翠竹", color: "#84cc16" },
  { id: "christmas", name: "圣诞树", emoji: "🎄", sprout: "🌱", seedling: "🌿", young: "🪴", cost: 300, desc: "节日氛围满满", color: "#16a34a" }
];

// === 理财金融板块 ===
const FINANCE_CONCEPTS = [
  { title: "复利的力量", category: "基础概念", summary: "爱因斯坦说复利是世界第八大奇迹。",
    detail: "复利是指利息产生利息。假设年化收益率10%，1万元投资30年后变为17.4万元。时间越长，复利效应越惊人。关键启示：投资越早开始越好，哪怕金额不大。",
    action: "今天就开始记账，梳理每月可投资的金额，哪怕只有100元也要开始。" },
  { title: "资产与负债", category: "基础概念", summary: "富人买入资产，穷人买入负债，中产买入他们以为是资产的负债。",
    detail: "《富爸爸穷爸爸》核心概念：资产是能把钱放进你口袋的东西（如收租的房产、股票、基金），负债是把钱从你口袋拿走的东西（如自住房产的房贷、车贷、信用卡消费）。区分二者是理财的第一步。",
    action: "列出你所有的'资产'和'负债'，看看哪些在帮你赚钱，哪些在消耗你。" },
  { title: "4%法则", category: "退休规划", summary: "存够年支出的25倍，就可以实现财务自由。",
    detail: " Trinity Study研究表明，退休时存够年支出的25倍，每年提取4%，在大多数情况下可以维持30年以上不耗尽。例如年支出10万，需要存250万。这被称为FIRE（Financial Independence, Retire Early）运动的核心公式。",
    action: "计算你的年支出，乘以25，得到你的'自由数字'。" },
  { title: "指数基金定投", category: "投资策略", summary: "巴菲特最推荐普通人的投资方式：低费率指数基金定投。",
    detail: "巴菲特多次公开建议普通人买指数基金。指数基金追踪整个市场（如沪深300、标普500），不需要选股，长期收益超过大部分主动基金。定投（定期定额投资）可以平滑成本，降低择时风险。",
    action: "了解沪深300ETF或中证500ETF，设置每月定投计划。" },
  { title: "紧急备用金", category: "风险防范", summary: "存够3-6个月生活费作为应急资金。",
    detail: "紧急备用金是理财的地基。失业、生病、意外都需要现金应对。建议存3-6个月的生活费在流动性高的账户（如货币基金、银行活期），不到万不得已不动用。",
    action: "如果还没有紧急备用金，现在就开始存，目标是3个月生活费。" },
  { title: "资产配置", category: "投资策略", summary: "不要把鸡蛋放在一个篮子里。",
    detail: "资产配置是将资金分散到不同类别（股票、债券、黄金、房产、现金），降低整体风险。经典配置如60%股票+40%债券。年轻可以多配股票（高风险高收益），随着年龄增长逐渐增加债券比例。",
    action: "检查你的资产分布，是否过于集中在单一类别。" },
  { title: "保险四件套", category: "风险防范", summary: "医疗险、重疾险、意外险、寿险——花小钱保大风险。",
    detail: "保险的本质是转移极端风险。医疗险（百万医疗，几百元/年）覆盖大额医疗费；重疾险覆盖收入损失；意外险（几十到几百元）覆盖意外伤害；寿险（有家庭责任的人必备）覆盖早亡风险。年轻时保费低，越早买越划算。",
    action: "检查你是否已有这四种基础保障，没有的优先配置。" },
  { title: "消费陷阱", category: "消费观", summary: "需要vs想要，延迟满足是理财的第一课。",
    detail: "大部分人的财务问题不是赚得少，而是花得多。区分'需要'和'想要'：需要是生存必需（吃饭、住房、交通），想要是欲望驱动（最新手机、品牌衣服）。记账一个月，你会惊讶于'想要'占比之高。",
    action: "今天记账，把每笔消费标注为'需要'或'想要'。" },
  { title: "通货膨胀", category: "基础概念", summary: "钱放银行是在'安全地亏损'。",
    detail: "中国近20年平均通胀率约2-3%，而银行活期利率仅0.2%左右。10万元放银行10年，购买力实际缩水约2.6万元。理财不是'有了闲钱才做'的事，而是'不做就在亏'的事。至少跑赢通胀是底线。",
    action: "把闲置资金从活期转到货币基金或短期理财，至少多2%收益。" },
  { title: "基金定投微笑曲线", category: "投资策略", summary: "市场下跌时定投买入更多份额，等市场回升时获利更丰。",
    detail: "定投的魔力在于'微笑曲线'：市场下跌时同样的钱能买更多份额（摊低成本），当市场回升到起点位置时，你已经盈利了。关键是坚持定投不中断，在低点不恐慌停止。",
    action: "设定自动定投，市场涨跌都不手动干预，坚持至少1年。" }
];

// 理财书籍已合并到 BOOK_RECOMMENDATIONS 中

const FINANCE_RESOURCES = [
  { type: "博客", name: "银行螺丝钉", desc: "指数基金定投大V，每日发布估值表", url: "https://xueqiu.com/u/5545908754" },
  { type: "博客", name: "少数派理财", desc: "实用理财工具和观念分享", url: "https://sspai.com/tag/理财" },
  { type: "工具", name: "且慢", desc: "基金定投工具，有智能定投策略", url: "https://qieman.com" },
  { type: "工具", name: "理杏仁", desc: "股票基金数据查询工具", url: "https://www.lixinger.com" },
  { type: "视频", name: "B站理财入门", desc: "搜索'理财入门'获取大量免费教程", url: "https://search.bilibili.com/all?keyword=理财入门" }
];

// === 书籍推荐库（多方向：文学/历史/地理/科普/心理学/理财/艺术等） ===
// readUrl: 豆瓣读书搜索链接，可在微信读书/豆瓣阅读等平台在线阅读
// chapters: 预估章节数，用于阅读进度追踪
function bookSearchUrl(title) { return 'https://book.douban.com/subject_search?search_text=' + encodeURIComponent(title); }

const BOOK_RECOMMENDATIONS = [
  // === 文学 ===
  { title: "活着", author: "余华", category: "文学", cover: "📕", rating: 9.4, chapters: 12,
    summary: "讲述了农民福贵悲惨的人生遭遇，在巨大苦难中展现生命的韧性与尊严。",
    reason: "用最朴素的文字写最深刻的人生，读完会对'活着'本身有全新的理解。",
    quote: "人是为了活着本身而活着的，而不是为了活着之外的任何事物而活着。" },
  { title: "百年孤独", author: "加西亚·马尔克斯", category: "文学", cover: "📗", rating: 9.3, chapters: 20,
    summary: "布恩迪亚家族七代人的传奇故事，魔幻现实主义文学的巅峰之作。",
    reason: "一个人读懂这本书的标志，是不再害怕孤独，而是学会与孤独共处。",
    quote: "生命中真正重要的不是你遭遇了什么，而是你记住了哪些事，又是如何铭记的。" },
  { title: "月亮与六便士", author: "毛姆", category: "文学", cover: "📘", rating: 9.0, chapters: 15,
    summary: "一个证券经纪人抛弃一切去追寻绘画理想的故事，探讨理想与现实的抉择。",
    reason: "每个追梦人都该读的书。满地都是六便士，他却抬头看见了月亮。",
    quote: "追逐梦想就是追逐自己的厄运，在满地都是六便士的街上，他抬起头看到了月光。" },
  { title: "平凡的世界", author: "路遥", category: "文学", cover: "📙", rating: 9.0, chapters: 54,
    summary: "以孙少安、孙少平兄弟为主线，描绘中国70-80年代城乡社会变迁中普通人的奋斗。",
    reason: "献给每个在平凡生活中不甘平凡的人，苦难中也有尊严和温暖。",
    quote: "生活不能等待别人来安排，要自己去争取和奋斗。" },
  { title: "局外人", author: "加缪", category: "文学", cover: "📙", rating: 8.9, chapters: 6,
    summary: "一个对一切都漠不关心的'异乡人'的故事，存在主义文学代表作。",
    reason: "当你觉得与世界格格不入时，这本书会让你理解：荒诞也是一种真实。",
    quote: "我知道这世界我无处容身，只是，你凭什么审判我的灵魂？" },
  { title: "小王子", author: "圣埃克苏佩里", category: "文学", cover: "📕", rating: 9.0, chapters: 27,
    summary: "一个来自小行星的小王子在地球的奇遇，用童话讲述爱与责任的真谛。",
    reason: "不管几岁都值得重读的书。长大后才发现，重要的东西用眼睛是看不见的。",
    quote: "真正重要的东西，用眼睛是看不见的，要用心去看。" },
  { title: "围城", author: "钱钟书", category: "文学", cover: "📗", rating: 8.9, chapters: 10,
    summary: "留学归来的方鸿渐在爱情与事业中的困顿，讽刺幽默的世情小说。",
    reason: "钱钟书的比喻功力登峰造极，每一句都值得细细品味。",
    quote: "婚姻是一座围城，城外的人想进去，城里的人想出来。" },
  { title: "悉达多", author: "赫尔曼·黑塞", category: "文学", cover: "📔", rating: 8.7, chapters: 12,
    summary: "古印度贵族青年悉达多求道的一生，从苦行到入世再到觉悟的精神旅程。",
    reason: "正在寻找人生方向的人必读。智慧无法传授，只能自己去经历。",
    quote: "知识可以传授，但智慧不能。" },
  { title: "无声告白", author: "伍绮诗", category: "文学", cover: "📔", rating: 8.2, chapters: 12,
    summary: "一个混血家庭的悲剧故事，探讨身份认同、家庭期望与自我追求的冲突。",
    reason: "关于'成为自己'还是'满足期待'的深刻探讨，读完会有很多反思。",
    quote: "我们终此一生，就是要摆脱他人的期待，找到真正的自己。" },
  { title: "82年生的金智英", author: "赵南柱", category: "文学", cover: "📗", rating: 8.0, chapters: 8,
    summary: "一个普通韩国女性的生活故事，平静叙述中揭示结构性性别不平等。",
    reason: "一本让人重新审视'日常'的书。每一个看似正常的现象背后，都可能藏着不公。",
    quote: "你看看你，有个好老公，还会帮你看孩子，你还不知足？" },
  // === 历史 ===
  { title: "万历十五年", author: "黄仁宇", category: "历史", cover: "📙", rating: 8.9, chapters: 7,
    summary: "以1587年为切入点，剖析大明帝国由盛转衰的深层制度原因。",
    reason: "读历史最好的入门书之一。不枯燥，像看故事一样理解中国历史的逻辑。",
    quote: "1587年，是为万历十五年，表面上似乎是四海升平，实际上大明帝国已经走到了它发展的尽头。" },
  { title: "人类群星闪耀时", author: "茨威格", category: "历史", cover: "📕", rating: 8.7, chapters: 14,
    summary: "选取历史长河中14个改变世界的瞬间，用传记体捕捉人类命运的关键节点。",
    reason: "历史不是冰冷的事实，而是由一个个鲜活的人创造的。读起来像看电影一样精彩。",
    quote: "一个真正具有世界历史意义的时刻出现以前，必然有漫长的岁月毫无意义地流逝而去。" },
  { title: "枪炮、病菌与钢铁", author: "贾雷德·戴蒙德", category: "历史", cover: "📗", rating: 8.8, chapters: 19,
    summary: "从地理和生态角度解释为何不同大陆的文明发展速度截然不同，颠覆种族优越论。",
    reason: "为什么是欧洲征服了美洲而不是反过来？答案不在人种，而在地理和环境。",
    quote: "历史并非按照不同民族遗传的差异而发展，而是按照他们所处环境的不同而发展。" },
  { title: "丝绸之路", author: "彼得·弗兰科潘", category: "历史", cover: "📘", rating: 8.5, chapters: 25,
    summary: "从波斯帝国到当代，以丝绸之路为主线重新讲述世界历史，视角独特。",
    reason: "跳出欧洲中心论，从东方视角看世界历史的演变，令人耳目一新。",
    quote: "丝绸之路上升落的不仅仅是太阳，还有人类文明的曙光。" },
  // === 地理/旅行 ===
  { title: "这里是中国", author: "星球研究所", category: "地理", cover: "📙", rating: 8.6, chapters: 10,
    summary: "用震撼航拍照片和优美文字，展现中国从荒野到城市的壮美地理画卷。",
    reason: "足不出户领略中国大好河山，每一页都是视觉盛宴，让人心生向往。",
    quote: "我们有一个中国，已经足够伟大。" },
  { title: "文化苦旅", author: "余秋雨", category: "地理", cover: "📔", rating: 8.4, chapters: 20,
    summary: "余秋雨走访中国历史文化遗迹的散文集，在山水间触摸历史的脉搏。",
    reason: "把旅行和历史文化完美结合，每到一个地方都能读出深厚的文化底蕴。",
    quote: "千般荒凉，以此为梦；万里蹀躞，以此为归。" },
  // === 科普 ===
  { title: "人类简史", author: "尤瓦尔·赫拉利", category: "科普", cover: "📔", rating: 9.1, chapters: 20,
    summary: "从认知革命到科学革命，以全新视角梳理人类10万年发展史。",
    reason: "读完会有一种'上帝视角'的通透感，重新理解人类为何成为地球主宰。",
    quote: "我们之所以能创造庞大的文明，不是因为个体更聪明，而是因为我们能大规模地灵活合作。" },
  { title: "时间简史", author: "史蒂芬·霍金", category: "科普", cover: "📕", rating: 8.6, chapters: 12,
    summary: "从大爆炸到黑洞，霍金用通俗语言讲述宇宙学的前沿理论。",
    reason: "了解我们身处的宇宙从何而来、向何处去，拓展认知的边界。",
    quote: "记住要仰望星空，不要低头看脚下。" },
  { title: "三体", author: "刘慈欣", category: "科幻", cover: "📗", rating: 8.8, chapters: 36,
    summary: "从文革背景延伸到宇宙文明博弈的硬科幻史诗，想象力震撼恢弘。",
    reason: "中国科幻的巅峰之作。读完会重新审视人类文明在宇宙中的位置。",
    quote: "弱小和无知不是生存的障碍，傲慢才是。" },
  // === 心理学 ===
  { title: "思考，快与慢", author: "丹尼尔·卡尼曼", category: "心理学", cover: "📕", rating: 8.5, chapters: 38,
    summary: "诺贝尔经济学奖得主揭示大脑两套思维系统，理解决策中的偏见与直觉。",
    reason: "读完你会发现自己的很多决定其实并不理性，这是一本认识自己的书。",
    quote: "我们对自己思考时的样子，其实知之甚少。" },
  { title: "非暴力沟通", author: "马歇尔·卢森堡", category: "心理学", cover: "📔", rating: 8.4, chapters: 13,
    summary: "通过观察、感受、需要、请求四要素，学会用爱的语言沟通。",
    reason: "改变你说话方式的一本书。读完会发现，很多冲突其实源于不会表达。",
    quote: "不带评论的观察，是人类智力的最高形式。" },
  { title: "被讨厌的勇气", author: "岸见一郎", category: "心理学", cover: "📘", rating: 8.6, chapters: 5,
    summary: "以对话形式解读阿德勒心理学，探讨自由、幸福与人际关系的本质。",
    reason: "如果总觉得活在别人的期待里，这本书给你'被讨厌的勇气'。",
    quote: "一切烦恼都来自人际关系。自由就是不再寻求认可。" },
  { title: "心流", author: "米哈里·契克森米哈伊", category: "心理学", cover: "📘", rating: 8.3, chapters: 10,
    summary: "系统研究'最优体验'状态——心流，告诉你如何在生活中获得更多幸福感。",
    reason: "板绘时那种忘记时间的沉浸感就是心流。这本书教你如何更频繁地进入这种状态。",
    quote: "最优体验的产生，有赖于个人的能力与面临的挑战相匹配。" },
  { title: "自控力", author: "凯利·麦格尼格尔", category: "心理学", cover: "📕", rating: 8.2, chapters: 10,
    summary: "斯坦福大学最受欢迎的心理学课程，从科学角度解释自控力并提供训练方法。",
    reason: "为什么知道该学习却总是刷手机？这本书从生物学角度给你答案和解决方案。",
    quote: "自控力就像肌肉，用多了会疲劳，但也可以通过锻炼变得更强。" },
  // === 自我提升 ===
  { title: "原子习惯", author: "詹姆斯·克莱尔", category: "自我提升", cover: "📗", rating: 8.5, chapters: 20,
    summary: "通过微小改变建立好习惯、戒除坏习惯的实用指南，强调复利效应。",
    reason: "正在养成学习习惯的你必读。每天进步1%，一年后就是37倍的自己。",
    quote: "你不是你的目标，你是你的系统。" },
  { title: "认知觉醒", author: "周岭", category: "自我提升", cover: "📕", rating: 8.2, chapters: 10,
    summary: "从脑科学角度解释为什么我们总是拖延、焦虑，并提供切实可行的改变方法。",
    reason: "适合待业期自我调整。理解大脑的运作方式，才能真正掌控自己的行为。",
    quote: "焦虑的根源：想同时做很多事，又想立即看到效果。" },
  { title: "原则", author: "瑞·达利欧", category: "自我提升", cover: "📕", rating: 8.3, chapters: 16,
    summary: "桥水基金创始人达利欧的人生与工作原则，一套系统化的决策框架。",
    reason: "建立自己的'原则清单'，面对选择时不再迷茫。极度透明+极度真实。",
    quote: "痛苦+反思=进步。" },
  // === 哲学 ===
  { title: "瓦尔登湖", author: "亨利·梭罗", category: "哲学", cover: "📘", rating: 8.4, chapters: 18,
    summary: "梭罗在瓦尔登湖畔独居两年的记录，探讨简朴生活与精神自由。",
    reason: "在信息爆炸的时代，这本书提醒我们：生活的本质不在于拥有多少，而在于需要多少。",
    quote: "我步入丛林，因为我希望生活得有意义，只面对生活的基本事实。" },
  { title: "苏菲的世界", author: "乔斯坦·贾德", category: "哲学", cover: "📙", rating: 8.6, chapters: 35,
    summary: "少女苏菲收到神秘信件，开始一场穿越西方哲学史的奇妙旅程。",
    reason: "最好读的哲学入门书。用故事讲哲学，轻松有趣又不失深度。",
    quote: "你是谁？世界从何而来？这两个问题，是人类永恒的追问。" },
  { title: "当下的力量", author: "埃克哈特·托利", category: "心灵", cover: "📘", rating: 8.1, chapters: 15,
    summary: "引导读者摆脱思维认同，活在当下，发现内在的宁静与力量。",
    reason: "如果你总是为过去后悔或为未来焦虑，这本书会帮你回到'现在'。",
    quote: "你越是专注于时间——过去和未来——你就越多地错过当下。" },
  // === 散文/生活 ===
  { title: "我们仨", author: "杨绛", category: "散文", cover: "📔", rating: 8.8, chapters: 4,
    summary: "杨绛回忆与钱钟书、女儿钱瑗一家三口的生活，温润而深沉的亲情记录。",
    reason: "平淡的文字里藏着最深的思念。读完会更珍惜身边的人。",
    quote: "从今以后，咱们只有死别，不再生离。" },
  { title: "西湖漫拾", author: "汪曾祺", category: "散文", cover: "📗", rating: 8.7, chapters: 12,
    summary: "汪曾祺写美食、写风物、写生活的散文集，平淡中见真味。",
    reason: "当你觉得生活压力大时，读几页汪曾祺，世界就慢下来了。",
    quote: "四方食事，不过一碗人间烟火。" },
  { title: "断舍离", author: "山下英子", category: "生活", cover: "📕", rating: 7.8, chapters: 8,
    summary: "通过整理物品来整理内心，断绝不需要的东西，舍弃多余的废物，脱离对物品的执念。",
    reason: "待业期容易焦虑，从整理房间开始整理心情，行动带来改变。",
    quote: "断舍离不是简单的扔东西，而是通过整理物品来整理内心。" },
  // === 艺术 ===
  { title: "美的历程", author: "李泽厚", category: "艺术", cover: "📙", rating: 8.8, chapters: 10,
    summary: "以宏观视角梳理中国美学从远古到明清的演变历程，文笔优美思想深刻。",
    reason: "学板绘的人应该读的美学书。理解'美'的历史，才能创造有深度的美。",
    quote: "美是有意味的形式。" },
  { title: "读懂中国画", author: "苏庚春", category: "艺术", cover: "📙", rating: 8.0, chapters: 8,
    summary: "从技法、流派、鉴赏等多角度解读中国画的入门读物，图文并茂。",
    reason: "学板绘的同时了解传统绘画美学，东西方艺术融会贯通才能走得更远。",
    quote: "画者，文之极也。" },
  // === 理财 ===
  { title: "小狗钱钱", author: "博多·舍费尔", category: "理财", cover: "🐕", rating: 8.2, chapters: 14,
    summary: "用童话故事讲理财，最适合零基础入门。教你建立梦想储蓄罐、养大你的'鹅'。",
    reason: "理财入门第一本书。用讲故事的方式让你理解金钱的本质和投资的基本原理。",
    quote: "金钱有一些秘密和规律，要想了解这些秘密和规律，前提条件是你自己必须真的有这个愿望。" },
  { title: "富爸爸穷爸爸", author: "罗伯特·清崎", category: "理财", cover: "💰", rating: 8.3, chapters: 10,
    summary: "区分资产与负债的经典之作，颠覆普通人的金钱观。",
    reason: "理财启蒙必读。理解什么是真正的资产，改变你对金钱的认知方式。",
    quote: "富人买入资产，穷人只有支出，中产买入他们以为是资产的负债。" },
  { title: "穷查理宝典", author: "查理·芒格", category: "理财", cover: "🧠", rating: 8.6, chapters: 12,
    summary: "巴菲特搭档芒格的智慧箴言录，涵盖投资、决策、心理学等多元思维模型。",
    reason: "不仅是投资书，更是一本教你怎么思考的书。建立多元思维模型比学任何单一技能都重要。",
    quote: "我只想知道将来我会死在什么地方，这样我就永远不去那儿。" },
  { title: "指数基金投资指南", author: "银行螺丝钉", category: "理财", cover: "📈", rating: 8.4, chapters: 15,
    summary: "国内最实用的指数基金定投指南，手把手教你定投。",
    reason: "想开始投资但不知道从哪入手？这本是最接地气的中文实操指南。",
    quote: "定投的本质就是在便宜的时候多买，贵的时候少买。" }
];
