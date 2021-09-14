export default {
    async fetchArc(context) {
        const res = await fetch('http://localhost:3000/api/arcs')
        const result = await res.json()
        context.commit('setArc', result.arcs)
    }
}