<template>
  <div class="md:absolute md:top-1/4 lg:top-[15%] xl:top-[5%] w-full">
    <div class="flex flex-col md:flex-row-reverse gap-8 md:gap-0">
      <div class="flex justify-center md:w-5/6 lg:w-full">
        <!-- <img src="../assets/imgs/composition.jpg" alt="composition" class="w-11/12 min-[540px]:w-3/4 lg:w-9/12"> -->
        <img
          src="../assets/imgs/composition_2.png"
          alt="composition"
          class="w-11/12 min-[540px]:w-3/4 md:w-full lg:w-9/12 max-w-96 sm:max-w-md lg:max-w-3xl"
        />
      </div>
      <div class="flex justify-center md:w-[65%] xl:w-3/4 items-center">
        <div
          class="flex flex-col w-11/12 max-w-sm min-[540px]:ml-[-50px] md:ml-0 md:max-w-md lg:max-w-[30rem] gap-1"
        >
          <div class="mb-2 lg:mb-6 text-3xl md:text-4xl">
            <p class="font-bold mb-1 md:tracking-wide md:mb-2 text-black">Listen to yourself.</p>
            <p class="font-bold md:tracking-wide text-purple-600">Follow your heart</p>
          </div>
          <!-- text-gray-600 -->
          <p class="text-base md:text-xl text-black">
            Express your love with heartfelt messages! Share your feelings, memories
            in your postcard.
          </p>
          <div class="space-y-4 mt-4">
            <div class="flex items-center space-x-2 text-gray-700">
              <i class="fas fa-pen w-5 h-5 text-purple-600"></i>
              <span>Customizable templates for every occasion</span>
            </div>
            <div class="flex items-center space-x-2 text-gray-700">
              <i class="fas fa-heart w-5 h-5 text-purple-600"></i>
              <span>Predefined sections with good to start text</span>
            </div>
            <div class="flex items-center space-x-2 text-gray-700">
              <i class="fas fa-share-alt w-5 h-5 text-purple-600"></i>
              <span>Easy sharing across multiple platforms</span>
            </div>
            </div>
          <div class="mt-6 mb-10">
            <router-link
              to="/page-editor"
              class="bg-purple-600 text-white font-semibold w-full h-12 rounded-3xl flex justify-center items-center mt-2 md:mt-7 py-4 text-base md:text-lg lg:text-xl lg:w-2/3 lg:h-1/6 lg:p-3 max-w-52 landing_button transition-transform duration-300 hover:scale-105"
            >
              Explore the page
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showContent: false
    }
  },
  mounted() {
    // document.querySelector('body').style.backgroundColor = '#FFCAD4'
    document.querySelector('body').style.backgroundColor = 'white'
  },
  unmounted() {
    document.querySelector('body').style.backgroundColor = 'inherit'
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.header {
  color: var(--landing-text-color);
}

.landing_button {
  outline: none;
}

.landing_button:hover {
  /* outline: 2px solid var(--primary-attention-color); */
  outline: 2px solid var(--landing-text-color);
}

body {
  font-family: 'Poppins', sans-serif;
  /* background-color: var(--landing-background-color); */
}

.button_bg_color {
  /* background-color: var(--land-button-yellow); */
  background-color: var(--landing-button-color);
  color: var(--landing-text-color);
}
</style>
