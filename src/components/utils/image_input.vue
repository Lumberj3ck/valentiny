<script>
export default {
    props: {
        image_url: String,
        reset_img: Boolean
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
            console.log(file)
            console.log('asdf')
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
    }
}
</script>

<template>
    <img @click="$refs.file_input.click()" :src="user_custom_img ? user_custom_img : image_url"
        class="rounded-full aspect-square object-cover" ref="img"/>
    <input type="file" ref="file_input" class="hidden" @change="handleFileUpload" @click="$refs.file_input.value = null" accept="image/*" />
</template>
