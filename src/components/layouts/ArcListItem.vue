<template>
  <div class="ep">
    <router-link :to="'/admin/arc/' + id">
      <div class="info" :style="{ width: info_width + '%' }">
        <h3>{{ title }}</h3>
        <p class="description" :style="{ display: display }">
          {{ description }}
        </p>
      </div>
    </router-link>
    <hr />
  </div>
</template>

<script>
import BaseThumbnail from "../ui/BaseThumbnail.vue";

export default {
  props: {
    info_width: {
      type: Number,
      required: true,
    },
    display: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  components: {
    BaseThumbnail,
  },
};
</script>

<style scoped>
.ep {
  width: 100%;
}
.ep:hover {
  background-color: rgba(33, 33, 33, 0.1);
}
a {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  flex: 45%;
}
.ep a .info {
  margin: 1em;
}
.ep a .info a {
  display: block;
}

@media screen and (max-width: 1024px) and (min-width: 768px) {
  .ep {
    flex: 100%;
  }
  .ep a .info {
    width: 70% !important;
  }
  .ep a .info .description {
    display: block !important;
  }
}

@media screen and (max-width: 767px) and (orientation: portrait) {
  a {
    flex-direction: column;
    align-items: center;
  }
  .ep a .info {
    width: 80% !important;
  }
  .ep a .info .description {
    display: none !important;
  }
}
</style>