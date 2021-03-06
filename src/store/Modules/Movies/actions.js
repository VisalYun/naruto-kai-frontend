export default {
    async fetchMovie(context){
        const res = await fetch('http://localhost:3000/api/episodes')
        const result = await res.json()
        context.commit('setEpisode', result.episodes)
    },

    async fetchEpisode(context, id) {
        const res = await fetch('http://localhost:3000/api/episodes/'+id)
        const result = await res.json()
        return result
    },

    async updateMovie(context, data) {
        const episode = {
            title: data.title,
            arc: data.arc,
            duration: data.duration,
            thumbnail_url: data.thumbnail_url,
            video_url: data.video_url,
            description: data.description,
        };
        const res = await fetch('http://localhost:3000/api/episodes/' + data.episode, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(episode)
        })
        
        if (!res.ok) {
            throw new Error('Something went wrong!')
        }

        const result = await res.json()
        context.commit('updateEpisode', result.episodes)
    },
}