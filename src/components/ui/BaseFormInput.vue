<template>
  <div class="form-control">
    <label for="title">{{ label }}</label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["label"],
};
</script>

<style scoped>
.form-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1em 0;
}
.form-control label {
  flex: 2;
  font-size: 1.2em;
  font-weight: bold;
}

@media screen and (max-width: 767px) {
  .form-control {
    flex-direction: column;
    align-items: flex-start;
  }
  .form-control label {
    margin: 0.2em 0;
  }
}
</style>