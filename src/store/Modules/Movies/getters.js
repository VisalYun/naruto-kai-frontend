export default {
    movies(state){
        return JSON.parse(JSON.stringify(state.movies))
    },
    hasMovie(state) {
        return state.movies && state.movies.length > 0
    },
    episodes: (state) => (start, end) => {
        const episodes = []
        for(let i=start; i<=end; i++){
            episodes.push(state.movies.find(episode => Number(episode.episode) === i))
        }
        return episodes
    },
    episode: (state) => (id) =>{
        return state.movies.find(episode => Number(episode.episode) === id)
    },
}