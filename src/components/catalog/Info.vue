<template>
  <div>
    <div class="header__container">
      <div ref="boxBookInfo" class="box__book__info book_info">
        <div class="book_info_fm" ref="infoFm">
          <img width="100%" height="100%" :src="book.coverImage" @click="previewImage()" />
        </div>
        <div class="book__info__item item__title" ref="infoItemTitle">
          <div class="title" ref="title">冀教版数学六年级上册同步练习册</div>
        </div>
        <div class="book__info__item item__auth" ref="infoItemAuth">
          <div class="anther" ref="auth">作者：***</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { ImagePreview } from 'vant';
import anime from '../../utils/anime.es';
import fengmia from '../../assets/image/fengmian.jpg';
export default {
  data() {
    return {
      book: {
        coverImage: fengmia,
      },
      show: true,
    };
  },
  mounted() {
    this.generateAnimations();
  },
  methods: {
    generateAnimations() {
      const targetFmOrigin = {
        width: 82 * 0.9,
        height: 145 * 0.9,
      };
      const InfoItemMrginLeft = targetFmOrigin.width + 20;
      this.animationInfo = anime.timeline({
        autoplay: false,
        duration: 400,
        easing: 'linear',
      });
      this.$refs.infoFm.style.transform = 'translateX(-50%)';

      this.animationInfo
        .add(
          { targets: this.$refs.boxBookInfo, height: targetFmOrigin.height },
          0
        )
        .add(
          {
            targets: this.$refs.infoFm,
            left: 0,
            translateX: 0,
            ...targetFmOrigin,
          },
          0
        )
        .add(
          { targets: this.$refs.infoItemTitle, opacity: 0, duration: 50 },
          100
        )
        .add(
          { targets: this.$refs.infoItemTitle, opacity: 1, duration: 50 },
          250
        )
        .add(
          {
            targets: this.$refs.infoItemTitle,
            right: 0,
            top: 0,
            duration: 200,
          },
          100
        )
        .add(
          {
            targets: this.$refs.title,
            marginLeft: InfoItemMrginLeft,
            duration: 200,
          },
          100
        )
        .add(
          {
            targets: this.$refs.infoItemAuth,
            right: 0,
            top: 48,
            duration: 200,
          },
          200
        )
        .add(
          {
            targets: this.$refs.auth,
            marginLeft: InfoItemMrginLeft,
            duration: 200,
          },
          200
        );
      // 每次play都先反转，再播放。 先反转一次，保证第一次play的动画是正向。
      this.animationInfo.reverse();
    },
    triggleAnimation() {
      this.animationInfo.reverse();
      this.animationInfo.play();
      return this.animationInfo;
    },
    previewImage() {
      const images = [this.book.coverImage];
      ImagePreview(images)
    },
  },
};
</script>

<style lang="scss" scoped="" type="text/css">
.header__container {
  position: relative;
  overflow: hidden;
}
.box__book__info {
  overflow: hidden;
  margin: 0 36px 0 50px;
}
.background__image--blur {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 100%;
  -webkit-filter: blur(60px);
  -moz-filter: blur(60px);
  -o-filter: blur(60px);
  -ms-filter: blur(60px);
  opacity: 0.2;
  filter: blur(40px);
  z-index: -1;
  .mask {
    background-color: rgba(255, 255, 255, 0.3);
    width: 160%;
    height: 100%;
  }
}

.book_info {
  height: 434px;
  position: relative;
}
.book_info .book_info_fm {
  position: absolute;
  left: 50%;
  display: flex;
  flex-direction: column;
  width: 194px;
  height: 290px;
  z-index: 1;
  overflow: hidden;
  border-radius: 9%;
}
.book_info .book_info_fm image {
  height: 100%;
  width: 100%;
  filter: drop-shadow(0px 4px 8px rgba(126, 98, 54, 0.25));
}
.book_info .book__info__item {
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  &.item__title {
    top: 310px;
  }
  &.item__auth {
    top: 358px;
  }
  .title {
    margin: 0 auto;
    font-size: 32px;
    font-weight: bold;
    color: #333;
    line-height: 48px;
  }
  .anther {
    margin: 0 auto;
    margin-top: 16px;
    font-size: 28px;
    color: #999;
    line-height: 40px;
  }
}
</style>
