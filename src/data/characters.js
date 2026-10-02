export const SERIES_LIST = ['全部', '初代', '明代', '星代', '友代', '大游行', '行星', 'Academy', '其他'];
// 合法系列名集合（不含"全部"），用于判断 character 里写的是系列名而非真实角色
export const VALID_SERIES = new Set(SERIES_LIST.filter(s => s !== '全部'));

const CHARACTER_DATABASE = [
  // 初代
  { name: '星宫莓', series: '初代', romaji: 'Hoshimiya Ichigo', pinyin: 'xinggongmei' },
  { name: '雾矢葵', series: '初代', romaji: 'Kiriya Aoi', pinyin: 'wushikui' },
  { name: '紫吹兰', series: '初代', romaji: 'Shibuki Ran', pinyin: 'zichuilan' },
  { name: '有栖川乙女', series: '初代', romaji: 'Arisugawa Otome', pinyin: 'youqichuanyinv' },
  { name: '藤堂尤里卡', series: '初代', romaji: 'Todo Yurika', alias: '藤堂百合香', pinyin: 'tengtangyoulika' },
  { name: '北大路樱', series: '初代', romaji: 'Kitaoji Sakura', pinyin: 'beidaluying' },
  { name: '一之濑枫', series: '初代', romaji: 'Ichinose Kaede', pinyin: 'yizhilaifeng' },
  { name: '神崎美月', series: '初代', romaji: 'Kanzaki Mizuki', pinyin: 'shenqimeiyue' },
  { name: '夏树未来', series: '初代', romaji: 'Natsuki Mikuru', pinyin: 'xiashuweilai' },
  { name: '神谷紫苑', series: '初代', romaji: 'Kamiya Shion', pinyin: 'shenguziyuan' },
  { name: '三轮光', series: '初代', romaji: 'Miwa Hikari', pinyin: 'sanlunguang' },
  { name: '音城塞拉', series: '初代', romaji: 'Otoshiro Seira', pinyin: 'yinchengsaila' },
  { name: '音城诺艾尔', series: '初代', romaji: 'Otoshiro Noeru', pinyin: 'yinchengnuoai\'er' },
  { name: '冴草纪伊', series: '初代', romaji: 'Saegusa Kii', pinyin: 'hucaojiyi' },
  { name: '风沢空', series: '初代', romaji: 'Kazesawa Sora', pinyin: 'fengzekong' },
  { name: '姬里玛利亚', series: '初代', romaji: 'Himesato Maria', pinyin: 'jilimaliya' },
  { name: '光石织姬', series: '初代', romaji: 'Mitsuishi Orihime', pinyin: 'guangshizhiji' },
  { name: '星宫苹果', series: '初代', romaji: 'Hoshimiya Ringo', pinyin: 'xinggongpingguo' },
  { name: '星宫赖智', series: '初代', romaji: 'Hoshimiya Raichi', pinyin: 'xinggonglaizhi' },
  { name: '凉川直人', series: '初代', romaji: 'Suzukawa Naoto', pinyin: 'liangchuanzhiren' },
  { name: '乔尼·别府', series: '初代', romaji: 'Johnny Beppu', pinyin: 'qiaonibiefu' },
  { name: 'Hiro', series: '初代', romaji: 'Hiro', pinyin: 'xiluo' },
  { name: 'Shurato', series: '初代', romaji: 'Shurato', pinyin: 'xiulate' },
  { name: 'King', series: '初代', romaji: 'King', pinyin: 'king' },
  // 明代
  { name: '大空明', series: '明代', romaji: 'Ozora Akari', pinyin: 'dakongming' },
  { name: '冰上堇', series: '明代', romaji: 'Hikami Sumire', pinyin: 'bingshangjin' },
  { name: '新条雏姬', series: '明代', romaji: 'Shinjo Hinaki', pinyin: 'xintiaochuji' },
  { name: '红林珠璃', series: '明代', romaji: 'Kurebayashi Juri', pinyin: 'honglinzhuli' },
  { name: '黑泽凛', series: '明代', romaji: 'Kurosawa Rin', pinyin: 'heizelin' },
  { name: '天羽圆香', series: '明代', romaji: 'Amahane Madoka', pinyin: 'tianyuyuanxiang' },
  { name: '大地乃野', series: '明代', romaji: 'Daichi Nono', pinyin: 'dadinaiye' },
  { name: '白桦丽莎', series: '明代', romaji: 'Shirakaba Risa', pinyin: 'baihualisha' },
  { name: '堂岛妮娜', series: '明代', romaji: 'Dojima Nina', pinyin: 'tangdaoninna' },
  { name: '服部优', series: '明代', romaji: 'Hattori Yu', pinyin: 'fubuyou' },
  { name: '栗栖心音', series: '明代', romaji: 'Kurisu Kokone', pinyin: 'lixixinyin' },
  { name: '藤原雅', series: '明代', romaji: 'Fujiwara Miyabi', pinyin: 'tengyuanya' },
  { name: '濑名翼', series: '明代', romaji: 'Sena Tsubasa', pinyin: 'laimingyi' },
  { name: '四叶春', series: '明代', romaji: 'Yotsuba Haru', pinyin: 'siyechun' },
  { name: '波间照南', series: '明代', romaji: 'Minami Hateruma', pinyin: 'bojianzhaonan' },

  // 星代（Star）
  { name: '虹野梦', series: '星代', romaji: 'Nijino Yume', pinyin: 'hongyemeng' },
  { name: '七仓小春', series: '星代', romaji: 'Nanakura Koharu', pinyin: 'qicangxiaochun' },
  { name: '樱庭劳拉', series: '星代', romaji: 'Sakuraba Laura', pinyin: 'yingtinglaola' },
  { name: '早乙女亚子', series: '星代', romaji: 'Saotome Ako', pinyin: 'zaoyinv\'azi' },
  { name: '香澄真昼', series: '星代', romaji: 'Kasumi Mahiru', pinyin: 'xiangchengzhenzhou' },
  { name: '花园绮罗', series: '星代', romaji: 'Hanazono Kira', pinyin: 'huayuanyiluo' },
  { name: '双叶亚里亚', series: '星代', romaji: 'Futaba Aria', pinyin: 'shuangyeyaliya' },
  { name: '二阶堂柚子', series: '星代', romaji: 'Nikaido Yuzu', pinyin: 'erjietangyouzi' },
  { name: '白银莉莉', series: '星代', romaji: 'Shirogane Lily', pinyin: 'baiyinlili' },
  { name: '骑咲礼', series: '星代', romaji: 'Kizaki Rei', pinyin: 'qixiaoli' },
  { name: '艾尔莎·福特', series: '星代', romaji: 'Elsa Forte', pinyin: 'ai\'ershafute' },
  { name: '香澄夜空', series: '星代', romaji: 'Kasumi Yozora', pinyin: 'xiangchengyekong' },
  { name: '如月翼', series: '星代', romaji: 'Kisaragi Tsubasa', pinyin: 'ruyueyi' },
  { name: '晴香露卡', series: '星代', romaji: 'Haruka Luca', pinyin: 'qingxiangluka' },
  { name: '五十岚望', series: '星代', romaji: 'Igarashi Nozomi', pinyin: 'wushilanwang' },
  { name: '吉良彼方', series: '星代', romaji: 'Kira Kanata', pinyin: 'jiliangbifang' },
  { name: '结城昂', series: '星代', romaji: 'Yuki Subaru', pinyin: 'jiechengang' },
  { name: '香澄朝阳', series: '星代', romaji: 'Kasumi Asahi', pinyin: 'xiangchengchaoyang' },
  { name: '诸星辉', series: '星代', romaji: 'Moroboshi Hikaru', pinyin: 'zhuxinghui' },
  { name: '白鸟姬', series: '星代', romaji: 'Shiratori Hime', pinyin: 'bainiaoji' },
 { name: '芦田有莉', series: '星代', romaji: 'Ashida Yuuri', pinyin: 'lutianyouli' },
  // 友代(Friends)
  { name: '友希爱音', series: '友代', romaji: 'Yuki Aine', pinyin: 'youxiaiyin' },
  { name: '凑美绪', series: '友代', romaji: 'Minato Mio', pinyin: 'coumeixu' },
  { name: '蝶乃舞花', series: '友代', romaji: 'Chono Maika', pinyin: 'dienaiwuhua' },
  { name: '日向绘麻', series: '友代', romaji: 'Hyuga Ema', pinyin: 'rixianghuima' },
  { name: '神城卡莲', series: '友代', romaji: 'Kamishiro Karen', pinyin: 'shenchengkalian' },
  { name: '明日香未来', series: '友代', romaji: 'Asuka Mirai', pinyin: 'mingrixiangweilai' },
  { name: '白百合辉夜', series: '友代', romaji: 'Shirayuri Kaguya', pinyin: 'baibaihehuiye' },
  { name: '白百合咲夜', series: '友代', romaji: 'Shirayuri Sakuya', pinyin: 'baibaihexiaoye' },
  { name: '天翔响', series: '友代', romaji: 'Tensho Hibiki', pinyin: 'tianxiangxiang' },
  { name: '艾莉西亚·夏洛特', series: '友代', romaji: 'Alicia Charlotte', pinyin: 'ailixiyaxialuote' },
  { name: '春风若叶', series: '友代', romaji: 'Harukaze Wakaba', pinyin: 'chunfengruoye' },
  { name: '玉置可可', series: '友代', romaji: 'Coco', pinyin: 'yuzhikeke' },
  { name: '新海琳娜', series: '友代', romaji: 'Shinkai Rinna', pinyin: 'xinhailinna' },
  { name: '真波玛琳', series: '友代', romaji: 'Mamime Meh', pinyin: 'zhenbomalin' },
  // 大游行(On Parade)
  { name: '姬石来希', series: '大游行', romaji: 'Kiseki Raki', pinyin: 'jishilaixi' },

  // 行星(Planet)
  { name: '音羽舞樱', series: '行星', romaji: 'Otowa Mao', alias: 'Hana', pinyin: 'yinyuwuying' },
  { name: '珠树琉璃', series: '行星', romaji: 'Tamaki Ruri', alias: 'Ruli', pinyin: 'zhushuliuli' },
  { name: '梅小路响子', series: '行星', romaji: 'Umekoji Kyoko', alias: 'Beat', pinyin: 'meixiaoluxiangzi' },
  { name: '本谷栞', series: '行星', romaji: 'Motoya Shiori', alias: 'Shiori', pinyin: 'bengukan' },
  { name: '月城爱弓', series: '行星', romaji: 'Tsukishiro Ayumi', alias: 'Q-Pit', pinyin: 'yuechengaigong' },
  { name: '栗六杏', series: '行星', romaji: 'Kurimu An', alias: 'Ann', pinyin: 'liliuxing' },
  { name: '阳明咲', series: '行星', romaji: 'Yomei Saki', alias: 'Rose', pinyin: 'yangmingxiao' },
  { name: '糸井纱良', series: '行星', romaji: 'Itoi Sara', alias: 'Sala', pinyin: 'mijingshaliang' },

  // Academy
  { name: '姫乃Mieru', series: 'Academy', romaji: 'Himeno Mieru', pinyin: 'jinaimieru' },
  { name: '真未梦Meh', series: 'Academy', romaji: 'Mamime Meh', pinyin: 'zhenweimengmeh' },
  { name: '和央Parin', series: 'Academy', romaji: 'Wao Parin', pinyin: 'heyangparin' },
  { name: '凛堂Taimu', series: 'Academy', romaji: 'Rindo Taimu', pinyin: 'lintangtaimu' },

  // 其他（吉祥物等非偶像角色）
  { name: '天使熊', series: '其他', pinyin: 'tianshixiong' },
  { name: '艾比胖', series: '其他', pinyin: 'aibipang' },
  { name: 'Potepo', series: '其他', romaji: 'Potepo', pinyin: 'potepo' },
  { name: 'Alan', series: '其他', romaji: 'Alan', pinyin: 'alun' },
  { name: '大空海獭', series: '其他', pinyin: 'dakonghaita' },
  { name: 'Dream Puppy', series: '其他', romaji: 'Dream Puppy', pinyin: 'dreampuppy' },
  { name: 'Penne', series: '其他', romaji: 'Penne', pinyin: 'penne' },
  { name: 'Meruli', series: '其他', romaji: 'Meruli', alias: 'メルリ', pinyin: 'meiluli' },
  { name: 'Sweetie Berry', series: '其他', romaji: 'Sweetie Berry', pinyin: 'sweetieberry' },
];

