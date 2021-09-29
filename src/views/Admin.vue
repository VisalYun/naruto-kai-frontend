<template>
  <div class="admin">
    <div class="tab-container">
      <div class="tab-btn">
        <button :class="{'btn': true, 'active': isEpisode}" @click="switchTab()">Episode</button>
        <button :class="{'btn': true, 'active': !isEpisode}" @click="switchTab()">Arc</button>
      </div>
      <div class="list">
      <base-section title="Episode List" v-if="isEpisode">
        <h1 v-if="loading">Loading...</h1>
        <h1 v-else-if="!hasEpisode">No Episode Found!</h1>
        <div class="list-container" v-else>
          <base-episode-panel
            v-for="episode in episodes"
            :key="episode.episode"
            :thumbnail_width="20"
            :thumbnail_height="10"
            :info_width="100"
            :bottom="0.5"
            :margin="1"
            display="block"
            url="/admin/episode/"
            :id="Number(episode.episode)"
            :episode="Number(episode.episode)"
            :title="episode.title"
            :arc="getArcTitle(Number(episode.arc))"
            :arcId="Number(episode.arc)"
            :duration="episode.duration"
            :thumbnail="episode.thumbnail_url"
            :description="episode.description"
          ></base-episode-panel>
        </div>
      </base-section>

      <base-section title="Arc List" v-else>
        <h1 v-if="loading">Loading...</h1>
        <h1 v-else-if="!hasEpisode">No Arc Found!</h1>
        <div class="list-container" v-else>
          <arc-list-item
            v-for="arc in arcs"
            :key="arc.id"
            :info_width="100"
            display="block"
            :id="Number(arc.id)"
            :title="arc.title"
            :description="arc.description"
          ></arc-list-item>
        </div>
      </base-section>
    </div>
    </div>
  </div>
</template>

<script>
import BaseEpisodePanel from "../components/ui/BaseEpisodePanel.vue";
import ArcListItem from "../components/layouts/ArcListItem.vue"

export default {
  components: {
    BaseEpisodePanel,
    ArcListItem
  },
  data(){
      return {
          isEpisode: true,
          loading: false,
      }
  },
  computed: {
    hasEpisode() {
      return this.$store.getters["movies/hasMovie"];
    },
    episodes(){
        return this.$store.getters["movies/movies"];
    },
    arcs(){
        return this.$store.getters["arcs/arcs"];
    },
  },
  async created() {
    if (this.$store.getters["movies/hasMovie"]) {
      return;
    }
    return this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        const episodes = await this.$store.dispatch("movies/fetchMovie");
        const arcs = await this.$store.dispatch("arcs/fetchArcs");
        this.loading = false;
        return [episodes, arcs];
      } catch (err) {
        window.location.href = "/notFound";
      }
    },
    getArcTitle(id){
      return this.$store.getters["arcs/thisArc"](id).title
    },
    switchTab(){
      this.isEpisode = !this.isEpisode
    }
  },
};
</script>

<style scoped>
.admin {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em;
}
.admin .tab-btn {
  margin-left: .3em;
}
.admin .tab-btn .btn {
  background-color: inherit;
  outline: none;
  border: 1px solid #000;
  font-size: 1.2em;
  width: 5em;
  border-radius: 5px 5px 0 0;
}
.admin .tab-btn .btn.active, .admin .tab-btn .btn:hover {
  background-color: #000;
  color: #e8ac4d;
  transform: scale(1.1, 1.1);
}
.admin .list {
  width: 100%;
  border: 1px solid #000;
  padding: 1em;
}
</style>