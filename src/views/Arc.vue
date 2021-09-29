<template>
    <div class="arc">
        <h1 v-if="loading">Loading...</h1>
        <base-section :title="arc.title" v-else>
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
                :key="episode.episode"
                :thumbnail_width="20"
                :thumbnail_height="10"
                :info_width="100"
                :bottom="0.5"
                :margin="1"
                display="block"
                url="/episode/"
                :id="Number(episode.episode)"
                :episode="Number(episode.episode)"
                :title="episode.title"
                :arc="arc.title"
                :arcId="Number(id)"
                :duration="episode.duration"
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
            loading: false,
            Arc: null,
            NextArc: null,
            PrevArc: null,
            Episodes: []
        }
    },
    watch: {
        $route(){
            this.loadData()
        },
    },
    computed: {
        arc(){
            if(this.$store.getters['arcs/hasArc']){
                return this.$store.getters['arcs/thisArc'](Number(this.id));
            }
            return this.Arc;
        },
        nextArc(){
            if(this.$store.getters['arcs/hasArc']){
                return this.$store.getters['arcs/thisArc'](Number(this.id)+1);
            }
            return this.NextArc;
        },
        prevArc(){
            if(this.$store.getters['arcs/hasArc']){
                return this.$store.getters['arcs/thisArc'](Number(this.id)-1);
            }
            return this.PrevArc;
        },
        episodes(){
            if(this.$store.getters['movies/hasMovie']){
                const episodes = []
                this.arc.episode.forEach(async(ep) => {
                    const episode = this.$store.getters['movies/episode'](Number(ep))
                    episodes.push(episode)
                })
                return episodes
            }
            return this.Episodes
        }
    },
    created(){
        if(this.$store.getters['arcs/hasArc']){
            return;
        }
        this.loadData()
    },
    methods: {
        async loadData(){
            try{
                this.loading = true
                this.Arc = await this.fetchArc()
                this.NextArc = await this.fetchNextArc()
                this.PrevArc = await this.fetchPrevArc()
                await this.fetchEpisodes()
                this.loading = false
            }catch(ex){
                window.location.href = "/notFound"
            }
        },
        async fetchArc(){
            const arc = await this.$store.dispatch("arcs/fetchArc", Number(this.id));
            return arc.arcs;
        },
        async fetchNextArc(){
            const arc = await this.$store.dispatch("arcs/fetchArc", Number(this.id)+1);
            return arc.arcs;
        },
        async fetchPrevArc(){
            const arc = await this.$store.dispatch("arcs/fetchArc", Number(this.id)-1);
            return arc.arcs;
        },
        async fetchEpisodes(){
            this.arc.episode.forEach(async(ep) => {
                const episode = await this.$store.dispatch(
                    "movies/fetchEpisode",
                    ep
                )
                this.Episodes.push(episode.episodes[0])
                this.Episodes.sort(function(a, b) {return Number(a.episode)-Number(b.episode)})
            })
        }
    }
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