// 「其他」系列角色（吉祥物等非偶像角色）：不计入"单人/多人"的角色人数统计
export const OTHER_SERIES_CHARACTERS = new Set(
  CHARACTER_DATABASE.filter(c => c.series === '其他').map(c => c.name)
);

// 角色组合筛选（偶像组合，如 WM = 夏树未来 + 神崎美月）。
// 点击组合后，只显示"角色恰好由这些成员组成"的商品（成员顺序无关，
// 允许混写"其他"/系列名占位，如 "其他,夏树未来,神崎美月" 也会命中）。
// 新增组合只需在此数组追加一项。
export const CHARACTER_GROUPS = [
  { name: 'WM', characters: ['夏树未来', '神崎美月'] },
  { name: 'Soleil', characters: ['星宫莓', '雾矢葵', '紫吹兰'] },
  { name: 'Tristar', characters: ['神崎美月', '一之濑枫', '藤堂尤里卡'] },
  { name: '软软布丁（Powa2×PuRiRiN）', characters: ['有栖川乙女', '北大路樱', '神谷紫苑'] },
  { name: 'STAR☆ANIS', characters: ['星宫莓', '紫吹兰', '雾矢葵', '藤堂尤里卡', '一之濑枫', '神崎美月', '有栖川乙女', '北大路樱'] },
  { name: 'Luminas', characters: ['大空明', '冰上堇', '新条雏姬'] },
  { name: 'Love Me Tear', characters: ['神城卡莲', '明日香未来'] },
  { name: 'Reflect Moon', characters: ['白百合咲夜', '白百合辉夜'] },
  { name: 'Honey Cat', characters: ['蝶乃舞花', '日向绘麻'] },
  { name: 'Pure Palette', characters: ['友希爱音', '凑美绪'] },
  { name: 'Baby Pirates', characters: ['新海琳娜', '真波玛琳'] },
  { name: 'I Believe', characters: ['天翔响', '艾莉西亚·夏洛特'] },
  { name: '2wingS', characters: ['音城塞拉', '星宫莓'] },
  { name: 'Cosmos', characters: ['大空明', '星宫莓'] },
  { name: 'Skips♪', characters: ['大空明', '天羽圆香'] },
  { name: 'あまふわ☆なでしこ', characters: ['栗栖心音', '藤原雅'] },
  { name: 'Dancing Diva', characters: ['冰上堇', '黑泽凛'] },
  { name: '情热Jalapeño', characters: ['红林珠璃', '新条雏姬'] },
  { name: 'Vanilla Chili Pepper', characters: ['天羽圆香', '黑泽凛', '红林珠璃'] },
  { name: '第25代S4', characters: ['白鸟姬', '如月翼', '二阶堂柚子', '香澄夜空'] },
  { name: '第26代S4', characters: ['虹野梦', '早乙女亚子', '二阶堂柚子', '香澄真昼'] },
  { name: 'Yume&Rola', characters: ['虹野梦', '樱庭劳拉'] },
  { name: 'FuwaFuwa Dreamer', characters: ['早乙女亚子', '花园绮罗'] },
  { name: 'ゆずっとリリィ☆', characters: ['白银莉莉', '二阶堂柚子'] },
   { name: 'Cheer Star', characters: ['春风若叶', '姬石来希'] },
   { name: '假面舞会', characters: ['星宫苹果', '光石织姬'] },
];

