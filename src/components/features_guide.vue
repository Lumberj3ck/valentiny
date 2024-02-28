<script>
export default{
    mounted(){
        document.querySelector('body').style.backgroundColor = '#000000'
    },
    unmounted(){
        document.querySelector('body').style.backgroundColor = 'inherit'
    }
}

</script>

<template>
    <div class="component_wrapper">
    <div class="container">
        <h1>Welcome to the Page Editor!</h1>
        <p class="text-gray-600">When you first load the page editor, you'll have several options for customizing your
            template:</p>
        <ol>
            <li><strong>Edit Text:</strong>
                <div class="text-gray-600">Click on any text block to start editing it. Simply click on the text you want to
                    modify, and start typing.</div>
            </li>

            <li><strong>Choose Template Picture:</strong>
                <div class="text-gray-600">Click on the <strong>"Choose"</strong> button to select a template picture for
                    your postcard. Browse and choose the one that best fits your message and style.</div>
            </li>

            <li><strong>Color Pickers:</strong>
                <div class="text-gray-600"> Use the color pickers to customize the background color and text color of your
                    postcard. Click on the color picker icons to open the color selection panel, and choose your desired
                    colors.</div>
            </li>

            <li><strong>Rearrange Blocks:</strong>
                <div class="text-gray-600">Click on the arrows to rearrange the blocks inside your postcard.</div>
            </li>

            <li><strong>Reset Button:</strong>
                <div class="text-gray-600">Use the <strong>"Reset"</strong> button to reset any changes you've made to the
                    picked colors and image. Clicking this button will revert the background color, text color, and template
                    picture back to their original settings.</div>
            </li>

            <li><strong>Turn Off Button:</strong>
                <div class="text-gray-600">Toggle the <strong>"Reset"</strong> button to hide or disable the current block.
                    This allows you to temporarily remove a block from your postcard without deleting it entirely.</div>
            </li>
        </ol>
     </div>   
 </div>
</template>

<style scoped>
.component_wrapper{
    background-color: black;
    height: 100%;
}

.container {
    max-width: 900px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: black;
    color: #eec249; 
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

p {
    margin-bottom: 15px;
}

ul {
    list-style-type: decimal;
    margin-bottom: 15px;
}

li {
    margin-bottom: 5px;
}

strong {
    font-weight: bold;
}

.button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #0056b3;
}</style>