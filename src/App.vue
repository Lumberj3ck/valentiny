<script>
import like_you_section from './components/like_you_section.vue';
import love_potion_recipe from './components/love_potion_recipe.vue';

export default{
  components: {
    like_you_section,
    love_potion_recipe,
},

  data() {
    return {
        background_color:'#ffff'
    }
  },

}
</script>

<template>
  <like_you_section></like_you_section>
  <love_potion_recipe></love_potion_recipe>
</template>
