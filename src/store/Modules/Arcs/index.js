import actions from "./actions"
import mutations from "./mutations"
import getters from "./getters"

const arcModule = {
    namespaced: true,
    state() {
        return {
            arcs: [],
        }
    },
    actions: actions,
    mutations: mutations,
    getters: getters
}

export default arcModule