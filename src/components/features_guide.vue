<script>
// export default{
//     mounted(){
//         document.querySelector('body').style.backgroundColor = '#242424'
//     },
//     unmounted(){
//         document.querySelector('body').style.backgroundColor = 'inherit'
//     }
// }
</script>

<template>
    <div class="container">
        <h1 class="header font-bold text-secondary">Welcome to the Page Editor guide!</h1>
        <div class="text-black mb-2">
            If you have questions upon how to upload your page check <router-link class="link_color" to="/website-upload">this</router-link> article out!
        </div>
        <p class="mb-3 text-black">When you first load the page editor, you'll have several options for customizing your
            template:</p>
        <ol >
            <li class="mb-4"><strong class="text-secondary">Edit Text:</strong>
                <div class="text-black">Click on any text block to start editing it. Simply click on the text you want to
                    modify, and start typing.</div>
            </li>

            <li class="mb-4"><strong class="text-secondary">Choose Template Picture:</strong>
                <div class="text-black">Click on the <strong>"Choose"</strong> button to select a template picture for
                    your postcard. Browse and choose the one that best fits your message and style.</div>
            </li>

            <li class="mb-4"><strong class="text-secondary">Color Pickers:</strong>
                <div class="text-black"> Use the color pickers to customize the background color and text color of your
                    postcard. Click on the color picker icons to open the color selection panel, and choose your desired
                    colors.</div>
            </li>

            <li class="mb-4"><strong class="text-secondary">Rearrange Blocks:</strong>
                <div class="text-black">Click on the arrows to rearrange the blocks inside your postcard.</div>
            </li>

            <li class="mb-4"><strong class="text-secondary">Reset Button:</strong>
                <div class="text-black">Use the <strong>"Reset"</strong> button to reset any changes you've made to the
                    picked colors and image. Clicking this button will revert the background color, text color, and template
                    picture back to their original settings.</div>
            </li>

            <li class="mb-4"><strong class="text-secondary">Turn Off Button:</strong>
                <div class="text-black">Toggle the <strong>"Reset"</strong> button to hide or disable the current block.
                    This allows you to temporarily remove a block from your postcard without deleting it entirely.</div>
            </li>
        </ol>
     </div>   
</template>

<style scoped>
.link_color{
    color: var(--guide-link-color);
}
.text-secondary{
    color: var(--guide-secondary-color); 
    font-weight: bold;
}
.container {
    max-width: 900px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
}

.header {
    font-size: 24px;
    margin-bottom: 20px;
}


</style>