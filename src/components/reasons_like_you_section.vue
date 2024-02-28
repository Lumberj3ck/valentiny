<script>
import control_bar from './control_bar.vue'
import custom_input from './custom_input.vue'
import useControlBar from '../js/control_bar.js'
import doner_image from '@/assets/imgs/doner.jpg'

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
  data(){
    return {
      image_url: doner_image 
    }
  },
  props:{
    photoMode: Boolean
  },
  emits: ['move_up', 'move_down'],
  components: {
    control_bar,
    custom_input
  },
  methods:{
    reset_both(){
      this.resetColors()
      this.image_url = doner_image
    },
    handleFileUpload(event){
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.image_url  = reader.result;
          var file_type = this.image_url.match('data:image/([a-zA-Z]+);')[1]
          // var data_img_name = `./src/assets/imgs/user_input_${index}.${file_type}`
          this.$refs.img.setAttribute("data-verbose-path",`./assets/imgs/user_input.${file_type}`)
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
</script>

<template>
  <control_bar v-show="!photoMode" @file_selected="handleFileUpload($event)" @move_up="$emit('move_up')" @move_down="$emit('move_down')" @bg_color_reset="reset_both"
    @toggle-render="is_render = !is_render" @bg_color_picked="(value) => background_color = value"
    @text_color_picked="(value) => text_color = value"></control_bar>
  <section v-if="is_render" class="py-10 bg-white" :style="primary_color">
    <div class="container mx-auto px-4">
      <!-- cards -->
      <div class="flex flex-wrap items-center">
        <div class="w-full md:w-5/12 px-4 mr-auto ml-auto">
          <div
            class="text-red-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300" :style="primary_color">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path
                d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </div>
          <custom_input :primary_color="primary_color" class='text-3xl mb-2 font-semibold leading-normal text-black'
            default_input_value="What I like in you"></custom_input>
          <p class="text-lg font-light leading-relaxed mt-4 mb-4 ">
          <ol class="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
            <custom_input :primary_color="primary_color" class='font-light'
              default_input_value="1 Name"></custom_input>
            <custom_input :primary_color="primary_color" class='font-light'
              default_input_value="2 Good cooking"></custom_input>
            <custom_input :primary_color="primary_color" class='font-light'
              default_input_value="3 Favorite girl"></custom_input>
            <custom_input :primary_color="primary_color" class='font-light'
              default_input_value="4 Cute sunn"></custom_input>
            <custom_input :primary_color="primary_color" class='font-light'
              default_input_value="5 And couple other things)"></custom_input>
          </ol>
          </p>
        </div>
        <div class="w-full md:w-4/12 px-4 mr-auto ml-auto">
          <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-pink-600"
            style="background-color: var(--card-primary-color)">
            <!-- <img alt="..." src="../assets/imgs/doner.jpg" class="w-full align-middle rounded-t-lg" /> -->
            <img alt="..." :src="image_url" class="w-full align-middle rounded-t-lg" data-verbose-path="" ref="img"/>
            <blockquote class="relative p-8 mb-4">
              <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95"
                class="absolute left-0 w-full block" style="height: 95px; top: -94px">
                <polygon points="-30,95 583,95 583,65" class="text-pink-600 fill-current"
                  style="color: var(--card-primary-color)"></polygon>
              </svg>
            <custom_input style="color: var(--card-secondary-color)" class='text-xl font-bold text-white'
              default_input_value="Buys doner for me"></custom_input>
            <custom_input text_area style="color: var(--card-secondary-color)" class='text-md font-light mt-2 text-white'
              default_input_value="Did you know that in a recent study, scientists proved that guys whose girls buy doners are 50% happier?"></custom_input>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>