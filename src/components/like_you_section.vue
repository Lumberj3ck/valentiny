<script>
import control_bar from './control_bar.vue'

export default {
  data() {
    return {
      tittle: 'Your tittle',
      secondary_text: 'Type your text',
      sub_text: 'Type your text',
      background_color: '',
      text_color: '',
      is_render: true
    }
  },

  components: {
    control_bar
  },
  computed:{
    primary_color(){
        return {
            "background-color": this.background_color,
            "color": this.text_color
        }
    }
  },

  methods: {
    onToggleRender() {
      this.is_render = !this.is_render
    },
    onColor_reset(){
        this.background_color = ''
        this.text_color = ''
    },
    onBgColor_picked(value){
      this.background_color = value
    },
    onText_color_picked(value){
      this.text_color = value
    }
  }
}
</script>

<template>
<control_bar @bg_color_reset="onColor_reset" @toggle-render="onToggleRender" @bg_color_picked="onBgColor_picked" @text_color_picked="onText_color_picked"></control_bar>
  <div v-if="is_render">
    <section class="relative pb-20">
      <!-- <div class="px-4" style="background-color: var(--section-primary-color)"> -->
      <div class="px-4 bg_violet" :style="primary_color ? primary_color : ''">
        <div class="container mx-auto items-center flex flex-wrap">
          <div
            class="w-full md:w-4/12 ml-auto mr-auto px-4"
            style="margin-top: 50px; margin-bottom: 50px"
          >
            <img alt="..." class="max-w-full rounded-lg" src="../assets/imgs/heart_img.png" />
          </div>
          <div class="w-full md:w-5/12 ml-auto mr-auto px-4">
            <div class="md:pr-12 mb-8">
              <input
                class="text-3xl font-semibold text-section-color bg_violet w-full"
                :style="primary_color ? primary_color : ''"
                type="text"
                v-model="tittle"
              />
              <ul class="list-none mt-6">
                <li class="py-2">
                  <div class="flex items-center">
                    <div>
                      <span
                        class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"
                      >
                        <i class="fab fa-google"></i>
                      </span>
                    </div>
                    <div>
                      <input
                        class="text-section-color bg_violet text-lg" 
                        :style="primary_color ? primary_color : ''"
                        type="text"
                        v-model="secondary_text"
                      />
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="flex items-center">
                    <div>
                      <span
                        class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"
                      >
                        <i class="fab fa-google"></i>
                      </span>
                    </div>
                    <div>
                      <input
                        class="text-section-color bg_violet w-full text-lg"
                        :style="primary_color"
                        type="text"
                        v-model="sub_text"
                      />
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="flex items-center">
                    <div>
                      <span
                        class="text-xs font-semibold inline-block py-1 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"
                        style="padding-right: 0.4rem; padding-left: 0.4rem"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4 text-pink-600"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                      </span>
                    </div>
                    <div>
                      <!-- <h4 class="text-section-color">Almost started to like your movie taste</h4> -->
                      <input
                        class="text-section-color bg_violet text-lg"
                        :style="primary_color"
                        type="text"
                        value="Almost started to like your movie taste"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.bg_violet{
    background-color: var(--section-primary-color);
}

.text_violet{
    color: var(--section-primary-color);
}
.text-section-color{
  color: var(--section-secondary-color)
}
w-full{
    width: 100%;
}
</style>
