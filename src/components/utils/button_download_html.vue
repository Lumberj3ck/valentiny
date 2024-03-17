<script>
import { get_page } from '@/js/page_download'

export default {
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
            get_page()
        }
    }
}
</script>



<template>
    <!-- <div :class="{ 'wobble-ver-right': animate }"  class="text-2xl fixed bottom-2 right-2 min-[540px]:bottom-6 min-[540px]:right-6 z-10 text-black cursor-pointer  flex justify-center items-center w-11 h-11 w bg-[#eec249] md:w-14 md:h-14 md:text-3xl system_ui rounded-full"> -->
    <div class="flex py-2 md:py-0 text-2xl">
        <!-- <h1 class="text-color font-semibold text-lg mr-2">Download Page:</h1> -->
        <i @click="get_html" class="fa-solid fa-download cursor-pointer text-color button_icon"></i>
    </div>
</template>


<style scoped>
.text-color{
    /* color: var(--soft-blue-color) */
    color: black;
}

.button_icon:hover{
    color: var(--soft-red-color)
}
</style>