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

const resize= {
  mounted: function(el, binding) {
    const wrapperWidth = binding.value
    set_height(el, wrapperWidth);
  }
}

export default{
    props:{
        primary_color: Object,
        default_input_value: String,
        text_area: Boolean,
        photoMode: Boolean,
        name: String
    },

    setup(){
        const sectionStore = useSectionStore()

        return {
            sectionStore
        };
    },

    data(){
        return {
            section_name: 'start_section',
            input_id: 1,
            edit: false,
        }
    },
  directives:{
    focus,
    resize
  },
  mounted(){
    if (this.name){
      const parts = this.name.split(':')
      this.section_name = parts[0]
      this.input_id = parts[1]
      const text_input_store_value = this.sectionStore.getInputData(this.section_name, this.input_id)
      if (!text_input_store_value) {
        this.sectionStore.setInputData(this.section_name, this.input_id, this.default_input_value)
      }
    }
  },
  computed:{
    text_value(){
      return this.sectionStore.getInputData(this.section_name, this.input_id) ? this.sectionStore.getInputData(this.section_name, this.input_id) : 'Placeholder' 
    },
  },
  methods: {
    toggleEditMode(){
        if (!this.photoMode){
          this.edit = !this.edit
        }
    },
    resize(event){
        var el = event.target
        set_height(el)
    }
    }
}
</script>


<template>
    <div v-if="!edit"
    @click="toggleEditMode"
    class="w-full select_prevent bg_inherit"
    :style="primary_color"
    >{{ text_value }}</div>  
    <textarea
    v-else-if="edit && text_area"
    v-focus
    @input="resize"
    @focusout="toggleEditMode"
    @keyup.enter="$refs.textAreaRef.blur()"
    ref="textAreaRef"
    v-model="sectionStore.sections[section_name].text_inputs[input_id].content"
    class="w-full bg_inherit focus:outline-none focus:outline-offset-0 rounded-lg p-1 focus:ring-black focus:ring-1 focus:z-10 resize-none"
    :style="primary_color"
    v-resize
    id="custom_input"
    ></textarea>
    <input
    v-else
    v-focus
    @focusout="toggleEditMode"
    type="text"
    @keyup.enter="$refs.textInputRef.blur()"
    ref="textInputRef"
    v-model="sectionStore.sections[section_name].text_inputs[input_id].content"
    class="w-full bg_inherit focus:outline-none focus:outline-offset-0 rounded-lg p-1 focus:ring-black focus:ring-1 focus:z-10"
    :style="primary_color"
    id="custom_input"
    />
</template>

<style>
.bg_inherit{
    background-color: inherit;
}
</style>