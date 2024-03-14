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
<!-- - [ ] Change font size -->
- [ ] Fix bugs on text input small amounts of text especially check love potion section
- [ ] On deproy donot forget about api url and cors url for fastapi
- [ ] Do password validations on register
- [ ] Draw some errors which you will get from the api
- [x] Test for every use case
- [ ] better alert box 
- [ ] Save state inside of local storage without clicking on button save
- [x] Set default color picked 
- [ ] Images save
- [x] Maintance problem when user saved 5 sections but we added one additional and when he tries to save it this section
would be without id 



User save different cases:
- [x] User without registration and login click on save butto

- [x] User made some changes to the template and wants register and then save
It's working because of pinia store 
<----->

- [x] User register and then push some changes

- [x] User logged in and want to retrieve some state 

- [x] User made changes to template and tries to login 

- [x] User registered saved and logins in 

- [x] Check how it will work when user saved and then download the page



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
1. User changes the color: but somehow color didn't change inside of pinia store
user tries again the same color but color didn't change so it won't trigger the change event 
Somewhy it don't work with black color When person loads the data the inputs they are in default state the data sets some color but 
color inputs are already in black color so when person choose black it don't trigger 
so the color sets to black but change event didn't trigger