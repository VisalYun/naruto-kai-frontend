export default {
    arcs(state) {
        return state.arcs
    },
    thisArc: (state) => (id) => {
        return state.arcs.find(arc => arc.id === id)
    },
}