import { getCharacterInfo } from './characters';

/**
 * 可选角色名（方便复制粘贴）：
 *   初代: 星宫莓 雾矢葵 紫吹兰 有栖川乙女 藤堂尤里卡 北大路樱 一之濑枫 神崎美月 夏树未来 神谷紫苑 三轮光 音城塞拉 音城诺艾尔 冴草纪伊 风沢空 姬里玛利亚 光石织姬 星宫苹果 星宫赖智 凉川直人 乔尼·别府
 *   明代: 大空明 冰上堇 新条雏姬 红林珠璃 黑泽凛 天羽圆香 大地乃野 白桦丽莎 堂岛妮娜 服部优 栗栖心音 藤原雅 濑名翼 四叶春
 *   星代: 虹野梦 七仓小春 樱庭劳拉 早乙女亚子 香澄真昼 花园绮罗 双叶亚里亚 二阶堂柚子 白银莉莉 骑咲礼 艾尔莎·福特 香澄夜空 如月翼 晴香露卡 五十岚望 吉良彼方 结城昂 香澄朝阳 诸星辉
 *   友代: 友希爱音 凑美绪 蝶乃舞花 日向绘麻 神城卡莲 明日香未来 白百合辉夜 白百合咲夜 天翔响 艾莉西亚·夏洛特 春风若叶
 *   大游行: 姬石来希
 *   行星: 音羽舞樱 珠树琉璃 梅小路响子 本谷栞 月城爱弓 栗六杏 阳明咲 糸井纱良
 *   Academy: 姫乃Mieru 真未梦Meh 和央Parin 凛堂Taimu
 *   其他: 其他
 */

