<template>
    <div class="naruto">
        <h1 v-if="isLoading">Loading...</h1>
        <base-section title="Naruto" v-else>
            <base-video-thumbnail
                v-for="movie in fetchedMovie"
                :key="movie.id"
                :id="Number(movie.id)"
                :episode="Number(movie.episode)"
                :title="movie.title"
                :arc="Number(movie.arc)"
                :thumbnail_url="movie.thumbnail_url"
                :duration="movie.duration"
            >
            </base-video-thumbnail>
        </base-section>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
      isLoading: false
    }
  },
  computed: {
    fetchedMovie(){
      return this.$store.getters['movies/episodes'](1,27)
    }
  },
  created(){
    if(this.$store.getters['movies/hasMovie']){
      return
    }
    else{
      this.loadData()
    }
  },
  methods: {
    async loadData(){
      this.isLoading = true
      try {
        await this.$store.dispatch("movies/fetchMovie");
        await this.$store.dispatch("arcs/fetchArcs");
        this.isLoading=false
      }catch (err) {
        window.location.href = "/notFound"
      }
    }
  }
}
</script>

<style scoped>
.naruto{
  margin: 2em;
}
@media screen and (max-width: 1024px) {
  .naruto{
    margin: 0 2em;
  }
}
</style>