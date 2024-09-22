<script>
import { useSectionStore } from '@/stores/SectionStrore';

const focus = {
  mounted: (el) => el.focus()
}


// const resize = {
//     mounted: (el) => set_height(el)
// }

function set_height(el) {
  el.style.height = `${el.scrollHeight}px`;
  //   el.style.width = `${wrapperWidth}px`;
}

const resize = {
  mounted: function (el, binding) {
    const wrapperWidth = binding.value
    set_height(el, wrapperWidth);
  }
}

export default {
  props: {
    primary_color: Object,
    default_input_value: String,
    text_area: Boolean,
    photoMode: Boolean,
    section_name: String,
    input_id: Number
  },

  setup() {
    const sectionStore = useSectionStore()

    return {
      sectionStore
    };
  },

  data() {
    return {
      edit: false,
    }
  },
  directives: {
    focus,
    resize
  },
  mounted() {
    if (this.section_name) {
      const text_input_store_value = this.sectionStore.getInputData(this.section_name, this.input_id)
      if (!text_input_store_value) {
        this.sectionStore.setInputData(this.section_name, this.input_id, this.default_input_value)
      }
    }
  },
  computed: {
    text_input_data() {
      return this.sectionStore.getInputData(this.section_name, this.input_id)
    },
    text_value() {
      // return this.text_input_data ? this.text_input_data.trim() : 'Placeholder'
      return this.text_input_data 
    },
    isEmpty() {
      return !this.text_input_data || this.text_input_data.trim() === ''
    }
  },
  methods: {
    toggleEditMode() {
      if (!this.photoMode) {
        this.edit = !this.edit
      }
    },
    resize(event) {
      var el = event.target
      set_height(el)
    },
  }
}
</script>



<template>
  <!-- <div v-if="!edit" @click="toggleEditMode" :class="{ 'border border-[#c4c2c2] rounded-md border-dashed': isEmpty && !photoMode}" class="cursor-pointer w-full select_prevent bg_inherit min-h-7" :style="primary_color"> -->
  <div v-if="!edit" @click="toggleEditMode" :class="{'custom_dashed': isEmpty && !photoMode}" class="cursor-pointer w-full select_prevent bg_inherit min-h-7" :style="primary_color">
    <span v-if="!isEmpty">{{ text_value }}</span>
  </div>
  <textarea v-else-if="edit && text_area" v-focus @input="resize" @focusout="toggleEditMode"
    @keyup.enter="$refs.textAreaRef.blur()" ref="textAreaRef"
    v-model="sectionStore.sections[section_name].text_inputs[input_id].content"
    class="w-full bg_inherit focus:outline-none focus:outline-offset-0 rounded-lg  focus:ring-black focus:ring-1 focus:z-10 resize-none h-7"
    :style="primary_color" v-resize id="custom_input"
    placeholder="Enter text here"></textarea>
  <input v-else v-focus @focusout="toggleEditMode" type="text" @keyup.enter="$refs.textInputRef.blur()"
    ref="textInputRef"     
    v-model="sectionStore.sections[section_name].text_inputs[input_id].content"
    class="w-full bg_inherit focus:outline-none focus:outline-offset-0 rounded-lg  focus:ring-black focus:ring-1 focus:z-10 h-7"
    :style="primary_color" id="custom_input" 
    placeholder="Enter text here"/>
</template>

<style>
.bg_inherit {
  background-color: inherit;
}

.custom_dashed{
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='black' stroke-width='0.8' stroke-dasharray='6' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 31px;
}
</style>