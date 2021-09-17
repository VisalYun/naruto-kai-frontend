export default {
    async fetchArcs(context) {
        const res = await fetch('http://localhost:3000/api/arcs')
        const result = await res.json()
        context.commit('setArc', result.arcs)
    },

    async fetchArc(context, id) {
        const res = await fetch('http://localhost:3000/api/arcs/' + id)
        const result = await res.json()
        return result
    }
}