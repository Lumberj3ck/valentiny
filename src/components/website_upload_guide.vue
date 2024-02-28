<template>
    <div class="container">
        <div class="mb-4">
        <h1 class="text-2xl md:text-3xl text-[#ffbb00] font-bold">Website launch guide</h1>
        <p style="color: black">After downloading .zip file of your website you need to complete following steps:</p>
        </div>
        <ol>
            <li  class="mb-4">
                <strong class="text-lg">Download and Organize Your Website Files:</strong>
                <div class="bullet-point">Ensure that all the necessary files for your website, including HTML, CSS,
                    JavaScript, and any other assets, are organized in a dedicated folder on your local machine</div>
            </li>
            <li class="mb-4">
                <strong class="text-lg">Prepare Your GitHub Account:</strong>
                <div class="bullet-point">If you haven't already, sign up for a <a href="https://github.com"
                        style="color: #09abeb">GitHub</a> account. GitHub is a platform for hosting your code
                    repositories.
                </div>
            </li>
            <li class="mb-4">
                <strong class="text-lg">Create a New Repository:</strong>
                <div class="bullet-point">Once logged in to GitHub, create a new repository by clicking on the "New" button.
                    Give your repository a meaningful name that reflects your website.
                </div>
            </li>
            <li class="mb-4">
                <strong class="text-lg">Upload Your Files to GitHub:</strong>
                <div class="bullet-point">After creating the repository, follow the instructions to upload your website
                    files. Instead of zipping and uploading, select all the files in your website folder and upload them
                    directly. This prevents potential issues that may arise from uploading an entire folder at once. Use
                    drag & drop if not all the files were uploaded
                    <!-- <img src="./images/quick-setup.png" style="width:100%;"> -->
                    Here click on <a style="color: rgb(9, 171, 235)"><u>uploading an existing file</u></a> link and upload
                    your files
                </div>
            </li>
            <li class="mb-4">
                <strong class="text-lg">Commit Your Changes:</strong>
                <div class="bullet-point">Once the files are uploaded, commit your changes to the repository. Provide a
                    meaningful commit message that describes the changes you've made.</div>
            </li>
            <li class="mb-4">
                <strong class="text-lg">Configure Repository Settings for GitHub Pages:</strong>
                <div class="bullet-point">Go to the "Settings" tab of your repository. Scroll down to the "GitHub Pages"
                    section. In the "Branch" dropdown menu, select the branch that contains your website files (typically
                    "main" or "master"). Then click "Save".</div>
                <!-- <img src="./images/branch.png"> -->
            </li>
            <li class="mb-4">
                <strong class="text-lg">Wait for GitHub Pages Deployment:</strong>
                <div class="bullet-point">It may take a few minutes for GitHub Pages to deploy your website. Once the
                    deployment is complete, you will see a message like this, indicating that your site is published:</div>
                <!-- <img src="./images/site-is-live.png"> -->
            </li>
            <li class="mb-4">
                <strong class="text-lg">Access Your Website:</strong>
                <div class="bullet-point">GitHub Pages will provide you with a URL where your website is hosted. Simply
                    click on the provided link to access your website and ensure everything looks as expected. Voilà!</div>
            </li>
        </ol>
    </div>
</template>


<style scoped>
body {
    background-color: #242424;
}


img {
    margin-top: 10px;
    margin-bottom: 10px;
}

.container {
    max-width: 900px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
    color: #ffbb00;
}

.bullet-point {
    color: black;
    margin-top: 5px;
    font-size: 16px
}</style>