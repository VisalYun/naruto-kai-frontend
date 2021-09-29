<template>
  <section class="container">
    <h1 v-if="isLoading">Loading...</h1>
    <div class="video-container" v-else>
      <video-container
        :arc="arc.title"
        :arcId="arc.id"
        :thumbnail="episode.thumbnail_url"
        :episode="episode.episode"
        :title="episode.title"
        :description="episode.description"
        :video_url="
          !episode.video_url
            ? 'https://mega.nz/embed/4d80Vb7B#JuuoNBsyRfJr0N-ALwStjVVJEizSRdAfaUPeSy27Voo'
            : episode.video_url
        "
      ></video-container>
      <div class="episode">
        <next-episode :id="Number(id) + 1"></next-episode>
        <episode-list></episode-list>
      </div>
    </div>
  </section>
</template>

<script>
import BaseThumbnail from "../components/ui/BaseThumbnail.vue";
import VideoContainer from "../components/layouts/VideoContainer.vue";
import NextEpisode from "../components/layouts/NextEpisode.vue";
import EpisodeList from "../components/layouts/EpisodeList.vue";

export default {
  props: ["id"],
  components: {
    BaseThumbnail,
    VideoContainer,
    NextEpisode,
    EpisodeList,
  },
  data() {
    return {
      isLoading: false,
      thisEpisode: null,
      thisArc: null,
    };
  },
  watch: {
    $route(){
        this.loadData()
    },
  },
  computed: {
    arc() {
      if(this.$store.getters['arcs/hasArc']){
        localStorage.arc = JSON.stringify(this.$store.getters['arcs/thisArc'](Number(this.episode.arc)));
        return this.$store.getters['arcs/thisArc'](Number(this.episode.arc));
      }
      return this.thisArc;
    },
    episode() {
      if(this.$store.getters['movies/hasMovie']){
        localStorage.episode = JSON.stringify(this.$store.getters['movies/episode'](Number(this.id)));
        return this.$store.getters['movies/episode'](Number(this.id));
      }
      return this.thisEpisode;
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
        this.thisEpisode = await this.fetchEpisode();
        this.thisArc = await this.fetchArc(this.thisEpisode.arc);
        this.isLoading = false;
      }catch(ex){
        window.location.href = "/notFound"
      }
    },
    async fetchArc(id) {
      const arc = await this.$store.dispatch("arcs/fetchArc", id);
      localStorage.arc = JSON.stringify(arc.arcs);
      return arc.arcs;
    },
    async fetchEpisode() {
      const episode = await this.$store.dispatch(
        "movies/fetchEpisode",
        this.id
      );
      localStorage.episode = JSON.stringify(episode.episodes);
      return episode.episodes[0];
    },
  },
};
</script>

<style scoped>
.container {
  margin: 1em;
}
.video-container {
  display: flex;
}
.episode {
  width: 35%;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 1024px) {
  .video-container {
    flex-direction: column;
  }
  .episode {
    width: 100%;
  }
}
</style>