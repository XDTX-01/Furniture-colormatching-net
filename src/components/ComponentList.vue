<template>
  <div class="component-list">
    <div class="right">
      <div v-for="(item, index) in hotcate" :key="index">
        <div class="l" @click="handleClickTitle(item)" :key="item">
          {{ item }}
        </div>
        <div class="l_box" @dragstart="handleDragStart" :data-index="item.text">
          <template :v-show="hotcate1[item][0].chile?.[0]?.flag == true">
            <div
              v-show="hotcate1[item][0].chile?.[0]?.fuName"
              class="l"
              @click="handleClickTitle(item)"
            >
              {{ hotcate1[item][0].chile?.[0]?.fuName }}
            </div>
            <div
              class="one"
              id="one"
              v-for="(items, index) in hotcate1[item][0].chile"
              :key="index.img"
              @click="handleClick(items)"
              v-show="hotcate1[item][0].flag == true"
              :data-index="items.text"
            >
              <div class="one_1" :data-index="items.text">
                <img :src="items.img" alt="" :data-index="items.text" />
                <li class="one_2">{{ items.text }}</li>
              </div>
            </div>
            <div
              v-if="hotcate1[item][1].chile?.[0]?.fuName"
              class="l"
              @click="handleClickTitle(item)"
              :key="items.img"
            >
              {{ hotcate1[item][1].chile?.[0]?.fuName }}
            </div>
            <div
              class="one"
              id="one"
              v-for="(items, index) in hotcate1[item][1].chile"
              :key="index.img"
              @click="handleClick(items)"
              v-show="hotcate1[item][1].flag == true"
              :data-index="items.text"
            >
              <div class="one_1" :data-index="items.text">
                <img :src="items.img" alt="" :data-index="items.text" />
                <li class="one_2">{{ items.text }}</li>
              </div>
            </div>
          </template>

          <div
            class="one"
            id="one"
            v-for="(items, index) in hotcate1[item]"
            :key="index.img"
            @click="handleClick(items)"
            v-show="hotcate1[item][0].flag == true"
            :data-index="items.text"
          >
            <div class="one_1" :data-index="items.text">
              <img v-lazy="items.img" alt="" :data-index="items.text" />
              <li class="one_2">{{ items.text }}</li>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import componentList from "@/custom-component/component-list";
