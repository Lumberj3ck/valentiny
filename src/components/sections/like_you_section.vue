<script>
import control_bar from '@/components/utils/control_bar.vue'
import custom_input from '@/components/utils/custom_input.vue'
import useControlBar from '@/js/control_bar.js'
import default_image_path from '@/assets/imgs/heart_img.png'


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

  emits: ['move_down', 'move_up'],

  components: {
    control_bar,
    custom_input
  },
  data(){
    return {
      image_url: default_image_path 
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
          this.$refs.img.setAttribute("data-verbose-path",`./assets/imgs/user_input_like_you_section.${file_type}`)
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
  <section v-if="is_render" class="relative">
    <div class="px-4 bg_violet" :style="primary_color">
      <div class="container mx-auto items-center flex flex-wrap">
        <div class="w-full md:w-4/12 ml-auto mr-auto px-4" style="margin-top: 50px; margin-bottom: 50px">
          <img :src="image_url" class='rounded-full' alt="" ref="img">
        </div>
        <div class="w-full md:w-5/12 ml-auto mr-auto px-4">
          <div class="md:pr-12 mb-8">
            <custom_input text_area :primary_color="primary_color" class='text-section-color text-3xl font-semibold'
              default_input_value="I love you so much that:"></custom_input>
            <ul class="list-none mt-6">
              <li class="py-2">
                <div class="flex items-center">
                  <div>
                    <span
                      class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                      <i class="fas fa-crown"></i>
                    </span>
                  </div>
                  <div>
                    <custom_input :primary_color="primary_color" class='text-section-color text-lg '
                      default_input_value="Can show you my google history"></custom_input>
                  </div>
                </div>
              </li>
              <li class="py-2">
                <div class="flex items-center">
                  <div>
                    <span
                      class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                      <i class="fas fa-compass"></i>
                    </span>
                  </div>
                  <div>
                    <custom_input :primary_color="primary_color" class='text-section-color text-lg '
                      default_input_value="Can resist to eat last pizza slice"></custom_input>
                  </div>
                </div>
              </li>
              <li class="py-2">
                <div class="flex items-center">
                  <div>
                    <span
                      class="text-xs font-semibold inline-block py-1 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"
                      style="padding-right: 0.4rem; padding-left: 0.4rem">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4 text-pink-600">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <custom_input :primary_color="primary_color" class='text-section-color text-lg '
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
