export default {
    setArc(state, payload) {
        state.arcs = payload
    },

    updateArc(state, payload){
        state.arcs.forEach(arc => {
            if (arc.id == payload.id) {
                arc.title = payload.title;
                arc.description = payload.description;
                return;
            }
        });
    }
}