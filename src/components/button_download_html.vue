<script>
import { get_page } from '@/js/page_download'
// import html2pdf from 'html2pdf.js'

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
        //     this.$refs.html2Pdf.generatePdf()
        // },
        // exportToPDF() {
        //     var $ = instantiate_dom()
        //     remove_redudant_ui($)

        //     html2pdf().set({
        //         pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        //     });

        //     html2pdf($.html(), {
        //         filename: "Postcard.pdf",
        //         paginateElementsByHeight: '1400px'
        //     });
        // },

    }
}
</script>



<template>
    <div @click="get_html" :class="{ 'wobble-ver-right': animate }"
        class="text-2xl fixed bottom-2 right-2 min-[540px]:bottom-6 min-[540px]:right-6 z-10 text-black cursor-pointer rounded-full flex justify-center items-center w-11 h-11 w bg-[#eec249] md:w-14 md:h-14 md:text-3xl system_ui">
        <i class="fa-solid fa-download"></i>
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
}</style>