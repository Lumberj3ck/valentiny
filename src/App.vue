<script>
import main_section from './components/main_section.vue'
import get_page from './js/page_download.js'
// import VueHtml2pdf from 'vue-html2pdf'
import html2pdf from 'html2pdf.js'


export default {
  components: {
    main_section
  },

  methods: {
    get_hm() {
      get_page()
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    },
    exportToPDF() {
      html2pdf().set({
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      });

      html2pdf(document.getElementById("app"), {
        margin: 1,
        filename: "i-was-html.pdf",
        paginateElementsByHeight: '1400px'
      });
    },

  }
}
</script>

<template>
  <div id="get_html">
  <button @click="exportToPDF">Export to pdf</button>
  <button @click="get_hm">Get html</button>
</div>
  <main_section></main_section>
  <!-- <VueHtml2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
    :paginate-elements-by-height="1400" filename="myPDF" :pdf-quality="2" :manual-pagination="false" pdf-format="a4"
    pdf-orientation="landscape" pdf-content-width="800px" ref="html2Pdf">
    <section>asdfasdfl</section>
  </VueHtml2pdf> -->
</template>
