<template>
    <div class="arc">
        <base-section :title="arc.title">
            <p>{{ arc.description }}</p>
            <div class="action">
                <router-link to="/naruto" v-if="!prevArc"></router-link> <!-- Flex Helper -->
                <router-link :to="'/arc/'+prevArc.id" v-if="prevArc">&#8592;Previous<br>{{prevArc.title}}</router-link>
                <router-link :to="'/arc/'+nextArc.id" v-if="nextArc">Next&#8594;<br>{{nextArc.title}}</router-link>
                <router-link to="/naruto" v-if="!nextArc"></router-link> <!-- Flex Helper -->
            </div>
        </base-section>
        <base-section title="Episode">
            <base-episode-panel
                v-for="episode in episodes"
                :key="episode.id"
                :width="30"
                :height="10"
                :bottom="0.5"
                :margin="1"
                display="block"
                :id="episode.id"
                :episode="episode.episode"
                :title="episode.title"
                :arc="arc.title"
                :arcId="id"
                :thumbnail="episode.thumbnail_url"
                :description="episode.description"
            ></base-episode-panel>
        </base-section>
    </div>
</template>

<script>
import BaseEpisodePanel from '../components/ui/BaseEpisodePanel.vue'

export default {
    props: ['id'],
    components: {
        BaseEpisodePanel
    },
    data(){
        return{
            loading: false
        }
    },
    computed: {
        arc(){
            try{
                const arc = this.$store.getters['arcs/thisArc'](Number(this.id))
                console.log(arc)
                if(arc){
                    return arc
                }
                throw new Error('Arc is not defined')
            }catch(ex){
                window.location.href = "/notFound"
            }
        },
        nextArc(){
            return this.$store.getters['arcs/thisArc'](Number(this.id)+1)
        },
        prevArc(){
            return this.$store.getters['arcs/thisArc'](Number(this.id)-1)
        },
        episodes(){
            const episodes = []
            this.arc.episodes.forEach(ep => {
               const episode = this.$store.getters['movies/episode'](ep)
               episodes.push(episode)
            })
            return episodes
        }
    },
}
</script>

<style scoped>
.arc{
    margin: 1em;
}
a{
    display: block;
    text-decoration: none;
    color: #000;
}
a:hover{
    text-decoration: underline;
}
.bold{
    font-weight: bold;
}
p{
    margin-bottom: 2em;
}
.action{
    width: 100%;
    display: flex;
    flex: 50%;
    justify-content: space-between;
    border-top: 1px solid #000;
    padding-top: 1em;
    margin-top: 2em;
}
</style>