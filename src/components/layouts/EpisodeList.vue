<template>
    <base-section title="Episode List">
        <div class="episode-list">
            <base-button
                v-for="index in episodeListLength" 
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
            return this.$store.getters['movies/movies'].length
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