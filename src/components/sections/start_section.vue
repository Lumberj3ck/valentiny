<script>
import control_bar from '@/components/utils/control_bar.vue'
import custom_input from '@/components/utils/custom_input.vue'
import image_input from '@/components/utils/image_input.vue'
import { useSectionStore } from '@/stores/SectionStrore'
import { computed } from 'vue'


export default {
    setup() {
        const sectionStore = useSectionStore()

        return {
            sectionStore
        };
    },
    props:{
        photoMode: Boolean,
        section_name: String
    },
    emits: ['move_up', 'move_down'],    
    provide() {
        return {
            reset_text: computed(() => this.reset_text),
            reset_img: computed(() => this.reset_img)
        }
    },
    data(){
        return {
            image_url: 'https://valentine-postcard-images.s3.eu-central-1.amazonaws.com/sections_images/banner.webp',
            reset_img: false,
            background_color: '',
            text_color: '',
            default_text_color: '#f9d0d7',
            default_bg_color: '#000000',
            reset_text: false
        }
    },
    methods:{
    reset_both(){
        this.sectionStore.resetColors(this.section_name)
        this.background_color = this.default_bg_color
        this.text_color = this.default_text_color
        this.reset_img = true
        this.reset_text = true
        setTimeout(() => {
            this.reset_text = false
            this.reset_img = false
            }, 500)
        },
    },
    components: {
        control_bar,
        custom_input,
        image_input
    },
    mounted(){
        // this.text_color = this.sectionStore.getTextColor(this.section_name) || this.default_text_color
        // this.background_color = this.sectionStore.getBgColor(this.section_name) || this.default_bg_color
        this.text_color = this.sectionStore.getTextColor(this.section_name)  || this.default_text_color
        this.background_color = this.sectionStore.getBgColor(this.section_name) || this.default_bg_color
    },
    computed: {
        primary_text_color() {
            return {
                // 'color': this.sectionStore.getTextColor(this.section_name)
                'color': this.text_color
            }
        },
        primary_color(){
            // return this.sectionStore.getColors(this.section_name)
            return {
                'background-color': this.background_color,
                'color':  this.text_color
            }
        },
        render(){
            return this.sectionStore.sections[this.section_name].render
        }
    }
}
</script>


        <!-- :bg_color_value="sectionStore.getBgColor(section_name)"
        :text_color_value="sectionStore.getTextColor(section_name)" -->
<template>
    <control_bar  
        :bg_color_value="background_color"
        :text_color_value="text_color"
        @move_up="$emit('move_up')" @move_down="$emit('move_down')" @bg_color_reset="reset_both"
        @toggle-render="sectionStore.toggleRendering(section_name)" @bg_color_picked="(value) => background_color = value"
        @text_color_picked="(value) => text_color = value"
        @text_color_change="(value) => sectionStore.setColor(section_name, value)"
        @bg_color_change="(value) => sectionStore.setBgColor(section_name, value)" >
    </control_bar>
    <Transition>
    <section v-show="render">
        <div class="relative pt-16 pb-32 flex content-center items-center justify-center" style="min-height: 75vh">
        <image_input :section_name="section_name" :image_input_id="1" :photoMode="photoMode" custom_class="absolute top-0 w-full h-full bg-center bg-cover md:bg-contain" :image_url="image_url">
            <template v-slot:background_overlay>
                <span id="blackOverlay" class="w-full h-full absolute bg-black opacity-[0.5]" :style="primary_color"></span>
            </template>
        </image_input>
            <div class="container relative mx-auto">
                <div class="items-center flex flex-wrap">
                    <div class="w-full px-4 ml-auto mr-auto text-center">
                        <div class="md:pr-12 text-[#f9d0d7] md:min-w-[480px]">
                            <custom_input :section_name="section_name" :input_id="1" :photoMode="photoMode" :primary_color="primary_text_color" class='font-semibold text-3xl md:text-5xl w-[82vw] md:w-[60vw] mx-auto break-words max-w-[82vw]'
                                default_input_value="Congratulations!" text_area></custom_input>
                            <custom_input :section_name="section_name" :input_id="2" :photoMode="photoMode" text_area :primary_color="primary_text_color" class='mt-4 text-lg break-words w-[90vw] md:w-[70vw] mx-auto max-w-[90vw]'
                                default_input_value="Today is Valentine's Day, and I don't want to pressure you, but you should already plan how you confess your love to me ">
                            </custom_input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</Transition>
</template>

