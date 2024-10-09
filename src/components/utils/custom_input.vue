<script>
import { useSectionStore } from '@/stores/SectionStrore';

const focus = {
  mounted: (el) => el.focus()
}

function set_height(el) {
  el.style.height = `${el.scrollHeight}px`;
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
  inject: ['reset_text'],
  watch: {
    reset_text(newValue) {
      if (newValue) {
        this.resetTextToDefault();
      }
    }
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
      if (!text_input_store_value || !this.sectionStore.retrived) {
        this.sectionStore.setInputData(this.section_name, this.input_id, this.default_input_value)
      }
    }
  },
  computed: {
    text_input_data() {
      return this.sectionStore.getInputData(this.section_name, this.input_id)
    },
    text_value() {
      return this.text_input_data 
    },
    isEmpty() {
      return !this.text_input_data || this.text_input_data.trim() === ''
    },

    dashedInputStyle() {
      let border_properties
      let rgbColor
      if (this.primary_color) {
        let color = this.primary_color['color'];
        let r = parseInt(color.slice(1, 3), 16);
        let g = parseInt(color.slice(3, 5), 16);
        let b = parseInt(color.slice(5, 7), 16);
        rgbColor = `rgb(${r},${g},${b})`;
      } else {
        rgbColor = `rgb(0,0,0)`;
      }

      if (this.isEmpty && !this.photoMode){
        border_properties = {
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='${encodeURIComponent(rgbColor)}' stroke-width='0.8' stroke-dasharray='6' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`,
          borderRadius: '0px',
        }
      } else {
        border_properties = {}
      }
      return {
        ...this.primary_color,
        ...border_properties
      };
    },
  },
  methods: {
    resetTextToDefault() {
      this.sectionStore.setInputData(this.section_name, this.input_id, this.default_input_value);
    },
    toggleEditMode() {
      if (!this.photoMode) {
        this.edit = !this.edit
      }
    },
    resize(event) {
      var el = event.target
      set_height(el)
    },
    updateInputData(value) {
      this.sectionStore.setInputData(this.section_name, this.input_id, value);
    },
  }
}
</script>

<template>
  <div v-if="!edit" @click="toggleEditMode" 
       :class="{'hide_input_on_download': isEmpty, 'min-h-12': text_area && isEmpty, 'min-h-7': !text_area && isEmpty}" 
       class="break-words w-full select_prevent bg_inherit" 
       :style="dashedInputStyle"
       :title="isEmpty ? 'Invisible on preview' : ''"
       >
    <span v-if="!isEmpty">{{ text_value }}</span>
  </div>
  <textarea v-else-if="edit && text_area" v-focus 
    @input="(e) => { resize(e); updateInputData(e.target.value); }"
    @focusout="toggleEditMode"
    @keydown.enter.prevent="$refs.textAreaRef.blur()" 
    ref="textAreaRef"
    :value="text_value"
    class="w-full bg_inherit focus:outline-none focus:outline-offset-0 rounded-lg focus:ring-black focus:ring-1 focus:z-10 resize-none h-7 overflow-hidden"
    :style="primary_color" 
    v-resize 
    id="custom_input"
    placeholder="Enter text here"></textarea>
  <input v-else v-focus @focusout="toggleEditMode" type="text" @keyup.enter="$refs.textInputRef.blur()"
    ref="textInputRef"     
    :value="text_value"
    @input="updateInputData($event.target.value)"
    class="w-full bg_inherit focus:outline-none focus:outline-offset-0 rounded-lg  focus:ring-black focus:ring-1 focus:z-10 h-7"
    :style="primary_color" id="custom_input" 
    placeholder="Enter text here"/>
</template>

<style>
.bg_inherit {
  background-color: inherit;
}
</style>