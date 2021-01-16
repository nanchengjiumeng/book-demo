<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">

::-webkit-scrollbar {
  display: none;
}
div {
  background-size: 100%;
  background-repeat: no-repeat;
}
.g {
  position: relative;
}
.i {
  position: absolute;
}
[data-text]::before {
  content: attr(data-text);
}

.p {
  position: relative;
}

.e {
  display: inline-block;
}

img {
  width: 100%;
}

video {
  width: 100%;
}

uni-video {
  /* position: unset; */
  /* line-height: 100vh; */
}

.uni-video-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.uni-video-cover-play-button {
  bgi: url(https://alipic.lanhuapp.com/ps2ca5d96515aec0e6-ee4d-4410-bafd-750b6952c6b1);
}

.uni-video-cover-play-button {
  width: 40px;
  height: 40px;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  cursor: pointer;
}

.swiper {
  height: calc(100vh - var(--status-bar-height));
}

.icon {
  width: auto;
  height: 30px;
  vertical-align: middle;
}

.pages {
  position: relative;
  width: 100%;
}

.f {
  display: flex;
}

.fc {
  display: flex;
  justify-content: center;
}

.fcc {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.flcs {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.fcs {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
