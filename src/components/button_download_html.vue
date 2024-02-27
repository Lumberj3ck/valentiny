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
        <h1 class="font-semibold text-base mr-2">Download Page:</h1>
        <i @click="get_html" class="fa-solid fa-download"></i>
        <!-- <button @click="generateReport" class="system_ui">Get image</button> -->
    </div>
</template>


<style>
.wobble-ver-right {
    -webkit-animation: wobble-ver-right 1.3s both;
    animation: wobble-ver-right 1.5s both infinite;
    animation-delay: 2s;
}

@-webkit-keyframes wobble-ver-right {

    0%,
    100% {
        -webkit-transform: translateY(0) rotate(0);
        transform: translateY(0) rotate(0);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
    }

    15% {
        -webkit-transform: translateY(-30px) rotate(6deg);
        transform: translateY(-30px) rotate(6deg);
    }

    30% {
        -webkit-transform: translateY(15px) rotate(-6deg);
        transform: translateY(15px) rotate(-6deg);
    }

    45% {
        -webkit-transform: translateY(-15px) rotate(3.6deg);
        transform: translateY(-15px) rotate(3.6deg);
    }

    60% {
        -webkit-transform: translateY(9px) rotate(-2.4deg);
        transform: translateY(9px) rotate(-2.4deg);
    }

    75% {
        -webkit-transform: translateY(-6px) rotate(1.2deg);
        transform: translateY(-6px) rotate(1.2deg);
    }
}

@keyframes wobble-ver-right {

    0%,
    100% {
        -webkit-transform: translateY(0) rotate(0);
        transform: translateY(0) rotate(0);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
    }

    15% {
        -webkit-transform: translateY(-30px) rotate(6deg);
        transform: translateY(-30px) rotate(6deg);
    }

    30% {
        -webkit-transform: translateY(15px) rotate(-6deg);
        transform: translateY(15px) rotate(-6deg);
    }

    45% {
        -webkit-transform: translateY(-15px) rotate(3.6deg);
        transform: translateY(-15px) rotate(3.6deg);
    }

    60% {
        -webkit-transform: translateY(9px) rotate(-2.4deg);
        transform: translateY(9px) rotate(-2.4deg);
    }

    75% {
        -webkit-transform: translateY(-6px) rotate(1.2deg);
        transform: translateY(-6px) rotate(1.2deg);
    }
}
</style>