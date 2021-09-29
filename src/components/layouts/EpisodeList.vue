<template>
    <base-section title="Episode List">
        <div class="episode-list">
            <base-button
                v-for="index in Number(episodeListLength)"
                :isLink="true" 
                :key="index"
                :link="'/episode/'+index" 
                :width="2"
            >{{index}}</base-button>
        </div>
    </base-section>
</template>

<script>
export default {
    computed: {
        episodeListLength(){
            if(this.$store.getters['movies/movies'].length > 0){
                return this.$store.getters['movies/movies'].length
            }
            else{
                return localStorage.numberOfEpisode
            }
        }
    }
}
</script>

<style scoped>
.episode-list{
    width: 100%;
    height: 15em;
    overflow: auto;
    border: 1px solid #000;
    text-align: left;
    background-color: #e6a53e;
}
</style>