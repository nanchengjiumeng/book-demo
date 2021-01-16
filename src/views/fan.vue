<template>
  <div class="explain">
    <uni-nav-bar
      title="练习册"
      :background-color="`#30D1FF`"
      :color="`#fff`"
      :border="false"
    >
      <block slot="left">
        <view>
          <img
            class="icon"
            style="height: 20px; margin-left: 10px;"
            @click="u.go('ans')"
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

    <div id="g0" class="g g0" :a="a">
      <div id="i37" class="i i37"></div>
      <div id="i38" class="i i38"></div>
      <div id="i39" class="i i39"></div>
      <div id="i40" class="i i40"></div>
      <div id="i41" class="i i41"></div>
    </div>
    <div id="g1" class="g g1">
      <!-- <div id="i25" class="i i25"></div> -->
      <!-- <div id="i26" class="i i26" data-text="举一反三"></div> -->
      <div id="i27" class="i i27" :data-text="ti[a - 1].con"></div>
      <div id="i28" class="i i28" :data-text="`${a}/3`"></div>
      <img id="i29" class="i i29" :src="ti[a - 1].img" />
      <!-- <div id="i30" class="i i30"></div> -->
      <div id="i31" class="i i31"></div>
      <div id="i32" class="i i32">
        <div id="i34" class="i i34" :style="`width: ${t}%`"></div>
      </div>
      <div id="i35" class="i i35" data-text="60s"></div>
      <div id="i36" class="i i36"></div>
    </div>
    <div id="g2" class="g g2 flc">
      <div
        id="i9"
        class="i9"
        v-for="(i, t) in cho"
        :key="t"
        :r="i.r"
        @click="check(i)"
      >
        {{ i.t }}
      </div>
    </div>
    <div id="g3" class="g g3" v-if="s">
      <div id="i6" class="i i6"></div>
      <!--        <div id="i24" class="i i24"></div>
        <div id="i7" class="i i7"></div>
        <div id="i8" class="i i8"></div> -->
      <div
        id="i19"
        class="i i19"
        :data-text="`我的选项：${c}       正确答案：`"
      >
        {{ ti[a - 1].r }}
      </div>
      <div id="i20" class="i i20" :data-text="ti[a - 1].exp"></div>
      <div id="i22" class="i i22"></div>
      <!-- <div id="i23" class="i i23" data-text="答案解析"></div> -->
    </div>
    <div id="g4" class="g g4">
      <div id="i21" class="i i21" @click="next"></div>
    </div>
    <res v-if="r" :t="tt" :p="p"></res>
  </div>
</template>

<script>
import uniNavBar from "../components/uni-nav-bar/uni-nav-bar.vue";
import res from "./res.vue";
import mistake from "../data/mistake.json";
import { ti } from "../data/ti.js";

export default {
  components: { uniNavBar, res },
  data() {
    return {
      a: 1, // active
      // list: [],
      t: 0, // time
      s: false, // show explain
      r: 0, // result
      ti,
      cho: [], // choice
      c: "", // current select
      p: 0, // percent
      tt: 0 // total time
    };
  },
  created() {
    // const { pageId, attacheId } = this.$route.query
    // this.list = mistake[pageId][attacheId].juyifansan

    this.cho = this.ti[this.a - 1].cho.split(";").map(i => ({ t: i }));
  },
  mounted() {
    const t = setInterval(e => {
      if (this.t > 100) return (this.s = true), (this.t = 0), clearInterval(t);
      this.t = this.t + 100 / 60;
    }, 1000);
  },
  methods: {
    right(t) {
      return t.startsWith(this.ti[this.a - 1].r);
    },
    check(i) {
      if (this.s) return;
      this.ti[this.a - 1].p = this.t;
      this.c = i.t.slice(0, 1);
      if (this.right(i.t)) {
        i.r = 1;
        this.ti[this.a - 1].w = 1;
      } else {
        i.r = 0;
        this.cho.find(i => this.right(i.t)).r = 1;
        this.ti[this.a - 1].w = 0;
      }
      this.s = true;
    },
    next() {
      if (this.a > 2) {
        this.tt = ~~eval(this.ti.map(i => i.p).join("+"));
        this.p = ~~((this.ti.filter(i => i.w).length / this.ti.length) * 100);
        this.r = 1;
        return;
      }
      this.a += 1;
      this.cho = this.ti[this.a - 1].cho.split(";").map(i => ({ t: i }));
      this.s = false;
      this.c = "";
      this.t = 0;
    }
  }
};
</script>

