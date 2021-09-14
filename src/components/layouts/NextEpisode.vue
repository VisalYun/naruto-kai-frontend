<template>
  <div class="next-episode">
    <base-section title="Up next">
      <base-episode-panel
          :width="70"
          :height="10"
          :bottom="0.1"
          :margin="0"
          display="none"
          :id="episode.id"
          :episode="episode.episode"
          :title="episode.title"
          :arc="arc.title"
          :arcId="arc.id"
          :thumbnail="episode.thumbnail_url"
          :description="episode.description"
      ></base-episode-panel>
    </base-section>
  </div>
</template>

<script>
import BaseEpisodePanel from '../ui/BaseEpisodePanel.vue'

export default {
    props: ['id'],
    components: {
        BaseEpisodePanel
    },
    computed: {
      episode(){
        const episode = this.$store.getters['movies/episode'](Number(this.id))
        if(episode){
          return episode
        }
        else if(this.$store.getters['movies/episode'](1)){
          return this.$store.getters['movies/episode'](1)
        }
        return JSON.parse(localStorage.nextEpisode)
      },
      arc(){
        const arc = this.$store.getters['arcs/thisArc'](this.episode.arc)
        if(arc){
          return arc
        }
        else{
          return JSON.parse(localStorage.arc)
        }
      },
    },
    created(){
      if(!this.episode || localStorage.nextEpisode.id == this.id+1){
        return
      }
      localStorage.nextEpisode = JSON.stringify(this.episode)
      localStorage.nextArc = JSON.stringify(this.arc)
    }
}
</script>

<style scoped>
.next-episode{
    width: 100%;
}
</style>