1. Control bar download section code button 
2. Presets eg (color picked for bg and text)

c1: #540D59
c2: #05E1DD

- [x] Fix bug when deleteting all from input div is not showing 
- [x] make control bar buetiful
- [x] Ability for user to change images somehow xD
- [ ] Change font size
- [ ] test downloading page on mobile
<!-- - [ ] pdf download  -->

Better textarea and input
Guide pages for users how to upload how to use this website eg


## How to add ability to choose files 
```js
<img :src="image_url" class='rounded-full' alt="" ref="img">
<input type="file" @change="handleFileUpload" class="image_input">

import image_path from '@/assets/imgs/love_potion.png'
  data(){
    return {
      image_url:image_path
    }
  },
  methods:{
    handleFileUpload(event){
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
```

## How to add new section 

1. Create new section file
2. Import composable control bar
3. Add control bar component
4. Change every text field with a custom input component
5. Add primary_color computed style 
5. Import new component
6. Add new object into main_section components reactive list
7. Add div the same as for other sections


1. Readme for users
Click on text to edit it
Choose background and text color
Wait a second before your download starts
Toggle to turn off the section 
Rearange sections using arrows
Reset by clicking on button
Customise and click on download button to simple get the index.html 
Then either edit by yourself or just public on vercel