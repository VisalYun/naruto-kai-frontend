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
    },

    async updateArc(context, data) {
        const arc = {
            title: data.title,
            description: data.description,
        };
        const res = await fetch('http://localhost:3000/api/arcs/' + data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(arc)
        })

        if (!res.ok) {
            throw new Error('Something went wrong!')
        }

        const result = await res.json()
        context.commit('updateArc', result.arcs)
    },
}