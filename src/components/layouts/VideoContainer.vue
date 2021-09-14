<template>
    <div class="this-episode">
        <video id="videoPlayer" controls autoplay>
            <source src="http://192.168.1.25:3000/video" type="video/mp4" />
        </video>
        <div class="this-info">
            <h1>Ep{{episode}}: {{title}}</h1>
            <router-link :to="'/arc/'+arcId">
                <p>{{arc}}</p>
            </router-link>
            <hr>
            <p>{{description}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['arc', 'arcId', 'thumbnail', 'episode', 'title', 'description'],
}
</script>

<style scoped>
.this-episode{
    width: 75%;
}
.this-episode video{
    display: block;
    width: 100%;
    height: 75%;
}
a{
    text-decoration: none;
    color: inherit;
}
a p{
    margin: 0.3em 0;
}
@media screen and (max-width: 1024px) {
    .this-episode{
        width: 100%;
    }
}
@media screen and (max-width: 767px) and (orientation: portrait) {
    .this-episode video{
        height: 40vh;
    }
}
@media screen and (max-width: 767px) and (orientation: landscape) {
    .this-episode video{
        height: 100vh;
    }
}
</style>