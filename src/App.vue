<script>
import main_section from './components/main_section.vue'
import {get_page, remove_redudant_ui, instantiate_dom} from './js/page_download.js'
// import VueHtml2pdf from 'vue-html2pdf'
import html2pdf from 'html2pdf.js'
import download_button from './components/button_download_html.vue'


export default {
  components: {
    main_section,
    download_button
  },

  methods: {
    get_html() {
      get_page()
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    },
    exportToPDF() {
      var $ = instantiate_dom()
      remove_redudant_ui($)

      html2pdf().set({
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      });

      html2pdf($.html(), {
        filename: "Postcard.pdf",
        paginateElementsByHeight: '1400px'
      });
    },

  }
}
</script>

<template>
  <!-- <div id="get_html">
  <button style="margin-right: 20px;" @click="exportToPDF">Export to pdf</button>
  <button @click="get_html">Get html</button>
</div> -->
  <download_button></download_button>
  <main_section></main_section>
  <!-- <VueHtml2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
    :paginate-elements-by-height="1400" filename="myPDF" :pdf-quality="2" :manual-pagination="false" pdf-format="a4"
    pdf-orientation="landscape" pdf-content-width="800px" ref="html2Pdf">
    <section>asdfasdfl</section>
  </VueHtml2pdf> -->
</template>
