<template>
  <div class="tree__container">
    <div class="border"></div>
    <div class="tree">
      <div class="title"></div>
      <div class="chapter__item" v-for="chapter in catalogData" :key="chapter.key">
        <div class="chapter" @click="chapter.show = !chapter.show" :class="chapter.show && 'show'">
          <div class="left">
            <span class="prefix" v-if="chapter.prefix">
              {{
              chapter.prefix
              }}
            </span>
            <span class="name">{{ chapter.name }}</span>
          </div>
          <div class="right"></div>
        </div>
        <!-- <transition name="fold"> -->
        <div class="question__list" :class="chapter.show && 'show'">
          <div class="question__item" v-for="question in chapter.children" :key="question.key">
            <div class="question" @click="toPage(question.pageNum)">
              <div class="name">{{ question.name }}</div>
              <div class="page__number">{{ question.pageNum }}</div>
            </div>
          </div>
        </div>
        <!-- </transition> -->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import catalogData from './data.json';
export default {
  data() {
    return {
      catalogData: catalogData.map((c, i) => {
        const name = c.name.split(' ');
        return {
          key: `chapter-${i}`,
          prefix: name.length > 1 ? `第${name[0]}章` : null,
          name: name.length > 1 ? name.slice(1).join(' ') : c.name,
          pageNum: c.pageNum,
          show: false,
          children: c.children.map((q, qi) => ({
            key: `question-${qi}`,
            name: q.name,
            pageNum: q.pageNum,
          })),
        };
      }),
    };
  },
  methods: {
    toPage(number = 0) {
      this.$router.push({
        name: 'Answer',
        params: {
          number,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped="" type="text/css">
.tree__container {
  display: flex;
  flex-direction: column;
}
.tree {
  flex: 1;
  background: #fff;
  .title {
    margin: 0 32px;
    height: 64px;
    background: url('../../assets/image/icon-catalog.png') no-repeat;
    background-size: contain;
  }
}
.border {
  height: 52px;
  background: url('../../assets/image/catalog-book_info_bg.png') no-repeat;
  background-size: 100% 100%;
}

.chapter__item {
  .chapter {
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 84px;
    font-size: 28px;

    transition: background 200ms;

    .prefix {
      margin-right: 12px;
      font-size: 24px;
      color: #666666;
    }

    .right {
      height: 100%;
      width: 22px;
      background-image: url('../../assets/image/arrow-up.png');
      background-size: 22px 12px;
      background-position: center;
      transform: rotateX(-180deg);
      transition: transform 200ms;
    }
    &.show {
      background: #f8f8f8;
      .right {
        transform: rotateX(0);
      }
    }
  }
}
.question__list {
  height: 0;
  opacity: 0;
  overflow: hidden;
  &.show {
    height: auto;
    opacity: 1;
    height: auto;
    transition: all 300ms;
  }
  .question {
    justify-content: space-between;
    padding-left: 56px;
    padding-right: 32px;
    display: flex;
    align-items: center;
    height: 68px;
    font-size: 28px;
    color: #666666;
    &:active {
      background: #f8f8f8;
    }
  }
}
</style>
