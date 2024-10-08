- [ ] check why logout button is not working on safari desktop

- [ ] Adjust landing mobile 

- [ ] Before the page reload add alert that do you want to reload you didn't save 

- [ ] When user publish the website it is not changing images from data to link

- [ ] add section where you can see all uploaded websites links

- [ ] Remove validation error on change of the login username when it was entered once and username is already taken : regist

- [ ] Some image height for users when internet is bad

- [ ] Save pinia store in local storage

- [ ] Work on ui update save button to icon

- [ ] start section 75vh make resp

- [ ] logout button on the navigation bar make computed 

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
