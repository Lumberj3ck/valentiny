<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { uploadImageToS3 } from '@/js/uploadToS3'

export default {
    props: {
        image_url: String,
        reset_img: Boolean,
        image_tag: Boolean,
        custom_class: String,
        photoMode: Boolean
    },
    data() {
        return {
            user_custom_img: null,
            faPen: faPen
        }
    },
    components: {
        FontAwesomeIcon
    },
    watch: {
        reset_img(newValue, oldValue) {
            if (newValue && !oldValue) {
                this.user_custom_img = null
                this.$emit('update:reset', false)
                //  inside parent comp
                //  @update:reset="reset = !reset"
            }
        }
    },
    methods: {
        generateRandomLetters(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters.charAt(randomIndex);
            }

            return result;
        },

        async handleFileUpload(event) {
            const file = event.target.files[0]
            // try {
            //     const response = await uploadImageToS3(file, 'YOUR_BUCKET_NAME', 'images');
            //     console.log('Image uploaded successfully:', response.Location);
            // } catch (error) {
            //     console.error('Error uploading image:', error);
            // }
            const file_name = `user-image-file_${this.generateRandomLetters(5)}`
            await uploadImageToS3(file, 'postcard-user-images',  file_name);
            const fileUrl = `https://${import.meta.env.VITE_AWSBucket}.s3.${import.meta.env.VITE_AWSRegion}.amazonaws.com/${file_name}`
            this.user_custom_img = fileUrl 
            // if (file) {
            //     const reader = new FileReader()
            //     reader.onload = () => {
            //         this.user_custom_img = reader.result
            //         var file_type = this.user_custom_img.match('data:image/([a-zA-Z]+);')[1]
            //         this.$refs.img.setAttribute(
            //             'data-verbose-path',
            //             `./assets/imgs/user_input_${this.generateRandomLetters(5)}.${file_type}`
            //         )
            //     }
            //     reader.readAsDataURL(file)
            // }
        },
        // async uploadImage() {
        //     try {
        //         const response = await uploadImageToS3(this.selectedFile, 'YOUR_BUCKET_NAME', 'images');
        //         console.log('Image uploaded successfully:', response.Location);
        //     } catch (error) {
        //         console.error('Error uploading image:', error);
        //     }
        // },
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
            <img @click="handleImageClick" :src="displayedImage" :class="custom_class" ref="img" />
            <FontAwesomeIcon @click="$refs.file_input.click()" class="edit-icon system_ui_pen" :icon="faPen">
            </FontAwesomeIcon>
            <input type="file" ref="file_input" class="hidden" @change="handleFileUpload"
                @click="$refs.file_input.value = null" accept="image/*" />
        </div>
    </template>

    <template v-else>
        <div :class="custom_class" :style="{ 'background-image': `url(${displayedImage})` }" ref="img">
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