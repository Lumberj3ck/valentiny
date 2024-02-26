<script>
import main_section from './components/main_section.vue'
import download_button from './components/button_download_html.vue'

export default {
  components: {
    main_section,
    download_button,
  },
  data() {
    return {
      imageUrl: ''
    }
  },
}
</script>

<template>
  <!-- <button @click="generateReport">Get pdf</button> -->
  <download_button></download_button>
  <main_section></main_section>
</template>
