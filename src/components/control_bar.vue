<script>
export default{
}
</script>


<template>
<div class="flex space_around  bg_white text_black">
    <div class="flex col_25">
  <button @click="$emit('toggle-render')" class="button_simple">Toggle Render</button>
  <button @click="$emit('bg_color_reset')" class="button_simple">Reset</button>
</div>
  <div class="flex col_25">
  <input type="color" @input="$emit('bg_color_picked', $event.target.value)" class="square_input">
  <input type="color" @input="$emit('text_color_picked', $event.target.value)" class="square_input">
   </div>
</div>
</template>

<style>
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