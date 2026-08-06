export const SERIES_LIST = ['全部', '初代', '明代', '星代', '友代', '大游行', '行星', 'Academy', '其他'];
export const GENDER_OPTIONS = ['全部', '女', '男'];

const CHARACTER_DATABASE = [
  // 初代
  { name: '星宫莓', series: '初代', gender: '女', romaji: 'Hoshimiya Ichigo', pinyin: 'xinggongmei' },
  { name: '雾矢葵', series: '初代', gender: '女', romaji: 'Kiriya Aoi', pinyin: 'wushikui' },
  { name: '紫吹兰', series: '初代', gender: '女', romaji: 'Shibuki Ran', pinyin: 'zichuilan' },
  { name: '有栖川乙女', series: '初代', gender: '女', romaji: 'Arisugawa Otome', pinyin: 'youqichuanyinv' },
  { name: '藤堂尤里卡', series: '初代', gender: '女', romaji: 'Todo Yurika', alias: '藤堂百合香', pinyin: 'tengtangyoulika' },
  { name: '北大路樱', series: '初代', gender: '女', romaji: 'Kitaoji Sakura', pinyin: 'beidaluying' },
  { name: '一之濑枫', series: '初代', gender: '女', romaji: 'Ichinose Kaede', pinyin: 'yizhilaifeng' },
  { name: '神崎美月', series: '初代', gender: '女', romaji: 'Kanzaki Mizuki', pinyin: 'shenqimeiyue' },
  { name: '夏树未来', series: '初代', gender: '女', romaji: 'Natsuki Mikuru', pinyin: 'xiashuweilai' },
  { name: '神谷紫苑', series: '初代', gender: '女', romaji: 'Kamiya Shion', pinyin: 'shenguziyuan' },
  { name: '三轮光', series: '初代', gender: '女', romaji: 'Miwa Hikari', pinyin: 'sanlunguang' },
  { name: '音城塞拉', series: '初代', gender: '女', romaji: 'Otoshiro Seira', pinyin: 'yinchengsaila' },
  { name: '音城诺艾尔', series: '初代', gender: '女', romaji: 'Otoshiro Noeru', pinyin: 'yinchengnuoai\'er' },
  { name: '冴草纪伊', series: '初代', gender: '女', romaji: 'Saegusa Kii', pinyin: 'hucaojiyi' },
  { name: '风沢空', series: '初代', gender: '女', romaji: 'Kazesawa Sora', pinyin: 'fengzekong' },
  { name: '姬里玛利亚', series: '初代', gender: '女', romaji: 'Himesato Maria', pinyin: 'jilimaliya' },
  { name: '光石织姬', series: '初代', gender: '女', romaji: 'Mitsuishi Orihime', pinyin: 'guangshizhiji' },
  { name: '星宫苹果', series: '初代', gender: '女', romaji: 'Hoshimiya Ringo', pinyin: 'xinggongpingguo' },
  { name: '星宫赖智', series: '初代', gender: '男', romaji: 'Hoshimiya Raichi', pinyin: 'xinggonglaizhi' },
  { name: '凉川直人', series: '初代', gender: '男', romaji: 'Suzukawa Naoto', pinyin: 'liangchuanzhiren' },
  { name: '乔尼·别府', series: '初代', gender: '男', romaji: 'Johnny Beppu', pinyin: 'qiaonibiefu' },
  { name: 'Hiro', series: '初代', gender: '男', romaji: 'Hiro', pinyin: 'xiluo' },
  { name: 'Shurato', series: '初代', gender: '男', romaji: 'Shurato', pinyin: 'xiulate' },
  { name: 'King', series: '初代', gender: '男', romaji: 'King', pinyin: 'king' },
  // 明代
  { name: '大空明', series: '明代', gender: '女', romaji: 'Ozora Akari', pinyin: 'dakongming' },
  { name: '冰上堇', series: '明代', gender: '女', romaji: 'Hikami Sumire', pinyin: 'bingshangjin' },
  { name: '新条雏姬', series: '明代', gender: '女', romaji: 'Shinjo Hinaki', pinyin: 'xintiaochuji' },
  { name: '红林珠璃', series: '明代', gender: '女', romaji: 'Kurebayashi Juri', pinyin: 'honglinzhuli' },
  { name: '黑泽凛', series: '明代', gender: '女', romaji: 'Kurosawa Rin', pinyin: 'heizelin' },
  { name: '天羽圆香', series: '明代', gender: '女', romaji: 'Amahane Madoka', pinyin: 'tianyuyuanxiang' },
  { name: '大地乃野', series: '明代', gender: '女', romaji: 'Daichi Nono', pinyin: 'dadinaiye' },
  { name: '白桦丽莎', series: '明代', gender: '女', romaji: 'Shirakaba Risa', pinyin: 'baihualisha' },
  { name: '堂岛妮娜', series: '明代', gender: '女', romaji: 'Dojima Nina', pinyin: 'tangdaoninna' },
  { name: '服部优', series: '明代', gender: '女', romaji: 'Hattori Yu', pinyin: 'fubuyou' },
  { name: '栗栖心音', series: '明代', gender: '女', romaji: 'Kurisu Kokone', pinyin: 'lixixinyin' },
  { name: '藤原雅', series: '明代', gender: '女', romaji: 'Fujiwara Miyabi', pinyin: 'tengyuanya' },
  { name: '濑名翼', series: '明代', gender: '男', romaji: 'Sena Tsubasa', pinyin: 'laimingyi' },
  { name: '四叶春', series: '明代', gender: '男', romaji: 'Yotsuba Haru', pinyin: 'siyechun' },
  { name: '波间照南', series: '明代', gender: '女', romaji: 'Minami Hateruma', pinyin: 'bojianzhaonan' },

  // 星代（Star）
  { name: '虹野梦', series: '星代', gender: '女', romaji: 'Nijino Yume', pinyin: 'hongyemeng' },
  { name: '七仓小春', series: '星代', gender: '女', romaji: 'Nanakura Koharu', pinyin: 'qicangxiaochun' },
  { name: '樱庭劳拉', series: '星代', gender: '女', romaji: 'Sakuraba Laura', pinyin: 'yingtinglaola' },
  { name: '早乙女亚子', series: '星代', gender: '女', romaji: 'Saotome Ako', pinyin: 'zaoyinv\'azi' },
  { name: '香澄真昼', series: '星代', gender: '女', romaji: 'Kasumi Mahiru', pinyin: 'xiangchengzhenzhou' },
  { name: '花园绮罗', series: '星代', gender: '女', romaji: 'Hanazono Kira', pinyin: 'huayuanyiluo' },
  { name: '双叶亚里亚', series: '星代', gender: '女', romaji: 'Futaba Aria', pinyin: 'shuangyeyaliya' },
  { name: '二阶堂柚子', series: '星代', gender: '女', romaji: 'Nikaido Yuzu', pinyin: 'erjietangyouzi' },
  { name: '白银莉莉', series: '星代', gender: '女', romaji: 'Shirogane Lily', pinyin: 'baiyinlili' },
  { name: '骑咲礼', series: '星代', gender: '女', romaji: 'Kizaki Rei', pinyin: 'qixiaoli' },
  { name: '艾尔莎·福特', series: '星代', gender: '女', romaji: 'Elsa Forte', pinyin: 'ai\'ershafute' },
  { name: '香澄夜空', series: '星代', gender: '女', romaji: 'Kasumi Yozora', pinyin: 'xiangchengyekong' },
  { name: '如月翼', series: '星代', gender: '女', romaji: 'Kisaragi Tsubasa', pinyin: 'ruyueyi' },
  { name: '晴香露卡', series: '星代', gender: '女', romaji: 'Haruka Luca', pinyin: 'qingxiangluka' },
  { name: '五十岚望', series: '星代', gender: '男', romaji: 'Igarashi Nozomi', pinyin: 'wushilanwang' },
  { name: '吉良彼方', series: '星代', gender: '男', romaji: 'Kira Kanata', pinyin: 'jiliangbifang' },
  { name: '结城昂', series: '星代', gender: '男', romaji: 'Yuki Subaru', pinyin: 'jiechengang' },
  { name: '香澄朝阳', series: '星代', gender: '男', romaji: 'Kasumi Asahi', pinyin: 'xiangchengchaoyang' },
  { name: '诸星辉', series: '星代', gender: '男', romaji: 'Moroboshi Hikaru', pinyin: 'zhuxinghui' },
  { name: '白鸟姬', series: '星代', gender: '女', romaji: 'Shiratori Hime', pinyin: 'bainiaoji' },

  // 友代(Friends)
  { name: '友希爱音', series: '友代', gender: '女', romaji: 'Yuki Aine', pinyin: 'youxiaiyin' },
  { name: '凑美绪', series: '友代', gender: '女', romaji: 'Minato Mio', pinyin: 'coumeixu' },
  { name: '蝶乃舞花', series: '友代', gender: '女', romaji: 'Chono Maika', pinyin: 'dienaiwuhua' },
  { name: '日向绘麻', series: '友代', gender: '女', romaji: 'Hyuga Ema', pinyin: 'rixianghuima' },
  { name: '神城卡莲', series: '友代', gender: '女', romaji: 'Kamishiro Karen', pinyin: 'shenchengkalian' },
  { name: '明日香未来', series: '友代', gender: '女', romaji: 'Asuka Mirai', pinyin: 'mingrixiangweilai' },
  { name: '白百合辉夜', series: '友代', gender: '女', romaji: 'Shirayuri Kaguya', pinyin: 'baibaihehuiye' },
  { name: '白百合咲夜', series: '友代', gender: '女', romaji: 'Shirayuri Sakuya', pinyin: 'baibaihexiaoye' },
  { name: '天翔响', series: '友代', gender: '女', romaji: 'Tensho Hibiki', pinyin: 'tianxiangxiang' },
  { name: '艾莉西亚·夏洛特', series: '友代', gender: '女', romaji: 'Alicia Charlotte', pinyin: 'ailixiyaxialuote' },
  { name: '春风若叶', series: '友代', gender: '女', romaji: 'Harukaze Wakaba', pinyin: 'chunfengruoye' },
  { name: '玉置可可', series: '友代', gender: '女', romaji: 'Coco', pinyin: 'yuzhikeke' },
  { name: '新海琳娜', series: '友代', gender: '女', romaji: 'Shinkai Rinna', pinyin: 'xinhailinna' },
  { name: '真波玛琳', series: '友代', gender: '女', romaji: 'Mamime Meh', pinyin: 'zhenbomalin' },
  // 大游行(On Parade)
  { name: '姬石来希', series: '大游行', gender: '女', romaji: 'Kiseki Raki', pinyin: 'jishilaixi' },

  // 行星(Planet)
  { name: '音羽舞樱', series: '行星', gender: '女', romaji: 'Otowa Mao', alias: 'Hana', pinyin: 'yinyuwuying' },
  { name: '珠树琉璃', series: '行星', gender: '女', romaji: 'Tamaki Ruri', alias: 'Ruli', pinyin: 'zhushuliuli' },
  { name: '梅小路响子', series: '行星', gender: '女', romaji: 'Umekoji Kyoko', alias: 'Beat', pinyin: 'meixiaoluxiangzi' },
  { name: '本谷栞', series: '行星', gender: '女', romaji: 'Motoya Shiori', alias: 'Shiori', pinyin: 'bengukan' },
  { name: '月城爱弓', series: '行星', gender: '女', romaji: 'Tsukishiro Ayumi', alias: 'Q-Pit', pinyin: 'yuechengaigong' },
  { name: '栗六杏', series: '行星', gender: '女', romaji: 'Kurimu An', alias: 'Ann', pinyin: 'liliuxing' },
  { name: '阳明咲', series: '行星', gender: '女', romaji: 'Yomei Saki', alias: 'Rose', pinyin: 'yangmingxiao' },
  { name: '糸井纱良', series: '行星', gender: '女', romaji: 'Itoi Sara', alias: 'Sala', pinyin: 'mijingshaliang' },

  // Academy
  { name: '姫乃Mieru', series: 'Academy', gender: '女', romaji: 'Himeno Mieru', pinyin: 'jinaimieru' },
  { name: '真未梦Meh', series: 'Academy', gender: '女', romaji: 'Mamime Meh', pinyin: 'zhenweimengmeh' },
  { name: '和央Parin', series: 'Academy', gender: '女', romaji: 'Wao Parin', pinyin: 'heyangparin' },
  { name: '凛堂Taimu', series: 'Academy', gender: '女', romaji: 'Rindo Taimu', pinyin: 'lintangtaimu' },

  // 其他
  { name: '其他', series: '其他', gender: '女，男', romaji: '', pinyin: 'qita' },
];

export const getCharacterInfo = (name) => {
  const clean = name.replace(/[\(（][^\)）]*[\)）]/, '').trim();
  return CHARACTER_DATABASE.find(c => c.name === name || c.name === clean) || { series: '未知', gender: '男，女', romaji: '', alias: '', pinyin: '' };
};

export const getCharactersBySeriesAndGender = (series, gender) => {
  return CHARACTER_DATABASE.filter(c => {
    const matchSeries = series === '全部' || c.series === series;
    const matchGender = gender === '全部' || c.gender === gender;
    return matchSeries && matchGender;
  })
    .map(c => c.name)
    .sort((a, b) => a.localeCompare(b, 'zh-CN'));
};

export const ALL_CHARACTERS = CHARACTER_DATABASE.map(c => c.name);

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