<style scoped>
.g0 {
  height: 234px;
}
.g1 {
  height: 500px;
}
/* .g2 { height: 595px; } */
.g3 {
  height: 518px;
}
.g4 {
  height: 348px;
}
.i6 {
  top: 24px;
}
.i7 {
  bottom: 0;
}
.i8 {
  top: 24px;
}
.i19 {
  top: 183px;
}
.i20 {
  top: 246px;
}
.i21 {
  top: 76px;
}
.i22 {
  top: 166px;
}
.i23 {
  top: 38px;
}
.i25 {
  top: 0px;
}
.i26 {
  top: 14px;
}
.i27 {
  top: 198px;
}
.i28 {
  top: 129px;
}
.i29 {
  top: 391px;
}
.i30 {
  top: 391px;
}
.i31 {
  top: 129px;
}
.i32 {
  top: 142px;
}
.i35 {
  top: 139px;
}
.i36 {
  top: 124px;
}
.i37 {
  top: 39px;
}
.i38 {
  top: 50px;
}
.i39 {
  top: 65px;
}
.i40 {
  top: 65px;
}
.i41 {
  top: 65px;
}
.i6 {
  width: 650px;
  height: 494px;
  left: 47px;
}
.i7 {
  width: 641px;
  height: 155px;
  left: 54px;
}
.i8 {
  width: 650px;
  height: 199px;
  left: 47px;
}
.i9 {
  width: 454px;
  line-height: 100px;
  margin-bottom: 32px;
}
.i11 {
  width: 454px;
  line-height: 100px;
  left: 145px;
}
.i19 {
  width: 384px;
  height: 27px;
  left: 256px;
}
.i20 {
  width: 390px;
  height: 166px;
  left: 257px;
}
.i21 {
  width: 430px;
  height: 155px;
  left: 157px;
}
.i22 {
  width: 149px;
  height: 156px;
  left: 76px;
}
.i23 {
  width: 167px;
  height: 37px;
  left: 288px;
}
.i25 {
  width: 648px;
  height: 493px;
  left: 52px;
}
.i26 {
  width: 164px;
  height: 34px;
  left: 290px;
}
.i27 {
  width: 574px;
  height: 160px;
  left: 89px;
}
.i28 {
  width: 44px;
  height: 31px;
  left: 620px;
}
.i29 {
  width: 576px;
  margin: auto;
  left: 0;
  right: 0;
}
.i30 {
  width: 500px;
  height: 278px;
  left: 134px;
}
.i31 {
  width: 342px;
  height: 37px;
  left: 93px;
}
.i32 {
  width: 243px;
  height: 15px;
  left: 135px;
}
.i34 {
  height: 15px;
}
.i35 {
  width: 33px;
  height: 16px;
  left: 388px;
}
.i36 {
  width: 54px;
  height: 59px;
  left: 82px;
}
.i37 {
  width: 634px;
  height: 177px;
  left: 49px;
}
.i38 {
  width: 614px;
  height: 154px;
  left: 59px;
}
.i39 {
  width: 112px;
  height: 116px;
  left: 110px;
}
.i40 {
  width: 112px;
  height: 116px;
  left: 315px;
}
.i41 {
  width: 112px;
  height: 116px;
  left: 522px;
}
.i9 {
  font-size: 40px;
  color: #10668d;
}
.i16 {
  font-size: 40px;
  color: #ffffff;
}
.i19 {
  font-size: 28px;
  color: #346965;
  line-height: 28px;
  font-weight: bold;
}
.i20 {
  font-size: 28px;
  color: #8e5c32;
  font-weight: bold;
}
.i23 {
  font-size: 40px;
  color: #ffffff;
  line-height: 40px;
}
.i26 {
  font-size: 40px;
  color: #ffffff;
  line-height: 40px;
}
.i27 {
  font-size: 26px;
  color: #10668d;
  font-weight: bold;
}
.i28 {
  font-size: 38px;
  color: #10668d;
  line-height: 38px;
}
.i35 {
  font-size: 20px;
  color: #a34294;
  line-height: 20px;
  font-weight: bold;
}
.i46 {
  font-size: 72px;
  color: #ffffff;
  line-height: 72px;
}
.i47 {
  font-size: 72px;
  color: #ffffff;
  line-height: 72px;
}
.i48 {
  font-size: 72px;
  color: #ffffff;
  line-height: 72px;
}
.i9 {
  border-radius: 50px 50px 50px 50px;
}
.i31 {
  border-radius: 18px 18px 18px 18px;
}
.i32 {
  border-radius: 8px 8px 8px 8px;
}
.i37 {
  border-radius: 52px 52px 52px 52px;
}
.i38 {
  border-radius: 40px 40px 40px 40px;
}
.i9 {
  background-color: #e8fafa;
}
.i29 {
  background-color: #ffffff;
}
.i31 {
  background-color: #ffffff;
}
.i32 {
  background-color: #a34294;
}
.i34 {
  background-color: #f8d3f4;
}
.i37 {
  background-color: #d5b386;
}
.i38 {
  background-color: #fffaf3;
}
.i42 {
  background-color: #b2df65;
}
.i43 {
  background-color: #b8b8b8;
}
.i44 {
  background-color: #b9b9b9;
}
.i45 {
  background-color: #b9b9b9;
}
.i7 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps8ddee0ce5fb709a6-6fab-4835-bb6d-c92bbacfb733);
}
.i8 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/psaf3d7c254da30d4f-42e8-426a-8a22-7a22eb06a93d);
}
.i18 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps9185885d14398202-2a62-4515-ad09-65e55da190ed);
}
.i21 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps7c80e8101e52a51c-9fd2-42ce-b945-aba3c792055a);
}
.i22 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps0bb81d211d0365b8-5df4-4ef3-aa37-3ba5e46c0f37);
}
.i25 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps5334f0a0758caa0f-46bc-4eed-a23f-b5502a65cdd2);
}
.i36 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps0c38e51ed731489d-1fab-4f20-9dd1-d3879d46839e);
}

