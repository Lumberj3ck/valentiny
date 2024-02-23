<script>
import like_you_section from './components/like_you_section.vue'
import love_potion_section from './components/love_potion_section.vue'
import reasons_like_you_section from './components/reasons_like_you_section.vue'
import get_page from './js/page_download.js'

export default {
  components: {
    like_you_section,
    love_potion_section,
    reasons_like_you_section
  },

  data() {
    return {
      background_color: '#ffff',
      components: [
        { name: 'like_you_section', index: 1 },
        { name: 'love_potion_section', index: 2 },
        { name: 'reasons_like_you_section', index: 3 }
      ]
    }
  },
  methods: {
    get_hm(){
      get_page()
    },
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
    }
  }
}
</script>

<template>
  <button @click="get_hm" id="get_html">Get html</button>
  <div class="custom_container">
    <div :style="{ 'grid-row': components[0].index }">
      <like_you_section @move_up="move(-1, 'like_you_section')" @move_down="move(1, 'like_you_section')"></like_you_section>
    </div>

    <div :style="{ 'grid-row': components[1].index }">
      <love_potion_section @move_up="move(-1, 'love_potion_section')" @move_down="move(1, 'love_potion_section')"></love_potion_section>
    </div>

    <div :style="{ 'grid-row': components[2].index }">
      <reasons_like_you_section @move_up="move(-1, 'reasons_like_you_section')" @move_down="move(1, 'reasons_like_you_section')"></reasons_like_you_section>
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
</style>
