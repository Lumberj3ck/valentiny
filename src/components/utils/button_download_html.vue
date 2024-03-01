<script>
import { get_page } from '@/js/page_download'
// import * as htmlToImage from 'html-to-image';
// import { instantiate_dom, remove_redudant_ui } from '@/js/page_download';

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
        },
        // generateReport() {
        //     function filter(node){
        //         // console.log(node)
        //         return (node.classList ? !node.classList.contains( 'control_bar') && !node.classList.contains('system_ui') : true)
        //     }
        //     htmlToImage.toJpeg(document.querySelector('#app'), { quality: 0.95, filter: filter })
        //         .then(function (dataUrl) {
        //             var link = document.createElement('a');
        //             link.download = 'valentine-postcard.jpeg';
        //             link.href = dataUrl;
        //             link.click();
        //         });
        // }

    }
}
</script>



<template>
    <!-- <div :class="{ 'wobble-ver-right': animate }"  class="text-2xl fixed bottom-2 right-2 min-[540px]:bottom-6 min-[540px]:right-6 z-10 text-black cursor-pointer  flex justify-center items-center w-11 h-11 w bg-[#eec249] md:w-14 md:h-14 md:text-3xl system_ui rounded-full"> -->
    <div class="flex text-2xl">
        <h1 class="text-color font-semibold text-base mr-2">Download Page:</h1>
        <i @click="get_html" class="fa-solid fa-download cursor-pointer text-color button_icon"></i>
        <!-- <button @click="generateReport" class="system_ui">Get image</button> -->
    </div>
</template>


<style scoped>
.text-color{
    color: var(--soft-blue-color)
}

.button_icon:hover{
    color: var(--soft-red-color)
}
</style>