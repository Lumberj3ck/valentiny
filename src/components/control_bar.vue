<script>
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
    data() {
        return {
            cities: [
                { name: 'Las_vega', code: 'asd' },
                { name: 'Berlin', code: 'nasdf' },
                { name: 'London', code: 'asd' }
            ]
        }
    }
}
</script>

<template>
    <div class="flex bg_white text_black control_bar justify-start gap-4 ml-3 my-1 sm:justify-center md:justify-around">
        <div class="flex items-center gap-4 md:gap-10">
            <!-- <button @click="$emit('toggle-render')" class="button_simple">Toggle Render</button> -->
            <i @click="$emit('toggle-render')" class="fas fa-power-off control_item"></i>
            <button @click="$emit('bg_color_reset')" class="button_simple">Reset</button>
        </div>
        <div class="flex items-center gap-4 md:gap-10">
            <i @click="$emit('move_down')" class="fa-solid fa-arrow-down control_item"></i>
            <i @click="$emit('move_up')" class="fa-solid fa-arrow-up control_item"></i>
        </div>
        <div class="flex items-center gap-4 md:gap-10">
            <input type="color" @input="$emit('bg_color_picked', $event.target.value)" class="custom_input" />
            <input type="color" @input="$emit('text_color_picked', $event.target.value)" class="custom_input" />
        </div>
        <div class="flex items-center">
            <div class="bg-black w-24 h-10 flex items-center justify-center rounded-xl" @click="$refs.file_input.click()">
                <span class="font-semibold text-[#eec249]">Choose</span>
                <input type="file" ref="file_input" class="hidden" @change="$emit('file_selected', $event)">
            </div>
        </div>
    </div>
</template>


<style>
.button_simple {
    --color: #ffde81;
    font-family: inherit;
    display: inline-block;
    width: 5em;
    height: 2.6em;
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

.arrow:hover {
    color: green;
}

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
    border: none;
    cursor: pointer;
}

.custom_input::-moz-color-swatch {
    border-radius: 7px;
    border: none;
}

/* .button_simple {
    border: 1px solid black;
    border-radius: 10px;
    padding: 4px;
} */

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
