<script>

export default{
    emits:['move_down', 'move_up','toggle-render', 'bg_color_reset', 'bg_color_picked', 'text_color_picked'],
}
</script>


<template>
<div class="flex space_around  bg_white text_black control_bar">
    <div class="flex col_25">
  <button @click="$emit('toggle-render')" class="button_simple">Toggle Render</button>
  <button @click="$emit('bg_color_reset')" class="button_simple">Reset</button>
</div>
  <div class="flex col_25 items-center">
  <svg @click="$emit('move_down')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w4 h4"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
  <svg @click="$emit('move_up')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w4 h4"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
  <input type="color" @input="$emit('bg_color_picked', $event.target.value)" class="square_input">
  <input type="color" @input="$emit('text_color_picked', $event.target.value)" class="square_input">
   </div>
</div>
</template>

<style>
    .w4{
        width: 30px;
    }
    .h4{
        height: 30px;
    }
    .square_input{
        width: 40px;
        height: 40px;
    }
    .button_simple{
        border: 1px solid black;
        border-radius: 10px;
        padding: 4px;
    }
    .bg_white{
        background-color: white;
    }
    .text_black{
        color: black;
    }
    .mb_24{
        margin-bottom: 24px;
    }
    .flex{
        display: flex;
    }
    .space_around{
        justify-content: space-around;
    }
    .col_25{
        column-gap: 25px;
    }
</style>