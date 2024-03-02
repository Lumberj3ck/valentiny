<script>
import control_bar from '@/components/utils/control_bar.vue'
import custom_input from '@/components/utils/custom_input.vue'
import useControlBar from '@/js/control_bar.js'
import default_image_path from '@/assets/imgs/banner.jpg'
import image_input from '@/components/utils/image_input.vue'


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
    props:{
        photoMode: Boolean
    },
    emits: ['move_up', 'move_down'],    
    data(){
        return {
            image_url: default_image_path,
            reset_img: false
        }
    },
    methods:{
    reset_both(){
      this.resetColors()
    //   this.image_url = default_image_path 
        this.reset_img = true
    },
    //     handleFileUpload(event){
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //         this.image_url  = reader.result;
    //         var file_type = this.image_url.match('data:image/([a-zA-Z]+);')[1]
    //         this.$refs.img.setAttribute("data-verbose-path",`./assets/imgs/user_input_start_section.${file_type}`)
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // }
    },
    components: {
        control_bar,
        custom_input,
        image_input
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
    <control_bar v-show="!photoMode"  @move_up="$emit('move_up')" @move_down="$emit('move_down')" @bg_color_reset="reset_both"
        @toggle-render="is_render = !is_render" @bg_color_picked="(value) => background_color = value"
        @text_color_picked="(value) => text_color = value"></control_bar>
    <section v-show="is_render">
        <div class="relative pt-16 pb-32 flex content-center items-center justify-center" style="min-height: 75vh">
            <!-- <div class="absolute top-0 w-full h-full bg-center bg-cover md:bg-contain"
                :style="{'background-image': `url(${image_url})`}" ref="img">
                <span id="blackOverlay" class="w-full h-full absolute bg-black opacity-[0.5]" :style="primary_color"></span>
            </div> -->
        <image_input custom_class="absolute top-0 w-full h-full bg-center bg-cover md:bg-contain" :image_url="image_url" :reset_img="reset_img" @update:reset="reset_img = !reset_img">
            <template v-slot:background_overlay>
                <span id="blackOverlay" class="w-full h-full absolute bg-black opacity-[0.5]" :style="primary_color"></span>
            </template>
        </image_input>
            <div class="container relative mx-auto flex justify-center">
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
        </div>
    </section>
</template>


<style>
</style>