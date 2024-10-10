<script>
import { get_page } from '@/js/page_download'
import { useSectionStateStore } from '@/stores/SectionStateStore'

export default {
    setup() {
        const sectionStateStore = useSectionStateStore()

        return {
            sectionStateStore
        }
    },
    data() {
        return {
            animate: false
        }
    },
    created() {
        setInterval(() => { this.animate = !this.animate }, 5000)
    },

    methods: {
        get_html() {
            get_page(this.sectionStateStore.componentRef)
        }
    }
}
</script>



<template>
    <!-- <div :class="{ 'wobble-ver-right': animate }"  class="text-2xl fixed bottom-2 right-2 min-[540px]:bottom-6 min-[540px]:right-6 z-10 text-black cursor-pointer  flex justify-center items-center w-11 h-11 w bg-[#eec249] md:w-14 md:h-14 md:text-3xl system_ui rounded-full"> -->
    <div class="flex md:py-0 text-2xl">
        <!-- <h1 class="text-color font-semibold text-lg mr-2">Download Page:</h1> -->
        <i @click="get_html" class="fa-solid fa-download cursor-pointer text-black hover:text-purple-500"></i>
    </div>
</template>


<style scoped>
</style>