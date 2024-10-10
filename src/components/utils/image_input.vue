<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { upload_image } from '@/js/api'
import loading_spinner from '../utils/loading_spinner.vue'
// import generateRandomLetters from '@/js/generate_letter.js'
import { useSectionStore } from '@/stores/SectionStrore'
import { useImageUploadStore } from '@/stores/ImageUploadStore'
import user_notification from '@/components/utils/user_notification.vue'

export default {
  setup() {
    const sectionStore = useSectionStore()
    const imageUploadStore = useImageUploadStore()

    return {
      sectionStore,
      imageUploadStore
    }
  },
  props: {
    image_url: String,
    image_tag: Boolean,
    custom_class: String,
    photoMode: Boolean,
    section_name: String,
    image_input_id: Number
  },
  data() {
    return {
      user_custom_img: null,
      faPen: faPen,
      isLoading: false,
      error_message: null
    }
  },
  components: {
    FontAwesomeIcon,
    loading_spinner,
    user_notification
  },
  inject: ['reset_img'],
  watch: {
    reset_img(newValue) {
      if (newValue) {
          this.user_custom_img = null
          this.sectionStore.setImageLink(this.section_name, this.image_input_id, null)
        }
      }
  },
  mounted() {
    if (this.section_name) {
      this.user_custom_img = this.sectionStore.getImageLink(this.section_name, this.image_input_id)
    }
  },
  methods: {
    async handleFileUpload(event) {
      this.isLoading = true
      const bucket_url = import.meta.env.VITE_S3_BUCKET_URL
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user_custom_img = e.target.result;
          const uniqueFilename = `${Date.now()}`;
          const url = `${bucket_url}/${uniqueFilename}`;
          this.sectionStore.setImageLink(this.section_name, this.image_input_id, url);
          this.imageUploadStore.addResource(this.section_name + this.image_input_id)
          this.handleImageUpload(file, uniqueFilename);
        };
        reader.readAsDataURL(file);
        this.isLoading = false
      }
    },
    async handleImageUpload(file, uniqueFilename) {
      if (!file) {
        console.log('No file selected')
        return
      }

      const formData = new FormData()
      formData.append('file', file, uniqueFilename) 

      try {
        const result = await upload_image(formData);
        this.sectionStore.setImageLink(this.section_name, this.image_input_id, result.url);
        this.imageUploadStore.removeResource(this.section_name + this.image_input_id)
      } catch (error) {
        console.error('Error uploading image', error);
        this.error_message = error.message
      }
    },
    handleImageClick() {
      if (!this.photoMode) {
        this.$refs.file_input.click()
      }
    }
  },
  computed: {
    displayedImage() {
      return this.user_custom_img ? this.user_custom_img : this.image_url
    }
  }
}
</script>

<template>
  <template v-if="image_tag">
    <div class="image_cont">
      <user_notification v-if="error_message" :message="error_message" :show="Boolean(error_message)"  @update:show="error_message = null"></user_notification>
      <loading_spinner color="#000000" width="5px" :loading="isLoading"></loading_spinner>
      <img
        @click="handleImageClick"
        :src="displayedImage"
        :class="custom_class"
        ref="img"
        alt="user_img"
      />
      <FontAwesomeIcon
        @click="$refs.file_input.click()"
        class="edit-icon system_ui_pen text-purple-500 hover:text-purple-800"
        :icon="faPen"
      >
      </FontAwesomeIcon>
      <input
        type="file"
        ref="file_input"
        class="hidden"
        @change="handleFileUpload"
        @click="$refs.file_input.value = null"
        accept="image/*"
      />
    </div>
  </template>

  <template v-else>
    <div :class="custom_class" :style="{ 'background-image': `url(${displayedImage})` }" ref="img">
      <loading_spinner color="#000000" width="5px" :loading="isLoading"></loading_spinner>
      <user_notification v-if="error_message" :message="error_message" :show="Boolean(error_message)"  @update:show="error_message = null"></user_notification>
      <slot name="background_overlay"></slot>
      <FontAwesomeIcon
        @click="$refs.file_input.click()"
        class="edit-icon system_ui_pen text-purple-500 hover:text-purple-800"
        :icon="faPen"
      >
      </FontAwesomeIcon>
      <input
        type="file"
        ref="file_input"
        class="hidden"
        @change="handleFileUpload"
        @click="$refs.file_input.value = null"
        accept="image/*"
      />
    </div>
  </template>
</template>

<style>
.image_cont {
  position: relative;
  /* display: inline-block; */
}

.edit-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  /* Adjust size as needed */
  height: 20px;
  /* Adjust size as needed */
  cursor: pointer;
  /* color: var(--soft-red-color); */
}

/* .edit-icon:hover { */
  /* color: var(--soft-blue-color); */
/* } */
</style>
