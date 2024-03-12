<script>
import control_bar from '@/components/utils/control_bar.vue'
import custom_input from '@/components/utils/custom_input.vue'
import image_input from '@/components/utils/image_input.vue'
import first_image from '@/assets/imgs/hiro_album_cover.jpg'
import second_image from '@/assets/imgs/kaspisky_gruz_album_cover.jpg'
import third_image from '@/assets/imgs/magic_city_album_cover.jpg'
import fourth_image from '@/assets/imgs/scryptonit_album_cover.png'
import { useSectionStore } from '@/stores/SectionStrore'

export default {
  setup() {
    const sectionStore = useSectionStore()

    return {
      sectionStore
    };
  },

  data() {
    return {
      reset_img: false,
      background_color: '',
      text_color:'',
      items: [
        { name: 'Name of the song', image: first_image, id:3},
        { name: 'Name of the song', image: second_image, id:4},
        { name: 'Name of the song', image: third_image, id:5},
        { name: 'Name of the song', image: fourth_image, id:6},
      ]
    }
  },
  props: {
    photoMode: Boolean,
    section_name: String
  },
  components: {
    control_bar,
    custom_input,
    image_input
  },
  emits: ['move_up', 'move_down'],
  methods: {
    reset_both() {
      this.sectionStore.resetColors(this.section_name)
      this.background_color = ''
      this.text_color = ''
      this.reset_img = true
    }
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
  }
}

</script>


<template>
    <!-- <control_bar  @move_up="$emit('move_up')" @move_down="$emit('move_down')" @bg_color_reset="reset_both"
        @toggle-render="sectionStore.toggleRendering(section_name)" @bg_color_picked="(value) => sectionStore.setBgColor(section_name, value)"
        @text_color_picked="(value) => sectionStore.setColor(section_name, value)">
    </control_bar> -->
  <control_bar @move_up="$emit('move_up')" @move_down="$emit('move_down')" @bg_color_reset="reset_both"
    @toggle-render="sectionStore.toggleRendering(section_name)" @bg_color_picked="(value) => background_color = value"
    @text_color_picked="(value) => text_color = value"
    @text_color_change="(value) => sectionStore.setColor(section_name, value)"
    @bg_color_change="(value) => sectionStore.setBgColor(section_name, value)">
  </control_bar>
  <Transition>
    <section v-show="render" class="pt-20 pb-48" :style="primary_color">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center text-center mb-24">
          <div class="w-full lg:w-6/12 px-4">
            <custom_input :section_name="section_name" :input_id="1" :photoMode="photoMode" :primary_color="primary_color" class='text-4xl font-semibold'
              default_input_value="Music associated with you"></custom_input>
            <custom_input :section_name="section_name" :input_id="2" :photoMode="photoMode" text_area :primary_color="primary_color"
              class='text-lg leading-relaxed m-4 text-gray-600'
              default_input_value="Melodies that I can listen to and remember you, they are filled with a special mood">
            </custom_input>
          </div>
        </div>
        <div class="flex flex-wrap">
          <div v-for="(item, index) in items" :key="index" class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
            <div class="px-6">
              <image_input :photoMode="photoMode" image_tag :image_url="item.image" :reset_img="reset_img"
                @update:reset="reset_img = false"
                custom_class="square_aspect_ratio object-cover shadow-lg rounded-full max-w-[120px]"
                class="aspect_ratio_box flex justify-center w-full">
              </image_input>
              <div class="pt-6 text-center">
                <custom_input :section_name="section_name" :input_id="item.id" :photoMode="photoMode" :primary_color="primary_color" class="text-xl font-bold"
                  :default_input_value="item.name">
                </custom_input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Transition>
</template>
