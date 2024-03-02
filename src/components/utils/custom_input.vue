<script>
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
        text_area: Boolean 
    },
    data(){
        return {
            input_value: this.default_input_value,
            edit: false,
        }
    },
  directives:{
    focus,
    resize
  },

  methods: {
    toggleEditMode(){
        this.edit = !this.edit
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
    >{{ input_value ? input_value : 'Placeholder' }}</div>  
    <textarea
    v-else-if="edit && text_area"
    v-focus
    @input="resize"
    @focusout="toggleEditMode"
    @keyup.enter="$refs.textAreaRef.blur()"
    ref="textAreaRef"
    v-model="input_value"
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
    v-model="input_value"
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