import { getImageUrl } from "@/utils/utils";
export default {
  data() {
    return {
      componentList,
      hotcate: [
        "木饰面",
        "皮",
        "家具木面",
        "布",
        "窗帘",
        "墙布挂板",
        "硬包",
        "玻璃",
        "其他",
        "画",
      ],
      hotcate1: {
        木饰面: [
          {
            text: "4Q银檀",
            img: "./img/木饰面/4Q银檀.jpg",
            name: "木饰面",
            flag: false,
          },
          {
            text: "9Q浅色",
            img: "./img/木饰面/9Q浅色.jpg",
            name: "木饰面",
          },
          {
            text: "9S欧洲橡",
            img: "./img/木饰面/9S欧洲橡.jpg",
            name: "木饰面",
          },
          {
            text: "BX白橡",
            img: "./img/木饰面/BX白橡.jpg",
            name: "木饰面",
          },
          {
            text: "EV深色",
            img: "./img/木饰面/EV深色.jpg",
            name: "木饰面",
          },
          {
            text: "HX灰橡",
            img: "./img/木饰面/HX灰橡.jpg",
            name: "木饰面",
          },
          {
            text: "NHY新幻影",
            img: "./img/木饰面/NHY新幻影.jpg",
            name: "木饰面",
          },
          {
            text: "WA木皮板",
            img: "./img/木饰面/WA木皮板.jpg",
            name: "木饰面",
          },
             {
            text: "浅香槟",
            img: "./img/木饰面/浅香槟.jpg",
            name: "木饰面",
          },
        ],
        皮: [
          {
            text: "意大利k651啡色",
            flag: false,
            img: "./img/皮/意大利皮/意大利k651啡色.jpg",
            name: "皮",
          },
          {
            text: "意大利k652卡其色",
            img: "./img/皮/意大利皮/意大利K652卡其色.jpg",
            name: "皮",
          },
          {
            text: "意大利k653棕色",
            img: "./img/皮/意大利皮/意大利K653棕色.jpg",
            name: "皮",
          },
          {
            text: "意大利k655蓝色",
            img: "./img/皮/意大利皮/意大利K655蓝色.jpg",
            name: "皮",
          },
          {
            text: "意大利k658橙色",
            img: "./img/皮/意大利皮/意大利K658橙色.jpg",
            name: "皮",
          },
          {
            text: "意大利k659灰色",
            img: "./img/皮/意大利皮/意大利K659灰色.jpg",
            name: "皮",
          },
          {
            text: "意大利k662浅蓝色",
            img: "./img/皮/意大利皮/意大利K662浅蓝色.jpg",
            name: "皮",
          },
          {
            text: "意大利k663深蓝色",
            img: "./img/皮/意大利皮/意大利K663深蓝色.jpg",
            name: "皮",
          },
          {
            text: "意大利D661珍珠白",
            img: "./img/皮/意大利皮/意大利D661珍珠白.jpg",
            name: "皮",
          },
          {
            text: "意大利C631香槟金",
            img: "./img/皮/意大利皮/意大利C631香槟金.jpg",
            name: "皮",
          },
          {
            text: "意大利C632古铜色",
            img: "./img/皮/意大利皮/意大利C632古铜色.jpg",
            name: "皮",
          },
          {
            text: "意大利C633金属银",
            img: "./img/皮/意大利皮/意大利C633金属银.jpg",
            name: "皮",
          },
          {
            text: "意大利C634葡萄紫",
            img: "./img/皮/意大利皮/意大利C634葡萄紫.jpg",
            name: "皮",
          },
          {
            text: "意大利C635浅香槟",
            img: "./img/皮/意大利皮/意大利C635浅香槟.jpg",
            name: "皮",
          },
          {
            text: "意大利C636金属灰",
            img: "./img/皮/意大利皮/意大利C636金属灰.jpg",
            name: "皮",
          },
          {
            text: "意大利C638金属蓝",
            img: "./img/皮/意大利皮/意大利C638金属蓝.jpg",
            name: "皮",
          },
          {
            text: "意大利A681浅卡其",
            img: "./img/皮/意大利皮/意大利A681浅卡其.jpg",
            name: "皮",
          },
          {
            text: "意大利s641浅啡色",
            img: "./img/皮/意大利皮/意大利S641浅啡色.jpg",
            name: "皮",
          },
          {
            text: "意大利H2634米白",
            img: "./img/皮/意大利皮/意大利H2634米白.jpg",
            name: "皮",
          },
          {
            text: "意大利D660",
            img: "./img/皮/意大利皮/意大利D660.jpg",
            name: "皮",
          },
          {
            text: "意大利K665黑色",
            img: "./img/皮/意大利皮/意大利K665黑色.jpg",
            name: "皮",
          },
          {
            text: "巴西P403卡其色",
            img: "./img/皮/巴西皮/巴西P403卡其色.jpg",
            name: "皮",
          },
          {
            text: "巴西P316啡色",
            img: "./img/皮/巴西皮/巴西P316啡色.jpg",
            name: "皮",
          },
          {
            text: "巴西皮P218芥末黄",
            img: "./img/皮/巴西皮/巴西P218芥末黄.jpg",
            name: "皮",
          },
          {
            text: "巴西P278蓝色",
            img: "./img/皮/巴西皮/巴西P278蓝色.jpg",
            name: "皮",
          },
          {
            text: "巴西P237粉色",
            img: "./img/皮/巴西皮/巴西P237粉色.jpg",
            name: "皮",
          },
          {
            text: "巴西皮P204灰色",
            img: "./img/皮/巴西皮/巴西P204灰色.jpg",
            name: "皮",
          },
          {
            text: "意大利S11啡色",
            img: "./img/皮/硬皮/意大利S11啡色.jpg",
            name: "皮",
          },

          {
            text: "意大利S16-BE蓝色",
            img: "./img/皮/硬皮/意大利S16-BE蓝色.jpg",
            name: "皮",
          },
          {
            text: "意大利S16-BR棕色",
            img: "./img/皮/硬皮/意大利S16-BR棕色.jpg",
            name: "皮",
          },
          {
            text: "意大利S16-BC橙色",
            img: "./img/皮/硬皮/意大利S16-BC橙色.jpg",
            name: "皮",
          },
          {
            text: "意大利S16-BG灰色",
            img: "./img/皮/硬皮/意大利S16-BG灰色.jpg",
            name: "皮",
          },
        ],
        家具木面: [
          {
            text: "BW胡桃木",
            img: "./img/家具木面/BW胡桃木.jpg",
            flag: false,
            name: "家具木面",
          },
          {
            text: "KYG橡木珍珠黑",
            img: "./img/家具木面/KYG橡木珍珠黑.jpg",
            name: "家具木面",
          },
          {
            text: "KYC橡木米色",
            img: "./img/家具木面/KYC橡木米色.jpg",
            name: "家具木面",
          },

          {
            text: "WO白橡",
            img: "./img/家具木面/WO白橡.jpg",
            name: "家具木面",
          },

          {
            text: "亮光米",
            img: "./img/家具木面/亮光米.jpg",
            name: "家具木面",
          },
          {
            text: "亮光白",
            img: "./img/家具木面/亮光白.jpg",
            name: "家具木面",
          },
          {
            text: "亮光芥末黄",
            img: "./img/家具木面/亮光芥末黄.jpg",
            name: "家具木面",
          },
          {
            text: "亮光蓝",
            img: "./img/家具木面/亮光蓝.jpg",
            name: "家具木面",
          },
          {
            text: "亮光橙",
            img: "./img/家具木面/亮光橙.jpg",
            name: "家具木面",
          },
          {
            text: "亮光紫",
            img: "./img/家具木面/亮光紫.jpg",
            name: "家具木面",
          },
          {
            text: "亮光啡",
            img: "./img/家具木面/亮光啡.jpg",
            name: "家具木面",
          },
          {
            text: "亮光中灰",
            img: "./img/家具木面/亮光中灰.jpg",
            name: "家具木面",
          },

          {
            text: "亮光碳灰",
            img: "./img/家具木面/亮光碳灰.jpg",
            name: "家具木面",
          },
          {
            text: "草绿色",
            img: "./img/家具木面/草绿色.jpg",
            name: "家具木面",
          },
          {
            text: "粉蓝色",
            img: "./img/家具木面/粉蓝色.jpg",
            name: "家具木面",
          },
          {
            text: "粉红色",
            img: "./img/家具木面/粉红色.jpg",
            name: "家具木面",
          },
        ],
        布: [
          {
            text: "HR797-02啡色",
            img: "./img/布/HR797-02啡色.jpg",
            flag: false,
            name: "布",
          },
          {
            text: "HR797-61蓝色",
            img: "./img/布/HR797-61蓝色.jpg",
            name: "布",
          },
          {
            text: "D793-07米白色",
            img: "./img/布/D793-07米白色.jpg",
            name: "布",
          },
          {
            text: "TA802-10杏色",
            img: "./img/布/TA802-10杏色.jpg",
            name: "布",
          },
          {
            text: "T800-04米色净布",
            img: "./img/布/T800-04米色净布.jpg",
            name: "布",
          },
          {
            text: "X799-04米色条纹",
            img: "./img/布/X799-04米色条纹.jpg",
            name: "布",
          },
          {
            text: "T800-10棕色净布",
            img: "./img/布/T800-10棕色净布.jpg",
            name: "布",
          },
          {
            text: "V799-428中灰色",
            img: "./img/布/V799-428中灰色.jpg",
            name: "布",
          },
          {
            text: "V799-441粉紫色",
            img: "./img/布/V799-441粉紫色.jpg",
            name: "布",
          },
          {
            text: "V799-436黄绿色",
            img: "./img/布/V799-436黄绿色.jpg",
            name: "布",
          },
          {
            text: "B804-01灰蓝色",
            img: "./img/布/B804-01灰蓝色.jpg",
            name: "布",
          },
          {
            text: "B804-02蓝色",
            img: "./img/布/B804-02蓝色.jpg",
            name: "布",
          },
          {
            text: "B804-201橙色",
            name: "布",
            img: "./img/布/B804-201橙色.jpg",
          },

          {
            text: "D793-B2芥末黄布",
            img: "./img/布/D793-B2芥末黄布.jpg",
            name: "布",
          },
          {
            text: "V803-24红米格纹",
            img: "./img/布/V803-24红米格纹.jpg",
            name: "布",
          },
          {
            text: "V803-31米色格布",
            img: "./img/布/V803-31米色格布.jpg",
            name: "布",
          },
          {
            text: "A100米格布",
            img: "./img/布/A100米格布.jpg",
            name: "布",
          },
          {
            text: "X799-10棕色条纹布",
            img: "./img/布/X799-10棕色条纹布.jpg",
            name: "布",
          },
          {
            text: "CL-21028-01米白布",
            img: "./img/布/CL-21028-01米白布.jpg",
            name: "布",
          },
            {
            text: "D807-01-1白色",
            img: "./img/布/D807-01-1白色.jpg",
            name: "布",
          },
          {
            text: "DS04967-1A米白布",
            img: "./img/布/DS04967-1A米白布.jpg",
            name: "布",
          },
          {
            text: "DS041956A浅灰布",
            img: "./img/布/DS041956A浅灰布.jpg",
            name: "布",
          },

            {
                text: "R806-01米色",
                img: "./img/布/R806-01米色.jpg",
                name: "布",
            },
            {
                text: "R806-02-2灰色",
                img: "./img/布/R806-02-2灰色.jpg",
                name: "布",
            },
            {
                text: "R806-20-1橙黄",
                img: "./img/布/R8006-20-1橙黄.jpg",
                name: "布",
            },
        ],
        窗帘: [
          {
            text: "SPC-AH-04香槟色",
            img: "./img/窗帘/SPC-AH-04香槟色.jpg",
            flag: false,
            name: "窗帘",
          },
          {
            text: "SPC-AH-05玫瑰金",
            img: "./img/窗帘/SPC-AH-05玫瑰金.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AH-10浅啡色",
            img: "./img/窗帘/SPC-AH-10浅啡色.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AH-11中啡色",
            img: "./img/窗帘/SPC-AH-11中啡色.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AH-12深啡色",
            img: "./img/窗帘/SPC-AH-12深啡色.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AH-22紫色",
            img: "./img/窗帘/SPC-AH-22紫色.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AH-27粉橙色",
            img: "./img/窗帘/SPC-AH-27粉橙色.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AH-28粉红色",
            img: "./img/窗帘/SPC-AH-28粉红色.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AH-29浅卡其色",
            img: "./img/窗帘/SPC-AH-29浅卡其色.jpg",
          },
          {
            text: "SPC-AH-35粉蓝色",
            img: "./img/窗帘/SPC-AH-35粉蓝色.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AH-38蓝色",
            img: "./img/窗帘/SPC-AH-38蓝色.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AH-41银灰色",
            img: "./img/窗帘/SPC-AH-41银灰色.jpg",
            name: "窗帘",
          },

          {
            text: "SPC-AB-09白色",
            img: "./img/窗帘/SPC-AB-09白色.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AB-08银色条纹",
            img: "./img/窗帘/SPC-AB-08银色条纹.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AM-1125白色",
            img: "./img/窗帘/SPC-AM-1125白色.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AM-1126米色",
            img: "./img/窗帘/SPC-AM-1126米色.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AM-1127杏色",
            img: "./img/窗帘/SPC-AM-1127杏色.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AM-1128灰色",
            img: "./img/窗帘/SPC-AM-1128灰色.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AI-04浅啡色",
            img: "./img/窗帘/SPC-AI-04浅啡色.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AI-05深啡色",
            img: "./img/窗帘/SPC-AI-05深啡色.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AI-01杏色羊毛",
            img: "./img/窗帘/SPC-AI-01杏色羊毛.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AI-02米色羊毛",
            img: "./img/窗帘/SPC-AI-02米色羊毛.jpg",
            name: "窗帘",
          },
          {
            text: "SPC-AZ-23浅蓝",
            img: "./img/窗帘/SPC-AZ-23浅蓝.jpg",
            name: "窗帘",
          },
        ],
        墙布挂板: [
          {
            text: "BW05白色草纹",
            img: "./img/墙布挂板/BW05白色草纹.jpg",
            flag: false,
            name: "墙布挂板",
          },
          {
            text: "BW06十字深杏",
            img: "./img/墙布挂板/BW06十字深杏.jpg",
            name: "墙布挂板",
          },
          {
            text: "BW07米色格纹",
            img: "./img/墙布挂板/BW07米色格纹.jpg",
            name: "墙布挂板",
          },
          {
            text: "BW09灰色",
            img: "./img/墙布挂板/BW09灰色.jpg",
            name: "墙布挂板",
          },
          {
            text: "BW10白色",
            img: "./img/墙布挂板/BW10白色.jpg",
            name: "墙布挂板",
          },
          {
            text: "BW11蓝色",
            img: "./img/墙布挂板/BW11蓝色.jpg",
            name: "墙布挂板",
          },
          {
            text: "BW12绿色",
            img: "./img/墙布挂板/BW12绿色.jpg",
            name: "墙布挂板",
          },
          {
            text: "BW13紫色",
            img: "./img/墙布挂板/BW13紫色.jpg",
            name: "墙布挂板",
          },
          {
            text: "BW14新杏色",
            img: "./img/墙布挂板/BW14新杏色.jpg",
            name: "墙布挂板",
          },
          {
            text: "BW15橙色",
            img: "./img/墙布挂板/BW15橙色.jpg",
            name: "墙布挂板",
          },
          {
            text: "BW16粉色",
            img: "./img/墙布挂板/BW16粉色.jpg",
            name: "墙布挂板",
          },
          {
            text: "BW17白色条纹",
            img: "./img/墙布挂板/BW17白色条纹.jpg",
            name: "墙布挂板",
          },
          {
            text: "BW18深灰色条纹",
            img: "./img/墙布挂板/BW18深灰色条纹.jpg",
            name: "墙布挂板",
          },
            {
                text: "BW-19浅香槟草纹",
                img: "./img/墙布挂板/BW-19浅香槟草纹.jpg",
                name: "墙布挂板",
            },
        ],
        硬包: [
          {
            text: "古铜硬包",

            img: "./img/硬包/古铜硬包.jpg",
            flag: false,
            name: "硬包",
          },
          {
            text: "米色硬包",
            img: "./img/硬包/米色硬包.jpg",
            name: "硬包",
          },
          {
            text: "浅蓝色硬包",
            img: "./img/硬包/浅蓝色硬包.jpg",
            name: "硬包",
          },
          {
            text: "浅铜硬包",
            img: "./img/硬包/浅铜硬包.jpg",
            name: "硬包",
          },

          {
            text: "香槟金硬包",
            img: "./img/硬包/香槟金硬包.jpg",
            name: "硬包",
          },
        ],
        玻璃: [
          {
            text: "白玻",
            img: "./img/玻璃/白玻.jpg",
            flag: false,
            name: "玻璃",
          },
          {
            text: "草绿色玻",
            img: "./img/玻璃/草绿色玻.jpg",
            name: "玻璃",
          },
          {
            text: "橙玻",
            img: "./img/玻璃/橙玻.jpg",
            name: "玻璃",
          },
          {
            text: "啡玻",
            img: "./img/玻璃/啡玻.jpg",
            name: "玻璃",
          },
          {
            text: "粉红色玻",
            img: "./img/玻璃/粉红色玻.jpg",
            name: "玻璃",
          },
          {
            text: "粉蓝色玻",
            img: "./img/玻璃/粉蓝色玻.jpg",
            name: "玻璃",
          },
          {
            text: "芥末黄玻",
            img: "./img/玻璃/芥末黄玻.jpg",
            name: "玻璃",
          },

          {
            text: "蓝玻",
            img: "./img/玻璃/蓝玻.jpg",
            name: "玻璃",
          },
          {
            text: "米玻",
            img: "./img/玻璃/米玻.jpg",
            name: "玻璃",
          },
          {
            text: "碳灰玻",
            img: "./img/玻璃/碳灰玻.jpg",
            name: "玻璃",
          },
          {
            text: "透明茶玻",
            img: "./img/玻璃/透明茶玻.jpg",
            name: "玻璃",
          },
          {
            text: "透明灰玻",
            img: "./img/玻璃/透明灰玻.jpg",
            name: "玻璃",
          },
          {
            text: "艺术夹胶玻璃(灰丝)",
            img: "./img/玻璃/艺术夹胶玻璃(灰丝).jpg",
            name: "玻璃",
          },
          {
            text: "艺术夹胶玻璃(金丝)",
            img: "./img/玻璃/艺术夹胶玻璃(金丝).jpg",
            name: "玻璃",
          },
          {
            text: "中灰玻",
            img: "./img/玻璃/中灰玻.jpg",
            name: "玻璃",
          },

          {
            text: "紫玻",
            img: "./img/玻璃/紫玻.jpg",
            name: "玻璃",
          },
        ],
        其他: [
          {
            text: "DX001木地板",
            img: "./img/其它/DX001木地板.jpg",
            flag: false,
            name: "木地板",
          },
          {
            text: "DX002木地板",
            img: "./img/其它/DX002木地板.jpg",
            name: "木地板",
          },
          {
            text: "DX003木地板",
            img: "./img/其它/DX003木地板.jpg",
            name: "木地板",
          },
          {
            text: "安卡拉灰大理石",
            img: "./img/其它/安卡拉灰大理石.jpg",
            name: "大理石",
          },
          {
            text: "黄金米黄大理石",
            img: "./img/其它/黄金米黄大理石.jpg",
            name: "大理石",
          },
          {
            text: "名仕灰大理石",
            img: "./img/其它/名仕灰大理石.jpg",
            name: "大理石",
          },

          {
            text: "鱼肚金大理石",
            img: "./img/其它/鱼肚金.jpg",
            名字: "大理石",
          },
          {
            text: "鱼肚白大理石",
            img: "./img/其它/鱼肚白.jpg",
            名字: "大理石",
          },
          {
            text: "鎏金白岩板",
            img: "./img/其它/鎏金白.jpg",
            名字: "大理石",
          },
          {
            text: "雪山石岩板",
            img: "./img/其它/雪山石.jpg",
            名字: "大理石",
          },
          {
            text: "白色人造石",
            img: "./img/其它/白色人造石.jpg",
            name: "人造石",
          },
          {
            text: "灰色人造石",
            img: "./img/其它/灰色人造石.jpg",
            name: "人造石",
          },
          {
            text: "米色人造石",
            img: "./img/其它/米色人造石.jpg",
            name: "人造石",
          },
          {
            text: "幻影乳胶漆",
            img: "./img/其它/幻影乳胶漆.jpg",
            name: "乳胶漆",
          },

          {
            text: "灰铝",
            img: "./img/其它/灰铝.jpg",
            name: "铝",
          },
          {
            text: "银铝",
            img: "./img/其它/银铝.jpg",
            name: "铝",
          },
          {
            text: "玫瑰金铝",
            img: "./img/其它/玫瑰金铝.jpg",
            name: "铝",
          },
        ],
        画: [
          {
            text: "SPP-828漫漫油画",
            img: "./img/画/SPP-828漫漫油画.JPG",
            flag: false,
            name: "画",
          },
          {
            text: "SPP-824-A蓝色三元素立体画",
            img: "./img/画/SPP-824-A蓝色三元素立体画.JPG",
            name: "画",
          },
          {
            text: "SPP-808M-C01金属线活用油画（中) 杏色",
            img: "./img/画/SPP-808M-C01金属线活用油画（中) 杏色.JPG",
            name: "画",
          },
          {
            text: "SPP-829-C04粉橙色年轮画",
            img: "./img/画/SPP-829-C04粉橙色年轮画.JPG",
            name: "画",
          },
          {
            text: "SPP-866-A01蜂巢油画A款",
            img: "./img/画/SPP-866-A01蜂巢油画A款.JPG",
            name: "画",
          },
          {
            text: "SPP-866-B01蜂巢油画B款",
            img: "./img/画/SPP-866-B01蜂巢油画B款.JPG",
            name: "画",
          },

          {
            text: "我喜欢-蜂巢画(600×700)",
            img: "./img/画/我喜欢-蜂巢画(600×700).JPG",
            name: "画",
          },
          {
            text: "我喜欢-蜂巢画(400×700)",
            img: "./img/画/我喜欢-蜂巢画(400×700).JPG",
            name: "画",
          },
          {
            text: "我喜欢-蜂巢画(400×1300)",
            img: "./img/画/我喜欢-蜂巢画(400×1300).JPG",
            name: "画",
          },
          {
            text: "000",
            img: "./img/画/000.JPG",
            name: "画",
          },
          {
            text: "001",
            img: "./img/画/001.JPG",
            name: "画",
          },
          {
            text: "002",
            img: "./img/画/002.JPG",
            name: "画",
          },
          {
            text: "003",
            img: "./img/画/003.JPG",
            name: "画",
          },
          {
            text: "004",
            img: "./img/画/004.JPG",
            name: "画",
          },
          {
            text: "005",
            img: "./img/画/005.JPG",
            name: "画",
          },
        ],
      },
    };
  },
  methods: {
    handleDragStart(e) {
      e.dataTransfer.setData("index", e.target.dataset.index);
    },
    handleClickTitle(item) {
      this.hotcate1[item][0].flag = !this.hotcate1[item][0].flag;
    },
  },
};
</script>

