export default {
    setEpisode(state, payload){
        state.movies = payload
    },
    updateEpisode(state, payload){
        state.movies.forEach(movie => {
            if(movie.episode == payload.episode){
                movie.title = payload.title;
                movie.arc = payload.arc;
                movie.duration = payload.duration;
                movie.thumbnail_url = payload.thumbnail_url;
                movie.video_url = payload.video_url;
                movie.description = payload.description;
                return;
            }
        });
    }
}