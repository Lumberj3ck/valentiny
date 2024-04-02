<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { uploadImageToS3 } from '@/js/uploadToS3'
import loading_spinner from '../utils/loading_spinner.vue'
import generateRandomLetters from '@/js/generate_letter.js'
import { useSectionStore } from '@/stores/SectionStrore';

export default {
    setup() {
        const sectionStore = useSectionStore()

        return {
            sectionStore
        };
    },
    props: {
        image_url: String,
        reset_img: Boolean,
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
            isLoading: false
        }
    },
    components: {
        FontAwesomeIcon,
        loading_spinner
    },
    watch: {
        reset_img(newValue, oldValue) {
            if (newValue && !oldValue) {
                this.user_custom_img = null
                this.sectionStore.setImageLink(this.section_name, this.image_input_id, null)
                this.$emit('update:reset', false)
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
            const file = event.target.files[0]
            if (file) {
                await this.handleImageUpload(file);
            }
        },
        async handleImageUpload(file) {
            try {
                this.isLoading = true;
                const aws_bucket_name = import.meta.env.VITE_AWSBucket
                const file_name = `user-image-file_${generateRandomLetters(5)}`;
                await uploadImageToS3(file, aws_bucket_name, file_name);

                const fileUrl = `https://${aws_bucket_name}.s3.${import.meta.env.VITE_AWSRegion}.amazonaws.com/${file_name}`;
                this.user_custom_img = fileUrl;
                this.sectionStore.setImageLink(this.section_name, this.image_input_id, fileUrl)
                this.isLoading = false;
            } catch (error) {
                console.error('Error uploading image:', error);
                this.isLoading = false;
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
            <loading_spinner color="#000000" width="5px" :loading="isLoading"></loading_spinner>
            <img @click="handleImageClick" :src="displayedImage" :class="custom_class" ref="img" alt="user_img"/>
            <FontAwesomeIcon @click="$refs.file_input.click()" class="edit-icon system_ui_pen" :icon="faPen">
            </FontAwesomeIcon>
            <input type="file" ref="file_input" class="hidden" @change="handleFileUpload"
                @click="$refs.file_input.value = null" accept="image/*" />
        </div>
    </template>

    <template v-else>
        <div :class="custom_class" :style="{ 'background-image': `url(${displayedImage})` }" ref="img">
            <loading_spinner color="#000000" width="5px" :loading="isLoading"></loading_spinner>
            <slot name="background_overlay"></slot>
            <FontAwesomeIcon @click="$refs.file_input.click()" class="edit-icon system_ui_pen" :icon="faPen">
            </FontAwesomeIcon>
            <input type="file" ref="file_input" class="hidden" @change="handleFileUpload"
                @click="$refs.file_input.value = null" accept="image/*" />
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
    color: var(--soft-red-color)
}

.edit-icon:hover {
    color: var(--soft-blue-color)
}
</style>