<script>
import like_you_section from './components/like_you_section.vue';
import another_section from './components/another_section.vue';

export default{
  components: {
    like_you_section,
    another_section,
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
  <another_section></another_section>
</template>
