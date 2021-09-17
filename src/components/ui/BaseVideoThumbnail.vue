<template>
    <div class="video-thumbnail">
        <router-link :to="'/episode/'+id">
            <base-thumbnail
                :thumbnail_url="thumbnail_url"
                :duration="duration"
                :height="15"
                :bottom="5"
            ></base-thumbnail>
            <h3>Ep{{episode}}: {{title}}</h3>
        </router-link>

        <router-link :to="'/arc/'+arc">
            <p>{{arcTitle}}</p>
        </router-link>
    </div>
</template>

<script>
import BaseThumbnail from './BaseThumbnail.vue'

export default {
    components: {
        BaseThumbnail
    },
    props: {
        id: {
            type: Number,
            require: true
        },
        episode: {
            type: Number,
            require: true
        },
        title: {
            type: String,
            require: true
        },
        arc: {
            type: Number,
            require: true
        },
        thumbnail_url: {
            type: String,
            require: true
        },
        duration: {
            type: String,
            require: true
        }
    },
    computed: {
        arcTitle(){
            try{
                return this.$store.getters['arcs/thisArc'](this.arc).title
            }catch(ex){
                console.log(ex)
            }
        }
    },
}
</script>

<style scoped>
a{
    text-decoration: none;
    color: #000;
}

.video-thumbnail{
    width: 22.5vw;
    position: relative;
    margin: 0.5em;
    padding: 0.2em;
}

.video-thumbnail:hover{
    background-color: rgba(33, 33, 33, 0.1);
}

h3{
    margin: .2em 0;
}

@media screen and (width: 1024px) {
    .video-thumbnail{
        width: 35vw;
    }
}

@media screen and (max-width: 1023px) {
    .video-thumbnail{
        width: 43vw;
    }
}

@media screen and (max-width: 767px) {
    .video-thumbnail{
        width: 100%;
    }
}
</style>