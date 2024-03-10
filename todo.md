1. Control bar download section code button 
2. Presets eg (color picked for bg and text)

c1: #540D59
c2: #05E1DD

- [x] Fix bug when deleteting all from input div is not showing 
- [x] make control bar buetiful
- [x] Ability for user to change images somehow xD
- [x] test downloading page on mobile
- [x] Better textarea and input
- [x] Guide pages for users how to upload how to use this website eg
- [ ] Change font size
- [ ] Fix bugs on text input small amounts of text especially check love potion section

{
    "sections": [
        {
            "start_section": {
                "background_color": "#somecolor",
                "text_color": "#somecolor",
                "image_input": "image_path",
                "text_inputs": {
                    "start_section_header_input": {
                        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, corrupti, illum ipsum sint aliquid dignissimos dicta adlias dolore obcaecati totam? Possimus harum animi quas ullam iure beatae, ipsa vitae, alias eos a libero enim earum?"
                    },
                    "start_section_paragraph_input": {
                        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, corrupti, illum ipsum sint aliquid dignissimos dictaossimus harum animi quas ullam iure beatae, ipsa vitae, alias eos a libero enim earum?"
                    },
                    "start_section_paragraph_2_input": {
                        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, corrupti, illum ipsum sint aliquid dignissimos dicta adipisci modi nostrum repudiandae reiciendis, obcaecati sed dolores non unde neque explicabo officia ex eum! ?"
                    }
                }
            }
        }
    ]
}




data:
{
sections: [
        {name: 'start_section', background_color: '#somecolor', text_color: '#somecolor', image_input: 'image_path', text_inputs: 
        [
            {name:'start_section_header_input', content: 'some text'},
            {name:'start_section_paragraph_input', content: 'some text'}
        ]
        },
        {name: 'reasons_like_you', background_color: '#somecolor', text_color: '#somecolor', image_input: 'image_path', text_inputs: 
        [
            {name:'reasons_header_input', content: 'some text'},
            {name:'reasons_paragraph_input', content: 'some text'},
        ]
        }
    ]
}


## How to add new section 

1. Create new section file
2. Import composable control bar
3. Add v-show on main tag
3. Add control bar component
4. Change every text field with a custom input component
5. Add primary_color computed style 
5. Import new component
8. Add image path (if it's  present inside section)


1. Readme for users
Click on text to edit it
Choose background and text color
Wait a second before your download starts
Toggle to turn off the section 
Rearange sections using arrows
Reset by clicking on button
Customise and click on download button to simple get the index.html 
Then either edit by yourself or just public on vercel


## Bugs