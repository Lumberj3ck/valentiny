<script>
import control_bar from '@/components/utils/control_bar.vue'
import custom_input from '@/components/utils/custom_input.vue'
// import useControlBar from '@/js/control_bar.js'
import { useSectionStore } from '@/stores/SectionStrore'
import default_image_path from '@/assets/imgs/love_potion.png'
import image_input from '@/components/utils/image_input.vue'


export default {
  setup() {
    const sectionStore = useSectionStore()

    return {
      sectionStore
    };
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
  },
    mounted(){
        this.text_color = this.sectionStore.getTextColor(this.section_name)
        this.background_color = this.sectionStore.getBgColor(this.section_name)
    },
  components: {
    control_bar,
    custom_input,
    image_input
  },
  emits: ['move_up', 'move_down'],
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
    <section v-show='render' class="pb-20 relative block bg-gray-900" :style="primary_color">
      <div class="container pt-3 mx-auto px-4 lg:pt-24  lg:pl-10 flex flex-col lg:flex-row">
        <div class="w-8/12 md:w-6/12 lg:w-6/12 lg:max-w-96 mx-auto lg:min-w-80">
          <!-- <img :src="image_url" class='rounded-full aspect-square object-cover' alt="" ref="img"> -->
          <image_input :section_name="section_name" :image_input_id="1" :photoMode="photoMode" image_tag custom_class="rounded-full object-cover square_aspect_ratio"
            :image_url="image_url" :reset_img="reset_img" @update:reset="reset_img = !reset_img"></image_input>
        </div>
        <div>
          <div class="flex flex-wrap text-center justify-center xl:justify-normal">
            <div class="w-full lg:w-6/12 px-4 sm:min-w-[300px]">
              <!-- <h2 class="text-4xl font-semibold text-white">Love potion recipe</h2> -->
              <custom_input :section_name="section_name" :input_id="1" :photoMode="photoMode" text_area :primary_color="primary_color"
                class='text-4xl font-semibold text-white' default_input_value="Love potion recipe"></custom_input>
              <custom_input :section_name="section_name" :input_id="2" :photoMode="photoMode" text_area :primary_color="primary_color"
                class='text-lg leading-relaxed mt-4 mb-4 text-gray-500'
                default_input_value="You never know when it will come in handy, so I’ll leave it here for you, just in case.">
              </custom_input>
              <!-- <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
          You never know when it will come in handy, so I’ll leave it here for you, just in case.
        </p> -->
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap mt-12 justify-center">
        <div class="w-full lg:w-3/12 px-4 text-center">
          <div :style="{ 'background-color': background_color }"
            style="box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(117, 114, 114, 0) 0px 3px 6px;"
            class="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
            <i :style="{ 'color': text_color }" class="fas fa-flask"></i>
          </div>
          <!-- <h6 class="text-xl mt-5 font-semibold text-white">
          Step 1
        </h6> -->
          <custom_input :section_name="section_name" :input_id="3" :photoMode="photoMode" :primary_color="primary_color"
            class='text-xl mt-5 font-semibold text-white' default_input_value="Step 1"></custom_input>
          <custom_input :section_name="section_name" :input_id="4" :photoMode="photoMode" text_area :primary_color="primary_color"
            class='mt-2 mb-4 text-gray-500 sm:text-lg md:text-xl'
            default_input_value="Place the house ants on a plate and generously drizzle them with the flavorful sauerkraut syrup.">
          </custom_input>
          <!-- <p class="mt-2 mb-4 text-gray-500 sm:text-lg md:text-xl">
          Place the house ants on a plate and generously drizzle them with the flavorful sauerkraut syrup.
        </p> -->
        </div>
        <div class="w-full lg:w-3/12 px-4 text-center">
          <div :style="{ 'background-color': background_color }"
            style="box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(117, 114, 114, 0) 0px 3px 6px;"
            class="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
            <i :style="{ 'color': text_color }" class="fas fa-candy-cane"></i>
          </div>
          <!-- <h5 class="text-xl mt-5 font-semibold text-white">
          Step 2
        </h5> -->
          <custom_input :section_name="section_name" :input_id="5" :photoMode="photoMode" :primary_color="primary_color"
            class='text-xl mt-5 text_area font-semibold text-white' default_input_value="Step 2"></custom_input>
          <custom_input :section_name="section_name" :input_id="6" :photoMode="photoMode" text_area :primary_color="primary_color"
            class='mt-2 mb-4 text-gray-500 sm:text-lg md:text-xl'
            default_input_value="Add some crushed sour berry candy and a pinch of kissed sugar."></custom_input>
          <!-- <p class="mt-2 mb-4 text-gray-500 sm:text-lg md:text-xl">
          Add some crushed sour berry candy and a pinch of kissed sugar.
        </p> -->
        </div>
        <div class="w-full lg:w-3/12 px-4 text-center">
          <div :style="{ 'background-color': background_color }"
            style="box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(117, 114, 114, 0) 0px 3px 6px;"
            class="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
            <i :style="{ 'color': text_color }" class="fas fa-thumbs-up"></i>
          </div>
          <!-- <h5 class="text-xl mt-5 font-semibold text-white">Шаг 3</h5> -->
          <custom_input :section_name="section_name" :input_id="7" :photoMode="photoMode" :primary_color="primary_color"
            class='text-xl mt-5 font-semibold text-white' default_input_value="Step 3"></custom_input>
          <custom_input :section_name="section_name" :input_id="8"   :photoMode="photoMode" text_area :primary_color="primary_color"
            class='mt-2 mb-4 text-gray-500 sm:text-lg md:text-xl'
            default_input_value="Whip until fluffy and serve in bee traps to keep the flavor fresh. Go for it and enjoy the result!">
          </custom_input>
          <!-- <p class="mt-2 mb-4 text-gray-500 sm:text-lg md:text-xl">
            Whip until fluffy and serve in bee traps to keep the flavor fresh. Go for it and enjoy the result!
        </p> -->
        </div>
      </div>
    </section>
  </Transition>
</template>


<style>
.square_aspect_ratio {
  aspect-ratio: 1 / 1;
}

.square_aspect_ratio::before {
  float: left;
  padding-top: 100%;
  content: "";
}

.square_aspect_ratio::after {
  display: block;
  content: "";
  clear: both;
}
</style>