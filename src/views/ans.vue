<template>
  <div class="swiper_page" id="pg">
    <uni-nav-bar
      title="练习册"
      :color="`#343434`"
      :border="false"
      :statusBar="true"
    >
      <block slot="left">
        <view>
          <img
            class="icon"
            style="height: 20px; margin-left: 10px;"
            @click="u.go(-1)"
            src="https://zijinshe-common-object.oss-cn-shenzhen.aliyuncs.com/staticFile/img/ebook/back.png"
          />
        </view>
      </block>
      <!--    <block slot="title">
        <view class="" style="text-align: center;">
          <text style="color: red;">nihao</text>
        </view>
      </block> -->
      <block slot="right">
        <view>
          <!-- <view class="e" :animation="ad">
            <img class="icon" @click="bai"  style="margin-right: 12px" :src="b ? 'https://liaoning.leziedu.com/cms/webapp/test/h5/static/open.png' : 'https://liaoning.leziedu.com/cms/webapp/test/h5/static/guan.png'" />
          </view> -->
          <view class="e" :animation="ad2">
            <img class="icon" @click="u.go('cuo')" src="../static/cuoti.png" />
          </view>
        </view>
      </block>
    </uni-nav-bar>

    <div id="pages" class="pages" @click="clear">
      <swiper class="swiper" vertical @change="chg" :current="c">
        <swiper-item v-for="(it, index) in pageJsons" :key="index">
          <div class="g2">
            <img
              class="pic"
              :src="
                b
                  ? it.src
                  : index < 2
                  ? it.src
                  : it.src.replace('dianzi/', 'dianzi/b')
              "
            />
            <view
              v-for="(i, t) in it.attaches"
              :key="t"
              class="red-border"
              :a="a == t && c == index"
              :style="i.style"
              @click.stop.prevent="act(it, t, $event)"
            >
              <div class="g1 fcs">
                <div class="tools i1" @click.stop.prevent="cuoti(i)">
                  错题册
                </div>
                <div class="tools i2" @click="jiang(it, i)">看视频</div>
                <div class="tools i3" @click="fan(it, i)">举一反三</div>
              </div>
            </view>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>
<script>
import uniNavBar from "../components/uni-nav-bar/uni-nav-bar.vue";
import p from "../data/page.json";

const pi = "https://prd.oss.leziedu.com/utils/dianzi/";

export default {
  components: { uniNavBar },
  data() {
    return {
      pageJsons: [],
      a: -1, // active
      c: 0, // current
      b: 0, // blank
      ad: {},
      ad2: {}
    };
  },
  async mounted() {
    const w = wx.getSystemInfoSync().screenWidth - 50;

    // const query = uni.createSelectorQuery().in(this)
    // const c = query.select('.swiper').boundingClientRect(r => r |> u.log).exec()

    for (const i of p) {
      const io = { src: pi + i.pageUrl };
      const info = await wx.getImageInfo(io);
      u.set(i, io);
      const DE = w / info[1].width;
      i.attaches &&
        i.attaches.forEach(i => {
          const c = i.coordinate.split(",").map(i => i * DE + "px");
          i.style = { width: c[2], height: c[3], top: c[1], left: c[0] };
          i.p = i.style;
        });
    }
    this.pageJsons = p;
  },
  methods: {
    act(it, t) {
      // u.log(it)
      if (it.ismulu) {
        if (t === 0) {
          this.c = 2;
        }
        if (t === 1) {
          this.c = 3;
        }
        return;
      }
      this.a = t;
    },
    async cuoti(i) {
      i.style = {
        width: 0,
        height: 0,
        top: "-60px",
        right: "5px",
        border: "none"
      };
      const attacheId = i.id;
      this.so.commit("setMistakeList", attacheId);

      // await u.ut.sleep(2000)
      u.ui.tip("已加入错题册");
      this.a = -1;

      var am = uni.createAnimation({
        duration: 500,
        timingFunction: "ease"
      });
      am.rotate(15)
        .step()
        .rotate(-15)
        .step()
        .scale(1.25)
        .rotate(0)
        .step()
        .rotate(15)
        .step()
        .scale(1)
        .rotate(0)
        .step();
      this.ad2 = am.export();

      setTimeout(e => {
        i.style = i.p;
      }, 800);
    },
    jiang(it, i) {
      const { pageId, ismulu } = it;
      const attacheId = i.id;
      u.go("vdi", { pageId, attacheId });
    },
    fan(it, i) {
      const { pageId, ismulu } = it;
      const attacheId = i.id;
      u.go("fan", { pageId, attacheId });
    },
    chg(e) {
      this.c = e.detail.current;
      this.a = -1;
      for (const i of p) {
        i.attaches &&
          i.attaches.forEach(i => {
            i.style = i.p;
          });
      }
      this.pageJsons = p;
    },
    bai() {
      var am = uni.createAnimation({
        duration: 500,
        timingFunction: "ease"
      });
      am.translate(0, 5)
        .step()
        .translate(0, -5)
        .step()
        .translate(0, 5)
        .step()
        .translate(0, 0)
        .step();
      this.ad = am.export();

      this.b = !this.b;
    },
    clear() {
      this.a = -1;
    }
  }
};
</script>

<style scoped>
.red-border {
  position: absolute;
  max-width: 98%;
  border: 1px dashed #ff2638;
  border-radius: 4px;
  transition-property: width, height, opacity;
  transition-duration: 0.8s;
  transition-timing-function: ease;
}

.red-border[a="true"] {
  box-shadow: 0 0 0 500px rgba(0, 0, 0, 0.5);
}

.red-border > .g1 {
  /* display: none; */
  bottom: 50%;
  w: 0;
  left: 50%;
}

.red-border[a="true"] > .g1 {
  /* display: flex; */
  b: -60;
  w: 100%;
  left: 0;
}

.red-border > .g1 > .tools {
  /* display: none; */
  /* visibility: hidden; */
  opacity: 0;
  width: 0;
  height: 0;
  font-size: 0;
  /* transition: all 1s cubic-bezier(1,0,1,1.5); */
  transition-property: width, height, opacity;
  transition-duration: 0.8s;
  transition-timing-function: cubic-bezier(1, 0, 1, 1.5);
}

.g1 {
  display: flex;
  ps: ab;
  b: -60;
  text-align: center;
  transition: all 1s;
}

.red-border[a="true"] > .g1 > .tools {
  op: 1;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  font-size: 15px;
  font-weight: bold;
  color: #c0c0c0;
  lh: 140;
  wh: nowrap;
}

.g2 {
  width: 750px;
  /* box-shadow: 0 0 0 12px #f0b400; */
  border-radius: 10px;
  /* border: 3px solid #B35E21; */
  margin: 10% auto;
  position: relative;
  box-sizing: border-box;
}

.pic {
  border-radius: 8px;
  vertical-align: top;
}

.i1 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps353eefd120446948-b96c-43f6-b358-d3758dd5f430);
}
.i2 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps7b0fd81d5377149b-d10a-4b9c-b9e5-021214aa63c7);
}
.i3 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/psb94a6fdf5f13c644-75d9-4370-a862-2ac326215e0a);
}

.swiper_page {
  /* background-color: #13C5F8; */
}
</style>
