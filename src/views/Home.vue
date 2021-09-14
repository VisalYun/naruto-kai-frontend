<template>
  <div class="home">
    <section class="container">
      <base-section v-if="resumeEpisode" title="Contiue Watching">
        <base-video-thumbnail
            :key="resumeEpisode.id"
            :id="resumeEpisode.id"
            :episode="resumeEpisode.episode"
            :title="resumeEpisode.title"
            :arc="resumeEpisode.arc"
            :thumbnail_url="resumeEpisode.thumbnail_url"
            :duration="resumeEpisode.duration"
        >
        </base-video-thumbnail>
      </base-section>
    </section>
    <section class="container">
      <h1 v-if="loading">Loading...</h1>
      <base-section title="Naruto" v-else-if="hasEpisode">
        <base-video-thumbnail
          v-for="movie in fetchedFirstPart"
          :key="movie.id"
          :id="movie.id"
          :episode="movie.episode"
          :title="movie.title"
          :arc="movie.arc"
          :thumbnail_url="movie.thumbnail_url"
          :duration="movie.duration"
        >
        </base-video-thumbnail>
      </base-section>
      <base-button link="/naruto" :width="10">Load More &#8594;</base-button>
    </section>

    <section class="container">
      <h1 v-if="loading">Loading...</h1>
      <base-section title="Naruto Shippuden" v-else-if="hasEpisode">
        <base-video-thumbnail
          v-for="movie in fetchedSecondPart"
          :key="movie.id"
          :id="movie.id"
          :episode="movie.episode"
          :title="movie.title"
          :arc="movie.arc"
          :thumbnail_url="movie.thumbnail_url"
          :duration="movie.duration"
        >
        </base-video-thumbnail>
      </base-section>
      <base-button link="/naruto-shippuden" :width="10"
        >Load More &#8594;</base-button
      >
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{
      loading: false,
      resumeEpisode: null,
      resumeArc: null
    }
  },
  computed: {
    hasEpisode(){
      return this.$store.getters['movies/hasMovie'];
    },
    fetchedFirstPart() {
      return this.$store.getters["movies/episodes"](1, 6);
    },
    fetchedSecondPart() {
      return this.$store.getters["movies/episodes"](7, 10);
    },
  },
  async created() {
    if(localStorage.episode){
      this.resumeEpisode = JSON.parse(localStorage.episode)
    }
    return await this.loadData()
  },
  methods: {
    async loadData() {
      this.loading=true
      try {
        const episodes = await this.$store.dispatch("movies/fetchMovie");
        const arcs = await this.$store.dispatch("arcs/fetchArc");
        this.loading=false
        return [episodes, arcs];
      } catch (err) {
        this.error = err.message || "Something went wrong!";
      }
    },
  },
};
</script>

<style scoped>
.home{
  margin: 2em;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (max-width: 1024px) {
  .home {
    margin: 0 2em;
  }
}
</style>
