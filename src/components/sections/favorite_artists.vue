<script>
import control_bar from '@/components/utils/control_bar.vue'
import custom_input from '@/components/utils/custom_input.vue'
import useControlBar from '@/js/control_bar.js'
import image_input from '@/components/utils/image_input.vue'
import first_image from '@/assets/imgs/hiro_album_cover.jpg'
import second_image from '@/assets/imgs/kaspisky_gruz_album_cover.jpg'
import third_image from '@/assets/imgs/magic_city_album_cover.jpg'
import fourth_image from '@/assets/imgs/scryptonit_album_cover.png'

export default{
    setup() {
    const { background_color, text_color, is_render, primary_color, resetColors } = useControlBar();

    return {
      background_color,
      text_color,
      is_render,
      primary_color,
      resetColors,
    };
  },

  data(){
    return {
    //   image_url:default_image_path,
      reset_img: false,
      first_image: first_image,
      second_image: second_image,
      third_image: third_image,
      fourth_image: fourth_image
    }
  },
  props:{
    photoMode: Boolean
  },
  components: {
    control_bar,
    custom_input,
    image_input
  },
  emits:['move_up', 'move_down'],
  methods:{
    reset_both(){
        this.resetColors()
        this.reset_img = true
    }
  }
}

</script>


<template>
  <control_bar v-show="!photoMode" @move_up="$emit('move_up')" @move_down="$emit('move_down')" @bg_color_reset="reset_both"
    @toggle-render="is_render = !is_render" @bg_color_picked="(value) => background_color = value"
    @text_color_picked="(value) => text_color = value"></control_bar>
      <section v-show="is_render" class="pt-20 pb-48" :style="primary_color">
        <div class="container mx-auto px-4" >
          <div class="flex flex-wrap justify-center text-center mb-24">
            <div class="w-full lg:w-6/12 px-4">
              <!-- <h2 class="text-4xl font-semibold">Music associated with you</h2> -->
              <!-- <h2 class="text-4xl font-semibold">Music associated with you</h2> -->
              <custom_input :primary_color="primary_color" class='text-4xl font-semibold' default_input_value="Music associated with you"></custom_input>
              <!-- <p class="text-lg leading-relaxed m-4 text-gray-600">
                Melodies that I can listen to and remember you, they are filled with a special mood
              </p> -->
              <custom_input text_area :primary_color="primary_color" class='text-lg leading-relaxed m-4 text-gray-600' default_input_value="Melodies that I can listen to and remember you, they are filled with a special mood"></custom_input>
            </div>
          </div>
          <div class="flex flex-wrap">
              <div  class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <!-- <img
                  alt="..."
                  src="@/assets/imgs/scryptonit_album_cover.png"
                  class="shadow-lg rounded-full max-w-full mx-auto"
                  style="max-width: 120px"
                /> -->
                <image_input image_tag custom_class=" aspect-square object-cover  shadow-lg rounded-full max-w-full  max-w-[120px]" class="flex justify-center w-full " :image_url="first_image" :reset_img="reset_img" @update:reset="reset_img = false"></image_input>
                <div class="pt-6 text-center">
                <!-- <a href="https://open.spotify.com/track/6nvXTYOmS7ES6BWuRASHHL?si=275973b766014376"> -->
                  <!-- <h5 class="text-xl font-bold">Name of the song</h5> -->
              <custom_input :primary_color="primary_color" class='text-xl font-bold' default_input_value="Name of the sond"></custom_input>
                <!-- </a> -->
                </div>  
              </div>
            <div  class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <!-- <img
                  alt="..."
                  src="@/assets/imgs/hiro_album_cover.jpg"
                  class="shadow-lg rounded-full max-w-full mx-auto"
                  style="max-width: 120px"
                /> -->
                <image_input image_tag custom_class=" aspect-square object-cover shadow-lg rounded-full max-w-full  max-w-[120px]" class="flex justify-center w-full " :image_url="second_image" :reset_img="reset_img" @update:reset="reset_img = false"></image_input>
                <div class="pt-6 text-center">
                <!-- <a href="https://open.spotify.com/track/6FqdGFRX5mrP5rxcXrXcPN?si=13529534d55a4df1"> -->
                  <!-- <h5 class="text-xl font-bold">Name of the song</h5> -->
              <custom_input :primary_color="primary_color" class='text-xl font-bold' default_input_value="Name of the sond"></custom_input>
                  <!-- </a> -->
                </div>
            </div></div>
            <a></a>
            <div  class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <!-- <img
                  alt="..."
                  src="@/assets/imgs/kaspisky_gruz_album_cover.jpg"
                  class="shadow-lg rounded-full max-w-full mx-auto"
                  style="max-width: 120px"
                /> -->
                <image_input image_tag custom_class=" aspect-square object-cover shadow-lg rounded-full max-w-full  max-w-[120px]" class="flex justify-center w-full " :image_url="third_image" :reset_img="reset_img" @update:reset="reset_img = false"></image_input>
                <div class="pt-6 text-center">
                <!-- <a href="https://open.spotify.com/track/61nzEAmKgzWRL5vFuwwd3B?si=447ccd47200149a9"> -->
                  <!-- <h5 class="text-xl font-bold">Name of the song</h5> -->
              <custom_input :primary_color="primary_color" class='text-xl font-bold' default_input_value="Name of the sond"></custom_input>
                <!-- </a> -->
                </div>
              </div>
            </div>
            <div 
           class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <!-- <img
                  alt="..."
                  src="@/assets/imgs/magic_city_album_cover.jpg"
                  class="shadow-lg rounded-full max-w-full mx-auto"
                  style="max-width: 120px"
                /> -->
                <image_input image_tag  custom_class="aspect-square object-cover shadow-lg rounded-full max-w-full  max-w-[120px]" class="flex justify-center w-full " :image_url="fourth_image" :reset_img="reset_img" @update:reset="reset_img = false"></image_input>
                <div class="pt-6 text-center">
                  <!-- <a href="https://open.spotify.com/track/2iE7cNEx0NGkuNPXXQwFmU?si=414719306c8947d6"> -->
                  <!-- <h5 class="text-xl font-bold">Name of the song</h5> -->
                    <custom_input :primary_color="primary_color" class='text-xl font-bold' default_input_value="Name of the sond"></custom_input>
                  <!-- </a> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

</template>