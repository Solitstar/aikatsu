export const SERIES_LIST = ['全部', '初代', '明代', '星代', '友代', '大游行', '行星', 'Academy', '其他'];
export const GENDER_OPTIONS = ['全部', '女', '男'];

const CHARACTER_DATABASE = [
  // 初代
  { name: '星宫莓', series: '初代', gender: '女', romaji: 'Hoshimiya Ichigo' },
  { name: '雾矢葵', series: '初代', gender: '女', romaji: 'Kiriya Aoi' },
  { name: '紫吹兰', series: '初代', gender: '女', romaji: 'Shibuki Ran' },
  { name: '有栖川乙女', series: '初代', gender: '女', romaji: 'Arisugawa Otome' },
  { name: '藤堂尤里卡', series: '初代', gender: '女', romaji: 'Todo Yurika' },
  { name: '北大路樱', series: '初代', gender: '女', romaji: 'Kitaoji Sakura' },
  { name: '一之濑枫', series: '初代', gender: '女', romaji: 'Ichinose Kaede' },
  { name: '神崎美月', series: '初代', gender: '女', romaji: 'Kanzaki Mizuki' },
  { name: '夏树未来', series: '初代', gender: '女', romaji: 'Natsuki Mikuru' },
  { name: '神谷紫苑', series: '初代', gender: '女', romaji: 'Kamiya Shion' },
  { name: '三轮光', series: '初代', gender: '女', romaji: 'Miwa Hikari' },
  { name: '音城塞拉', series: '初代', gender: '女', romaji: 'Otoshiro Seira' },
  { name: '音城诺艾尔', series: '初代', gender: '女', romaji: 'Otoshiro Noeru' },
  { name: '冴草纪伊', series: '初代', gender: '女', romaji: 'Saegusa Kii' },
  { name: '风沢空', series: '初代', gender: '女', romaji: 'Kazesawa Sora' },
  { name: '姬里玛利亚', series: '初代', gender: '女', romaji: 'Himesato Maria' },
  { name: '光石织姬', series: '初代', gender: '女', romaji: 'Mitsuishi Orihime' },
  { name: '星宫苹果', series: '初代', gender: '女', romaji: 'Hoshimiya Ringo' },
  { name: '凉川直人', series: '初代', gender: '男', romaji: 'Suzukawa Naoto' },
  { name: '乔尼·别府', series: '初代', gender: '男', romaji: 'Johnny Beppu' },

  // 明代
  { name: '大空明', series: '明代', gender: '女', romaji: 'Ozora Akari' },
  { name: '冰上堇', series: '明代', gender: '女', romaji: 'Hikami Sumire' },
  { name: '新条雏姬', series: '明代', gender: '女', romaji: 'Shinjo Hinaki' },
  { name: '红林珠璃', series: '明代', gender: '女', romaji: 'Kurebayashi Juri' },
  { name: '黑泽凛', series: '明代', gender: '女', romaji: 'Kurosawa Rin' },
  { name: '天羽圆香', series: '明代', gender: '女', romaji: 'Amahane Madoka' },
  { name: '大地乃野', series: '明代', gender: '女', romaji: 'Daichi Nono' },
  { name: '白桦丽莎', series: '明代', gender: '女', romaji: 'Shirakaba Risa' },
  { name: '堂岛妮娜', series: '明代', gender: '女', romaji: 'Dojima Nina' },
  { name: '服部优', series: '明代', gender: '女', romaji: 'Hattori Yu' },
  { name: '栗栖心音', series: '明代', gender: '女', romaji: 'Kurisu Kokone' },
  { name: '藤原雅', series: '明代', gender: '女', romaji: 'Fujiwara Miyabi' },
  { name: '濑名翼', series: '明代', gender: '男', romaji: 'Sena Tsubasa' },
  { name: '四叶春', series: '明代', gender: '男', romaji: 'Yotsuba Haru' },

  // 星代（Star）
  { name: '虹野梦', series: '星代', gender: '女', romaji: 'Nijino Yume' },
  { name: '七仓小春', series: '星代', gender: '女', romaji: 'Nanakura Koharu' },
  { name: '樱庭劳拉', series: '星代', gender: '女', romaji: 'Sakuraba Laura' },
  { name: '早乙女亚子', series: '星代', gender: '女', romaji: 'Saotome Ako' },
  { name: '香橙真昼', series: '星代', gender: '女', romaji: 'Kozue Mahiru' },
  { name: '花园绮罗', series: '星代', gender: '女', romaji: 'Hanazono Kira' },
  { name: '双叶亚里亚', series: '星代', gender: '女', romaji: 'Futaba Aria' },
  { name: '二阶堂柚子', series: '星代', gender: '女', romaji: 'Nikaido Yuzu' },
  { name: '白银莉莉', series: '星代', gender: '女', romaji: 'Shirogane Lily' },
  { name: '骑咲礼', series: '星代', gender: '女', romaji: 'Kizaki Rei' },
  { name: '艾尔莎·福特', series: '星代', gender: '女', romaji: 'Elsa Forte' },
  { name: '香橙夜空', series: '星代', gender: '女', romaji: 'Kozue Yozora' },
  { name: '如月翼', series: '星代', gender: '女', romaji: 'Kisaragi Tsubasa' },
  { name: '晴香露卡', series: '星代', gender: '女', romaji: 'Haruka Luca‌（' },
  { name: '五十岚望', series: '星代', gender: '男', romaji: 'Igarashi Nozomi' },
  { name: '吉良彼方', series: '星代', gender: '男', romaji: 'Kira Kanata' },
  { name: '结城昂', series: '星代', gender: '男', romaji: 'Yuki Subaru' },
  { name: '香澄朝阳', series: '星代', gender: '男', romaji: 'Kasumi Asahi' },
  { name: '诸星辉', series: '星代', gender: '男', romaji: 'Moroboshi Hikaru' },

  // 友代(Friends)
  { name: '友希爱音', series: '友代', gender: '女', romaji: 'Yuki Aine' },
  { name: '凌美绪', series: '友代', gender: '女', romaji: 'Ryo Mio' },
  { name: '蝶乃舞花', series: '友代', gender: '女', romaji: 'Chono Maika' },
  { name: '日向绘麻', series: '友代', gender: '女', romaji: 'Hyuga Ema' },
  { name: '神城卡莲', series: '友代', gender: '女', romaji: 'Kamishiro Karen' },
  { name: '明日香未来', series: '友代', gender: '女', romaji: 'Asuka Mirai' },
  { name: '白百合咲月', series: '友代', gender: '女', romaji: 'Shirayuri Satsuki' },
  { name: '白百合辉月', series: '友代', gender: '女', romaji: 'Shirayuri Kizuki' },
  { name: '天翔响', series: '友代', gender: '女', romaji: 'Tensho Hibiki' },
  { name: '艾莉西亚·夏洛特', series: '友代', gender: '女', romaji: 'Alicia Charlotte' },
  { name: '春风若叶', series: '友代', gender: '女', romaji: 'Harukaze Wakaba' },

  // 大游行(On Prade)
  { name: '姬石来希', series: '大游行', gender: '女', romaji: 'Kiseki Raki' },

  // 行星(Planet)
  { name: '音羽舞樱', series: '行星', gender: '女', romaji: 'Otowa Mao' },
  { name: '珠树琉璃', series: '行星', gender: '女', romaji: 'Tamaki Ruri' },
  { name: '梅小路响子', series: '行星', gender: '女', romaji: 'Umekoji Kyoko' },
  { name: '本谷栞', series: '行星', gender: '女', romaji: 'Motoya Shiori' },
  { name: '月城爱弓', series: '行星', gender: '女', romaji: 'Tsukishiro Ayumi' },
  { name: '栗六杏', series: '行星', gender: '女', romaji: 'Kurimu An' },
  { name: '阳明咲', series: '行星', gender: '女', romaji: 'Yomei Saki' },
  { name: '糸井纱良', series: '行星', gender: '女', romaji: 'Itoi Sara' },

  // Academy
  { name: '姫乃Mieru', series: 'Academy', gender: '女', romaji: 'Himeno Mieru' },
  { name: '真未梦Meh', series: 'Academy', gender: '女', romaji: 'Mamime Meh' },
  { name: '和央Parin', series: 'Academy', gender: '女', romaji: 'Wao Parin' },
  { name: '凛堂Taimu', series: 'Academy', gender: '女', romaji: 'Rindo Taimu' },

  // 其他
  { name: '其他', series: '其他', gender: '女，男', romaji: '' },
];

export const getCharacterInfo = (name) => {
  return CHARACTER_DATABASE.find(c => c.name === name) || { series: '未知', gender: '女', romaji: '' };
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
