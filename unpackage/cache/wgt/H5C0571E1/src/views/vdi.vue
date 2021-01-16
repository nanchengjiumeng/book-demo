<template>
  <div class="swiper_page" id="pg">
    <uni-nav-bar
      title="看视频"
      :background-color="`#30D1FF`"
      :color="`#fff`"
      :border="false"
    >
      <block slot="left">
        <view>
          <img
            class="icon"
            style="height: 20px; margin-left: 10px;"
            @click="close"
            src="https://lanhu.oss-cn-beijing.aliyuncs.com/psb99b59686c5c1550-ccc8-498d-af84-bcb38c0e903f"
          />
        </view>
      </block>
      <block slot="right">
        <view>
          <!-- <img class="icon" style="margin-right: 12px" src="https://liaoning.leziedu.com/cms/webapp/test/h5/static/open.png" /> -->
          <img
            class="icon"
            @click="u.go('cuo')"
            src="https://alipic.lanhuapp.com/psfff9fd7ed8c396d0-40f9-4e3f-9f5b-5c23f810ef53"
          />
        </view>
      </block>
    </uni-nav-bar>

    <div class="close" @click="close"></div>
    <div id="pages" class="pages" :style="s1">
      <swiper class="swiper" vertical @change="chg" :current="a">
        <swiper-item v-for="(it, index) in list" :key="index">
          <div class="g2">
            <img class="pic" :src="img" :style="s0" />
            <video
              class="e2"
              :poster="poster"
              controls
              :src="it.video"
              :style="s0"
            ></video>
          </div>
        </swiper-item>
      </swiper>
      <div class="i1 flcs">
        <div
          class="e1"
          v-for="(i, t) in list.length"
          :key="t"
          @click="a = t"
          :a="a == t"
        >
          {{ i }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import uniNavBar from "../components/uni-nav-bar/uni-nav-bar.vue";
import uniTransition from "../components/uni-transition/uni-transition.vue";
import mistake from "../data/mistake.json";

export default {
  components: { uniNavBar, uniTransition },
  data() {
    return {
      list: [],
      poster: "",
      a: 0,
      img: "",
      s0: {
        opacity: 0
      },
      s1: {
        backgroundImage:
          "url(https://liaoning.leziedu.com/cms/webapp/test/h5/static/in.gif)",
        backgroundPosition: "0 -60px"
      }
    };
  },
  created() {
    const { pageId, attacheId } = this.$route.query;
    this.attacheId = attacheId;

    setTimeout(e => {
      this.list = mistake[pageId][attacheId].jiangjie;
      this.poster = mistake[pageId][attacheId].poster;
      this.img = mistake[pageId][attacheId].img;
      this.s0 = {};
      this.s1 = {};
    }, 1300);
  },
  async mounted() {},
  methods: {
    chg(e) {
      this.a = e.detail.current;
    },
    close() {
      this.list = [];
      this.poster = "";
      this.img = "";
      this.s0 = {
        opacity: 0
      };
      this.s1 = {
        backgroundPosition: "0 -60px",
        backgroundImage:
          "url(https://liaoning.leziedu.com/cms/webapp/test/h5/static/out.gif)"
      };
      setTimeout(e => {
        u.go("ans");
      }, 1100);
    }
  }
};
</script>

<style scoped>
.g2 {
  width: 669px;
  min-height: 80vh;
  box-shadow: 0 0 0 12px #f0b400;
  border-radius: 10px;
  border: 3px solid #b35e21;
  margin: 10% auto;
  position: relative;
  box-sizing: border-box;
  background-color: white;
  background-size: 112%;
  background-position: -20px -114px;
}

.pic {
  margin-top: 10px;
  transition: opacity 0.2s;
}
.e2 {
  /* margin-top: 10px; */
  height: 500px;
  object-fit: cover;
}

.swiper_page {
  background-color: #13c5f8;
  background-position: 0 -30px;
  /* background-image: url(https://liaoning.leziedu.com/cms/webapp/test/h5/static/in.gif); */
}

.i1 {
  width: 44px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 22px;
  ps: ab;
  r: 10;
  top: 30%;
}

.e1 {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  ta: c;
  lh: 30;
  m: 20 auto;
  f: 16;
  font-weight: bold;
  color: #454545;
  background-image: url(https://alipic.lanhuapp.com/ps8c0f130a6e702080-734c-4cd9-b92b-8c107d679ef6);
}

.e1[a="true"] {
  c: #fff;
  text-shadow: 0 0 2px black;
  background-image: url(https://alipic.lanhuapp.com/ps9d9938332a70a1c4-bcf4-4274-b120-b32110ae3ee0);
}

.close {
  width: 25px;
  height: 25px;
  ps: ab;
  z: 1;
  margin-top: 15px;
  ml: 15px;
  op: 0.8;
  br: 50%;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("https://alipic.lanhuapp.com/psedb7a72c6fbc2893-844e-4d36-aab0-65405b51a66a");
}
</style>
