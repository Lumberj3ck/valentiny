<script>
const focus = {
mounted: (el) => el.focus()
}

const resize = {
    mounted: (el) => el.style.height = `${el.scrollHeight}px`
}
// const resize = {
//     mounted: (el) => alert('asdf') 
// }

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
        el.style.height = `${el.scrollHeight}px`
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
    type="text"
    v-model="input_value"
    class="w-full bg_inherit"
    :style="primary_color"
    v-resize
    ></textarea>
    <input
    v-else
    v-focus
    @focusout="toggleEditMode"
    type="text"
    v-model="input_value"
    class="w-full bg_inherit"
    :style="primary_color"
    />
</template>

<style>
.bg_inherit{
    background-color: inherit;
}
</style>