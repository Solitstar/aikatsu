import { getCharacterInfo } from './characters';

export const BASE_ITEMS = [
  {
    id: 1,
    name: "DMM抽赏徽章",
    subtitle: "アイカツ！ DMMスクラッチくじ 缶バッジ",
    character: "星宫莓",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://i.imgur.com/kTWKYmg.png"
  },
  {
    id: 2,
    name: "全息Live会场限定徽章",
    subtitle: "アイカツ Liveイリュージョン 缶バッジセット 会場限定",
    character: "夏树未来,有栖川乙女,一之濑枫,冴草纪伊",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://i.imgur.com/65mqqHu.png"
  },
  {
    id: 3,
    name: "全息Live会场限定徽章",
    subtitle: "アイカツ Liveイリュージョン 缶バッジセット 会場限定",
    character: "雾矢葵,藤堂尤里卡,音城塞拉",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://i.imgur.com/CFTghib.png"
  },
  {
    id: 4,
    name: "全息Live会场限定徽章",
    subtitle: "アイカツ Liveイリュージョン 缶バッジセット 会場限定",
    character: "紫吹兰,神崎美月,风沢空",
    type: "徽章",
    size: "直径约 40 mm",
    image: "https://i.imgur.com/JAaWO7J.png"
  },
  {
    id: 5,
   name: "全息Live会场限定徽章",
    subtitle: "アイカツ Liveイリュージョン 缶バッジセット 会場限定",
    character: "星宫莓,大空明,姬里玛利亚,北大路樱",
    type: "徽章",
    size: "直径约 40 mm",
    image: "https://i.imgur.com/QwB8QZu.png"
  },
  {
    id: 6,
    name: "全息Live会场限定徽章",
    subtitle: "アイカツ Liveイリュージョン 缶バッジセット 会場限定",
    character: "其他",
    type: "徽章",
    size: "直径约 75mm",
    image: "https://i.imgur.com/OxbDZKz.png"
  },
  {
    id: 7,
    name: "2015Live徽章",
    subtitle: "アイカツ スターアニス 2015年 ジャケバッチ ",
    character: "其他",
    type: "徽章",
    size: "约 40mm",
    image: "https://i.imgur.com/LSzOFDa.png"
  },
  {
    id: 8,
    name: "2016Live徽章",
    subtitle: "アイカツ ミュージックフェスタ2016 缶バッジ ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://i.imgur.com/2uRF6rl.png"
  },
  {
    name: "2017Live徽章",
    subtitle: "アイカツ ミュージックフェスタ2017 缶バッジ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://i.imgur.com/2yleCgX.png"
  },
  {
    id: 10,
    name: "武道馆Live徽章",
    subtitle: "アイカツ！ミュージックフェスタ in アイカツ武道館 缶バッジ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://i.imgur.com/3XvYa2s.png"
  },
  {
    id: 11,
    name: "大游行Live徽章",
    subtitle: "アイカツオンパレード！ユニットライブツアー ユニパレ！ 缶バッジ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://i.imgur.com/GfHOYay.png"
  },
  {
    id: 12,
    name: "友代Live徽章",
    subtitle: "BEST FRIENDS！ スペシャルLIVE ～Thanks⇄OK～ 缶バッジ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://i.imgur.com/4ti8nYN.png"
  },
  {
    id: 13,
    name: "Vivid Kiss品牌徽章",
    subtitle: "アイカツ デザインマート Vivid Kiss 缶バッジ",
    character: "其他,夏树未来,新条雏姬",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://i.imgur.com/RoNG8Ne.png"
  },
  {
    id: 14,
    name: "Vivid Kiss品牌徽章",
    subtitle: "アイカツ デザインマート Vivid Kiss 缶バッジ",
    character: "其他,夏树未来,新条雏姬",
    type: "徽章",
    size: "直径约 30mm",
    image: "https://i.imgur.com/uJYq7oL.png"
  },
  {
    id: 15,
    name: "WM组合徽章",
    subtitle: "WM ユニットおうえんグッズセット 「アイカツ! AIKATSU! STYLE」 缶バッジ",
    character: "其他,夏树未来,神崎美月",
    type: "徽章",
    size: "直径约 75mm",
    image: "https://i.imgur.com/Fx8ZOQu.png"
  },
  {
    id: 16,
    name: "布艺(食玩)徽章",
    subtitle: "アイカツ ワッペン缶バッジ ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://i.imgur.com/AG4y677.png"
  },
  {
    id: 17,
    name: "布艺(食玩)徽章",
    subtitle: "アイカツ ワッペン缶バッジ",
    character: "星宫莓,雾矢葵,紫吹兰,有栖川乙女,藤堂尤里卡,北大路樱,一之濑枫,神崎美月",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://i.imgur.com/3wih2wM.png"
  },
  {
    id: 19,
    name: "布艺(食玩)徽章",
    subtitle: "アイカツ ワッペン缶バッジ",
    character: "星宫莓",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://i.imgur.com/v0P9Wot.png"
    },
  {
    id: 18,
    name: "布艺(食玩)徽章",
    subtitle: "アイカツ ワッペン缶バッジ ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://i.imgur.com/V35msdn.png"
  },
  {
    id: 20,
    name: "2018Live徽章",
    subtitle: "AIKATSU☆STARS Special Live Tour MUSIC of DREAM!!缶バッジ ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://i.imgur.com/2xkRpPZ.png"
  },
  {
    id: 21,
    name: "布艺(食玩)徽章",
    subtitle: "アイカツ ワッペン缶バッジ ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://i.imgur.com/qoOBrVG.png"
  },
  {
    id: 22,
    name: "布艺(食玩)徽章",
    subtitle: "アイカツ ワッペン缶バッジ ",
    character: "星宫莓,紫吹兰",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://i.imgur.com/S4yh8dL.png"
  },
  {
    id: 23,
    name: "布艺(食玩)徽章",
    subtitle: "アイカツ ワッペン缶バッジ ",
    character: "其他",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://i.imgur.com/v2y3c7X.pngg"
  },
  {
    id: 24,
    name: "布艺(食玩)徽章",
    subtitle: "アイカツ ワッペン缶バッジ ",
    character: "星宫莓,雾矢葵,紫吹兰",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://i.imgur.com/0z9i6XP.png"
  },
  {
    id: 25,
    name: "海景布徽章(初版)",
    subtitle: "アイカツ メモリアルハンカチセット 缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 44mm",
    image: "https://i.imgur.com/85MiwUC.png"
  },
  {
    id: 26,
     name: "海景布徽章(再贩)",
    subtitle: "アイカツ メモリアルハンカチセット 缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 44mm",
    image: "https://i.imgur.com/YXl6KQ6.png"
  },
  {
    id: 27,
    name: "夏树未来限定徽章",
    subtitle: "夏樹みらい 限定缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=limited%20edition%20badge%20yellow%20anime%20idol%20aikatsu&image_size=square_hd"
  },
  {
    id: 28,
    name: "夏树未来收藏徽章",
    subtitle: "夏樹みらい コレクション缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 75mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=collectible%20badge%20cute%20anime%20idol%20yellow%20aikatsu&image_size=square_hd"
  },
  {
    id: 29,
    name: "夏树未来特典徽章",
    subtitle: "夏樹みらい 特典缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=special%20badge%20yellow%20idol%20anime%20girl%20aikatsu%20merch&image_size=square_hd"
  },
  {
    id: 30,
    name: "夏树未来扭蛋徽章",
    subtitle: "夏樹みらい ガシャポン缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=gacha%20badge%20yellow%20anime%20idol%20aikatsu%20cute&image_size=square_hd"
  },
  {
    id: 31,
    name: "夏树未来Q版徽章",
    subtitle: "夏樹みらい デフォルメ缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chibi%20badge%20yellow%20haired%20anime%20girl%20aikatsu&image_size=square_hd"
  },
  {
    id: 32,
    name: "夏树未来剧场版徽章",
    subtitle: "夏樹みらい 劇場版缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=movie%20badge%20yellow%20anime%20idol%20aikatsu%20pin&image_size=square_hd"
  },
  {
    id: 33,
    name: "夏树未来纪念徽章",
    subtitle: "夏樹みらい 記念缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 75mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=memorial%20badge%20cute%20yellow%20anime%20girl%20aikatsu&image_size=square_hd"
  },
  {
    id: 34,
    name: "夏树未来活动徽章",
    subtitle: "夏樹みらい イベント缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=event%20badge%20yellow%20anime%20idol%20aikatsu%20merchandise&image_size=square_hd"
  },
  {
    id: 35,
    name: "夏树未来闪亮徽章",
    subtitle: "夏樹みらい キラキラ缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sparkling%20badge%20yellow%20anime%20idol%20girl%20aikatsu&image_size=square_hd"
  },
  {
    id: 36,
    name: "夏树未来合作徽章",
    subtitle: "夏樹みらい コラボ缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 50mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=collaboration%20badge%20yellow%20anime%20idol%20aikatsu%20cute&image_size=square_hd"
  },
  {
    id: 37,
    name: "夏树未来抽赏徽章",
    subtitle: "夏樹みらい くじ缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=lottery%20badge%20yellow%20anime%20girl%20idol%20aikatsu&image_size=square_hd"
  },
  {
    id: 38,
    name: "夏树未来冬季徽章",
    subtitle: "夏樹みらい 冬限定缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=winter%20badge%20yellow%20anime%20idol%20cute%20aikatsu&image_size=square_hd"
  },
  {
    id: 39,
    name: "夏树未来夏日徽章",
    subtitle: "夏樹みらい 夏限定缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=summer%20badge%20yellow%20anime%20idol%20aikatsu%20merch&image_size=square_hd"
  },
  {
    id: 40,
    name: "夏树未来星光徽章",
    subtitle: "夏樹みらい スターライト缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=starlight%20badge%20yellow%20anime%20girl%20idol%20aikatsu&image_size=square_hd"
  },
  {
    id: 41,
    name: "夏树未来梦幻徽章",
    subtitle: "夏樹みらい ドリーム缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 75mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dream%20badge%20cute%20yellow%20anime%20idol%20aikatsu&image_size=square_hd"
  },
  {
    id: 42,
    name: "夏树未来微笑徽章",
    subtitle: "夏樹みらい スマイル缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smile%20badge%20yellow%20anime%20idol%20girl%20aikatsu&image_size=square_hd"
  },
  {
    id: 43,
    name: "夏树未来彩虹徽章",
    subtitle: "夏樹みらい レインボー缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rainbow%20badge%20yellow%20anime%20idol%20aikatsu%20cute&image_size=square_hd"
  },
  {
    id: 44,
    name: "夏树未来闪耀徽章",
    subtitle: "夏樹みらい シャイニング缶バッジ",
    character: "夏树未来",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shining%20badge%20yellow%20anime%20idol%20girl%20aikatsu&image_size=square_hd"
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
      return {
        ...item,
        series: series || '未知',
        gender: infos[0].gender,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
};
