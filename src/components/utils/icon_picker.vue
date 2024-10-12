<template>
    <div class="relative">
      <div
        @click="togglePopover"
        ref="popOverTrigger"
        class="rounded-md shadow-sm  hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <i :class="['fas', `fa-${selectedIcon}`]"></i>
    </div>
      <div
        v-if="isPopoverOpen"
        ref="popOver"
        class="bg-white absolute right-[-200px] lg:right-[-300px] transform -translate-x-1/2 mt-2 rounded-md z-10 w-28 md:w-64"
      >
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2 text-black p-2">
          <button
            v-for="(icon, index) in paginatedIcons"
            :key="index"
            @focusout="closePopover"
            tabindex="0"
            @click="selectIcon(icon)"
            class="w-12 h-12 border bg-white border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <i :class="['fas', `fa-${icon}`, 'text-xl']"></i>
          </button>
        </div>
        <div class="flex justify-between mt-2 px-2 text-purple-600 mb-2 text-lg">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-2 py-1 bg-gray-200 rounded-md disabled:opacity-50"
          >
            <i class="fas fa-chevron-left text-xl"></i>
          </button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-2 py-1 bg-gray-200 rounded-md disabled:opacity-50"
          >
            <i class="fas fa-chevron-right text-xl"></i>
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import { useSectionStore } from '@/stores/SectionStrore';

export default {
  setup() {
    const sectionStore = useSectionStore()

    return {
      sectionStore
    };
  },
  name: 'FontAwesomePicker',
  props: {
    defaultIcon: {
      type: String,
      default: 'coffe'
    },
    section_name: String,
    picker_id: Number,
  },
  data() {
    return {
      icons: [
        'coffee',
        'home',
        'user',
        'cog',
        'bell',
        'envelope',
        'heart',
        'star',
        'bookmark',
        'calendar',
        'flask',
        'fire',
        'camera',
        'music',
        'plane',
        'car',
        'bicycle',
        'book',
        'lightbulb',
        'gift',
        'trophy',
        'map-marker',
        'shopping-cart',
        'pizza-slice',
        'graduation-cap',
        'paint-brush',
        'gamepad',
        'microphone',
        'globe',
        'sun',
      ],
      selectedIcon: null,
      isPopoverOpen: false,
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  inject: ['reset_text'],
  watch: {
    reset_text(newValue) {
      if (newValue) {
        this.selectedIcon = this.defaultIcon
      }
    }
  },
  mounted() {
    this.selectedIcon = this.sectionStore.sections[this.section_name].icon_inputs[this.picker_id].content
    if (!this.selectedIcon) {
      this.selectedIcon = this.defaultIcon
    }
  },
  unmounted() {
    document.removeEventListener('click', this.closePopover)
  },
  computed: {
    totalPages() {
      return Math.ceil(this.icons.length / this.itemsPerPage)
    },
    paginatedIcons() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.icons.slice(start, end)
    }
  },
  methods: {
    togglePopover() {
      this.isPopoverOpen = !this.isPopoverOpen
      document.addEventListener('click', this.closePopover)
    },
    closePopover(event){
      if (this.isPopoverOpen && !this.$refs.popOver.contains(event.target) && !this.$refs.popOverTrigger.contains(event.target)){
        this.isPopoverOpen = false
        document.removeEventListener('click', this.closePopover)
      }
    },
    selectIcon(icon) {
      this.selectedIcon = icon
      this.isPopoverOpen = false
      this.sectionStore.sections[this.section_name].icon_inputs[this.picker_id].content = icon
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    }
  }
}
</script>

<style scoped>
</style>