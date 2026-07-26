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
    character: "雾矢葵，藤堂尤里卡，音城塞拉",
    type: "徽章",
    size: "直径约 40mm",
    image: "https://i.imgur.com/CFTghib.png"
  },
  {
    id: 4,
    name: "全息Live会场限定徽章",
    subtitle: "アイカツ Liveイリュージョン 缶バッジセット 会場限定",
    character: "紫吹兰，神崎美月，风沢空",
    type: "徽章",
    size: "直径约 40 mm",
    image: "https://i.imgur.com/JAaWO7J.png"
  },
  {
    id: 5,
   name: "全息Live会场限定徽章",
    subtitle: "アイカツ Liveイリュージョン 缶バッジセット 会場限定",
    character: "星宫莓，大空明，姬里玛利亚，北大路樱",
    type: "徽章",
    size: "直径约 40 mm",
    image: "https://i.imgur.com/QwB8QZu.png"
  },
  {
    id: 6,
    name: "星宫莓舞台徽章",
    subtitle: "星宮いちご ステージ缶バッジ",
    character: "星宫莓",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sparkling%20star%20badge%20pink%20idol%20stage%20theme%20aikatsu%20merchandise&image_size=square_hd"
  },
  {
    id: 7,
    name: "雾矢葵亚克力立牌",
    subtitle: "霧矢あおい アクリルスタンド",
    character: "雾矢葵",
    type: "亚克力立牌",
    size: "约 15cm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20anime%20girl%20acrylic%20stand%20cool%20idol%20outfit%20aikatsu%20style&image_size=portrait_4_3"
  },
  {
    id: 8,
    name: "大空明闪耀卡片",
    subtitle: "大空あかり キラキラカード",
    character: "大空明",
    type: "卡片",
    size: "直径约 63×89mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=orange%20sparkling%20trading%20card%20sunshine%20idol%20girl%20aikatsu%20collectible&image_size=portrait_4_3"
  },
  {
    id: 9,
    name: "星宫莓毛绒玩偶",
    subtitle: "星宮いちご ぬいぐるみ",
    character: "星宫莓",
    type: "毛绒玩偶",
    size: "约 20cm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pink%20chibi%20plush%20doll%20cute%20anime%20idol%20girl%20strawberry%20theme%20aikatsu&image_size=square_hd"
  },
  {
    id: 10,
    name: "雾矢葵文件夹",
    subtitle: "霧矢あおい クリアファイル",
    character: "雾矢葵",
    type: "文件夹",
    size: " A4",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20anime%20clear%20file%20folder%20cool%20idol%20girl%20aikatsu%20merchandise&image_size=portrait_4_3"
  },
  {
    id: 11,
    name: "音城塞拉徽章",
    subtitle: "音城セイラ 缶バッジ",
    character: "音城塞拉",
    type: "徽章",
    size: "直径约 57mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=purple%20moon%20badge%20rock%20idol%20theme%20aikatsu%20merchandise%20cool%20style&image_size=square_hd"
  },
  {
    id: 12,
    name: "大空明亚克力立牌",
    subtitle: "大空あかり アクリルスタンド",
    character: "大空明",
    type: "亚克力立牌",
    size: "约 15cm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=orange%20haired%20anime%20girl%20acrylic%20stand%20sunshine%20idol%20outfit%20aikatsu&image_size=portrait_4_3"
  },
  {
    id: 13,
    name: "星宫莓文件夹",
    subtitle: "星宮いちご クリアファイル",
    character: "星宫莓",
    type: "文件夹",
    size: "A4",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pink%20anime%20clear%20file%20folder%20strawberry%20idol%20girl%20aikatsu%20merchandise&image_size=portrait_4_3"
  },
  {
    id: 14,
    name: "雾矢葵毛绒玩偶",
    subtitle: "霧矢あおい ぬいぐるみ",
    character: "雾矢葵",
    type: "毛绒玩偶",
    size: "约 20cm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20chibi%20plush%20doll%20cool%20anime%20idol%20girl%20aikatsu%20cute&image_size=square_hd"
  },
  {
    id: 15,
    name: "音城塞拉卡片",
    subtitle: "音城セイラ コレクションカード",
    character: "音城塞拉",
    type: "卡片",
    size: "63×89mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=purple%20rock%20style%20trading%20card%20cool%20idol%20girl%20aikatsu%20collectible&image_size=portrait_4_3"
  },
  {
    id: 16,
    name: "大空明毛绒玩偶",
    subtitle: "大空あかり ぬいぐるみ",
    character: "大空明",
    type: "毛绒玩偶",
    size: "约 20cm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=orange%20chibi%20plush%20doll%20sunshine%20anime%20idol%20girl%20aikatsu%20cute&image_size=square_hd"
  },
  {
    id: 17,
    name: "星宫莓收藏卡片套装",
    subtitle: "星宮いちご コレクションカードセット",
    character: "星宫莓",
    type: "卡片",
    size: "63×89mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pink%20premium%20trading%20card%20set%20strawberry%20idol%20aikatsu%20collector%20edition&image_size=portrait_4_3"
  },
  {
    id: 18,
    name: "音城塞拉亚克力立牌",
    subtitle: "音城セイラ アクリルスタンド",
    character: "音城塞拉",
    type: "亚克力立牌",
    size: "约 15cm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=purple%20haired%20anime%20girl%20acrylic%20stand%20rock%20idol%20outfit%20aikatsu%20cool&image_size=portrait_4_3"
  },
  {
    id: 19,
    name: "大空明徽章",
    subtitle: "大空あかり 缶バッジ",
    character: "大空明",
    type: "徽章",
    size: "直径 57mm",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=orange%20sun%20badge%20cheerful%20idol%20theme%20aikatsu%20merchandise%20cute&image_size=square_hd"
  },
  {
    id: 20,
    name: "音城塞拉文件夹",
    subtitle: "音城セイラ クリアファイル",
    character: "音城塞拉",
    type: "文件夹",
    size: "A4",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=purple%20anime%20clear%20file%20folder%20rock%20idol%20girl%20aikatsu%20merchandise%20cool&image_size=portrait_4_3"
  },
];

export const TYPES = ["全部", "徽章", "亚克力立牌", "卡片", "文件夹", "毛绒玩偶"];
export const STATUS_OPTIONS = ["全部", "已拥有", "想要"];

export const getItemsWithMeta = () => {
  return BASE_ITEMS.map(item => {
    const chars = item.character.split(/[,，]/);
    const infos = chars.map(name => getCharacterInfo(name.trim()));
    const series = [...new Set(infos.map(i => i.series))].join(', ');
    return {
      ...item,
      series: series || '未知',
      gender: infos[0].gender,
    };
  });
};
