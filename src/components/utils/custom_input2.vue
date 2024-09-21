<template>
  <div
    v-if="!edit"
    @click="toggleEditMode"
    class="editable-text h-9 w-full select-none bg-inherit flex items-center relative"
    :class="{ 'text-gray-400': isEmpty }"
    :style="primary_color"
  >
    <span v-if="!isEmpty">{{ text_value }}</span>
    <span v-else class="italic">Click to add text</span>
  </div>
  <textarea
    v-else-if="edit && text_area"
    v-focus
    @input="resize"
    @focusout="handleFocusOut"
    @keyup.enter="$refs.textAreaRef.blur()"
    ref="textAreaRef"
    v-model="inputContent"
    :placeholder="'Enter text here'"
    class="w-full bg-inherit focus:outline-none focus:outline-offset-0 rounded-lg p-1 focus:ring-black focus:ring-1 focus:z-10 resize-none"
    :style="primary_color"
    v-resize
    id="custom_input"
  ></textarea>
  <input
    v-else
    v-focus
    @focusout="handleFocusOut"
    type="text"
    @keyup.enter="$refs.textInputRef.blur()"
    ref="textInputRef"
    v-model="inputContent"
    :placeholder="'Enter text here'"
    class="w-full bg-inherit focus:outline-none focus:outline-offset-0 rounded-lg p-1 focus:ring-black focus:ring-1 focus:z-10"
    :style="primary_color"
    id="custom_input"
  />
</template>

<script>
import { useSectionStore } from '@/stores/SectionStrore'

export default {
  name: 'EditableText',
  components: {
  },
  props: {
    primary_color: Object,
    default_input_value: String,
    text_area: Boolean,
    photoMode: Boolean,
    section_name: String,
    input_id: Number
  },
  data() {
    return {
      edit: false,
      inputContent: '',
      sectionStore: useSectionStore()
    }
  },
  computed: {
    text_input_data() {
      return this.sectionStore.getInputData(this.section_name, this.input_id)
    },
    text_value() {
      return this.text_input_data || this.inputContent
    },
    isEmpty() {
      return !this.text_value || this.text_value.trim() === ''
    }
  },
  methods: {
    toggleEditMode() {
      if (!this.photoMode) {
        this.edit = !this.edit
      }
    },
    handleFocusOut() {
      this.toggleEditMode()
      this.sectionStore.setInputData(this.section_name, this.input_id, this.inputContent)
    },
    resize(event) {
      this.set_height(event.target)
    },
    set_height(el) {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }
  },
  watch: {
    inputContent(newValue) {
      this.sectionStore.setInputData(this.section_name, this.input_id, newValue)
    }
  },
  mounted() {
    if (this.section_name) {
      const text_input_store_value = this.sectionStore.getInputData(this.section_name, this.input_id)
      if (!text_input_store_value) {
        this.sectionStore.setInputData(this.section_name, this.input_id, this.default_input_value)
      }
      this.inputContent = text_input_store_value || this.default_input_value
    }
  },
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    },
    resize: {
      mounted(el, binding) {
        binding.instance.set_height(el)
      },
      updated(el, binding) {
        binding.instance.set_height(el)
      }
    }
  }
}
</script>

<style scoped>
.editable-text {
  cursor: text;
  transition: all 0.3s ease;
}

.editable-text:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.bg-inherit {
  background-color: inherit;
}
</style>