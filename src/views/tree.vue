<template>
  <div id="container" class="container">
    <div :style="{height: statusHeight + 'px'}"></div>
    <div class="bg-blur"></div>
    <Info ref="bookInfo" />
    <Tree class="tree__box" />
    <div class="fiexed__bottom">
      <div class="button__start">开始阅读</div>
    </div>
  </div>
</template>

<script>
import Info from '../components/catalog/Info';
import Tree from '../components/catalog/tree';
export default {
  components: {
    Info,
    Tree,
  },
  data() {
    return {
      scrollTop: 0,
      statusHeight: 0,
    };
  },
  methods: {
    onScroll({ target }) {
      const scrollTop = target.scrollTop;
      if (Math.abs(scrollTop - this.scrollTop) > 10) {
        this.scrollTop = scrollTop;
      }
    },
    watchScrollTop() {
      let direct = 1;
      const criticalScrollTop = 220;
      const watch = () => {
        let unWatch = this.$watch(
          'scrollTop',
          (top, lastTop) => {
            if ((top > 20) & (lastTop < top) && direct === 1) {
              direct = -1;
              unWatch();
              this.$refs.bookInfo.triggleAnimation().finished.then(() => {
                watch();
              });
            }
            if ((top <= criticalScrollTop) & (lastTop > top) && direct === -1) {
              direct = 1;
              unWatch();
              this.$refs.bookInfo.triggleAnimation().finished.then(() => {
                watch();
              });
            }
          },
          {
            immediate: true,
          }
        );
      };
      watch();
    },
  },
  mounted() {
    this.statusHeight = this.$plus.navigator.getStatusbarHeight();
    this.scrollTop = 0;

    const ele = document.querySelector('#container');

    ele.addEventListener('scroll', this.onScroll);
    this.watchScrollTop();
  },
  destroyed() {
    this.$refs.container.removeEventListener('scroll', this.onScroll);
  },
};
</script>

<style scoped="" lang="scss">
.container {
  height: 100vh;
  padding-bottom: 102px;
  overflow-y: scroll;
  box-sizing: border-box;
  .nav__bar {
    position: fixed;
  }
  .tree__box {
    min-height: 200px;
  }
}

.bg-blur {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: -1;
  background-repeat: no-repeat;
  /* background-position: center; */
  background-size: 100%;
  -webkit-filter: blur(60px);
  -moz-filter: blur(60px);
  -o-filter: blur(60px);
  -ms-filter: blur(60px);
  opacity: 0.3;
  filter: blur(40px);
  background: url('../assets/image/fengmian.jpg');
  height: 620px;
  /* border-radius: 0 0 50% 50%; */
}

.bg-blur:before {
  background-color: rgba(255, 255, 255, 0.3);
  content: '';
  width: 100%;
  height: 620px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  /* border-radius: 0 0 50% 50%; */
}

.fiexed__bottom {
  position: fixed;
  bottom: 0;
  width: 750px;
  height: 102px;
  padding: 6px;
  box-sizing: border-box;

  background: #ffffff;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.06);

  .button__start {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 686px;
    height: 88px;

    background: linear-gradient(137.66deg, #ff9877 0%, #ef5e36 100%);
    border-radius: 44px;

    font-weight: 500;
    font-size: 32px;
    line-height: 16px;
    /* identical to box height, or 100% */
    text-transform: uppercase;
    color: #ffffff;
    opacity: calc(1);
    transition: opacity 0.1s;

    &.button-hover {
      margin-top: 2px;
      position: relative;
      opacity: calc(0.7);
      transition: opacity 0.1s;
    }
  }
}
.icon {
  height: 40px;
  width: 40px;
  &.icon__back {
    margin-left: 20px;
    background: url('../static/back.png');
    background-size: contain;
  }
}
</style>
