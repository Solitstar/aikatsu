export const SERIES_LIST = ['全部', '初代', '明代', '星代', '友代', '大游行', '行星', 'Academy'];
export const GENDER_OPTIONS = ['全部', '女', '男'];

const CHARACTER_DATABASE = [
  // 初代
  { name: '星宫莓', series: '初代', gender: '女' },
  { name: '雾矢葵', series: '初代', gender: '女' },
  { name: '紫吹兰', series: '初代', gender: '女' },
  { name: '有栖川乙女', series: '初代', gender: '女' },
  { name: '藤堂尤里卡', series: '初代', gender: '女' },
  { name: '北大路樱', series: '初代', gender: '女' },
  { name: '一之濑枫', series: '初代', gender: '女' },
  { name: '神崎美月', series: '初代', gender: '女' },
  { name: '夏树未来', series: '初代', gender: '女' },
  { name: '神谷紫苑', series: '初代', gender: '女' },
  { name: '三轮光', series: '初代', gender: '女' },
  { name: '音城塞拉', series: '初代', gender: '女' },
  { name: '冴草纪伊', series: '初代', gender: '女' },
  { name: '风沢空', series: '初代', gender: '女' },
  { name: '姬里玛利亚', series: '初代', gender: '女' },
  { name: '光石织姬', series: '初代', gender: '女' },
  { name: '星宫苹果', series: '初代', gender: '女' },
  { name: '凉川直人', series: '初代', gender: '男' },
  { name: '乔尼·别府', series: '初代', gender: '男' },

  // 明代
  { name: '大空明', series: '明代', gender: '女' },
  { name: '冰上堇', series: '明代', gender: '女' },
  { name: '新条雏姬', series: '明代', gender: '女' },
  { name: '红林珠璃', series: '明代', gender: '女' },
  { name: '黑泽凛', series: '明代', gender: '女' },
  { name: '天羽圆香', series: '明代', gender: '女' },
  { name: '大地乃野', series: '明代', gender: '女' },
  { name: '白桦丽莎', series: '明代', gender: '女' },
  { name: '堂岛妮娜', series: '明代', gender: '女' },
  { name: '服部优', series: '明代', gender: '女' },
  { name: '栗栖心音', series: '明代', gender: '女' },
  { name: '藤原雅', series: '明代', gender: '女' },
  { name: '濑名翼', series: '明代', gender: '男' },
  { name: '四叶春', series: '明代', gender: '男' },

  // 星代
  { name: '虹野梦', series: '星代', gender: '女' },
  { name: '七仓小春', series: '星代', gender: '女' },
  { name: '樱庭劳拉', series: '星代', gender: '女' },
  { name: '早乙女亚子', series: '星代', gender: '女' },
  { name: '香橙真昼', series: '星代', gender: '女' },
  { name: '花园绮罗', series: '星代', gender: '女' },
  { name: '双叶亚里亚', series: '星代', gender: '女' },
  { name: '二阶堂柚子', series: '星代', gender: '女' },
  { name: '白银莉莉', series: '星代', gender: '女' },
  { name: '骑咲礼', series: '星代', gender: '女' },
  { name: '艾尔莎·福特', series: '星代', gender: '女' },
  { name: '香橙夜空', series: '星代', gender: '女' },
  { name: '如月翼', series: '星代', gender: '女' },
  { name: '五十岚望', series: '星代', gender: '男' },
  { name: '吉良彼方', series: '星代', gender: '男' },
  { name: '结城昂', series: '星代', gender: '男' },
  { name: '香澄朝阳', series: '星代', gender: '男' },
  { name: '诸星辉', series: '星代', gender: '男' },

  // 友代
  { name: '友希爱音', series: '友代', gender: '女' },
  { name: '凌美绪', series: '友代', gender: '女' },
  { name: '蝶乃舞花', series: '友代', gender: '女' },
  { name: '日向绘麻', series: '友代', gender: '女' },
  { name: '神城卡莲', series: '友代', gender: '女' },
  { name: '明日香未来', series: '友代', gender: '女' },
  { name: '白百合咲月', series: '友代', gender: '女' },
  { name: '白百合辉月', series: '友代', gender: '女' },
  { name: '天翔响', series: '友代', gender: '女' },
  { name: '艾莉西亚·夏洛特', series: '友代', gender: '女' },
  { name: '春风若叶', series: '友代', gender: '女' },

  // 大游行
  { name: '姬石来希', series: '大游行', gender: '女' },

  // 行星
  { name: '音羽舞樱', series: '行星', gender: '女' },
  { name: '珠树琉璃', series: '行星', gender: '女' },
  { name: '梅小路响子', series: '行星', gender: '女' },
  { name: '本谷栞', series: '行星', gender: '女' },
  { name: '月城爱弓', series: '行星', gender: '女' },
  { name: '栗六杏', series: '行星', gender: '女' },
  { name: '阳明咲', series: '行星', gender: '女' },
  { name: '糸井纱良', series: '行星', gender: '女' },

  // Academy
  { name: '姫乃Mieru', series: 'Academy', gender: '女' },
  { name: '真未梦Meh', series: 'Academy', gender: '女' },
  { name: '和央Parin', series: 'Academy', gender: '女' },
  { name: '凛堂Taimu', series: 'Academy', gender: '女' },

  // 其他
  { name: '其他', series: '其他', gender: '女' },
];

export const getCharacterInfo = (name) => {
  return CHARACTER_DATABASE.find(c => c.name === name) || { series: '未知', gender: '女' };
};

export const getCharactersBySeriesAndGender = (series, gender) => {
  return CHARACTER_DATABASE.filter(c => {
    const matchSeries = series === '全部' || c.series === series;
    const matchGender = gender === '全部' || c.gender === gender;
    return matchSeries && matchGender;
  }).map(c => c.name);
};

export const ALL_CHARACTERS = CHARACTER_DATABASE.map(c => c.name);
