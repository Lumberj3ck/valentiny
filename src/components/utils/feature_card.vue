<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <div class="flex items-center mb-4">
      <i :class="icon" class="text-blue-500 text-2xl mr-2" />
      <h2 class="text-xl font-semibold">{{ title }}</h2>
    </div>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'FeatureCard',
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>