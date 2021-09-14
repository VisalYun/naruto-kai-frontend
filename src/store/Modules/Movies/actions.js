export default {
    async fetchMovie(context){
        const res = await fetch('http://localhost:3000/api/episodes')
        const result = await res.json()
        context.commit('setEpisode', result.episodes)
    }
}