<style lang="scss" scoped>
.component-list {
  width: 100vw;
  height: 100%;

  .right {
    overflow-y: auto;
    overflow-x: hidden;
  }

  .l {
    font: 18px/100% "幼圆";
    text-align: center;
    border-radius: 2.5px;
    border: 1px solid #dcdfe6;
    color: #606266;
    line-height: 25px;
    margin: 10px 0 10px 0;
  }
  // 按钮按下去样式
  .l:active {
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0;
  }

  .l:hover {
    background-color: #ecf5ff;
    color: #3a8ee6;
  }
  .l_box {
    font: 12px/100% "楷书";
    display: flex;
    justify-self: start;
    flex-wrap: wrap;
  }

  img {
    width: 65px;
    height: 65px;
  }

  .one {
    height: 110px;
    width: 70px;
    margin: 5px;
    padding: 2px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    cursor: pointer;
  }
  // 按钮点击样式
  .one:active {
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0;
  }

  .one:hover {
    background-color: #ecf5ff;
    color: #3a8ee6;
  }
  ::-webkit-scrollbar {
    display: none;
  }

  .one_1 {
    width: 65px;
    border-radius: 5px;
  }

  .one_1 > img {
    border-radius: 5px;
  }

  .one_2 {
    text-align: center;
    margin-top: 5px;
  }
}
</style>
