<script>
import download_button from '@/components/utils/button_download_html.vue'

export default{
    emits:['photomode_toggle'],

    components:{
        download_button
    }        
}
</script>

<template>
  <div class="flex justify-start sm:justify-center m-3 system_ui">
  <div class="flex gap-5 flex-col rounded-lg nav_border p-2 w-5/6 md:flex-row">
    <div class="flex">
    <h1 class="font-semibold mr-2 nav_text">Photo Mode:</h1>
    <label class="toggle-switch">
      <input type="checkbox"  @change="$emit('photomode_toggle', $event.target.value)">
      <div class="toggle-switch-background">
        <div class="toggle-switch-handle"></div>
      </div>
    </label>
    </div>
    <download_button></download_button>
    <router-link to="user-guide/" class="nav_text nav_link font-semibold text-base" style="text-underline-offset: 1px;
    text-decoration: underline;">Guide</router-link>
  </div>
</div>
</template>


<style>
.nav_link:hover{
  color: var(--soft-red-color)
}
.nav_text{
  color:var(--soft-blue-color)
}
.nav_border{
  border: 2px solid var(--soft-blue-color);
}
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  cursor: pointer;
}

.toggle-switch input[type="checkbox"] {
  display: none;
}

.toggle-switch-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: var(--primary-attention-color); */
  background-color: var(--soft-blue-color);
  border-radius: 20px;
  box-shadow: inset 0 0 0 2px #ccc;
  transition: background-color 0.3s ease-in-out;
}

.toggle-switch-handle {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
  /* background-color: #eec249; */
  /* background-color: var(--warm-yellow-color); */
  background-color: var(--soft-red-color);
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}

.toggle-switch::before {
  content: "";
  position: absolute;
  top: -25px;
  right: -35px;
  font-size: 12px;
  font-weight: bold;
  color: #aaa;
  text-shadow: 1px 1px #fff;
  transition: color 0.3s ease-in-out;
}

.toggle-switch input[type="checkbox"]:checked+.toggle-switch-handle {
  transform: translateX(45px);
  box-shadow: 0 2px 5px rgb(44, 98, 168), 0 0 0 3px #05c46b;
}

.toggle-switch input[type="checkbox"]:checked+.toggle-switch-background {
  /* background-color: #eec249; */
  /* background-color: var(--warm-yellow-color); */
  background-color: var(--soft-red-color);
  box-shadow: inset 0 0 0 2px #1c5081;
}

.toggle-switch input[type="checkbox"]:checked+.toggle-switch:before {
  content: "On";
  color: #05c46b;
  right: -15px;
}

.toggle-switch input[type="checkbox"]:checked+.toggle-switch-background .toggle-switch-handle {
  transform: translateX(30px);
  /* background-color: black; */
  /* background-color: var(--primary-attention-color); */
  background-color: var(--soft-blue-color);
}
</style>