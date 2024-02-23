<script>
import control_bar from './control_bar.vue'
import custom_input from './custom_input.vue'
import useControlBar from '../js/control_bar.js'

export default {
    setup() {
        const { background_color, text_color, is_render, primary_color, resetColors } = useControlBar();

        return {
            background_color,
            text_color,
            is_render,
            primary_color,
            resetColors
        };
    },
    emits: ['move_up', 'move_down'],
    components: {
        control_bar,
        custom_input
    },
    computed: {
        primary_text_color() {
            return {
                'color': this.text_color
            }
        }
    }
}
</script>


<template >
    <control_bar @move_up="$emit('move_up')" @move_down="$emit('move_down')" @bg_color_reset="resetColors"
        @toggle-render="is_render = !is_render" @bg_color_picked="(value) => background_color = value"
        @text_color_picked="(value) => text_color = value"></control_bar>
    <div v-if="is_render">
        <div class="relative pt-16 pb-32 flex content-center items-center justify-center" style="min-height: 75vh">
                <!-- style="background-image: url('./src/assets/imgs/banner.jpg')"> -->
            <div class="absolute top-0 w-full h-full bg-center bg-cover md:bg-contain banner">
                <span id="blackOverlay" class="w-full h-full absolute bg-black opacity-[0.5]" :style="primary_color"></span>
            </div>

            <div class="container relative mx-auto">
                <div class="items-center flex flex-wrap">
                    <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                        <div class="md:pr-12 text-[#f9d0d7]">
                            <custom_input :primary_color="primary_text_color" class='font-semibold text-3xl md:text-5xl'
                                default_input_value="Congratulations!"></custom_input>
                            <!-- <h1 class="font-semibold text-5xl">
                                Congratulations!
                            </h1> -->
                            <custom_input text_area :primary_color="primary_text_color" class='mt-4 text-lg'
                                default_input_value="Today is Valentine's Day, and I don't want to pressure you, but you should already plan how you confess your love to me ">
                            </custom_input>
                            <!-- <p class="mt-4 text-lg">
                                Today is Valentine's Day, and I don't want to pressure you, but you should already plan how
                                you confess your love to me
                                <i class="far fa-face-kiss-wink-heart" style="color: #f8d0d7"></i>
                            </p> -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                style="height: 70px">
                <svg class="absolute overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
                    version="1.1" viewBox="0 0 2560 100" x="0" y="0" style="bottom: -1px">
                    <polygon class="text-white fill-current" points="2560 0 2560 100 0 100"></polygon>
                </svg>
            </div> -->
        </div>
    </div>
</template>


<style>
.banner{
    background-image: url('./src/assets/imgs/banner.jpg')
}
</style>