export const getCharacterGroupByName = (name) =>
  CHARACTER_GROUPS.find(g => g.name === name) || null;

// 判断商品的 character 是否恰好等于某组合的成员集合
export const matchCharacterGroup = (characterField, groupCharacters) => {
  const set = new Set(
    String(characterField || '')
      .split(/[,，。、]/)
      .map(s => stripBrackets(s.trim()))
      .filter(Boolean)
      .filter(n => n !== '其他' && !VALID_SERIES.has(n))
  );
  if (set.size !== groupCharacters.length) return false;
  return [...set].every(n => groupCharacters.includes(n));
};

// 剥离字符串中的括号及其内容（如 "初代(初版)" → "初代"）。
// 注：分开处理半角/全角括号，避免正则字符类混用——rolldown 解析器对字符类中的中文括号识别有 bug。
const stripBrackets = (s) => String(s || '').replace(/\([^)]*\)/g, '').replace(/（[^）]*）/g, '').trim();

export const getCharacterInfo = (name) => {
  const clean = stripBrackets(name);
  return CHARACTER_DATABASE.find(c => c.name === name || c.name === clean) || { series: '未知', romaji: '', alias: '', pinyin: '' };
};

export const getCharactersBySeries = (series) => {
  return CHARACTER_DATABASE.filter(c => series === '全部' || c.series === series)
    .map(c => c.name)
    .sort((a, b) => a.localeCompare(b, 'zh-CN'));
};

