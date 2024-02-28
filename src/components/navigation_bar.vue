<script>
import download_button from './button_download_html.vue'

export default{
    emits:['photomode_toggle'],

    components:{
        download_button
    }        
}
</script>

<template>
  <div class="flex justify-start sm:justify-center m-3 system_ui">
  <div class="flex gap-5 flex-col rounded-lg border-black border-2 p-2 w-5/6 md:flex-row">
    <div class="flex">
    <h1 class="font-semibold mr-2">Photo Mode:</h1>
    <label class="toggle-switch">
      <input type="checkbox"  @change="$emit('photomode_toggle', $event.target.value)">
      <div class="toggle-switch-background">
        <div class="toggle-switch-handle"></div>
      </div>
    </label>
    </div>
    <download_button></download_button>
    <router-link to="user-guide/" class="font-semibold text-base" style="text-underline-offset: 1px;
    text-decoration: underline;">Guide</router-link>
  </div>
</div>
</template>