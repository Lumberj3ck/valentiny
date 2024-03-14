<script>
import like_you_section from './like_you_section.vue'
import love_potion_section from './love_potion_section.vue'
import reasons_like_you_section from './reasons_like_you_section.vue'
import start_section from './start_section.vue'
import favorite_artists from './favorite_artists.vue'
import navigation_bar from '@/components/utils/navigation_bar.vue'
import { useSectionStore } from '@/stores/SectionStrore'
import { get_user_sections } from '@/js/api'
import loading_spinner from '../utils/loading_spinner.vue'

export default {
  components: {
    like_you_section,
    love_potion_section,
    reasons_like_you_section,
    start_section,
    navigation_bar,
    favorite_artists,
    loading_spinner
  },
  setup() {
    const components = useSectionStore()

    return {
      components
    }
  },

  data() {
    return {
      moving_component: { name: null, direction: null },
      photoMode: false,
      loaded: false
    }
  },
  methods: {
    move(direction, name) {
      const comp_section = this.components.sections[name];

      if (!comp_section) return;

      if (direction !== 1 && direction !== -1) return;

      const tempIndex = comp_section.index + direction;
      const indexValues = Object.values(this.components.sections).map(comp => comp.index);
      const maxValue = Math.max(...indexValues);
      const minValue = Math.min(...indexValues);

      if ((direction > 0 && tempIndex <= maxValue) || (direction < 0 && tempIndex >= minValue)) {
        for (const sectionKey in this.components.sections) {
          const section = this.components.sections[sectionKey];
          if (section.index === tempIndex) {
            section.index -= direction;
          }
        }

        comp_section.index += direction;
        this.moving_component = { name: name, direction: direction }
      }
    },
    togglePhotoMode() {
      this.photoMode = !this.photoMode
      document.querySelectorAll('.system_ui_pen').forEach((el) => el.style.display = this.photoMode ? 'none' : null)
      document.querySelectorAll('.control_bar').forEach((el) => el.style.display = this.photoMode ? 'none' : null)
    }
  },
  async created() {
    const user_token = localStorage.getItem('access-token')
    if (user_token) {
      get_user_sections()
        .then(data => {
          if (Object.keys(data).length !== 0 && !data.constructor !== Object) {
            this.components.updateSectionState(data)
          }
        this.loaded = true
        })
        .catch(error => {
          console.log(error)
          this.loaded = true
        });
    }
    else{
      this.loaded = true
    }
  }
}
</script>

<template>
  <navigation_bar @photomode_toggle="togglePhotoMode"></navigation_bar>
  <div class="custom_container">
    <loading_spinner v-if="!loaded"></loading_spinner>
    <div v-for="[component, section] in Object.entries(components.sections)" :key="component"
      :class="{ 'slide-in-bck-top': (moving_component.name == component) && (moving_component.direction == 1), 'slide-in-bck-bottom': (moving_component.name == component) && (moving_component.direction == -1) }"
      :style="{ 'grid-row': section.index }" @animationend="moving_component = { name: null, direction: null }">
      <component v-if="loaded" :section_name="component" :is="component" @move_up="move(-1, component)"
        @move_down="move(1, component)" :photoMode="photoMode" />
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
}
</style>
