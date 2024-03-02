<script>
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
    props: {
        image_url: String,
        reset_img: Boolean,
        image_tag: Boolean,
        custom_class: String,
    },
    data() {
        return {
            user_custom_img: null,
            faPencil: faPencil
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

        handleFileUpload(event) {
            const file = event.target.files[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = () => {
                    this.user_custom_img = reader.result
                    var file_type = this.user_custom_img.match('data:image/([a-zA-Z]+);')[1]
                    this.$refs.img.setAttribute(
                        'data-verbose-path',
                        `./assets/imgs/user_input_${this.generateRandomLetters(5)}.${file_type}`
                    )
                }
                reader.readAsDataURL(file)
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
            <img @click="$refs.file_input.click()" :src="displayedImage" :class="custom_class" ref="img"/>
            <FontAwesomeIcon @click="$refs.file_input.click()" class="edit-icon system_ui_pen" :icon="faPencil"></FontAwesomeIcon>
            <input type="file" ref="file_input" class="hidden" @change="handleFileUpload"
                @click="$refs.file_input.value = null" accept="image/*" />
        </div>
    </template>
    <template v-else>
        <div :class="custom_class" :style="{ 'background-image': `url(${displayedImage})` }" ref="img">
            <slot name="background_overlay"></slot>
            <!-- <span id="blackOverlay" class="w-full h-full absolute bg-black opacity-[0.5]" :style="primary_color"></span> -->
            <FontAwesomeIcon @click="$refs.file_input.click()" class="edit-icon system_ui_pen" :icon="faPencil">
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
}</style>