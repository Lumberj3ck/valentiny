<template>
  <!-- <router-view v-slot="{Component}">
    <transition name="editor">
      <component :is="Component" />
    </transition>
  </router-view> -->
  <router-view></router-view>
</template>


<style>
/* .editor-enter-active{
  -webkit-animation: puff-out-center 0.5s cubic-bezier(0.165, 0.840, 0.440, 1.000) reverse;
  animation: puff-out-center 0.5s cubic-bezier(0.165, 0.840, 0.440, 1.000) reverse;
}
.editor-leave-active{
  -webkit-animation: puff-out-center 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both;
  animation: puff-out-center 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both;
}
.puff-out-center {
  -webkit-animation: puff-out-center 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both;
  animation: puff-out-center 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) both;
}

@-webkit-keyframes puff-out-center {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }

  100% {
    -webkit-transform: scale(2);
    transform: scale(2);
    -webkit-filter: blur(4px);
    filter: blur(4px);
    opacity: 0;
  }
}

@keyframes puff-out-center {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }

  100% {
    -webkit-transform: scale(2);
    transform: scale(2);
    -webkit-filter: blur(4px);
    filter: blur(4px);
    opacity: 0;
  }
} */
</style>