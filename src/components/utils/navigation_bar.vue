<script>
import download_button from '@/components/utils/button_download_html.vue'
import { useSectionStore } from '@/stores/SectionStrore'
import { transformData } from '@/js/transform_data'
import { save_sections } from '@/js/api'
import { get_user_sections } from '@/js/api'

export default {
  setup() {
    const sectionStore = useSectionStore()

    return {
      sectionStore
    };
  },
  emits: ['photomode_toggle'],

  components: {
    download_button
  },
  data() {
    return {
      user_authenticated: localStorage.getItem('access-token'),
      progresStart: false,
      mobile_menu_hide : true 
    }
  },
  methods: {
    async save() {
      if (!this.sectionStore.sections | !this.user_authenticated) {
        return
      }
      const rearanged_data = transformData(this.sectionStore.sections)
      await save_sections(rearanged_data)
      if (!this.sectionStore.allSectionsSaved) {
        get_user_sections()
          .then(data => {
            if (Object.keys(data).length !== 0 && !data.constructor !== Object) {
              this.sectionStore.updateSectionState(data)
            }
          })
          .catch(error => {
            console.log(error)
          });
      }
    },
    logout() {
      localStorage.removeItem('access-token')
      this.$router.go(0);
    },
    startSaving() {
      this.progresStart = true
      this.save()
      setTimeout(() => this.progresStart = false, 1000);
    }
  }
}
</script>

<template>
  <!-- <div class="flex justify-start sm:justify-center m-3 system_ui">
    <div class="flex gap-5 flex-col rounded-lg nav_border p-2 w-5/6 md:flex-row">
      <div class="flex">
        <h1 class="font-semibold mr-2 nav_text">Photo Mode:</h1>
        <label class="toggle-switch">
          <input type="checkbox" @change="$emit('photomode_toggle', $event.target.value)">
          <div class="toggle-switch-background">
            <div class="toggle-switch-handle"></div>
          </div>
        </label>
      </div>
      <download_button></download_button>
      <router-link to="user-guide/" class="nav_text nav_link font-semibold text-base"
        style="text-underline-offset: 1px; text-decoration: underline;">
        Guide
      </router-link>
      <router-link v-if="!user_authenticated" to="register/" class="nav_text nav_link font-semibold text-base"
        style="text-underline-offset: 1px; text-decoration: underline;">
        Register
      </router-link>
      <router-link v-if="!user_authenticated" to="login/" class="nav_text nav_link font-semibold text-base"
        style="text-underline-offset: 1px; text-decoration: underline;">
        Login
      </router-link>


      <div v-if="user_authenticated" class="nav_text font-semibold" @click="logout">Logout</div>
      <div class="flex flex-col">
        <div v-if="user_authenticated" class="w-1/3 nav_text font-semibold" @click="startSaving">Save</div>
        <div v-show="progresStart" class="w-16 bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
          <div ref="progressBar" class="bg-blue-600 h-1.5 rounded-full w-1/5" :class="{ line: progresStart }"></div>
        </div>
      </div>
    </div>
  </div> -->


  <nav class="bg-white border-gray-200 mb-5">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="@/assets/imgs/logo/logo.png" class="h-9" alt="Postcard" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap ">Postcard</span>
      </router-link>
      <button data-collapse-toggle="navbar-default" type="button" @click="mobile_menu_hide = !mobile_menu_hide"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div :class="{hidden: mobile_menu_hide}" class="h-[210px] md:h-[inherit] w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium h-8 flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white  ">
          <li>
            <label class="inline-flex items-center cursor-pointer">
              <span class="text-lg font-semibold text-black mr-3">Photo Mode:</span>
              <input @change="$emit('photomode_toggle', $event.target.value)" type="checkbox" value=""
                class="sr-only peer" checked>
              <div
                class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600">
              </div>
            </label>
          </li>
          <li>
            <download_button></download_button>
          </li>
          <li class="ml-0">
            <router-link to="user-guide/"
              class="font-semibold block  text-lg py-2 md:px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              Guide
            </router-link>
          </li>
          <li v-if="!user_authenticated">
            <router-link to="login/"
              class=" font-semibold block text-lg py-2 md:px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
              Login
            </router-link>
          </li>
          <li v-if="user_authenticated" @click="startSaving" class="w-11">
            <a href="#"
              class=" font-semibold text-lg block py-2 md:px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Saved</a>
            <div v-show="progresStart" class="w-16 bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
              <div ref="progressBar" class="bg-blue-600 h-1.5 rounded-full w-1/5" :class="{ line: progresStart }"></div>
            </div>
          </li>
          <li v-if="user_authenticated" @click="logout">
            <a href="#"
              class="font-semibold text-lg block py-2 md:px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<style>
/* ----- */
.line {
  animation: loading 0.8s forwards cubic-bezier(0, 0, 0, 0);
}

@keyframes loading {
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
}

.nav_link:hover {
  color: var(--soft-red-color)
}

.nav_text {
  color: var(--soft-blue-color)
}

.nav_border {
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