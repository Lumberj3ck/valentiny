<script>
import like_you_section from './like_you_section.vue'
import love_potion_section from './love_potion_section.vue'
import reasons_like_you_section from './reasons_like_you_section.vue'
import start_section from './start_section.vue'

export default {
  components: {
    like_you_section,
    love_potion_section,
    reasons_like_you_section,
    start_section,
  },

  data() {
    return {
      components: [
        { name: 'start_section', index: 1 },
        { name: 'like_you_section', index: 2 },
        { name: 'love_potion_section', index: 3 },
        { name: 'reasons_like_you_section', index: 4 },
      ],
      moving_component: ''
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
      }
      this.moving_component = [name, direction]
    }

  },
  // computed: {
  //   animate() {
  //     return (this.moving_component[0] == this.component.name) && (this.moving_component[1] == -1)
  //   }
  // },
  watch: {
    moving_component(newValue, oldValue) {
      if (newValue !== oldValue) {
        setTimeout(() => {
          this.moving_component = null;
        }, 1100);
      }
    }
  }
}
</script>


<template>
  <!-- <div class="custom_container">
    <transition name="fade">
    <div :style="{ 'grid-row': components[0].index }">
      <start_section @move_up="move(-1, 'start_section')" @move_down="move(1, 'start_section')"></start_section>
    </div>
    </transition>
    <div :style="{ 'grid-row': components[1].index }">
      <like_you_section @move_up="move(-1, 'like_you_section')" @move_down="move(1, 'like_you_section')">
      </like_you_section>
    </div>

    <div :style="{ 'grid-row': components[2].index }">
      <love_potion_section @move_up="move(-1, 'love_potion_section')" @move_down="move(1, 'love_potion_section')">
      </love_potion_section>
    </div>

    <div :style="{ 'grid-row': components[3].index }">
      <reasons_like_you_section @move_up="move(-1, 'reasons_like_you_section')"
        @move_down="move(1, 'reasons_like_you_section')"></reasons_like_you_section>
    </div>
  </div> -->
  <div class="custom_container">
    <div v-for="component in components" :key="component.name"
      :class="{ 'bounce-in-top': (moving_component[0] == component.name) && (moving_component[1] == -1), 'bounce-in-bottom': (moving_component[0] == component.name) && (moving_component[1] == 1) }"
      :style="{ 'grid-row': component.index }">
      <component :is="component.name" @move_up="move(-1, component.name)" @move_down="move(1, component.name)" />
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

.bounce-in-top {
  -webkit-animation: bounce-in-top 1.1s both;
  animation: bounce-in-top 1.1s both;
}

.bounce-in-bottom {
  -webkit-animation: bounce-in-bottom 1.1s both;
  animation: bounce-in-bottom 1.1s both;
}

@-webkit-keyframes bounce-in-bottom {
  0% {
    -webkit-transform: translateY(500px);
    transform: translateY(500px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }

  38% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }

  55% {
    -webkit-transform: translateY(65px);
    transform: translateY(65px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  72% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  81% {
    -webkit-transform: translateY(28px);
    transform: translateY(28px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  90% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  95% {
    -webkit-transform: translateY(8px);
    transform: translateY(8px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}

@keyframes bounce-in-bottom {
  0% {
    -webkit-transform: translateY(500px);
    transform: translateY(500px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }

  38% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }

  55% {
    -webkit-transform: translateY(65px);
    transform: translateY(65px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  72% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  81% {
    -webkit-transform: translateY(28px);
    transform: translateY(28px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  90% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  95% {
    -webkit-transform: translateY(8px);
    transform: translateY(8px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}

@-webkit-keyframes bounce-in-top {
  0% {
    -webkit-transform: translateY(-500px);
    transform: translateY(-500px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }

  38% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }

  55% {
    -webkit-transform: translateY(-65px);
    transform: translateY(-65px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  72% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  81% {
    -webkit-transform: translateY(-28px);
    transform: translateY(-28px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  90% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  95% {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}

@keyframes bounce-in-top {
  0% {
    -webkit-transform: translateY(-500px);
    transform: translateY(-500px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }

  38% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }

  55% {
    -webkit-transform: translateY(-65px);
    transform: translateY(-65px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  72% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  81% {
    -webkit-transform: translateY(-28px);
    transform: translateY(-28px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  90% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }

  95% {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}</style>
