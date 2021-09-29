<template>
  <div class="edit">
    <base-section title="Preview">
      <h1 v-if="loading">Loading...</h1>
      <base-episode-panel
        v-else
        :thumbnail_width="20"
        :thumbnail_height="10"
        :info_width="100"
        :bottom="0.5"
        :margin="1"
        display="block"
        url="/admin/episode/"
        :id="Number(episode)"
        :episode="Number(episode)"
        :title="title"
        :arc="arcTitle"
        :arcId="Number(arcId)"
        :duration="duration"
        :thumbnail="thumbnail_url"
        :description="description"
      ></base-episode-panel>
    </base-section>

    <h1 v-if="loading">Loading...</h1>
    <base-section title="Edit Episode" v-else>
      <form @submit.prevent="updateEpisode">
        <base-form-input label="Title:">
          <input type="text" v-model="title" />
          <p v-if="title == ''">Title must not be empty</p>
        </base-form-input>

        <base-form-input label="Arc Id:">
          <input type="text" v-model="arcId" />
          <p v-if="arcId == ''">Arc Id must not be empty</p>
        </base-form-input>

        <base-form-input label="Duration:">
          <input type="text" v-model="duration" />
          <p v-if="duration == ''">Duration must not be empty</p>
        </base-form-input>

        <base-form-input label="Thumbnail Url:">
          <input type="text" v-model="thumbnail_url" />
          <p v-if="thumbnail_url == ''">Thumbnail Url must not be empty</p>
        </base-form-input>

        <base-form-input label="Video Url:">
          <input type="text" v-model="video_url" />
          <p v-if="video_url == ''">Video Url must not be empty</p>
        </base-form-input>

        <base-form-input label="Description:">
          <textarea cols="30" rows="10" v-model="description"></textarea>
          <p v-if="description == ''">Description must not be empty</p>
        </base-form-input>

        <div class="action">
          <h4 v-if="error">{{error}}</h4>
          <base-button v-if="!updating" :isLink="false" :width="10"
            >Update</base-button
          >
          <h4 v-else>Loading...</h4>
        </div>
      </form>
    </base-section>
  </div>
</template>

<script>
import BaseEpisodePanel from "../components/ui/BaseEpisodePanel.vue";
import BaseFormInput from "../components/ui/BaseFormInput.vue";

export default {
  props: ["id"],
  components: {
    BaseEpisodePanel,
    BaseFormInput,
  },
  data() {
    return {
      episode: "",
      title: "",
      arcId: "",
      duration: "",
      thumbnail_url: "",
      video_url: "",
      description: "",
      loading: false,
      updating: false,
      error: null,
    };
  },
  computed: {
    arcTitle(){
      try{
        let arc = null
        if (!this.$store.getters["arcs/hasArc"]) {
          arc = this.fetchArc(this.arcId);
        } else {
          arc = this.$store.getters["arcs/thisArc"](Number(this.arcId));
        }
        return arc.title
      }catch(ex){
        return ""
      }
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      let episode = null;
      if (!this.$store.getters["movies/hasMovie"]) {
        episode = this.fetchEpisode();
      } else {
        episode = this.$store.getters["movies/episode"](Number(this.id));
      }
      this.episode = episode.episode;
      this.title = episode.title;
      this.arcId = episode.arc;
      this.duration = episode.duration;
      this.thumbnail_url = episode.thumbnail_url;
      this.video_url = episode.video_url;
      this.description = episode.description;
    },
    async fetchEpisode() {
      this.loading = true;
      const episode = await this.$store.dispatch(
        "movies/fetchEpisode",
        this.id
      );
      this.loading = false;
      return episode.episodes[0];
    },
    async fetchArc(id) {
      const arc = await this.$store.dispatch("arcs/fetchArc", id);
      return arc.arcs[Number(id)];
    },
    validateEpisodeInput() {
      if (
        this.title == "" ||
        this.arcId == "" ||
        this.duration == "" ||
        this.thumbnail_url == "" ||
        this.video_url == "" ||
        this.description == "" ||
        this.arcId < 1 ||
        this.arcId > 18
      ) {
        this.updating = false;
        this.error = "Please fix the above input error!";
      }
    },
    async updateEpisode() {
      this.updating = true;
      this.error = null;

      this.validateEpisodeInput();
      if (this.error) return;

      const data = {
        episode: this.id,
        title: this.title,
        arc: this.arcId,
        duration: this.duration,
        thumbnail_url: this.thumbnail_url,
        video_url: this.video_url,
        description: this.description,
      };
      try{
        await this.$store.dispatch("movies/updateMovie", data);
        this.updating = false;
        this.$router.replace('/admin')
      }catch(ex){
        this.updating = false;
        this.error = "Something went wrong!";
      }
    },
  },
};
</script>

<style scoped>
.edit {
  margin: 1em;
}
form {
  width: 75%;
  margin: 0 auto;
}
form .form-control input,
form .form-control textarea {
  flex: 10;
  font-size: 1.2em;
  padding: 0.2em;
  background-color: inherit;
  border: 1px solid #000;
  outline: none;
}
form .form-control p {
  color: #f00;
}
form .action {
  width: 75%;
  margin: 1em auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 767px) {
  form {
    width: 100%;
  }
  form .form-control input,
  form .form-control textarea {
    width: 100%;
  }
}
</style>