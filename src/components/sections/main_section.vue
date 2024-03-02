<script>
import like_you_section from './like_you_section.vue'
import love_potion_section from './love_potion_section.vue'
import reasons_like_you_section from './reasons_like_you_section.vue'
import start_section from './start_section.vue'
import favorite_artists from './favorite_artists.vue'
import navigation_bar from '@/components/utils/navigation_bar.vue'

export default {
  components: {
    like_you_section,
    love_potion_section,
    reasons_like_you_section,
    start_section,
    navigation_bar,
    favorite_artists
  },

  data() {
    return {
      components: [
        { name: 'start_section', index: 1 },
        { name: 'like_you_section', index: 2 },
        { name: 'love_potion_section', index: 3 },
        { name: 'reasons_like_you_section', index: 4 },
        { name: 'favorite_artists', index: 5 },
      ],
      moving_component: { name: null, direction: null },
      photoMode: false
    }
  },
  methods: {
    move(direction, name) {
      let comp_index = this.components.findIndex(component => component.name === name)

      if (direction !== 1 && direction !== -1) return

      const tempIndex = this.components[comp_index].index + direction
      const indexValues = this.components.map((comp) => comp.index)
      const maxValue = Math.max(...indexValues)
      const minValue = Math.min(...indexValues)

      if ((direction > 0 && tempIndex <= maxValue) || (direction < 0 && tempIndex >= minValue)) {
        this.components.forEach((comp) => {
          if (comp.index === tempIndex) {
            comp.index -= direction
          }
        })
        this.components[comp_index].index += direction
        this.moving_component = { name: name, direction: direction }
      }
    },
    togglePhotoMode(){
      this.photoMode = !this.photoMode
      document.querySelectorAll('.system_ui_pen').forEach((el) => el.style.display = this.photoMode ? 'none': null)
      document.querySelectorAll('.control_bar').forEach((el) => el.style.display = this.photoMode ? 'none': null)
    }
  },
}
</script>

<template>
<navigation_bar @photomode_toggle="togglePhotoMode"></navigation_bar>
  <div class="custom_container">
    <div v-for="component in components" :key="component.name"
      :class="{ 'slide-in-bck-top': (moving_component.name == component.name) && (moving_component.direction == 1), 'slide-in-bck-bottom': (moving_component.name == component.name) && (moving_component.direction == -1) }"
      :style="{ 'grid-row': component.index }" @animationend="moving_component = { name: null, direction: null }">
      <component :is="component.name" @move_up="move(-1, component.name)" @move_down="move(1, component.name)"
        />
    </div>
  </div>
</template>


<style>

.custom_container {
  display: grid;
  grid-template-rows: auto 1fr;
}

.first-div {
  grid-row: 1;
}

.second-div {
  grid-row: 2;
}

.slide-in-bck-bottom {
  -webkit-animation: slide-in-bck-bottom 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-bck-bottom 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.slide-in-bck-top {
  -webkit-animation: slide-in-bck-top 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-bck-top 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-in-bck-bottom {
  0% {
    -webkit-transform: translateZ(700px) translateY(300px);
    transform: translateZ(700px) translateY(300px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateZ(0) translateY(0);
    transform: translateZ(0) translateY(0);
    opacity: 1;
  }
}

@keyframes slide-in-bck-bottom {
  0% {
    -webkit-transform: translateZ(700px) translateY(300px);
    transform: translateZ(700px) translateY(300px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateZ(0) translateY(0);
    transform: translateZ(0) translateY(0);
    opacity: 1;
  }
}

@-webkit-keyframes slide-in-bck-top {
  0% {
    -webkit-transform: translateZ(700px) translateY(-300px);
    transform: translateZ(700px) translateY(-300px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateZ(0) translateY(0);
    transform: translateZ(0) translateY(0);
    opacity: 1;
  }
}

@keyframes slide-in-bck-top {
  0% {
    -webkit-transform: translateZ(700px) translateY(-300px);
    transform: translateZ(700px) translateY(-300px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateZ(0) translateY(0);
    transform: translateZ(0) translateY(0);
    opacity: 1;
  }
}</style>
