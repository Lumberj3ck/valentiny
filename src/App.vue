<script>
import like_you_section from './components/like_you_section.vue'
import love_potion_section from './components/love_potion_section.vue'
import new_section from './components/new_section.vue'

export default {
  components: {
    like_you_section,
    love_potion_section,
    new_section
  },

  data() {
    return {
      background_color: '#ffff',
      components: [
        { name: 'like_you_section', index: 1 },
        { name: 'love_potion_section', index: 2 },
        { name: 'new_section', index: 3 }
      ]
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
    }
  }
}
</script>

<!-- <draggable>
  <like_you_section></like_you_section>
  <love_potion_recipe></love_potion_recipe>
</draggable> -->
<template>
  <div class="custom_container">
    <div :style="{ 'grid-row': components[0].index }">
      <like_you_section @move_up="move(-1, 'like_you_section')" @move_down="move(1, 'like_you_section')"></like_you_section>
    </div>

    <div :style="{ 'grid-row': components[1].index }">
      <love_potion_section @move_up="move(-1, 'love_potion_section')" @move_down="move(1, 'love_potion_section')"></love_potion_section>
    </div>

    <div :style="{ 'grid-row': components[2].index }">
      <new_section @move_up="move(-1, 'new_section')" @move_down="move(1, 'new_section')"></new_section>
    </div>
  </div>
</template>

<style>
.custom_container {
  display: grid;
  grid-template-rows: auto 1fr;
}

.first-div {
  grid-row: 1; /* Placed in the first row */
}

.second-div {
  grid-row: 2; /* Placed in the second row */
}
</style>
