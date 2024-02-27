<script>
</script>


<template>
    <div class="md:absolute md:top-1/4 lg:top-[15%] xl:top-[5%] w-full">
    <div class=" flex flex-col md:flex-row-reverse ">
        <div class="flex justify-center md:w-5/6 lg:w-full">
            <img src="../assets/imgs/composition.jpg" alt="composition" class="w-11/12 min-[600px]:w-3/4 lg:w-9/12">
        </div>
        <div class="flex justify-center md:w-[65%] xl:w-3/4 items-center">
            <div class="flex flex-col w-5/6 max-w-sm min-[540px]:ml-[-50px] md:ml-0 md:max-w-md lg:max-w-[30rem]">
                <div class="mb-3 lg:mb-10">
                    <p class="font-bold text-2xl sm:text-3xl md:text-5xl tracking-wide ">
                        Listen to yourself.
                    </p>
                    <p class="font-bold text-2xl sm:text-3xl md:text-5xl ">
                        Follow your heart
                    </p>
                </div>
                <p class="text-lg md:text-xl lg:text-2xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in libero risus
                    semper habitant arcu eget. Et integer facilisi eget.
                </p>
                <div>
                <router-link to="/page_editor"
                    class="w-44 h-12 bg-yellow-300 rounded-3xl flex justify-center items-center mt-7 py-4 font-semibold text-lg md:text-xl lg:text-2xl lg:w-2/3 lg:h-1/6 lg:p-3 max-w-60">Make
                    my own!</router-link>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}
</style>