export const ALL_CHARACTERS = CHARACTER_DATABASE.map(c => c.name);
// 真实角色名集合（不含虚拟项），用于快速判断 character 中哪些词是真实角色
export const REAL_CHARACTERS = new Set(ALL_CHARACTERS);

/**
 * 判断一件商品是否"不含真实角色"（即角色筛选「其他」/ 角色数「其他(不含角色)」的共同标准）：
 * character 拆分后，全是系列名 / "其他" / 空（不含任何真实角色名）。
 */
export const isCharacterless = (characterField) => {
  const parts = String(characterField || '')
    .split(/[,，。、]/)
    .map(s => s.trim())
    .filter(Boolean);
  if (parts.length === 0) return true;
  return parts.every(p =>
    p === '其他' ||
    VALID_SERIES.has(p) ||
    VALID_SERIES.has(stripBrackets(p))
  );
};

/**
 * 统计商品的"偶像角色数"（用于单人/多人/其他(不含角色) 计数）：
 * 排除系列名、"其他"字串、空项，以及「其他」系列的吉祥物角色（如 天使熊/Meruli）。
 * 即 星宫莓+天使熊 → 1（单人）；星宫莓+天羽圆香+天使熊 → 2（多人）。
 */
export const countRealCharacters = (characterField) => {
  return String(characterField || '')
    .split(/[,，。、]/)
    .map(s => s.trim())
    .filter(Boolean)
    .filter(p => {
      const clean = stripBrackets(p);
      return p !== '其他'
        && !VALID_SERIES.has(p) && !VALID_SERIES.has(clean)
        && !OTHER_SERIES_CHARACTERS.has(p) && !OTHER_SERIES_CHARACTERS.has(clean);
    })
    .length;
};

