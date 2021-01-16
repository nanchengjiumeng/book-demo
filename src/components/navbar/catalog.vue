<template>
  <div class="nav__bar">
    <div class="left">
      <div class="back" @click="$rouer.back()"></div>
    </div>
    <div class="center">练习册</div>
    <div class="right">
      <van-icon class="favorites" :name="SrcCuoti" badge="99+" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import SrcCuoti from '../../static/cuoti.png';
export default {
  data() {
    return {
      SrcCuoti,
    };
  },
};
</script>

<style lang="scss" scoped="" type="text/css">
.nav__bar {
  height: 92px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .center {
    flex: 1;
    display: flex;
    justify-content: center;
    font-weight: 500;
    font-size: 32px;
    color: #000000;
  }
  .left {
    flex-shrink: 0;
    width: 92px;
    .back {
      height: 92px;
      width: 51px;
      background: url('../../assets/image/back.png') no-repeat;
      background-size: 19px 32px;
      background-position: center;
    }
  }
  .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-shrink: 0;
    height: 100%;
    width: 94px;
    .favorites {
      font-size: 44px;
      & /deep/ .van-info {
        background: #607de6;
      }
    }
  }
}
</style>
