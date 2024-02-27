<script>
import main_section from './components/main_section.vue'
import download_button from './components/button_download_html.vue'
import * as htmlToImage from 'html-to-image';

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
  methods: {
    generateReport() {
      htmlToImage.toJpeg(document.getElementById('app'), { quality: 0.95 })
        .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'my-image-name.jpeg';
          link.href = dataUrl;
          link.click();
        });
    }
  }
}
</script>

<template>
  <button @click="generateReport" class="system_ui">Get image</button>
  <download_button></download_button>
  <main_section></main_section>
</template>
