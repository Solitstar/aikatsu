import { getCharacterInfo } from './characters';

export const BASE_ITEMS = [
  {
    id: 1,
    name: "DMM抽赏徽章",
    character: "星宫莓",
    type: "徽章",
    image: "https://i.imgur.com/fwvbu2W.jpeg"
  },
  {
    id: 2,
    name: "星宫莓亚克力立牌",
    character: "星宫莓",
    type: "亚克力立牌",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20girl%20acrylic%20stand%20figure%20pink%20idol%20outfit%20cute%20aikatsu%20style&image_size=portrait_4_3"
  },
  {
    id: 3,
    name: "雾矢葵闪耀卡片",
    character: "雾矢葵",
    type: "卡片",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sparkling%20blue%20trading%20card%20anime%20idol%20girl%20aikatsu%20style%20collectible&image_size=portrait_4_3"
  },
  {
    id: 4,
    name: "大空明文件夹",
    character: "大空明",
    type: "文件夹",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20clear%20file%20folder%20orange%20haired%20idol%20girl%20aikatsu%20merchandise&image_size=portrait_4_3"
  },
  {
    id: 5,
    name: "音城塞拉毛绒玩偶",
    character: "音城塞拉",
    type: "毛绒玩偶",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20plush%20doll%20purple%20haired%20anime%20idol%20girl%20chibi%20style%20aikatsu&image_size=square_hd"
  },
  {
    id: 6,
    name: "星宫莓舞台徽章",
    character: "星宫莓",
    type: "徽章",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sparkling%20star%20badge%20pink%20idol%20stage%20theme%20aikatsu%20merchandise&image_size=square_hd"
  },
  {
    id: 7,
    name: "雾矢葵亚克力立牌",
    character: "雾矢葵",
    type: "亚克力立牌",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20anime%20girl%20acrylic%20stand%20cool%20idol%20outfit%20aikatsu%20style&image_size=portrait_4_3"
  },
  {
    id: 8,
    name: "大空明闪耀卡片",
    character: "大空明",
    type: "卡片",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=orange%20sparkling%20trading%20card%20sunshine%20idol%20girl%20aikatsu%20collectible&image_size=portrait_4_3"
  },
  {
    id: 9,
    name: "星宫莓毛绒玩偶",
    character: "星宫莓",
    type: "毛绒玩偶",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pink%20chibi%20plush%20doll%20cute%20anime%20idol%20girl%20strawberry%20theme%20aikatsu&image_size=square_hd"
  },
  {
    id: 10,
    name: "雾矢葵文件夹",
    character: "雾矢葵",
    type: "文件夹",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20anime%20clear%20file%20folder%20cool%20idol%20girl%20aikatsu%20merchandise&image_size=portrait_4_3"
  },
  {
    id: 11,
    name: "音城塞拉徽章",
    character: "音城塞拉",
    type: "徽章",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=purple%20moon%20badge%20rock%20idol%20theme%20aikatsu%20merchandise%20cool%20style&image_size=square_hd"
  },
  {
    id: 12,
    name: "大空明亚克力立牌",
    character: "大空明",
    type: "亚克力立牌",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=orange%20haired%20anime%20girl%20acrylic%20stand%20sunshine%20idol%20outfit%20aikatsu&image_size=portrait_4_3"
  },
  {
    id: 13,
    name: "星宫莓文件夹",
    character: "星宫莓",
    type: "文件夹",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pink%20anime%20clear%20file%20folder%20strawberry%20idol%20girl%20aikatsu%20merchandise&image_size=portrait_4_3"
  },
  {
    id: 14,
    name: "雾矢葵毛绒玩偶",
    character: "雾矢葵",
    type: "毛绒玩偶",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20chibi%20plush%20doll%20cool%20anime%20idol%20girl%20aikatsu%20cute&image_size=square_hd"
  },
  {
    id: 15,
    name: "音城塞拉卡片",
    character: "音城塞拉",
    type: "卡片",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=purple%20rock%20style%20trading%20card%20cool%20idol%20girl%20aikatsu%20collectible&image_size=portrait_4_3"
  },
  {
    id: 16,
    name: "大空明毛绒玩偶",
    character: "大空明",
    type: "毛绒玩偶",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=orange%20chibi%20plush%20doll%20sunshine%20anime%20idol%20girl%20aikatsu%20cute&image_size=square_hd"
  },
  {
    id: 17,
    name: "星宫莓收藏卡片套装",
    character: "星宫莓",
    type: "卡片",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pink%20premium%20trading%20card%20set%20strawberry%20idol%20aikatsu%20collector%20edition&image_size=portrait_4_3"
  },
  {
    id: 18,
    name: "音城塞拉亚克力立牌",
    character: "音城塞拉",
    type: "亚克力立牌",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=purple%20haired%20anime%20girl%20acrylic%20stand%20rock%20idol%20outfit%20aikatsu%20cool&image_size=portrait_4_3"
  },
  {
    id: 19,
    name: "大空明徽章",
    character: "大空明",
    type: "徽章",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=orange%20sun%20badge%20cheerful%20idol%20theme%20aikatsu%20merchandise%20cute&image_size=square_hd"
  },
  {
    id: 20,
    name: "音城塞拉文件夹",
    character: "音城塞拉",
    type: "文件夹",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=purple%20anime%20clear%20file%20folder%20rock%20idol%20girl%20aikatsu%20merchandise%20cool&image_size=portrait_4_3"
  },
];

export const TYPES = ["全部", "徽章", "亚克力立牌", "卡片", "文件夹", "毛绒玩偶"];
export const STATUS_OPTIONS = ["全部", "已拥有", "想要"];

export const getItemsWithMeta = () => {
  return BASE_ITEMS.map(item => {
    const info = getCharacterInfo(item.character);
    return {
      ...item,
      series: info.series,
      gender: info.gender,
    };
  });
};
