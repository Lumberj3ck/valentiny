<script>
import like_you_section from './like_you_section.vue'
import love_potion_section from './love_potion_section.vue'
import reasons_like_you_section from './reasons_like_you_section.vue'
import start_section from './start_section.vue'
import download_button from './button_download_html.vue'

export default {
  components: {
    like_you_section,
    love_potion_section,
    reasons_like_you_section,
    start_section,
    download_button
  },

  data() {
    return {
      components: [
        { name: 'start_section', index: 1 },
        { name: 'like_you_section', index: 2 },
        { name: 'love_potion_section', index: 3 },
        { name: 'reasons_like_you_section', index: 4 },
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
    }

  },
}
</script>


<template>
  <div class="flex justify-start sm:justify-center m-3 system_ui">
  <div class="flex gap-5 flex-col rounded-lg border-black border-2 p-2 w-5/6 md:flex-row">
    <div class="flex">
    <h1 class="font-semibold mr-2">Photo Mode:</h1>
    <label class="toggle-switch">
      <input type="checkbox" v-model="photoMode">
      <div class="toggle-switch-background">
        <div class="toggle-switch-handle"></div>
      </div>
    </label>
    </div>
    <download_button></download_button>
  </div>
</div>
  <div class="custom_container">
    <div v-for="component in components" :key="component.name"
      :class="{ 'slide-in-bck-top': (moving_component.name == component.name) && (moving_component.direction == 1), 'slide-in-bck-bottom': (moving_component.name == component.name) && (moving_component.direction == -1) }"
      :style="{ 'grid-row': component.index }" @animationend="moving_component = { name: null, direction: null }">
      <component :is="component.name" @move_up="move(-1, component.name)" @move_down="move(1, component.name)"
        :photoMode="photoMode" />
    </div>
  </div>
</template>


<style>
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  cursor: pointer;
}

.toggle-switch input[type="checkbox"] {
  display: none;
}

.toggle-switch-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  border-radius: 20px;
  box-shadow: inset 0 0 0 2px #ccc;
  transition: background-color 0.3s ease-in-out;
}

.toggle-switch-handle {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
  background-color: #eec249;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}

.toggle-switch::before {
  content: "";
  position: absolute;
  top: -25px;
  right: -35px;
  font-size: 12px;
  font-weight: bold;
  color: #aaa;
  text-shadow: 1px 1px #fff;
  transition: color 0.3s ease-in-out;
}

.toggle-switch input[type="checkbox"]:checked+.toggle-switch-handle {
  transform: translateX(45px);
  box-shadow: 0 2px 5px rgb(255, 255, 255), 0 0 0 3px #05c46b;
}

.toggle-switch input[type="checkbox"]:checked+.toggle-switch-background {
  background-color: #eec249;
  box-shadow: inset 0 0 0 2px #ffffff;
}

.toggle-switch input[type="checkbox"]:checked+.toggle-switch:before {
  content: "On";
  color: #05c46b;
  right: -15px;
}

.toggle-switch input[type="checkbox"]:checked+.toggle-switch-background .toggle-switch-handle {
  transform: translateX(30px);
  background-color: black;
}

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