.g0[a="1"] .i39 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps1d68d4ae39521c10-e509-47b3-8b78-a2a50a1b3ecb);
}
.g0[a="1"] .i40 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps060947083f8841c3-3ec3-4ce1-8f61-fe6a1cc2f6de);
}
.g0[a="1"] .i41 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps0435ba26d7e3a44c-4cd0-40b9-ac31-073e492787ba);
}

.g0[a="2"] .i39 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps8e1d6218a0c5f3b2-c84b-4a2a-8d3c-b7d08cf6c988);
}
.g0[a="2"] .i40 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/psb0f7729d3235a4d4-2a09-427f-82bc-a7a4e1f7d256);
}
.g0[a="2"] .i41 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps0435ba26d7e3a44c-4cd0-40b9-ac31-073e492787ba);
}

.g0[a="3"] .i39 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps8e1d6218a0c5f3b2-c84b-4a2a-8d3c-b7d08cf6c988);
}
.g0[a="3"] .i40 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps060947083f8841c3-3ec3-4ce1-8f61-fe6a1cc2f6de);
}
.g0[a="3"] .i41 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps4446d83a3eeb54b8-14b1-4c7f-a8fa-a10f20b058a2);
}

.g2 > * {
  ta: c;
}
.i31 {
  border: 2px solid #ccc;
}
.i34 {
  border-radius: 8px 8px 8px 8px;
}
.i9 {
  background-color: #e8fafa;
}
.i9[r="1"] {
  color: #fff;
  font-weight: bold;
  background-color: #73d490;
  box-shadow: 0px -6px 0px 0px #5dbe7a;
  bgs: 34px;
  bgp: 20 center;
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps57698d79fdae7d8d-766a-42b6-818c-077767804060);
}
.i9[r="0"] {
  color: #fff;
  font-weight: bold;
  background-color: #ec6f6c;
  box-shadow: 0px -6px 0px 0px #d05350;
  bgs: 34px;
  bgp: 20 center;
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps9185885d14398202-2a62-4515-ad09-65e55da190ed);
}

.i24 {
  background-color: #f5efe1;
  width: 628px;
  height: 154px;
  left: 52px;
  top: 216px;
  border-left: 10px solid #cfa877;
  border-right: 8px solid #cfa877;
  transform: perspective(9em) rotateX(-2deg);
}

.g2 {
  padding-bottom: 10px;
  bgs: 650px;
  bgp: center bottom;
  background-image: url(https://liaoning.leziedu.com/cms/webapp/test/h5/static/x.png);
}

.g1 {
  bgs: 646px;
  bgp: center top;
  background-image: url(https://liaoning.leziedu.com/cms/webapp/test/h5/static/x.png);
}

.i6 {
  background-image: url(https://liaoning.leziedu.com/cms/webapp/test/h5/static/s.png);
}

.explain {
  background: linear-gradient(177deg, #31d9ca 0%, #2dc3c0 96%);
}
</style>
