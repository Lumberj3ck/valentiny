<script>
import control_bar from '@/components/utils/control_bar.vue'
import custom_input from '@/components/utils/custom_input.vue'
import useControlBar from '@/js/control_bar.js'
import default_image_path from '@/assets/imgs/banner.jpg'
import image_input from '@/components/utils/image_input.vue'
import { useSectionStore } from '@/stores/SectionStrore'


export default {
    setup() {
        const { background_color, text_color, is_render, primary_color, resetColors } = useControlBar();
        const sectionStore = useSectionStore()

        return {
            background_color,
            text_color,
            is_render,
            // primary_color,
            resetColors,
            sectionStore
        };
    },
    props:{
        photoMode: Boolean,
        name: String
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
        this.reset_img = true
    },
    },
    components: {
        control_bar,
        custom_input,
        image_input
    },
    computed: {
        primary_text_color() {
            return {
                'color': this.sectionStore.getTextColor(this.name)
            }
        },
        primary_color(){
            return this.sectionStore.getColors(this.name)
        },
        startSectionHeader(){
            return this.sectionStore.sections.start_section.text_inputs.start_section_header_input.content
        }
    }
}
</script>


<template>
    <control_bar  @move_up="$emit('move_up')" @move_down="$emit('move_down')" @bg_color_reset="reset_both"
        @toggle-render="is_render = !is_render" @bg_color_picked="(value) => sectionStore.setBgColor(name, value)"
        @text_color_picked="(value) => sectionStore.setColor(name, value)">
    </control_bar>
    <Transition>
    <section v-show="is_render">
        <div class="relative pt-16 pb-32 flex content-center items-center justify-center" style="min-height: 75vh">
            <!-- <div class="absolute top-0 w-full h-full bg-center bg-cover md:bg-contain"
                :style="{'background-image': `url(${image_url})`}" ref="img">
                <span id="blackOverlay" class="w-full h-full absolute bg-black opacity-[0.5]" :style="primary_color"></span>
            </div> -->
        <image_input :photoMode="photoMode" custom_class="absolute top-0 w-full h-full bg-center bg-cover md:bg-contain" :image_url="image_url" :reset_img="reset_img" @update:reset="reset_img = !reset_img">
            <template v-slot:background_overlay>
                <span id="blackOverlay" class="w-full h-full absolute bg-black opacity-[0.5]" :style="primary_color"></span>
            </template>
        </image_input>
            <div class="container relative mx-auto flex justify-center">
                <div class="items-center flex flex-wrap">
                    <div class="w-full px-4 ml-auto mr-auto text-center md:max-w-[56%]  min-[540px]:max-w-[75%]">
                        <div class="md:pr-12 text-[#f9d0d7] md:min-w-[480px]">
                            <custom_input :name="name + ':1'" :photoMode="photoMode" :primary_color="primary_text_color" class='font-semibold text-3xl md:text-5xl'
                                default_input_value="Congratulations!"></custom_input>
                            <!-- <h1 class="font-semibold text-5xl">{{ sectionStore.sections['start_section'].background_color }}</h1> -->
                            <custom_input :photoMode="photoMode" text_area :primary_color="primary_text_color" class='mt-4 text-lg'
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
</Transition>
</template>

