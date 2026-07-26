import { getCharacterInfo } from './characters';

export const BASE_ITEMS = [
  {
    id: 1,
    name: "DMM鎶借祻寰界珷",
    name_jp: "銈偆銈儎锛?DMM銈广偗銉┿儍銉併亸銇?缂躲儛銉冦偢 ",
    character: "鏄熷鑾?,
    type: "寰界珷",
    image: "https://i.imgur.com/kTWKYmg.png"
  },
  {
    id: 2,
    name: "鍏ㄦ伅Live浼氬満闄愬畾寰界珷",
    character: "澶忔爲鏈潵",
    type: "寰界珷",
    image: "https://i.imgur.com/65mqqHu.png"
  },
  {
    id: 3,
    name: "闆剧煝钁甸棯鑰€鍗＄墖",
    character: "闆剧煝钁?,
    type: "鍗＄墖",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sparkling%20blue%20trading%20card%20anime%20idol%20girl%20aikatsu%20style%20collectible&image_size=portrait_4_3"
  },
  {
    id: 4,
    name: "澶х┖鏄庢枃浠跺す",
    character: "澶х┖鏄?,
    type: "鏂囦欢澶?,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20clear%20file%20folder%20orange%20haired%20idol%20girl%20aikatsu%20merchandise&image_size=portrait_4_3"
  },
  {
    id: 5,
    name: "闊冲煄濉炴媺姣涚粧鐜╁伓",
    character: "闊冲煄濉炴媺",
    type: "姣涚粧鐜╁伓",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20plush%20doll%20purple%20haired%20anime%20idol%20girl%20chibi%20style%20aikatsu&image_size=square_hd"
  },
  {
    id: 6,
    name: "鏄熷鑾撹垶鍙板窘绔?,
    character: "鏄熷鑾?,
    type: "寰界珷",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sparkling%20star%20badge%20pink%20idol%20stage%20theme%20aikatsu%20merchandise&image_size=square_hd"
  },
  {
    id: 7,
    name: "闆剧煝钁典簹鍏嬪姏绔嬬墝",
    character: "闆剧煝钁?,
    type: "浜氬厠鍔涚珛鐗?,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20anime%20girl%20acrylic%20stand%20cool%20idol%20outfit%20aikatsu%20style&image_size=portrait_4_3"
  },
  {
    id: 8,
    name: "澶х┖鏄庨棯鑰€鍗＄墖",
    character: "澶х┖鏄?,
    type: "鍗＄墖",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=orange%20sparkling%20trading%20card%20sunshine%20idol%20girl%20aikatsu%20collectible&image_size=portrait_4_3"
  },
  {
    id: 9,
    name: "鏄熷鑾撴瘺缁掔帺鍋?,
    character: "鏄熷鑾?,
    type: "姣涚粧鐜╁伓",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pink%20chibi%20plush%20doll%20cute%20anime%20idol%20girl%20strawberry%20theme%20aikatsu&image_size=square_hd"
  },
  {
    id: 10,
    name: "闆剧煝钁垫枃浠跺す",
    character: "闆剧煝钁?,
    type: "鏂囦欢澶?,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20anime%20clear%20file%20folder%20cool%20idol%20girl%20aikatsu%20merchandise&image_size=portrait_4_3"
  },
  {
    id: 11,
    name: "闊冲煄濉炴媺寰界珷",
    character: "闊冲煄濉炴媺",
    type: "寰界珷",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=purple%20moon%20badge%20rock%20idol%20theme%20aikatsu%20merchandise%20cool%20style&image_size=square_hd"
  },
  {
    id: 12,
    name: "澶х┖鏄庝簹鍏嬪姏绔嬬墝",
    character: "澶х┖鏄?,
    type: "浜氬厠鍔涚珛鐗?,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=orange%20haired%20anime%20girl%20acrylic%20stand%20sunshine%20idol%20outfit%20aikatsu&image_size=portrait_4_3"
  },
  {
    id: 13,
    name: "鏄熷鑾撴枃浠跺す",
    character: "鏄熷鑾?,
    type: "鏂囦欢澶?,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pink%20anime%20clear%20file%20folder%20strawberry%20idol%20girl%20aikatsu%20merchandise&image_size=portrait_4_3"
  },
  {
    id: 14,
    name: "闆剧煝钁垫瘺缁掔帺鍋?,
    character: "闆剧煝钁?,
    type: "姣涚粧鐜╁伓",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blue%20chibi%20plush%20doll%20cool%20anime%20idol%20girl%20aikatsu%20cute&image_size=square_hd"
  },
  {
    id: 15,
    name: "闊冲煄濉炴媺鍗＄墖",
    character: "闊冲煄濉炴媺",
    type: "鍗＄墖",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=purple%20rock%20style%20trading%20card%20cool%20idol%20girl%20aikatsu%20collectible&image_size=portrait_4_3"
  },
  {
    id: 16,
    name: "澶х┖鏄庢瘺缁掔帺鍋?,
    character: "澶х┖鏄?,
    type: "姣涚粧鐜╁伓",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=orange%20chibi%20plush%20doll%20sunshine%20anime%20idol%20girl%20aikatsu%20cute&image_size=square_hd"
  },
  {
    id: 17,
    name: "鏄熷鑾撴敹钘忓崱鐗囧瑁?,
    character: "鏄熷鑾?,
    type: "鍗＄墖",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pink%20premium%20trading%20card%20set%20strawberry%20idol%20aikatsu%20collector%20edition&image_size=portrait_4_3"
  },
  {
    id: 18,
    name: "闊冲煄濉炴媺浜氬厠鍔涚珛鐗?,
    character: "闊冲煄濉炴媺",
    type: "浜氬厠鍔涚珛鐗?,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=purple%20haired%20anime%20girl%20acrylic%20stand%20rock%20idol%20outfit%20aikatsu%20cool&image_size=portrait_4_3"
  },
  {
    id: 19,
    name: "澶х┖鏄庡窘绔?,
    character: "澶х┖鏄?,
    type: "寰界珷",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=orange%20sun%20badge%20cheerful%20idol%20theme%20aikatsu%20merchandise%20cute&image_size=square_hd"
  },
  {
    id: 20,
    name: "闊冲煄濉炴媺鏂囦欢澶?,
    character: "闊冲煄濉炴媺",
    type: "鏂囦欢澶?,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=purple%20anime%20clear%20file%20folder%20rock%20idol%20girl%20aikatsu%20merchandise%20cool&image_size=portrait_4_3"
  },
];

export const TYPES = ["鍏ㄩ儴", "寰界珷", "浜氬厠鍔涚珛鐗?, "鍗＄墖", "鏂囦欢澶?, "姣涚粧鐜╁伓"];
export const STATUS_OPTIONS = ["鍏ㄩ儴", "宸叉嫢鏈?, "鎯宠"];

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
