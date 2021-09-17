<template>
    <div class="img" :style="imgStyle"></div>
    <h5 :style="durationStyle">{{duration}}</h5>
</template>

<script>
export default {
    props: {
        thumbnail_url: {
            type: String,
            require: true
        },
        duration: {
            type: String,
            require: true
        },
        height: {
            type: Number,
            require: true
        },
        bottom: {
            type: Number,
            require: true
        },
    },
    computed: {
        imgStyle(){
            return {
                backgroundImage:"url('http://localhost:3000/thumbnail/1.jpg')",
                height: this.height + 'em'
            }
        },
        durationStyle(){
            return {
                bottom: this.bottom + 'em'
            }
        }
    }
}
</script>

<style scoped>
.img{
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    border: 1px solid #000;
}

h5{
    position: absolute;
    left: calc(100% - 4em);
    color: #fff;
    background-color: #000;
    padding: .1em;
    border-radius: .25em;
}

/* @media screen and (max-width: 767px){
    .img{
        height: 15em !important;
    }
} */
</style>