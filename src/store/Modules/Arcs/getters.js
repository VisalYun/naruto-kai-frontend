export default {
    arcs(state) {
        return state.arcs
    },
    hasArc(state) {
        return state.arcs && state.arcs.length > 0
    },
    thisArc: (state) => (id) => {
        return state.arcs.find(arc => Number(arc.id) === id)
    },
}