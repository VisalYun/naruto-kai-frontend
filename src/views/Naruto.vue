<template>
    <div class="naruto">
        <base-section title="Naruto">
            <base-video-thumbnail
                v-for="movie in fetchedMovie"
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
    </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    fetchedMovie(){
      try{
        const episodes = this.$store.getters['movies/episodes'](1,6)
        if(episodes[0]){
          return episodes
        }
        throw new Error('Episodes is undefined')
      }catch(ex){
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