// =============== 角色/系列 显示格式化 ===============
// 将 character 字符串拆分成有序去重、过滤"其他"/系列名 的真实角色名列表（用于展示）
const extractRealCharactersForDisplay = (characterField) => {
  return [...new Set(String(characterField || '')
    .split(/[,，。、]/)
    .map(s => s.trim())
    .filter(Boolean)
    .filter(p => {
      const clean = stripBrackets(p);
      return p !== '其他' && !VALID_SERIES.has(p) && !VALID_SERIES.has(clean);
    }))];
};

// 提取角色名 + 系列名以外剩余的原始标记（"其他"字串保留时）
const extractSeriesFromCharacter = (characterField) => {
  const names = String(characterField || '')
    .split(/[,，。、]/)
    .map(s => s.trim())
    .filter(Boolean);
  const result = [];
  for (const n of names) {
    const clean = stripBrackets(n);
    if (VALID_SERIES.has(n) || VALID_SERIES.has(clean)) result.push(VALID_SERIES.has(clean) ? clean : n);
    // "其他"字串不算系列，跳过
  }
  return [...new Set(result)];
};

/**
 * 卡片/弹窗/分享图用：展示"角色"标签的文字
 * - 无真实角色（characterless）: 返回系列名（从 series/computed 取，空时自动从 character 里的系列标记兜底）
 * - 有真实角色: 返回 "角色A 等N人"（forCardCompact=true）或 "A | B | C"（forCardCompact=false）
 *   forCardCompact=false 时按 separator 连接，用于详情弹窗/分享图
 */
