<template>
    <div class="custom_flex">
    <div class="container">

        <div class="contents">

            <div class="text-wrapper">
                <p class="upper-text">Listen to yourself Follow your heart</p>
                <p class="bottom-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in libero risus
                    semper habitant arcu eget. Et integer facilisi eget.</p>
            </div>

            <div class="button-div">
                <!-- <button class="button">Download the App</button> -->
                <router-link to="/page_editor" class="button">Start customizing page</router-link>
            </div>
        </div>

        <img src="../assets/imgs/composition.jpg">
    </div>
    </div>
</template>

<style scoped>
.custom_flex{
    display: flex;
    justify-content: center;
}

.poppins-bold {
    font-family: "Poppins", sans-serif;
    font-weight: 700;
    font-style: normal;
}

body,
html {
    margin: 0;
    height: 100%;
}

img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
}

.container {
    height: 100%;
    display: flex;

    align-items: center;
}

.contents {
    display: flex;
    flex-direction: column;

    max-width: 5000px;
    width: 100%;
}

.text-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    height: auto;
    width: 100%;
    margin: 0;
    margin-bottom: 5%;

    color: #2C1001;
}

.upper-text {
    font-family: "Poppins", sans-serif;
    font-size: 64px;
    font-weight: 700;
    line-height: 1.25;

    margin: 0;
    width: 90%;

}

.bottom-text {
    font-family: "Poppins", sans-serif;
    font-size: 24px;
    font-weight: 300;

    margin: 0;
    margin-top: 5%;
    width: 87%;

    text-align: start;
}

.button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFDE81;
    color: #2C1001;

    margin: 0;
    margin-left: 5%;
    width: 265px;
    height: 78px;
    border-radius: 36px;
    border: 0;

    font-size: 20px;
    font-family: "Poppins", sans-serif;
}

.button-div {
    display: flex;
    width: 100%;
    justify-content: flex-start;
}


@media (min-width: 1700px) {
    .text-wrapper {
        width: 70%;
    }
}


@media (max-width: 1440px) {
    img {
        width: 60%;
    }
}

@media (max-width: 1232px) {
    .upper-text {
        font-size: 48px;
    }

    img {
        width: 60%;
    }
}

@media (max-width: 1024px) {
    img {
        width: 50%;
    }

    .upper-text {
        font-size: 42px;
    }

    .bottom-text {
        font-size: 20px;
    }
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }

    img {
        order: -1;
        width: 80%;
    }

    .text-wrapper {
        width: 70%;
    }

    .upper-text {
        font-size: 48px;
        margin-left: 3%;
    }

    .contents {
        margin-left: 5%;
    }

}</style>