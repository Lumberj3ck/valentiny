<template>
  <div>
    <button @click="publishWebsite">Publish Website</button>
    <p v-if="publishedUrl">Your website is live at: {{ publishedUrl }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { deployToVercel } from '@/js/deploy_utils.js'

const publishedUrl = ref('')

const publishWebsite = async () => {

  try {
    const files = [
    { file: 'index.html', data: '<html><h1>Third Hello world!!</h1></html>' },
    { file: 'styles.css', data: 'body { ... }' },
    ];
    const url = await deployToVercel(files, 'my-subdomain').catch(console.error);
    publishedUrl.value = url
  } catch (error) {
    console.error('Failed to publish website:', error)
  }
}
</script>