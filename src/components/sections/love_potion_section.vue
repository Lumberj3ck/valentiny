<script>
import control_bar from '@/components/utils/control_bar.vue'
import custom_input from '@/components/utils/custom_input.vue'
import useControlBar from '@/js/control_bar.js'
import default_image_path from '@/assets/imgs/love_potion.png'
// import image_input from '@/components/utils/image_input.vue'


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
      image_url:default_image_path
    }
  },
  props:{
    photoMode: Boolean
  },
  methods:{
    reset_both(){
      this.resetColors()
      this.image_url = default_image_path 
    },
    handleFileUpload(event){
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.image_url  = reader.result;
          var file_type = this.image_url.match('data:image/([a-zA-Z]+);')[1]
          this.$refs.img.setAttribute("data-verbose-path",`./assets/imgs/user_input_love_potion.${file_type}`)
        };
        reader.readAsDataURL(file);
      }
    }
  },
  components: {
    control_bar,
    custom_input
  },
  emits:['move_up', 'move_down'],
}
</script>

<template>
  <control_bar v-show="!photoMode" @file_selected="handleFileUpload($event)" @move_up="$emit('move_up')" @move_down="$emit('move_down')" @bg_color_reset="reset_both"
    @toggle-render="is_render = !is_render" @bg_color_picked="(value) => background_color = value"
    @text_color_picked="(value) => text_color = value"></control_bar>
<section v-if='is_render' class="pb-20 relative block bg-gray-900" :style="primary_color">
  <div class="container pt-3 mx-auto px-4 lg:pt-24  lg:pl-10 flex flex-col lg:flex-row">
    <div class="w-8/12 md:w-6/12 lg:w-6/12 lg:max-w-96 mx-auto lg:min-w-80">
        <img :src="image_url" class='rounded-full aspect-square object-cover' alt="" ref="img">
    </div>
    <div>
    <div class="flex flex-wrap text-center justify-center xl:justify-normal">
      <div class="w-full lg:w-6/12 px-4">
        <!-- <h2 class="text-4xl font-semibold text-white">Love potion recipe</h2> -->
        <custom_input text_area :primary_color="primary_color" class='text-4xl font-semibold text-white' default_input_value="Love potion recipe"></custom_input>
        <custom_input text_area :primary_color="primary_color" class='text-lg leading-relaxed mt-4 mb-4 text-gray-500' default_input_value="You never know when it will come in handy, so I’ll leave it here for you, just in case."></custom_input>
        <!-- <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
          You never know when it will come in handy, so I’ll leave it here for you, just in case.
        </p> -->
      </div>
    </div>
    </div>
  </div>
    <div class="flex flex-wrap mt-12 justify-center">
      <div class="w-full lg:w-3/12 px-4 text-center">
        <div
          class="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center"
        >
          <i class="fas fa-flask"></i>
        </div>
        <!-- <h6 class="text-xl mt-5 font-semibold text-white">
          Step 1
        </h6> -->
        <custom_input :primary_color="primary_color" class='text-xl mt-5 font-semibold text-white' default_input_value="Step 1"></custom_input>
        <custom_input text_area :primary_color="primary_color" class='mt-2 mb-4 text-gray-500 sm:text-lg md:text-xl' default_input_value="Place the house ants on a plate and generously drizzle them with the flavorful sauerkraut syrup."></custom_input>
        <!-- <p class="mt-2 mb-4 text-gray-500 sm:text-lg md:text-xl">
          Place the house ants on a plate and generously drizzle them with the flavorful sauerkraut syrup.
        </p> -->
      </div>
      <div class="w-full lg:w-3/12 px-4 text-center">
        <div
          class="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center"
        >
          <i class="fas fa-candy-cane"></i>
        </div>
        <!-- <h5 class="text-xl mt-5 font-semibold text-white">
          Step 2
        </h5> -->
        <custom_input :primary_color="primary_color" class='text-xl mt-5 text_area font-semibold text-white' default_input_value="Step 2"></custom_input>
        <custom_input text_area :primary_color="primary_color" class='mt-2 mb-4 text-gray-500 sm:text-lg md:text-xl' default_input_value="Add some crushed sour berry candy and a pinch of kissed sugar."></custom_input>
        <!-- <p class="mt-2 mb-4 text-gray-500 sm:text-lg md:text-xl">
          Add some crushed sour berry candy and a pinch of kissed sugar.
        </p> -->
      </div>
      <div class="w-full lg:w-3/12 px-4 text-center">
        <div
          class="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center"
        >
          <i class="fas fa-thumbs-up"></i>
        </div>
        <!-- <h5 class="text-xl mt-5 font-semibold text-white">Шаг 3</h5> -->
        <custom_input :primary_color="primary_color" class='text-xl mt-5 font-semibold text-white' default_input_value="Step 3"></custom_input>
        <custom_input  text_area :primary_color="primary_color" class='mt-2 mb-4 text-gray-500 sm:text-lg md:text-xl' default_input_value="Whip until fluffy and serve in bee traps to keep the flavor fresh. Go for it and enjoy the result!"></custom_input>
        <!-- <p class="mt-2 mb-4 text-gray-500 sm:text-lg md:text-xl">
            Whip until fluffy and serve in bee traps to keep the flavor fresh. Go for it and enjoy the result!
        </p> -->
      </div>
    </div>
</section>
</template>