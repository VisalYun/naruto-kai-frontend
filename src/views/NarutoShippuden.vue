<template>
    <div class="naruto-shippuden">
        <base-section title="Naruto Shippuden">
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
        const episodes = this.$store.getters['movies/episodes'](7,10)
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
.naruto-shippuden{
  margin: 2em;
}
@media screen and (max-width: 1024px) {
  .naruto-shippuden{
    margin: 0 2em;
  }
}
</style>