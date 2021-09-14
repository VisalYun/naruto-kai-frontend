import actions from "./actions"
import mutations from "./mutations"
import getters from "./getters"

const movieModule = {
    namespaced: true,
    state(){
        return {
            movies: [],
            thisEpisode: null
        }
    },
    actions: actions,
    mutations: mutations,
    getters: getters
}

export default movieModule