export const formatCharacterDisplay = (characterField, seriesField, opts = {}) => {
  const { forCardCompact = false, separator = ' | ' } = opts;
  const realChars = extractRealCharactersForDisplay(characterField);
  if (realChars.length > 0) {
    if (forCardCompact) {
      if (realChars.length === 1) return realChars[0];
      return `${realChars[0]} 等${realChars.length}人`;
    }
    return realChars.join(separator);
  }
  // 无真实角色 → 显示系列名（直接显示名称本身，不出现"系列限定"/"系列"字样）
  let seriesList = [];
  if (seriesField) seriesList = String(seriesField).split(/[,，]/).map(s => s.trim()).filter(Boolean);
  if (seriesList.length === 0) seriesList = extractSeriesFromCharacter(characterField);
  // 排除 "未知" —— 那是 series 计算用的占位值，不适合展示
  seriesList = seriesList.filter(s => s !== '未知');
  if (seriesList.length === 0) {
    // 最后兜底：character 里有字的原样输出（通常是 "其他"，或其他手写标记）；完全没字才留空
    const rawParts = String(characterField || '').split(/[,，。、]/).map(s => s.trim()).filter(Boolean);
    return rawParts.join(separator) || '';
  }
  if (forCardCompact) {
    if (seriesList.length === 1) return seriesList[0];
    // 超过 2 个系列就用 "/" 紧凑拼接，避免 "等N人" / "等N系列" 语义混淆
    return seriesList.length <= 2 ? seriesList.join('/') : `${seriesList[0]}等${seriesList.length}`;
  }
  return seriesList.join(separator);
};

/** 根据输入匹配角色，支持中文名、拼音、英文romaji、别名 */
export const searchCharacters = (keyword) => {
  if (!keyword || !keyword.trim()) return [];
  const kw = keyword.toLowerCase().trim();
  return CHARACTER_DATABASE
    .filter(c => {
      if (c.name.includes(kw)) return true;
      if (c.pinyin && c.pinyin.toLowerCase().includes(kw)) return true;
      if (c.romaji && c.romaji.toLowerCase().includes(kw)) return true;
      if (c.alias && c.alias.toLowerCase().includes(kw)) return true;
      // 拼音首字母匹配 (e.g. "xgm" for "星宫莓")
      if (c.pinyin) {
        const initials = c.pinyin.replace(/[^a-z]/g, '').replace(/([a-z])[a-z]*/g, '$1');
        if (initials.includes(kw)) return true;
      }
      return false;
    })
    .map(c => c.name)
    .slice(0, 8);
};
