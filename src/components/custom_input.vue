<script>
const focus = {
mounted: (el) => el.focus()
}

export default{
    data(){
        return {
            input_value: "Type your text",
            edit: false,
        }
    },
    props:{
        primary_color: Object,
        custom_class: String 
    },
  directives:{
    focus,
  },
  methods: {
    onDoubleClick(){
        this.edit = !this.edit
        // this.$refs.text_input.focus()
    },
    toggleEditMode(){
        this.edit = !this.edit
    },
    }
}
</script>


<template>
    <!-- @dblclick="onDoubleClick" -->
    <div v-if="!edit"
    @click="onDoubleClick"
    :class="custom_class"
    class="w-full select_prevent bg_inherit"
    :style="primary_color ? primary_color : ''"
    >{{ input_value }}</div>  
    <input
    v-else
    @focusout="toggleEditMode"
    :class="custom_class"
    class="w-full bg_inherit"
    :style="primary_color ? primary_color : ''"
    type="text"
    v-model="input_value"
    ref="text_input"
    v-focus
    />
</template>

<style>
.bg_inherit{
    background-color: inherit;
}
</style>