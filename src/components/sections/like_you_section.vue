<script>
import control_bar from '@/components/utils/control_bar.vue'
import custom_input from '@/components/utils/custom_input.vue'
// import useControlBar from '@/js/control_bar.js'
import default_image_path from '@/assets/imgs/heart_img.webp'
import image_input from '../utils/image_input.vue'
import { useSectionStore } from '@/stores/SectionStrore'


export default {
  setup() {
    const sectionStore = useSectionStore()

    return {
      sectionStore
    };
  },

  emits: ['move_down', 'move_up'],

  components: {
    control_bar,
    custom_input,
    image_input
  },
  data() {
    return {
      image_url: default_image_path,
      reset_img: false,
      background_color: '',
      text_color: ''
    }
  },
  props: {
    photoMode: Boolean,
    section_name: String
  },
  methods: {
    reset_both() {
      this.sectionStore.resetColors(this.section_name)
      this.background_color = ''
      this.text_color = ''
      this.reset_img = true
    },
  },
    mounted(){
        this.text_color = this.sectionStore.getTextColor(this.section_name)
        this.background_color = this.sectionStore.getBgColor(this.section_name)
    },
  computed: {
    primary_color() {
      // return this.sectionStore.getColors(this.section_name)
      return {
        'background-color': this.background_color,
        'color': this.text_color
      }
    },
    render() {
      return this.sectionStore.sections[this.section_name].render
    },
    // background_color(){
    //   return this.sectionStore.getBgColor(this.section_name)
    // },
    // text_color(){
    //   return this.sectionStore.getTextColor(this.section_name)
    // }
  }
}
</script>

<template>
    <control_bar  
        :bg_color_value="background_color"
        :text_color_value="text_color"
        @move_up="$emit('move_up')" @move_down="$emit('move_down')" @bg_color_reset="reset_both"
        @toggle-render="sectionStore.toggleRendering(section_name)" @bg_color_picked="(value) => background_color = value"
        @text_color_picked="(value) => text_color = value"
        @text_color_change="(value) => sectionStore.setColor(section_name, value)"
        @bg_color_change="(value) => sectionStore.setBgColor(section_name, value)"
        >
    </control_bar>
  <Transition>
    <section v-show="render" class="relative">
      <div class="px-4 bg_violet" :style="primary_color">
        <div class="container mx-auto items-center flex flex-wrap">
          <div class="w-full md:w-4/12 ml-auto mr-auto px-4" style="margin-top: 50px; margin-bottom: 50px">
            <image_input :section_name="section_name" :image_input_id="1" :photoMode="photoMode" image_tag custom_class="rounded-full square_aspect_ratio object-cover"
              :image_url="image_url" :reset_img="reset_img" @update:reset="reset_img = !reset_img"></image_input>
          </div>
          <div class="w-full md:w-5/12 ml-auto mr-auto px-4">
            <div class="md:pr-12 mb-8">
              <custom_input :section_name="section_name" :input_id="1" :photoMode="photoMode" text_area
                :primary_color="primary_color" class='text-section-color text-3xl font-semibold'
                default_input_value="I love you so much that:"></custom_input>
              <ul class="list-none mt-6">
                <li class="py-2">
                  <div class="flex items-center">
                    <div>
                      <span
                        class="text-xs font-semibold shadow-lg inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"
                        :style="{ 'background-color': background_color }"
                        style="box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(117, 114, 114, 0) 0px 3px 6px;">
                        <i :style="{ 'color': text_color }" class="fas fa-crown"></i>
                      </span>
                    </div>
                    <div>
                      <custom_input :section_name="section_name" :input_id="2" :photoMode="photoMode"
                        :primary_color="primary_color" class='text-section-color text-lg '
                        default_input_value="Can show you my google history"></custom_input>
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="flex items-center">
                    <div>
                      <span
                        class="text-xs font-semibold shadow-xl inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"
                        :style="{ 'background-color': background_color }"
                        style="box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(117, 114, 114, 0) 0px 3px 6px;">
                        <i :style="{ 'color': text_color }" class="fas fa-compass"></i>
                      </span>
                    </div>
                    <div>
                      <custom_input :section_name="section_name" :input_id="3" :photoMode="photoMode"
                        :primary_color="primary_color" class='text-section-color text-lg '
                        default_input_value="Can resist to eat last pizza slice"></custom_input>
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="flex items-center">
                    <div>
                      <span
                        class="shadow-lg text-xs font-semibold inline-block py-1 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"
                        :style="{ 'background-color': background_color }"
                        style="padding-right: 0.4rem; padding-left: 0.4rem; box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(117, 114, 114, 0) 0px 3px 6px;">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" class="w-4 h-4 text-pink-600" :style="{ 'color': text_color }">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                      </span>
                    </div>
                    <div>
                      <custom_input :section_name="section_name" :input_id="4" :photoMode="photoMode"
                        :primary_color="primary_color" class='text-section-color text-lg '
                        default_input_value="Almost started to like your movie taste"></custom_input>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Transition>
</template>

<style>
.bg_violet {
  background-color: var(--section-primary-color);
}

.text_violet {
  color: var(--section-primary-color);
}

.text-section-color {
  color: var(--section-secondary-color)
}

w-full {
  width: 100%;
}

.select_prevent {
  user-select: none;
}
</style>
