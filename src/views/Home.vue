<template>
  <div class="home">
    <section class="container">
      <base-section v-if="resumeEpisode && !loading" title="Contiue Watching">
        <base-video-thumbnail
            :key="resumeEpisode.episode"
            :id="Number(resumeEpisode.episode)"
            :episode="Number(resumeEpisode.episode)"
            :title="resumeEpisode.title"
            :arc="Number(resumeEpisode.arc)"
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
          :key="movie.episode"
          :id="Number(movie.episode)"
          :episode="Number(movie.episode)"
          :title="movie.title"
          :arc="Number(movie.arc)"
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
          :key="movie.episode"
          :id="Number(movie.episode)"
          :episode="Number(movie.episode)"
          :title="movie.title"
          :arc="Number(movie.arc)"
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
      return this.$store.getters["movies/episodes"](1, 8);
    },
    fetchedSecondPart() {
      return this.$store.getters["movies/episodes"](28, 35);
    },
  },
  async created() {
    if(localStorage.episode){
      this.resumeEpisode = JSON.parse(localStorage.episode)[0]
    }
    if(this.$store.getters['movies/hasMovie']){
      return
    }
    return this.loadData()
  },
  methods: {
    async loadData() {
      this.loading=true
      try {
        const episodes = await this.$store.dispatch("movies/fetchMovie");
        const arcs = await this.$store.dispatch("arcs/fetchArcs");
        this.loading=false
        localStorage.numberOfEpisode = this.$store.getters["movies/movies"].length
        return [episodes, arcs];
      } catch (err) {
        window.location.href = "/notFound"
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
