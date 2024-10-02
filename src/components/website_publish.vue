<template>
  <div class="w-full max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <div v-if="step === 0" class="w-full">
      <div class="p-6 bg-gray-50 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-900">Your Registered Domains</h1>
      </div>
      <div class="p-6 space-y-4">
        <div
          v-for="(user_domain, index) in user_published_domains"
          :key="index"
          class="flex items-center space-x-3"
        >
          <input
            type="radio"
            :id="'domain-' + user_domain.name"
            :value="index"
            v-model="user_published_domain"
            class="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
          />
          <label :for="'domain-' + user_domain.name" class="text-sm font-medium text-gray-700">
            {{ user_domain.name }}.{{ user_domain.domain_name }}
          </label>
        </div>
      </div>
      <div
        class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0"
      >
        <button
          @click="proceedWithDomain"
          class="w-full sm:w-auto px-2 py-1 bg-black text-white rounded-md hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-150 ease-in-out" :class="{ 'opacity-50 cursor-not-allowed': user_published_domain === null }"
          :disabled="user_published_domain === null"
        >
          Proceed with chosen domain
        </button>
        <button
          @click="createNewDomain"
          class="w-full sm:w-auto px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-150 ease-in-out">
          Create new domain
        </button>
      </div>
    </div>
    <div v-if="step != 0" class="p-6">
      <div v-if="step === 1">
        <h2 class="text-2xl font-bold mb-2">Publish Your Valentine Postcard</h2>
        <p class="text-gray-600 mb-6">Choose your domain and upload your postcard</p>
      </div>

      <div v-if="step === 1" key="step1" class="space-y-4">
        <label for="subdomain" class="block text-sm font-medium text-gray-700">Choose your subdomain</label>
        <div class="flex items-center space-x-2">
          <input
            id="subdomain"
            v-model="subdomain"
            type="text"
            placeholder="your-subdomain"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <span>.{{ domain }}</span>
        </div>
      </div>

      <div v-if="step === 2" key="step2" class="space-y-4">
        <div class="flex items-center space-x-2">
          <input
            type="radio"
            id="domain1"
            value="my-valentine-postcard.site"
            v-model="domain"
            class="form-radio"
          />
          <label for="domain1">my-valentine-postcard.site</label>
        </div>
        <div class="flex items-center space-x-2">
          <input
            type="radio"
            id="domain2"
            value="postcard.site"
            v-model="domain"
            class="form-radio"
          />
          <label for="domain2">postcard.site</label>
        </div>
      </div>
      <div v-if="step === 3" key="step3" class="space-y-4">
        <p>Your chosen domain:</p>
        <p class="font-bold">{{ subdomain }}.{{ domain }}</p>
        <p v-if="isChecking" class="flex items-center">
          <i class="fa fa-spinner fa-spin"></i> 
          Checking availability... Please wait a moment.
        </p>
        <transition name="bounce">
          <p
            v-if="availabilityMessage"
            :class="{ 'text-green-600': isAvailable, 'text-red-600': !isAvailable }"
            class="flex items-center"
          >
            <i :class="isAvailable ? 'fa fa-check-circle' : 'fa fa-times-circle'"></i>
            {{ availabilityMessage }}
          </p>
        </transition>
      </div>

      <div v-if="step === 4" key="step4" class="space-y-4">
        <div v-if="isUploading" class="flex flex-col items-center">
          <div class="relative h-[100px] w-full">
            <loading_spinner v-if="isUploading" color="black"></loading_spinner>
          </div>
          <p class="text-black">Uploading your postcard... This may take a few moments.</p>
        </div>
        <transition name="fade">
          <div v-if="uploadComplete">
            <div class="flex flex-col items-center space-y-2">
              <p class="text-green-600 mb-2"><i class="fa fa-check-circle"></i> Upload complete!</p>
              <p>Your postcard is now live at:</p>
              <a
                :href="publishedUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:underline"
              >
                {{ publishedUrl }}
              </a>
              <p class="text-sm text-gray-600">
                Note: You may need to refresh your browser cache (Ctrl + R) to see the changes.
              </p>
            </div>
            <div class="mt-8">
              <router-link
                to="/page-editor/"
                class="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Home
              </router-link>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div v-if="step != 0 && step != 4" class="px-6 py-4 bg-gray-50 border-t border-gray-200">
      <transition name="slide-fade">
        <div v-if="step === 1" class="flex justify-between">
          <button
            v-if="user_published_domains"
            @click="prevStep"
            class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Back
          </button>
          <button
            @click="nextStep"
            :disabled="!subdomain"
            class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{'w-3/4': user_published_domains, 'w-full': !user_published_domains}"
          >
            Next
          </button>
        </div>
      </transition>

      <transition name="slide-fade">
        <div v-if="step === 2" class="flex justify-between">
          <button
            @click="prevStep"
            class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Back
          </button>
          <button
            @click="handleDomainCheck"
            class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Check Availability
          </button>
        </div>
      </transition>

      <transition name="slide-fade">
        <div v-if="step === 3" class="flex justify-between">
          <button
            @click="toBegining"
            class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2  "
          >
            Back
          </button>
          <button
            v-if="step === 3 && isAvailable"
            @click="handleUpload"
            class="w-3/4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Upload Postcard
          </button>
        </div>
      </transition>
    </div>
  </div>
  <div id="main_section_app" style="display:none">

  </div>
