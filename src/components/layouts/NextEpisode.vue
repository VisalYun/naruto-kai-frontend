<template>
  <div class="next-episode">
    <base-section title="Up next">
      <h1 v-if="isLoading">Loading...</h1>
      <base-episode-panel
        v-else
        :thumbnail_width="55"
        :thumbnail_height="10"
        :info_width="45"
        :bottom="0.1"
        :margin="0"
        display="none"
        :id="Number(episode.episode)"
        :episode="Number(episode.episode)"
        :title="episode.title"
        :arc="arc.title"
        :arcId="Number(arc.id)"
        :thumbnail="episode.thumbnail_url"
        :description="episode.description"
      ></base-episode-panel>
    </base-section>
  </div>
</template>

<script>
import BaseEpisodePanel from "../ui/BaseEpisodePanel.vue";

export default {
  props: ["id"],
  components: {
    BaseEpisodePanel,
  },
  data(){
    return {
      isLoading: false,
      nextEpisode: null,
      nextArc: null
    }
  },
  watch: {
    $route(){
        this.loadData()
    },
  },
  computed: {
    episode() {
      if(this.$store.getters['movies/hasMovie']){
        return this.$store.getters['movies/episode'](Number(this.id));
      }
      return this.nextEpisode
    },
    arc() {
      if(this.$store.getters['arcs/hasArc']){
        return this.$store.getters['arcs/thisArc'](Number(this.episode.arc));
      }
      return this.nextArc
    },
  },
  created() {
    if(this.$store.getters['movies/hasMovie']){
      return;
    }
    this.loadData()
  },
  methods: {
    async loadData(){
      try{
        this.isLoading = true;
        this.nextEpisode = await this.fetchEpisode();
        this.nextArc = await this.fetchArc(this.nextEpisode.arc);
        this.isLoading = false;
      }catch(ex){
        window.location.href = "/notFound"
      }
    },
    async fetchArc(id) {
      const arc = await this.$store.dispatch("arcs/fetchArc", id);
      localStorage.nextArc = JSON.stringify(arc.arcs);
      return arc.arcs;
    },
    async fetchEpisode() {
      let episode = await this.$store.dispatch(
        "movies/fetchEpisode",
        this.id
      );
      if(episode.episodes.length == 0){
        episode = await this.$store.dispatch(
          "movies/fetchEpisode",
          1
        );
      }
      localStorage.nextEpisode = JSON.stringify(episode.episodes);
      return episode.episodes[0];
    },
  },
};
</script>

<style scoped>
.next-episode {
  width: 100%;
}
</style>