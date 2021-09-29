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
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQ5NGM5NmMyM2ZiNTdjNjEzNmJkYzAiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2MzI3Mjc3NzF9.JNOMBIHgQxjp7IaMfUv5m4DYJvQzgA6KcMeowLNAHAk'
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