<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg p-6 mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Welcome to the Page Editor Guide!</h1>
      <p class="text-lg text-white">Learn how to create stunning postcards with our easy-to-use editor.</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <FeatureCard
        icon="fa-solid fa-edit"
        title="Edit Text"
        description="Click on any text block to start editing. Simply click and type to modify the content."
      />
      <FeatureCard
        icon="fa-solid fa-image"
        title="Choose Template Picture"
        description="Click 'Choose' to select a template picture. Browse and pick the one that best fits your message and style."
      />
      <FeatureCard
        icon="fa-solid fa-palette"
        title="Color Pickers"
        description="Use color pickers to customize background and text colors. Click the icons to open the selection panel."
      />
      <FeatureCard
        icon="fa-solid fa-arrows-alt-v"
        title="Rearrange Blocks"
        description="Click on the arrows to rearrange blocks inside your postcard for the perfect layout."
      />
      <FeatureCard
        icon="fa-solid fa-undo"
        title="Reset Button"
        description="Use 'Reset' to revert changes to colors and images back to their original settings."
      />
      <FeatureCard
        icon="fa-solid fa-toggle-on"
        title="Turn Off Button"
        description="Toggle to hide or disable the current block without deleting it entirely."
      />
    </div>

    <div class="mt-8 bg-blue-50 rounded-lg shadow-lg p-6">
      <h2 class="text-xl font-semibold text-blue-800 mb-2">Need More Help?</h2>
      <p class="text-blue-600 mb-4">
        If you have questions about uploading your page, check out our detailed article!
      </p>
      <router-link to="/website-upload" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Read Upload Guide
      </router-link>
    </div>
  </div>
</template>

<script>
import FeatureCard from '@/components/utils/feature_card.vue';

export default {
  components: {
    FeatureCard
  }
};
</script>

<style scoped>
</style>