</template>

<script>
import { check_subdomain_availability, upload_website, check_user_domains } from '@/js/api'
import { generate_zip_file } from '@/js/page_download'
import { useSectionStateStore } from '@/stores/SectionStateStore'

import main_section from "@/components/sections/main_section.vue"
import { createApp } from 'vue'
import router from '@/router/index'
import loading_spinner from '@/components/utils/loading_spinner.vue'

export default {
  name: 'UploadForm',
  data() {
    return {
      step: 1,
      domain: 'my-valentine-postcard.site',
      subdomain: '',
      user_published_domains: null,
      user_published_domain: null,
      isChecking: false,
      isAvailable: false,
      availabilityMessage: '',
      isUploading: false,
      uploadComplete: false,
      publishedUrl: ''
    }
  },
  components:{
    loading_spinner
  },
  setup() {
    const sectionStateStore = useSectionStateStore()

    return {
      sectionStateStore
    }
  },
  async mounted() {
    if (!this.sectionStateStore.componentRef){
      const container = document.getElementById('main_section_app')
      const a = createApp(main_section);
      a.use(router)
      a.mount(container)
    }

    const domains = await check_user_domains()

    if (domains && domains.length > 0) {
      this.step = 0
      this.user_published_domains = domains
    }
  },
  methods: {
    toBegining(){
      if (this.user_published_domains){
        this.step = 0
      } else {
        this.step = 1
      }
      this.availabilityMessage = null
      this.isAvailable = false
    },
    proceedWithDomain() {
      this.step = 3
      this.isAvailable = true
      const choosen_domain = this.user_published_domains[this.user_published_domain]
      this.subdomain = choosen_domain['name']
      this.domain = choosen_domain['domain_name']
    },
    createNewDomain() {
      this.step = 1
    },
    nextStep() {
      this.step++
    },
    prevStep() {
      this.step--
    },
    async handleDomainCheck() {
      this.isChecking = true
      this.availabilityMessage = ''
      this.isAvailable = false

      this.step = 3
      try {
        const data = await check_subdomain_availability(this.subdomain, this.domain)

        this.isAvailable = data.is_available
        this.availabilityMessage = data.message

      } catch (error) {
        this.availabilityMessage = error.message
        this.isAvailable = false
      } finally {
        this.isChecking = false
      }
    },
    async handleUpload() {
      this.isUploading = true

      this.step = 4
      try {
        const zipBlob = await generate_zip_file(this.sectionStateStore.componentRef)
        const response = await upload_website(this.subdomain, this.domain, zipBlob)
        this.uploadComplete = true
        this.publishedUrl = response.link
      } catch (error) {
        console.error('Upload failed:', error)
        this.availabilityMessage = 'Upload failed. Please try again.'
        this.isAvailable = false
      } finally {
        this.isUploading = false
      }
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
