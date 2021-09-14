<template>
    <section class="container">
        <div class="video-container">
            <video-container
                :arc="arc.title"
                :arcId="arc.id"
                :thumbnail="episode.thumbnail_url"
                :episode="episode.episode"
                :title="episode.title"
                :description="episode.description"
            ></video-container>
            <div class="episode">
                <next-episode
                    :id="Number(id)+1"
                ></next-episode>
                <episode-list></episode-list>
            </div>
        </div>
    </section>
</template>

<script>
import BaseThumbnail from '../components/ui/BaseThumbnail.vue'
import VideoContainer from '../components/layouts/VideoContainer.vue'
import NextEpisode from '../components/layouts/NextEpisode.vue'
import EpisodeList from '../components/layouts/EpisodeList.vue'

export default {
    props: ['id'],
    components: {
        BaseThumbnail,
        VideoContainer,
        NextEpisode,
        EpisodeList
    },
    computed: {
        arc(){
            const arc = this.$store.getters['arcs/thisArc'](this.episode.arc)
            if(arc){
                return arc
            }
            else{
                return JSON.parse(localStorage.arc)
            }
        },
        episode(){
            const episode = this.$store.getters['movies/episode'](Number(this.id))
            if(episode){
                return episode
            }
            else{
                return JSON.parse(localStorage.episode)
            }
        }
    },
    created(){
        if(!this.episode || localStorage.episode.id == this.id){
            return
        }
        localStorage.episode = JSON.stringify(this.episode)
        localStorage.arc = JSON.stringify(this.arc)
    }
}
</script>

<style scoped>
.container{
    margin: 1em;
}
.video-container{
    display: flex;
}
.episode{
    width: 35%;
    display: flex;
    flex-direction: column;
}

@media screen and (max-width: 1024px) {
    .video-container{
        flex-direction: column;
    }
    .episode{
        width: 100%;
    }
}
</style>