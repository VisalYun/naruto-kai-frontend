<template>
  <div class="edit">
    <h1 v-if="loading">Loading...</h1>
    <base-section title="Edit Arc" v-else>
      <form @submit.prevent="updateArc">
        <base-form-input label="Title:">
          <input type="text" v-model="arcTitle" />
          <p v-if="arcTitle == ''">Title must not be empty</p>
        </base-form-input>

        <base-form-input label="Description:">
          <textarea cols="30" rows="10" v-model="arcDescription"></textarea>
          <p v-if="arcDescription == ''">Description must not be empty</p>
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
      arcTitle: "",
      arcDescription: "",
      loading: false,
      updating: false,
      error: null,
    };
  },
  computed: {
    isDisabled() {
      return this.updating;
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      let arc = null;
      if (!this.$store.getters["arcs/hasArc"]) {
        arc = await this.fetchArc(this.id);
      } else {
        arc = this.$store.getters["arcs/thisArc"](Number(this.id));
      }
      this.arcTitle = arc.title;
      this.arcDescription = arc.description;
    },
    async fetchArc(id) {
      this.loading = true;
      const arc = await this.$store.dispatch("arcs/fetchArc", id);
      this.loading = false;
      return arc.arcs;
    },
    validateArcInput() {
      if (
        this.arcTitle == "" ||
        this.arcDescription == ""
      ) {
        this.updating = false;
        this.error = "Please fix the above input error!";
      }
    },
    async updateArc() {
      this.updating = true;
      this.error = null;

      this.validateArcInput();
      if (this.error) return;

      const data = {
        id: this.id,
        title: this.arcTitle,
        description: this.arcDescription,
      };
      try {
        await this.$store.dispatch("arcs/updateArc", data);
        this.updating = false;
        this.$router.replace("/admin");
      } catch (ex) {
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