export const BASE_ITEMS = [
  {
    id: 1,
    name: "DMM抽赏徽章",
    subtitle: "アイカツ！ DMMスクラッチくじ 缶バッジ",
    character: "星宫莓",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://imgbed.heliar.top/i/5_zGTYEL-iAR4PHh?thumb=1"
  },
  {
    id: 2,
    name: "全息Live会场限定徽章",
    subtitle: "アイカツ！ Liveイリュージョン 缶バッジセット 会場限定",
    character: "夏树未来,有栖川乙女,一之濑枫,冴草纪伊",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://imgbed.heliar.top/i/PHiW8aNtYSuvuiNu?thumb=1"
  },
  {
    id: 3,
    name: "全息Live会场限定徽章",
    subtitle: "アイカツ！ Liveイリュージョン 缶バッジセット 会場限定",
    character: "雾矢葵,藤堂尤里卡,音城塞拉",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://imgbed.heliar.top/i/eqofr6OrOwFnm_RL?thumb=1"
  },
  {
    id: 4,
    name: "全息Live会场限定徽章",
    subtitle: "アイカツ！ Liveイリュージョン 缶バッジセット 会場限定",
    character: "紫吹兰,神崎美月,风沢空",
    type: "徽章",
    size: "直径约 40 mm",
    image: "https://imgbed.heliar.top/i/p-ZtVlx2wgy3iNj8?thumb=1"
  },
  {
    id: 5,
   name: "全息Live会场限定徽章",
    subtitle: "アイカツ！ Liveイリュージョン 缶バッジセット 会場限定",
    character: "星宫莓,大空明,姬里玛利亚,北大路樱",
    type: "徽章",
    size: "直径约 40 mm",
    image: "https://imgbed.heliar.top/i/9uy0ubhDCYivMowj?thumb=1"
  },
  {
    id: 6,
    name: "全息Live会场限定徽章",
    subtitle: "アイカツ！ Liveイリュージョン 缶バッジセット 会場限定",
    character: "其他",
    type: "徽章",
    size: "直径约 75mm",
    image: "https://imgbed.heliar.top/i/yeeoBhf9qSmloq8J?thumb=1"
  },
  {
    id: 7,
    name: "2015Live徽章",
    subtitle: "アイカツ！ スターアニス 2015年 ジャケバッチ ",
    character: "其他",
    type: "徽章",
    size: "约 40mm",
    image: "https://imgbed.heliar.top/i/6hzo8WOeTxB4DQbh?thumb=1"
  },
  {
    id: 8,
    name: "2016Live徽章",
    subtitle: "アイカツ！ ミュージックフェスタ2016 缶バッジ ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://imgbed.heliar.top/i/GKJ6M-5Wz0Qla5LU?thumb=1"
  },
  {
    id:9,
    name: "2017Live徽章",
    subtitle: "アイカツ！ ミュージックフェスタ2017 缶バッジ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://imgbed.heliar.top/i/ler-V07WQNGTSrCf?thumb=1"
  },
  {
    id: 10,
    name: "武道馆Live徽章",
    subtitle: "アイカツ！ミュージックフェスタ in アイカツ武道館 缶バッジ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://imgbed.heliar.top/i/E2dVUb09HVYQpYMh?thumb=1"
  },
  {
    id: 11,
    name: "大游行Live徽章",
    subtitle: "アイカツオンパレード！ユニットライブツアー ユニパレ！ 缶バッジ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://imgbed.heliar.top/i/Z9o1nhAf_2M-UDS4?thumb=1"
  },
  {
    id: 12,
    name: "友代Live徽章",
    subtitle: "BEST FRIENDS！ スペシャルLIVE ～Thanks⇄OK～ 缶バッジ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://imgbed.heliar.top/i/aeQoZdnzGId4FpcW?thumb=1"
  },
  {
    id: 13,
    name: "Vivid Kiss品牌徽章",
    subtitle: "アイカツ！ デザインマート Vivid Kiss 缶バッジ",
    character: "其他,夏树未来,新条雏姬",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/rY4UOZbD2NALKZVQ?thumb=1"
  },
  {
    id: 14,
    name: "Vivid Kiss品牌徽章",
    subtitle: "アイカツ！ デザインマート Vivid Kiss 缶バッジ",
    character: "其他,夏树未来,新条雏姬",
    type: "徽章",
    size: "直径约 30mm",
    image: "https://imgbed.heliar.top/i/-Tb-Gqx64XJFJokF?thumb=1"
  },
  {
    id: 15,
    name: "WM组合徽章",
    subtitle: "WM ユニットおうえんグッズセット 「アイカツ! AIKATSU! STYLE」 缶バッジ",
    character: "其他,夏树未来,神崎美月",
    type: "徽章",
    size: "直径约 75mm",
    image: "https://imgbed.heliar.top/i/Y_rIYYrLNjtYL18p?thumb=1"
  },
  {
    id: 16,
    name: "布艺(食玩)徽章",
    subtitle: "アイカツ！ワッペン缶バッジ ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://imgbed.heliar.top/i/jDeG5dOtDPDBU1bn?thumb=1"
  },
  {
    id: 17,
    name: "布艺(食玩)徽章",
    subtitle: "アイカツ！ワッペン缶バッジ",
    character: "星宫莓,雾矢葵,紫吹兰,有栖川乙女,藤堂尤里卡,北大路樱,一之濑枫,神崎美月",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://imgbed.heliar.top/i/m9-WYFdp2a4oQHeI?thumb=1"
  },
  {
    id: 19,
    name: "布艺(食玩)徽章",
    subtitle: "アイカツ！ ワッペン缶バッジ",
    character: "星宫莓",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://imgbed.heliar.top/i/BPv54i1CV2ShBFJH?thumb=1"
    },
  {
    id: 18,
    name: "布艺(食玩)徽章",
    subtitle: "アイカツ！ ワッペン缶バッジ ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://imgbed.heliar.top/i/ojNxOlu7wXnX09U2?thumb=1"
  },
  {
    id: 20,
    name: "2018Live徽章",
    subtitle: "AIKATSU☆STARS Special Live Tour MUSIC of DREAM!!缶バッジ ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://imgbed.heliar.top/i/AFToGJs_2ECk6_Y4?thumb=1"
  },
  {
    id: 21,
    name: "布艺(食玩)徽章",
    subtitle: "アイカツ！ ワッペン缶バッジ ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://imgbed.heliar.top/i/ycE8VkL84mtbLICR?thumb=1"
  },
  {
    id: 22,
    name: "布艺(食玩)徽章",
    subtitle: "アイカツ！ ワッペン缶バッジ ",
    character: "星宫莓,紫吹兰",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://imgbed.heliar.top/i/bFh5q3lIfnfyl6p4?thumb=1"
  },
  {
    id: 23,
    name: "布艺(食玩)徽章",
    subtitle: "アイカツ！ ワッペン缶バッジ ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://imgbed.heliar.top/i/fPPaAJVmHUcea6OB?thumb=1"
  },
  {
    id: 24,
    name: "布艺(食玩)徽章",
    subtitle: "アイカツ！ ワッペン缶バッジ ",
    character: "星宫莓,雾矢葵,紫吹兰",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://imgbed.heliar.top/i/ceyhDXPvmmiLPCPr?thumb=1"
  },
  {
    id: 25,
    name: "海景布徽章(初版)",
    subtitle: "アイカツ！ メモリアルハンカチセット 缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 44mm",
    image: "https://imgbed.heliar.top/i/nxD8t9RzgkdU60Wt?thumb=1"
  },
  {
    id: 26,
     name: "海景布徽章(再贩)",
    subtitle: "アイカツ！ メモリアルハンカチセット 缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 44mm",
    image: "https://imgbed.heliar.top/i/4Yn0UVSOXwRH99Ew?thumb=1"
  },
  {
    id: 27,
    name: "格言生日(满赠)徽章",
    subtitle: "アイカツ！スタイル バースデー缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 44mm",
    image: "https://imgbed.heliar.top/i/mf9ak-KridTUl_Hc?thumb=1"
  },
  {
    id: 28,
    name: "生日1弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <7月~8月>",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/pO698USquT6DL_lP?thumb=1"
  },
  {
    id: 29,
    name: "生日2弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <7月~8月>",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/AseYvebWfeXnPqwl.png"
  },
  {
    id: 30,
    name: "生日3弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season3 <7月~8月>",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/kTdCeOBirJZ15jnC?thumb=1"
  },
  {
    id: 31,
    name: "AVIOT耳机联动",
    subtitle: "AVIOT アイカツ！ イヤホン 缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/uRLJG98NM0UKS8un?thumb=1"
  },
  {
    id: 32,
    name: "沙滩徽章",
    subtitle: "アイカツ！ Canバッジ54",
    character: "夏树未来，神崎美月",
    type: "徽章",
    size: "直径约 54mm",
    image: "https://imgbed.heliar.top/i/bi6zSoK81SjzP8jy?thumb=1"
  },
  {
    id: 33,
    name: "沙滩徽章",
    subtitle: "アイカツ！ Canバッジ54",
    character: "星宫莓",
    type: "徽章",
    size: "直径约 54mm",
    image: "https://imgbed.heliar.top/i/p_D2pgtOEAkzoXP2?thumb=1"
  },
  {
    id: 34,
    name: "沙滩徽章",
    subtitle: "アイカツ！ Canバッジ54",
    character: "雾矢葵",
    type: "徽章",
    size: "直径约 54mm",
    image: "https://imgbed.heliar.top/i/-LCFMux8QhuDPUCd.png"
  },
  {
    id: 35,
    name: "沙滩徽章",
    subtitle: "アイカツ！ Canバッジ54",
    character: "紫吹兰",
    type: "徽章",
    size: "直径约 54mm",
    image: "https://imgbed.heliar.top/i/2swVobhcJ4WkAb6V.png"
  },
  {
    id: 36,
    name: "沙滩徽章",
    subtitle: "アイカツ！ Canバッジ54",
    character: "藤堂尤里卡,一之濑枫",
    type: "徽章",
    size: "直径约 54mm",
    image: "https://imgbed.heliar.top/i/rXH7YByqIhPah34j.png"
  },
  {
    id: 37,
    name: "沙滩徽章",
    subtitle: "アイカツ！ Canバッジ54",
    character: "冰上堇",
    type: "徽章",
    size: "直径约 54mm",
    image: "https://imgbed.heliar.top/i/Dy0kRXiXFnVmb9Ps.png"
  },
  {
    id: 38,
    name: "沙滩徽章",
    subtitle: "アイカツ！ Canバッジ54",
    character: "大空明",
    type: "徽章",
    size: "直径约 54mm",
    image: "https://imgbed.heliar.top/i/s9H7jsorxTrJRjRh.png"
  },
  {
    id: 39,
    name: "沙滩徽章",
    subtitle: "アイカツ！ Canバッジ54",
    character: "有栖川乙女,北大路樱,神谷紫苑,大地乃野,白桦丽莎",
    type: "徽章",
    size: "直径约 54mm",
    image: "https://imgbed.heliar.top/i/lcHaW6ENSTEtTlpm.png"
  },
  {
    id: 40,
    name: "沙滩徽章",
    subtitle: "アイカツ！ Canバッジ54",
    character: "新条雏姬",
    type: "徽章",
    size: "直径约 54mm",
    image: "https://imgbed.heliar.top/i/g_QxaRXJmmoHGPMa.png"
  },
  {
    id: 41,
    name: "沙滩徽章",
    subtitle: "アイカツ！ Canバッジ54",
    character: "红林珠璃",
    type: "徽章",
    size: "直径约 54mm",
    image: "https://imgbed.heliar.top/i/012q4D47ffbQbsAg.png"
  },
  {
    id: 42,
    name: "沙滩徽章",
    subtitle: "アイカツ！ Canバッジ54",
    character: "黑泽凛,天羽圆香",
    type: "徽章",
    size: "直径约 54mm",
    image: "https://imgbed.heliar.top/i/-uKlMrOoaOoCKr6-.png"
  },
  {
    id: 43,
    name: "沙滩徽章",
    subtitle: "アイカツ！ Canバッジ54",
    character: "服部优,堂岛妮娜,栗栖心音,藤原雅",
    type: "徽章",
    size: "直径约 54mm",
    image: "https://imgbed.heliar.top/i/aJwFHHGr9JRII-mS.png"
  },
  {
    id: 44,
    name: "沙滩徽章",
    subtitle: "アイカツ！ Canバッジ54",
    character: "音城塞拉,冴草纪伊,风沢空,姬里玛利亚,音城诺艾尔",
    type: "徽章",
    size: "直径约 54mm",
    image: "https://imgbed.heliar.top/i/7LYffjCRu0VX0ffO.png"
  },
  {
    id: 45,
    name: "沙滩徽章",
    subtitle: "アイカツ！ Canバッジ54",
    character: "星宫苹果,星宫赖智,光石织姬",
    type: "徽章",
    size: "直径约 54mm",
    image: "https://imgbed.heliar.top/i/iXu5kMASGglcICkt.png"
  },
  {
    id: 46,
    name: "沙滩徽章",
    subtitle: "アイカツ！ Canバッジ54",
    character: "凉川直人,乔尼·别府,濑名翼,四叶春",
    type: "徽章",
    size: "直径约 54mm",
    image: "https://imgbed.heliar.top/i/nxpAS2EvFbIzF9rs.png"
  },
  {
    id: 47,
    name: "生日1弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <7月~8月>",
    character: "阳明咲(Rose)",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/AZQ1rev1CMfRZ-YK.png"
  },
  {
    id: 48,
    name: "生日1弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <7月~8月>",
    character: "服部优",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/-5qZse47aCGXX-NX.png"
  },
  {
    id: 49,
    name: "生日1弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <7月~8月>",
    character: "友希爱音",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/eVEfH4KVexZwXSvk.png"
  },
  {
    id: 50,
    name: "生日1弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <7月~8月>",
    character: "紫吹兰",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/_Cs9DFGR07KY8LVQ.png"
  },
  {
    id: 51,
    name: "生日1弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <7月~8月>",
    character: "艾尔莎·福特",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/AIN4FHY8m2qjKiF3.png"
  },
  {
    id: 52,
    name: "生日1弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <7月~8月>",
    character: "红林珠璃",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/tpmYJ7RoNQwdUFHN.png"
  },
  {
    id: 53,
    name: "生日1弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <7月~8月>",
    character: "栗栖心音",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/Q51fJ5g3mmHmXuJr.png"
  },
  {
    id: 54,
    name: "生日1弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <7月~8月>",
    character: "晴香露卡",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/71z0ETumu6wnNeN0.png"
  },
  {
    id: 55,
    name: "生日1弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <7月~8月>",
    character: "蝶乃舞花",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/SKMiTOr7EYEBhyVZ.png"
  },
  {
    id: 56,
    name: "生日1弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <7月~8月>",
    character: "如月翼",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/png8Fn4E4qFtIjcp.png"
  },
  {
    id: 57,
    name: "生日1弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <5月~6月>",
    character: "有栖川乙女",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/KtDr3GJukBgsyICq.png"
  },
  {
    id: 58,
    name: "生日1弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <5月~6月>",
    character: "香澄夜空",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/LYgJZ2-qKxphNZGN.png"
  },
  {
    id: 59,
    name: "生日1弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <5月~6月>",
    character: "骑咲礼",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/22rjFUtomsb4U1QO.png"
  },
  {
    id: 60,
    name: "生日1弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <5月~6月>",
    character: "明日香未来",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/LxEqrdH4k7KslMRI.png"
  },
  {
    id: 61,
    name: "生日1弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <5月~6月>",
    character: "二阶堂柚子",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/exxAoIYgNntFk-sd.png"
  },
  {
    id: 62,
    name: "生日1弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <5月~6月>",
    character: "新条雏姬",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/_tsjuqOeoiWSh_Ej.png"
  },
  {
    id: 63,
    name: "生日1弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <5月~6月>",
    character: "珠树琉璃",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/E-E5MFGIWqVpG8FL.png"
  },
  {
    id: 64,
    name: "生日1弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <5月~6月>",
    character: "天翔响",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/CNRXIQww-5nPBAJg.png"
  },
  {
    id: 65,
    name: "生日1弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <5月~6月>",
    character: "白百合辉夜,白百合咲夜",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/ihZA9ubGCAH-9uHj.png"
  },
  {
    id: 66,
    name: "生日1弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <5月~6月>",
    character: "白百合辉夜,白百合咲夜",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/hZ_t44Y_lt-jyar_.png"
  },
  {
    id: 67,
    name: "生日1弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <5月~6月>",
    character: "糸井纱良",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/UBRe4syW4ab-T309.png"
  },
  {
    id: 68,
    name: "生日1弹徽章<9月~10月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <9月~10月>",
    character: "春风若叶",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/ljA2NrlyvECZzz4H.png"
  },
  {
    id: 69,
    name: "生日1弹徽章<9月~10月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <9月~10月>",
    character: "藤原雅",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/3kZh2CUwWs7nK5Tu.png"
  },
  {
    id: 70,
    name: "生日1弹徽章<9月~10月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <9月~10月>",
    character: "神崎美月",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/A-Ac_UfUubqzeScR.png"
  },
  {
    id: 71,
    name: "生日1弹徽章<9月~10月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <9月~10月>",
    character: "早乙女亚子",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/0CGpbOMfZ_zq_N21.png"
  },
  {
    id: 72,
    name: "生日1弹徽章<9月~10月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <9月~10月>",
    character: "香澄真昼",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/gzhL2q95KACnIoop.png"
  },
  {
    id: 73,
    name: "生日1弹徽章<9月~10月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <9月~10月>",
    character: "冰上堇",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/RtXxXtvnuHS8knYH.png"
  },
  {
    id: 74,
    name: "生日1弹徽章<9月~10月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <9月~10月>",
    character: "神城卡莲",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/MVeJI6Wbs1jkngAV.png"
  },
  {
    id: 75,
    name: "生日1弹徽章<9月~10月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <9月~10月>",
    character: "风沢空",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/7nqO7ad7oudTy60x.png"
  },
  {
    id: 76,
    name: "生日1弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <11月~12月>",
    character: "樱庭劳拉",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/8mi7_yj86Cvmqr4w.png"
  },
  {
    id: 77,
    name: "生日1弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <11月~12月>",
    character: "音城塞拉",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/18GV_thQOX-dx8qK.png"
  },
  {
    id: 78,
    name: "生日1弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <11月~12月>",
    character: "凉川直人",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/In8QmfHhrW0EXrGk.png"
  },
  {
    id: 79,
    name: "生日1弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <11月~12月>",
    character: "一之濑枫",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/OdXbUGL8U6dS-7uk.png"
  },
  {
    id: 80,
    name: "生日1弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <11月~12月>",
    character: "姬石来希",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/ad_WQpxAzQ3IeU6k.png"
  },
  {
    id: 81,
    name: "生日1弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <11月~12月>",
    character: "月城爱弓",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/jlJr3HI8Rjox36H6.png"
  },
  {
    id: 82,
    name: "生日1弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <11月~12月>",
    character: "冴草纪伊",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/pSH5Nc-ilEA-KND9.png"
  },
  {
    id: 83,
    name: "生日1弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <11月~12月>",
    character: "双叶亚里亚",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/OtEvp1ifIhrPjGqA.png"
  },
  {
    id: 84,
    name: "生日1弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <11月~12月>",
    character: "香澄朝阳",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/wK9lSagqa4o8NGLR.png"
  },
  {
    id: 85,
    name: "生日1弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <11月~12月>",
    character: "藤堂尤里卡",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/wYykRwWxiQUShSGs.png"
  },
  {
    id: 86,
    name: "生日1弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <11月~12月>",
    character: "音城诺艾尔",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/SmvUH-_7m5BDjO81.png"
  },
  {
    id: 87,
    name: "生日1弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <11月~12月>",
    character: "白桦丽莎",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/7E-ZOiY4rmnRRfHu.png"
  },
  {
    id: 236,
    name: "生日1弹徽章<1月~2月>",
    subtitle: "スポーツオーソリティ限定 アイカツ！ シリーズ バースデー 缶バッジ <1月~2月>",  
    character: "黑泽凛",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/KBPbcdBZx_Qeyh6i.png"
  },  
  {
    id: 88,
    name: "生日1弹徽章<1月~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <1月~2月>",  
    character: "凑美绪",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/4xj81vguiYhTnaE1.png"
  }, 
  {
    id: 89,
    name: "生日1弹徽章<1月~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <1月~2月>",  
    character: "大地乃野",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/cYyhEg6meKqfqt4s.png"
  }, 
  {
    id: 90,
    name: "生日1弹徽章<1月~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <1月~2月>",  
    character: "梅小路响子",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/HqWRcSjJsGQqQtmP.png"
  }, 
  {
    id: 91,
    name: "生日1弹徽章<1月~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <1月~2月>",  
    character: "雾矢葵",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/bXRq1J8huwDUib0u.png"
  }, 
  {
    id: 92,
    name: "生日1弹徽章<1月~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <1月~2月>",  
    character: "白银莉莉",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/KBiCUdMV_EcBA0sp.png"
  }, 
  {
    id: 93,
    name: "生日1弹徽章<1月~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <1月~2月>",  
    character: "结城昂",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/MWNDrv2DMwmbQq80.png"
  }, 
  {
    id: 94,
    name: "生日1弹徽章<1月~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <1月~2月>",  
    character: "神谷紫苑",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/fqgObei0gpDtGXU5.png"
  }, 
  {
    id: 95,
    name: "生日1弹徽章<1月~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <1月~2月>",  
    character: "堂岛妮娜",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/MuxL8T1W9FUzkITp.png"
  }, 
  {
    id: 96,
    name: "生日1弹徽章<1月~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <1月~2月>",  
    character: "天羽圆香",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/img0pxIeZcrZfReG.png"
  }, 
  {
    id: 97,
    name: "生日1弹徽章<1月~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <1月~2月>",  
    character: "栗六杏",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/iN9ykKf87HoqxN5Z.png"
  }, 
  {
    id: 98,
    name: "生日1弹徽章<1月~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <1月~2月>",  
    character: "吉良彼方",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/VZdft0slA7D70ZSG.png"
  }, 
  {
    id: 99,
    name: "生日1弹徽章<1月~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <1月~2月>",  
    character: "白鸟姬",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/hNQTZvnWxYkrsufi.png"
  }, 
  {
    id: 100,
    name: "生日1弹徽章<1月~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <1月~2月>",  
    character: "艾莉西亚·夏洛特",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/MOqIju1pUDaawrT5.png"
  }, 
  {
    id: 101,
    name: "生日1弹徽章<3月~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <3月~4月>",    
    character: "虹野梦",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/K_5oL5vcReeCwA35.png"
  }, 
  {
    id: 102,
    name: "生日1弹徽章<3月~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <3月~4月>",    
    character: "星宫莓",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/zTO7qNNdFdCOYtTW.png"
  }, 
  {
    id: 103,
    name: "生日1弹徽章<3月~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <3月~4月>",    
    character: "吉良彼方",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/UU2_wBzWN1KSdgG1.png"
  }, 
  {
    id: 104,
    name: "生日1弹徽章<3月~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <3月~4月>",    
    character: "日向绘麻",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/Uzakmov1cbHk2N6B.png"
  }, 
  {
    id: 105,
    name: "生日1弹徽章<3月~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <3月~4月>",    
    character: "大空明",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/imjnbf2LIdBpzqBb.png"
  }, 
  {
    id: 106,
    name: "生日1弹徽章<3月~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <3月~4月>",    
    character: "花园绮罗",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/tRa6iMl3J6mK80Qq.png"
  }, 
  {
    id: 107,
    name: "生日1弹徽章<3月~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <3月~4月>",    
    character: "三轮光",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/N-BxXuqw2K9PAjkR.png"
  }, 
  {
    id: 108,
    name: "生日1弹徽章<3月~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <3月~4月>",    
    character: "音羽舞樱",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/aIr7MS4XZ0oU3HsX.png"
  }, 
  {
    id: 109,
    name: "生日1弹徽章<3月~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <3月~4月>",    
    character: "本谷栞",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/tcpOk9sUAF6qdMUP.png"
  }, 
  {
    id: 110,
    name: "生日1弹徽章<3月~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <3月~4月>",    
    character: "北大路樱",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/2gIcdiAIcjiaFKo6.png"
  }, 
  {
    id: 111,
    name: "生日1弹徽章<3月~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <3月~4月>",    
    character: "姬里玛利亚",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/V-x8IuqdKsDDZPnd.png"
  }, 
  {
    id: 112,
    name: "生日1弹徽章<3月~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ <3月~4月>",    
    character: "七仓小春",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/tWU4XlvfKjDXptFg.png"
  }, 
  {
    id: 113,
    name: "生日2弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <5月~6月>",      
    character: "有栖川乙女",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/mhdaWTNK11kAnIvC.png"
  }, 
  {
    id: 114,
    name: "生日2弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <5月~6月>",      
    character: "香澄夜空",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/whbwOpvoPPLxD_Av.png"
  }, 
  {
    id: 115,
    name: "生日2弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <5月~6月>",      
    character: "骑咲礼",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/rK0OiSU29iSOQo-R.png"
  }, 
  {
    id: 116,
    name: "生日2弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <5月~6月>",      
    character: "明日香未来",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/KfPnvjLDe3VIlDzn.png"
  }, 
  {
    id: 117,
    name: "生日2弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <5月~6月>",      
    character: "二阶堂柚子",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/z6T3B-lz2OV257IN.png"
  }, 
  {
    id: 118,
    name: "生日2弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <5月~6月>",      
    character: "新条雏姬",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/1_-Y0DSGJRt0ZN6L.png"
  }, 
  {
    id: 119,
    name: "生日2弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <5月~6月>",      
    character: "珠树琉璃",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/Q3g1tE6xAaGWqx-F.png"
  }, 
  {
    id: 120,
    name: "生日2弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <5月~6月>",      
    character: "天翔响",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/19KbvfNW6EV4rSkT.png"
  }, 
  {
    id: 121,
    name: "生日2弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <5月~6月>",      
    character: "白百合咲夜",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/_hvVzYx3xaa2MBu9.png"
  }, 
  {
    id: 122,
    name: "生日2弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <5月~6月>",      
    character: "白百合辉夜",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/NQqy7x5F3DtanMKl.png"
  }, 
  {
    id: 123,
    name: "生日2弹徽章<5月~6月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <5月~6月>",      
    character: "糸井纱良",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/mi4caNSnlhTPOpgf.png"
  }, 
  {
    id: 124,
    name: "生日2弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <7月~8月>",            
    character: "阳明咲",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/e2f2FGtjb64-yrN6.png"
  }, 
  {
    id: 125,
    name: "生日2弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <7月~8月>",            
    character: "服部优",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/GhpAlLAnoCDywE7A.png"
  }, 
  {
    id: 126,
    name: "生日2弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <7月~8月>",            
    character: "友希爱音",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/p4lBJPIRbkkyK08P.png"
  }, 
  {
    id: 127,
    name: "生日2弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <7月~8月>",            
    character: "紫吹兰",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/1TupqektymKhou8D.png"
  }, 
  {
    id: 128,
    name: "生日2弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <7月~8月>",            
    character: "艾尔莎·福特",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/OilgYeykD2MogPT_.png"
  }, 
  {
    id: 129,
    name: "生日2弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <7月~8月>",            
    character: "红林珠璃",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/_ZF_9IN6EeU8Ky76.png"
  }, 
  {
    id: 130,
    name: "生日2弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <7月~8月>",            
    character: "如月翼",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/9KC376jXz8q0DhSU.png"
  }, 
  {
    id: 131,
    name: "生日2弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <7月~8月>",            
    character: "蝶乃舞花",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/n3_uYRk1zyYx7o9V.png"
  }, 
  {
    id: 132,
    name: "生日2弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <7月~8月>",            
    character: "晴香露卡",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/Snh_eEvo3d81MBLx.png"
  }, 
  {
    id: 133,
    name: "生日2弹徽章<7月~8月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <7月~8月>",            
    character: "栗栖心音",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/OCULkmbYeLV72sft.png"
  }, 
  {
    id: 134,
    name: "生日2弹徽章<9月~10月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <9月~10月>",             
    character: "春风若叶",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/GSeUvwQmo92qGimw.png"
  }, 
  {
    id: 135,
    name: "生日2弹徽章<9月~10月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <9月~10月>",             
    character: "姫乃Mieru",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/gD05RXY430SagFF3.png"
  }, 
  {
    id: 136,
    name: "生日2弹徽章<9月~10月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <9月~10月>",             
    character: "藤原雅",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/1yqmcHrVNjIaubUH.png"
  }, 
  {
    id: 137,
    name: "生日2弹徽章<9月~10月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <9月~10月>",             
    character: "神崎美月",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/auwfE1HVZM5a6Jsn.png"
  }, 
  {
    id: 138,
    name: "生日2弹徽章<9月~10月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <9月~10月>",             
    character: "冰上堇",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/qTDol-DtR_lMwjOP.png"
  }, 
  {
    id: 139,
    name: "生日2弹徽章<9月~10月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <9月~10月>",             
    character: "神城卡莲",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/SyhZqqNUq89CFZ1a.png"
  }, 
  {
    id: 140,
    name: "生日2弹徽章<9月~10月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <9月~10月>",             
    character: "风沢空",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/a4fLoiHRVkevyrYR.png"
  }, 
  {
    id: 141,
    name: "生日2弹徽章<9月~10月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <9月~10月>",             
    character: "早乙女亚子",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/a5cmqCPwnDyzaUUz.png"
  }, 
  {
    id: 142,
    name: "生日2弹徽章<9月~10月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <9月~10月>",             
    character: "香澄真昼",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/6YByQFI2suM1m1f2.png"
  }, 
  {
    id: 143,
    name: "生日2弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <11月~12月>",              
    character: "樱庭劳拉",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/wCCYrr3Nbcz9deFI.png"
  }, 
  {
    id: 144,
    name: "生日2弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <11月~12月>",              
    character: "和央Parin",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/lEhM6OEbxiuCokwX.png"
  }, 
  {
    id: 145,
    name: "生日2弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <11月~12月>",              
    character: "音城塞拉",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/x9Plta8nUcbaFrg_.png"
  }, 
  {
    id: 146,
    name: "生日2弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <11月~12月>",              
    character: "一之濑枫",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/vEX6QyLm6wn0AhUI.png"
  }, 
  {
    id: 147,
    name: "生日2弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <11月~12月>",              
    character: "姬石来希",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/nAshDEEkkOT1HSxY.png"
  }, 
  {
    id: 148,
    name: "生日2弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <11月~12月>",              
    character: "月城爱弓",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/mrqLgOVXVEE_CF8l.png"
  }, 
  {
    id: 149,
    name: "生日2弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <11月~12月>",              
    character: "冴草纪伊",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/zv5qT0LQrA_UzDQC.png"
  }, 
  {
    id: 150,
    name: "生日2弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <11月~12月>",              
    character: "白桦丽莎",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/uJDomKzndC2z64oa.png"
  }, 
  {
    id: 151,
    name: "生日2弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <11月~12月>",              
    character: "凛堂Taimu",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/xiDoGeOptEjSdnyF.png"
  }, 
  {
    id: 152,
    name: "生日2弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <11月~12月>",              
    character: "双叶亚里亚",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/riiJo2f-rT7sUpl0.png"
  }, 
  {
    id: 153,
    name: "生日2弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <11月~12月>",              
    character: "音城诺艾尔",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/s43nsqEIdsGBgr3_.png"
  }, 
  {
    id: 154,
    name: "生日2弹徽章<11月~12月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <11月~12月>",              
    character: "藤堂尤里卡",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/zzmJ9_5r6eihtaAO.png"
  }, 
  {
    id: 155,
    name: "生日2弹徽章<1~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <1~2月>",              
    character: "黑泽凛",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/pN5P5qlagBnom8BQ.png"
  }, 
  {
    id: 156,
    name: "生日2弹徽章<1~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <1~2月>",              
    character: "凑美绪",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/RLzZc7xNr1-0jl7D.png"
  }, 
  {
    id: 157,
    name: "生日2弹徽章<1~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <1~2月>",              
    character: "梅小路响子",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/ntkn-9mB5Dp3N07h.png"
  }, 
  {
    id: 158,
    name: "生日2弹徽章<1~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <1~2月>",              
    character: "大地乃野",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/cSenRXhAhIZHD8oG.png"
  }, 
  {
    id: 159,
    name: "生日2弹徽章<1~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <1~2月>",              
    character: "堂岛妮娜",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/oJgiRqBNRQc7-O4u.png"
  }, 
  {
    id: 160,
    name: "生日2弹徽章<1~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <1~2月>",              
    character: "雾矢葵",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/E1JynJ_oa3yDSX8o.png"
  }, 
  {
    id: 161,
    name: "生日2弹徽章<1~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <1~2月>",              
    character: "白银莉莉",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/EP3tyVIDzhGPvOEF.png"
  }, 
  {
    id: 162,
    name: "生日2弹徽章<1~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <1~2月>",              
    character: "神谷紫苑",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/vr1S6sjlbqEMD71q.png"
  }, 
  {
    id: 163,
    name: "生日2弹徽章<1~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <1~2月>",              
    character: "凛堂Taimu",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/icHKKKNQcpfnQTwC.png"
  },
  {
    id: 164,
    name: "生日2弹徽章<1~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <1~2月>",              
    character: "天羽圆香",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/BKZJrObtfBpR3wGj.png"
  },
  {
    id: 165,
    name: "生日2弹徽章<1~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <1~2月>",              
    character: "栗六杏",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/z0XX6BmLPwFfJik-.png"
  },
  {
    id: 166,
    name: "生日2弹徽章<1~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <1~2月>",              
    character: "艾莉西亚·夏洛特",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/cHGbhykEmJCZlB7P.png"
  },
  {
    id: 167,
    name: "生日2弹徽章<1~2月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <1~2月>",              
    character: "白鸟姬",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/m0nABQBagDHGzRke.png"
  },
  {
    id: 168,
    name: "生日2弹徽章<3~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <3~4月>",              
    character: "虹野梦",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/yKSgsGlZQ6rVeZ6V.png"
  },
  {
    id: 169,
    name: "生日2弹徽章<3~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <3~4月>",              
    character: "星宫莓",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/Ph0QKAKzJjoiHQv_.png"
  },
  {
    id: 170,
    name: "生日2弹徽章<3~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <3~4月>",              
    character: "日向绘麻",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/llILztHk3MSuS46k.png"
  },
  {
    id: 171,
    name: "生日2弹徽章<3~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <3~4月>",              
    character: "本谷栞",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/Briwb9Poagva8fgG.png"
  },
  {
    id: 172,
    name: "生日2弹徽章<3~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <3~4月>",              
    character: "音羽舞樱",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/KvYKAX73ejypZUou.png"
  },
  {
    id: 173,
    name: "生日2弹徽章<3~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <3~4月>",              
    character: "大空明",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/nJ8z31bBJPaot92d.png"
  },
  {
    id: 174,
    name: "生日2弹徽章<3~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <3~4月>",              
    character: "花园绮罗",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/BI93CTC4ksLGN8sp.png"
  },
  {
    id: 175,
    name: "生日2弹徽章<3~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <3~4月>",              
    character: "三轮光",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/kf4jJoozCo9TAi0n.png"
  },
  {
    id: 176,
    name: "生日2弹徽章<3~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <3~4月>",              
    character: "北大路樱",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/XznymHW-sdnFyAJi.png"
  },
  {
    id: 177,
    name: "生日2弹徽章<3~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <3~4月>",              
    character: "七仓小春",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/C3KvuXV63NgzpIIK.png"
  },
  {
    id: 178,
    name: "生日2弹徽章<3~4月>",
    subtitle: "アイカツ！ シリーズ バースデー 缶バッジ Season2 <3~4月>",              
    character: "姬里玛利亚",
    type: "徽章",
    size: "直径约 56mm",
    image: "https://imgbed.heliar.top/i/A9SRqj0p-PVhzhAJ.png"
  },
  {
    id: 179,
    name: "扭蛋徽章",
    subtitle: "ホログラム缶バッチ 「ガシャポンくじ アイカツ!シリーズ あそーと3」 C賞",
    character: "神崎美月，夏树未来",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/6c6LYfuL29r7Weiu.png"
  },
  {
    id: 180,
    name: "扭蛋徽章",
    subtitle: "ホログラム缶バッチ 「ガシャポンくじ アイカツ!シリーズ あそーと3」 C賞",
    character: "音城塞拉,冴草纪伊,风沢空,姬里玛利亚",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/GXgh14yts-kZwsgt.png"
  },
  {
    id: 181,
    name: "扭蛋徽章",
    subtitle: "ホログラム缶バッチ 「ガシャポンくじ アイカツ!シリーズ あそーと3」 C賞",
    character: "骑咲礼,艾尔莎·福特,花园绮罗",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/TBD4LKOjkXVoKUIg.png"
  },
  {
    id: 182,
    name: "扭蛋徽章",
    subtitle: "ホログラム缶バッチ 「ガシャポンくじ アイカツ!シリーズ あそーと3」 C賞",
    character: "香澄夜空,如月翼,二阶堂柚子,白鸟姬",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/gVI9-TmJTHWN6nws.png"
  },
  {
    id: 183,
    name: "扭蛋徽章",
    subtitle: "ホログラム缶バッチ 「ガシャポンくじ アイカツ!シリーズ あそーと3」 C賞",
    character: "明日香未来,神城卡莲",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/F_KCbc_ykLKbPVGC.png"
  },
  {
    id: 184,
    name: "扭蛋徽章",
    subtitle: "ホログラム缶バッチ 「ガシャポンくじ アイカツ!シリーズ あそーと4」 C賞",
    character: "冴草纪伊",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/eSP0An4KofulgEo1.png"
  },
  {
    id: 185,
    name: "扭蛋徽章",
    subtitle: "ホログラム缶バッチ 「ガシャポンくじ アイカツ!シリーズ あそーと4」 C賞",
    character: "风沢空",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/kxFyIwFl2H9XYJWR.png"
  },
  {
    id: 186,
    name: "扭蛋徽章",
    subtitle: "ホログラム缶バッチ 「ガシャポンくじ アイカツ!シリーズ あそーと4」 C賞",
    character: "姬里玛利亚",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/VWovx8uiArMOzL_f.png"
  },
  {
    id: 187,
    name: "扭蛋徽章",
    subtitle: "ホログラム缶バッチ 「ガシャポンくじ アイカツ!シリーズ あそーと4」 C賞",
    character: "音城塞拉",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/AtDocZInbuDfiF26.png"
  },
  {
    id: 188,
    name: "晚夏徽章",
    subtitle: "WM Late Summer Collection 缶バッジセット",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://imgbed.heliar.top/i/IUDF6MniyyIDp4FV.png"
  },
   {
    id: 189,
    name: "晚夏徽章",
    subtitle: "WM Late Summer Collection 缶バッジセット",
    character: "神崎美月",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://imgbed.heliar.top/i/u77PMsiAYH6RGO_W.png"
  },
  {
    id: 190,
    name: "抽抽乐徽章",
    subtitle: "アイカツ！ キャラバッジコレクションC 缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/eYW8Qcl8iGmGpAvN.png"
  },
  {
    id: 191,
    name: "抽抽乐徽章",
    subtitle: "アイカツ！ キャラバッジコレクションC 缶バッジ",
    character: "神崎美月",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/i6nkwYI3wR_hBdyc.png"
  },
   {
    id: 192,
    name: "抽抽乐徽章",
    subtitle: "アイカツ！ キャラバッジコレクションC 缶バッジ",
    character: "栗栖心音",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/8JnTPfbZcE9F9uHZ.png"
  },
   {
    id: 193,
    name: "抽抽乐徽章",
    subtitle: "アイカツ！ キャラバッジコレクションC 缶バッジ",
    character: "栗栖心音",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/8JnTPfbZcE9F9uHZ.png"
  },
   {
    id: 194,
    name: "抽抽乐徽章",
    subtitle: "アイカツ！ キャラバッジコレクションC 缶バッジ",
    character: "冴草纪伊",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/Nzlrezn4dVSuBRBR.png"
  },
   {
    id: 195,
    name: "抽抽乐徽章",
    subtitle: "アイカツ！ キャラバッジコレクションC 缶バッジ",
    character: "风沢空",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/ScU_Mlf51ezDKcrH.png"
  },
   {
    id: 196,
    name: "抽抽乐徽章",
    subtitle: "アイカツ！ キャラバッジコレクションC 缶バッジ",
    character: "姬里玛利亚",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/47oUcBYnfRyYSHCp.png"
  },
   {
    id: 197,
    name: "抽抽乐徽章",
    subtitle: "アイカツ！ キャラバッジコレクションC 缶バッジ",
    character: "音城塞拉",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/PE0igALOoL2Rb4V_.png"
  },
   {
    id: 198,
    name: "抽抽乐徽章",
    subtitle: "アイカツ！ キャラバッジコレクションC 缶バッジ",
    character: "藤原雅",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/y50rHqNHlkMnTHrW.png"
  },
   {
    id: 199,
    name: "抽抽乐徽章",
    subtitle: "アイカツ！ キャラバッジコレクションC 缶バッジ",
    character: "藤堂尤里卡",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/yIaC02gwK4bAGWPw.png"
  },
   {
    id: 200,
    name: "抽抽乐徽章",
    subtitle: "アイカツ！ キャラバッジコレクションC 缶バッジ",
    character: "有栖川乙女",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/dWTQQ90vpum_cMw1.png"
  },
   {
    id: 201,
    name: "抽抽乐徽章",
    subtitle: "アイカツ！ キャラバッジコレクションC 缶バッジ",
    character: "紫吹兰",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/XGKUE8_QyI83DXQ-.png"
  },
   {
    id: 202,
    name: "抽抽乐徽章",
    subtitle: "アイカツ！ キャラバッジコレクションC 缶バッジ",
    character: "雾矢葵",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/blECOSjIBevuz4m1.png"
  },
   {
    id: 203,
    name: "抽抽乐徽章",
    subtitle: "アイカツ！ キャラバッジコレクションC 缶バッジ",
    character: "北大路樱",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/ru9cWDGofrTYLtvY.png"
  },
   {
    id: 204,
    name: "抽抽乐徽章",
    subtitle: "アイカツ！ キャラバッジコレクションC 缶バッジ",
    character: "一之濑枫",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/nlq_Kb9EIt_mGVf0.png"
  },
   {
    id: 205,
    name: "抽抽乐徽章",
    subtitle: "アイカツ！ キャラバッジコレクションC 缶バッジ",
    character: "星宫莓",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/i_1TO84JtBGGCVLu.png"
  },
   {
    id: 206,
    name: "抽抽乐徽章(隐藏)",
    subtitle: "アイカツ！ キャラバッジコレクションC 缶バッジ",
    character: "星宫莓",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://imgbed.heliar.top/i/yyinS9yR_SWfriTm.png"
  },
   {
    id: 207,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループB 缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/eEqna3BQkR7zrxzw.png"
  },
  {
    id: 208,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループB 缶バッジ",
    character: "风沢空",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/RHFDFV2RMuQJ3_zz.png"
  },
   {
    id: 209,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループB 缶バッジ",
    character: "三轮光",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/11L1tqHoTLVpVJt7.png"
  },
   {
    id: 210,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループB 缶バッジ",
    character: "姬里玛利亚",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/PG6zPh_uEuBXaV1h.png"
  },
   {
    id: 211,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループB 缶バッジ",
    character: "音城塞拉",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/MNR9W5k7qqzThG4x.png"
  },
   {
    id: 212,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループB 缶バッジ",
    character: "音城诺艾尔",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/temD_fabClgA9t9F.png"
  },
   {
    id: 213,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループB 缶バッジ",
    character: "神崎美月",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/NpYPhpWt5xLFcCz4.png"
  },
   {
    id: 214,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループB 缶バッジ",
    character: "冴草纪伊",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/RmaU0OLN4Tt26JVB.png"
  },
   {
    id: 215,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "星宫莓",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/F-jH7NMzlxtUVCXf.pngg"
  },
   {
    id: 216,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "神谷紫苑",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/cJF5b59Qz3Yt5BPM.png"
  },
   {
    id: 217,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "一之濑枫",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/39L8ZKsqTNDN94q6.png"
  },
   {
    id: 218,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "有栖川乙女",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/4abNIrlsIIDlnH82.png"
  },
   {
    id: 219,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "北大路樱",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/_rfjAc-zDD8FUrys.png"
  },
   {
    id: 220,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "藤堂尤里卡",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/_rfjAc-zDD8FUrys.png"
  },
   {
    id: 221,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "藤堂尤里卡",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/HDoYMV86Gy9gTxxm.png"
  },
   {
    id: 222,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "紫吹兰",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/PVolTW8rrZM7k3jq.png"
  },
   {
    id: 223,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "雾矢葵",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/Sjn_fgVWC_TRksAN.png"
  },
   {
    id: 224,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "栗栖心音",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/y58r1BKLjHRkEd0z.png"
  },
   {
    id: 225,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "红林珠璃",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/3Vuf6IrUAfCSDz4z.png"
  },
   {
    id: 226,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "藤原雅",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/GTJbvCZwbMTmS1-k.png"
  },
   {
    id: 227,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "白桦丽莎",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/GA-BrNznD62qtbuA.png"
  },
   {
    id: 228,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "堂岛妮娜",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/_ehIwh_VmoJLl-RE.png"
  },
   {
    id: 229,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "黑泽凛",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/bHMHRRmu3MvLxRm8.png"
  },
   {
    id: 230,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "大地乃野",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/UC_qnf0_ZbrXJOyX.png"
  },
   {
    id: 231,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "天羽圆香",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/Lx1p6Z7uPOL2PFo9.png"
  },
     {
    id: 232,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "冰上堇",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/Mmgsdw9lRu-p_7iC.png"
  },
   {
    id: 233,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "新条雏姬",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/v5Pd61Cnz5ABp8eB.png"
  },
   {
    id: 234,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "服部优",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/tJ8iUx2rQt9mjDBE.png"
  },
   {
    id: 235,
    name: "豆豆眼/涂鸦1弹徽章",
    subtitle: "アイカツ！ グループA 缶バッジ",
    character: "大空明",
    type: "徽章",
    size: "直径约 65mm",
    image: "https://imgbed.heliar.top/i/MnOa2dLa6vk3E3qX.png"
  },



];


export const TYPES = ["全部", "徽章", "亚克力立牌", "卡片", "文件夹", "毛绒玩偶"];
export const STATUS_OPTIONS = ["全部", "已拥有", "想要"];

export const getItemsWithMeta = () => {
  return BASE_ITEMS
    .map(item => {
      const chars = item.character.split(/[,，]/);
      const infos = chars.map(name => getCharacterInfo(name.trim()));
      const series = [...new Set(infos.map(i => i.series))].join(', ');
      const characterRomaji = infos.map(i => i.romaji || '').filter(Boolean).join(' ');
      const characterAlias = infos.map(i => i.alias || '').filter(Boolean).join(' ');
      return {
        ...item,
        series: series || '未知',
        gender: infos[0].gender,
        characterRomaji,
        characterAlias,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
};
