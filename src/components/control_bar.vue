<script>
import { faFileImage, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    emits: [
        'move_down',
        'move_up',
        'toggle-render',
        'bg_color_reset',
        'bg_color_picked',
        'text_color_picked',
        'file_selected'
    ],
    components:{
        FontAwesomeIcon
    },
    data() {
        return {
            faImageUpload: faFileImage,
            faArrowDown: faArrowDown, 
            faArrowUp: faArrowUp,
            faPowerOff: faPowerOff 
        }
    }
}
</script>

<template>
    <div class="flex bg_white text_black control_bar justify-start sm:gap-5 my-1 sm:justify-center md:justify-around ">
        <div class="flex items-center  sm:gap-5 mx-1 gap-1">
            <!-- <button @click="$emit('toggle-render')" class="button_simple">Toggle Render</button> -->
            <!-- <i @click="$emit('toggle-render')" class="fas fa-power-off control_item"></i> -->
            <FontAwesomeIcon @click="$emit('toggle-render')" :icon="faPowerOff" class="control_item"></FontAwesomeIcon>
            <button @click="$emit('bg_color_reset')" class="button_simple w-20 h-9 md:w-24 md:h-10 flex items-center justify-center">Reset</button>
        </div>
        <div class="flex items-center sm:gap-5 mx-1 gap-1">
            <!-- <i @click="$emit('move_down')" class="fa-solid fa-arrow-down control_item"></i> -->
            <!-- <i @click="$emit('move_up')" class="fa-solid fa-arrow-up control_item"></i> -->
            <FontAwesomeIcon @click="$emit('move_down')" :icon="faArrowDown" class="control_item"></FontAwesomeIcon>
            <FontAwesomeIcon @click="$emit('move_up')" :icon="faArrowUp" class="control_item"></FontAwesomeIcon>
        </div>
        <div class="flex items-center sm:gap-5 mx-1">
            <input type="color" @input="$emit('bg_color_picked', $event.target.value)" class="custom_input"/>
            <input type="color" @input="$emit('text_color_picked', $event.target.value)" class="custom_input"/>
            <div class="bg-black w-24 h-9   md:h-10 flex items-center justify-center rounded-xl md:text-base cursor-pointer" @click="$refs.file_input.click()">
                <FontAwesomeIcon :icon="faImageUpload" class="text-[#eec249] mr-2 font-bold"/>
                <span class="font-semibold text-[#eec249]">Choose</span>
                <input type="file" ref="file_input" class="hidden" @change="$emit('file_selected', $event)" accept="image/*">
            </div>
        </div>
    </div>
</template>


<style>
.button_simple {
    --color: #ffde81;
    font-family: inherit;
    display: inline-block;
    line-height: 2.5em;
    overflow: hidden;
    cursor: pointer;
    /* margin: 20px; */
    font-size: 17px;
    z-index: 1;
    color: black;
    border: 2px solid black;
    border-radius: 6px;
    position: relative;
}

.button_simple::before {
    position: absolute;
    content: '';
    background: var(--color);
    width: 150px;
    height: 200px;
    z-index: -1;
    border-radius: 50%;
}

.control_item {
    font-size: 25px;
    cursor: pointer;
    font-weight: 900;
}

.control_item:hover {
    color: #ffde81;
}

@media (min-width: 640px) {
    .control_item {
        font-size: 27px;
    }
}

@media (min-width: 768px) {
    .control_item {
        font-size: 30px;
    }
}

.button_simple:hover {
    color: black;
}

.button_simple:before {
    top: 100%;
    left: 100%;
    transition: 0.3s all;
}

.button_simple:hover::before {
    top: -30px;
    left: -30px;
}

.arrow {
    cursor: pointer;
}

/* .arrow:hover {
    color: green;
} */

/* .arrow:hover{
    color: var(--button_background)
} */
.w4 {
    width: 30px;
}

.h4 {
    height: 30px;
}

.custom_input {
    width: 40px;
    height: 40px;
    background: none;
}

.custom_input::-webkit-color-swatch {
    border-radius: 7px;
    border: 1px solid black;
    cursor: pointer;
}

.custom_input::-moz-color-swatch {
    border-radius: 7px;
    border: 1px solid black;
}

.bg_white {
    background-color: white;
}

.text_black {
    color: black;
}

.mb_24 {
    margin-bottom: 24px;
}

.flex {
    display: flex;
}

.space_around {
    justify-content: space-around;
}

.col_25 {
    column-gap: 25px;
}
</style>
