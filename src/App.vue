<script>
// import like_you_section from './components/like_you_section.vue'
// import love_potion_section from './components/love_potion_section.vue'
// import reasons_like_you_section from './components/reasons_like_you_section.vue'
import main_section from './components/main_section.vue'
import get_page from './js/page_download.js'
// import VueHtml2pdf from 'vue-html2pdf'
import html2pdf from 'html2pdf.js'


export default {
  components: {
    // like_you_section,
    // love_potion_section,
    // reasons_like_you_section,
    // VueHtml2pdf
    main_section
  },

  // data() {
  //   return {
  //     background_color: '#ffff',
  //     components: [
  //       { name: 'like_you_section', index: 1 },
  //       { name: 'love_potion_section', index: 2 },
  //       { name: 'reasons_like_you_section', index: 3 }
  //     ]
  //   }
  // },
  methods: {
    get_hm() {
      get_page()
    },
    // move(direction, name) {
    //   let comp_index = this.components.findindex(component => component.name === name)

    //   if (direction !== 1 && direction !== -1) return

    //   const tempindex = this.components[comp_index].index + direction
    //   const indexvalues = this.components.map((comp) => comp.index)
    //   const maxvalue = math.max(...indexvalues)
    //   const minvalue = math.min(...indexvalues)

    //   if ((direction > 0 && tempindex <= maxvalue) || (direction < 0 && tempindex >= minvalue)) {
    //     this.components.foreach((comp) => {
    //       if (comp.index === tempindex) {
    //         comp.index -= direction
    //       }
    //     })
    //     this.components[comp_index].index += direction
    //   }
    // },
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
        paginateElementsByHeight:'1400px'
			});
    },

  }
}
</script>

<template>
  <button @click="exportToPDF" id="get_html">Get html</button>
  <main_section></main_section>
  <!-- <div class="custom_container">
    <div :style="{ 'grid-row': components[0].index }">
      <like_you_section @move_up="move(-1, 'like_you_section')" @move_down="move(1, 'like_you_section')">
      </like_you_section>
    </div>

    <div :style="{ 'grid-row': components[1].index }">
      <love_potion_section @move_up="move(-1, 'love_potion_section')" @move_down="move(1, 'love_potion_section')">
      </love_potion_section>
    </div>

    <div :style="{ 'grid-row': components[2].index }">
      <reasons_like_you_section @move_up="move(-1, 'reasons_like_you_section')"
        @move_down="move(1, 'reasons_like_you_section')"></reasons_like_you_section>
    </div>
  </div> -->
  <!-- <VueHtml2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
    :paginate-elements-by-height="1400" filename="myPDF" :pdf-quality="2" :manual-pagination="false" pdf-format="a4"
    pdf-orientation="landscape" pdf-content-width="800px" ref="html2Pdf">
    <section>asdfasdfl</section>
  </VueHtml2pdf> -->
</template>

<!-- <style>
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
</style> -->
