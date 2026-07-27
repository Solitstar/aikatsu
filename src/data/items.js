import { getCharacterInfo } from './characters';

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
