<template>
  <div class="mistakes">
    <div class="title">
      我的错题册
    </div>
    <div class="mistake_list">
      <div v-for="(item, index) in imgList" :key="index" class="mistake_img">
        <img :src="item" alt="" />
      </div>
    </div>
    <div class="print_height"></div>
    <div class="print flex-row flex-jc-bt flex-al-center">
      <div class="back flex-col flex-al-center" @click="u.go(-1)">
        <img
          src="https://img.yzcdn.cn/upload_files/2020/11/15/Fiu2xrsoEr99dt2AGOE-Gpm_qCmj.png"
          alt=""
        />
        <span>返回</span>
      </div>
      <div class="print_but flex-center" @click="show">
        打印错题册
      </div>
    </div>
  </div>
</template>
<script>
import mistakes from "../data/mistake.json";
export default {
  data() {
    return {
      imgList: []
    };
  },
  created() {
    const l = this.st.cuos;
    this.imgList = Object.values(mistakes)
      .map(i => u.en(i))
      .flat()
      .filter(i => l.includes(+i[0]))
      .map(i => i[1])
      .flat()
      .map(i => i.img);
  },
  mounted() {},
  methods: {
    show() {
      u.ui.modal(
        "您可以：1.检查打印机是否正常         2.检查与手机连接成功",
        0,
        { title: "未检测到打印机" }
      );
    }
  }
};
</script>

<style>
.flex-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.flex-row-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-al-center {
  display: flex;
  align-items: center;
}

.flex-jc-bt {
  justify-content: space-between;
}

.flex-jc-center {
  justify-content: center;
}

.flex-jc-ar {
  justify-content: space-around;
}
</style>

<style lang="scss">
.mistakes {
  background: #ffffff;
  padding: 16px 14px;
  .title {
    width: 102px;
    height: 19px;
    font-size: 20px;
    font-weight: bold;
    color: #333333;
    line-height: 21px;
  }
  .mistake_list {
    margin-top: 18px;
    .mistake_img {
      margin-bottom: 15px;
      border: 1px solid #e5e5e5;
      img {
        width: 100%;
      }
    }
  }
  .print_height {
    height: 64px;
  }
  .print {
    height: 64px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 16px 0 19px;
    border-top: 1px solid #e5e5e5;

    .back {
      img {
        width: 9px;
        margin-top: 8px;
      }
      span {
        font-size: 13px;
        margin-top: 5px;
        font-weight: 400;
        color: #666666;
        line-height: 21px;
      }
    }
    .print_but {
      width: 298px;
      height: 40px;
      background: linear-gradient(-87deg, #ff4246 0%, #e28f5a 100%);
      border-radius: 20px;
      font-size: 17px;
      color: #ffffff;
      line-height: 21px;
    }
  }
  .no_print {
    width: 306px;
    height: 297px;
    background: #ffffff;
    border-radius: 7px;
    overflow: hidden;
    padding-top: 61px;
    .text {
      .text1 {
        img {
          width: 27px;
          margin-right: 12px;
        }
        span {
          font-size: 25px;
          color: #333333;
          line-height: 25px;
        }
      }
      .text2 {
        padding-left: 43px;
        margin-top: 17px;
        margin-bottom: 52px;
        font-size: 15px;
        color: #666666;
        line-height: 25px;
      }
    }
    .but {
      width: 216px;
      height: 40px;
      background: linear-gradient(-87deg, #ff4246 0%, #e28f5a 100%);
      border-radius: 20px;
      font-size: 21px;
      color: #ffffff;
      line-height: 25px;
    }
  }
}
</style>
