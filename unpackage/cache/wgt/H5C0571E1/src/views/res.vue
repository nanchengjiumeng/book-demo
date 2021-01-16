<template>
  <div id="po" class="po">
    <div id="g1" class="g g1">
      <div id="i14" class="i i14"></div>
      <div id="i15" class="i i15" @click="close"></div>
      <div id="i17" class="i i17" :data-text="`${p}%`"></div>
      <div id="i12" class="i i12">
        <div id="i18" class="i i18" :style="`width: ${p}%`"></div>
      </div>
      <div id="i21" class="i i21" :data-text="time()"></div>
      <div id="i22" class="i i22">
        <div id="i23" class="i i23" :style="`width: ${t}%`"></div>
      </div>
    </div>
    <div id="g2" class="g g2">
      <div id="i16" class="i i16" @click="close"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["p", "t"],
  methods: {
    close() {
      this.$parent.r = 0;
    },
    time() {
      const s = this.t / (100 / 180);
      return ~~(s / 60) + "分" + ~~(s % 60) + "秒";
    }
  }
};
</script>

<style scoped>
.g1 {
  height: 509px;
}
.g2 {
  height: 462px;
}
.i14 {
  top: 0;
}
.i15 {
  top: 53px;
}
.i16 {
  top: 23px;
}
.i17 {
  top: 234px;
}
.i21 {
  top: 343px;
}
.i22 {
  top: 373px;
}
.i14 {
  width: 684px;
  height: 509px;
  left: 33px;
}
.i15 {
  width: 68px;
  height: 69px;
  left: 638px;
}
.i16 {
  width: 250px;
  height: 125px;
  left: 262px;
}
.i17 {
  width: 63px;
  height: 19px;
  left: 451px;
}
.i18 {
  height: 25px;
}
.i21 {
  width: 90px;
  height: 23px;
  left: 442px;
}
.i22 {
  width: 239px;
  height: 25px;
  left: 363px;
}
.i23 {
  height: 25px;
}
.i17 {
  font-size: 24px;
  color: #2b728c;
  line-height: 24px;
}
.i21 {
  font-size: 24px;
  color: #2b728c;
  line-height: 24px;
}
.i18 {
  border-radius: 12px 12px 12px 12px;
}
.i22 {
  border-radius: 12px 12px 12px 12px;
}
.i23 {
  border-radius: 12px 12px 12px 12px;
}
.i18 {
  background-color: #b6ef77;
}
.i22 {
  background-color: #1899a5;
}
.i23 {
  background-color: #65e0eb;
}
.i17 {
  width: 83px;
}
.i21 {
  width: 110px;
}
.i14 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps305872afc629c58d-4598-4a93-a6ab-210f9fdd7177);
}
.i15 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps37b2dd37d34a9045-6119-4529-80dc-f1966388c0fd);
}
.i16 {
  background-image: url(https://lanhu.oss-cn-beijing.aliyuncs.com/ps9f1a963b253a9798-e4ee-413b-b252-91c17b9357e5);
}

.i12 {
  top: 260px;
  width: 239px;
  height: 25px;
  left: 363px;
  border-radius: 12px 12px 12px 12px;
  background-color: #83b436;
}
</style>

<style scoped>
.po {
  position: fixed;
  top: 20%;
  outline: 100vmax solid rgba(0, 0, 0, 0.7);
}
</style>
