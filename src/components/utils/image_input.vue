<script>
export default {
    props: {
        image_url: String,
        reset_img: Boolean,
        image_tag: Boolean,
        custom_class: String 
    },
    data() {
        return {
            user_custom_img: null
        }
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
        handleFileUpload(event) {
            const file = event.target.files[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = () => {
                    this.user_custom_img = reader.result
                        var file_type = this.user_custom_img.match('data:image/([a-zA-Z]+);')[1]
                    this.$refs.img.setAttribute(
                        'data-verbose-path',
                        `./assets/imgs/user_input_like_you_section.${file_type}`
                    )
                }
                reader.readAsDataURL(file)
            }
        }
    },
    computed:{
        displayedImage(){
            return this.user_custom_img ? this.user_custom_img : this.image_url
        }
    }
}
</script>

<template>
    <template v-if="image_tag">
    <img @click="$refs.file_input.click()" :src="displayedImage"
        :class="custom_class" ref="img"/>
        <input type="file" ref="file_input" class="hidden" @change="handleFileUpload" @click="$refs.file_input.value = null" accept="image/*" />
    </template>
    <template v-else>
        <div class="absolute top-0 w-full h-full bg-center bg-cover md:bg-contain"
            :style="{'background-image': `url(${displayedImage})`}" ref="img">
            <span id="blackOverlay" class="w-full h-full absolute bg-black opacity-[0.5]" :style="primary_color"></span>
        </div>
    </template>
</template>
