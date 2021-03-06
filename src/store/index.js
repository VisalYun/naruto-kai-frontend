import { createStore } from 'vuex'

import movieModule from './Modules/Movies/index'
import ArcModule from './Modules/Arcs/index'
import userModule from './Modules/Users'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    movies: movieModule,
    arcs: ArcModule,
    users: userModule
  }
})
