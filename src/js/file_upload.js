export default function useFileUpload() {

  function handleFileUpload(event){
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.image_url  = reader.result;
          var file_type = this.image_url.match('data:image/([a-zA-Z]+);')[1]
          // var data_img_name = `./src/assets/imgs/user_input_${index}.${file_type}`
          this.$refs.img.setAttribute("data-verbose-path",`assets/imgs/user_input_love_potion.${file_type}`)
        };
        reader.readAsDataURL(file);
      }
    }

  return {
    handleFileUpload
  };
}