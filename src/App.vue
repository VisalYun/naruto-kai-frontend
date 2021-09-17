<template>
  <the-header></the-header>
  <div class="content">
      <router-view :key="$route.fullPath"/>
  </div>
  <the-footer></the-footer>
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue'
import TheFooter from './components/layouts/TheFooter.vue'

export default {
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

    TheFooter
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
  position: relative;
  min-height: 100vh;
}

body {
  margin: 0;
  background-color: #e8ac4d;
}

.content{
  margin-bottom: 10em;
}

h1,h2,h3,h4,h5,h6,p{
  margin: 0.5em 0;
}

hr { 
    display: block; 
    height: 1px;
    border: 0; 
    border-top: 1px solid #000;
    margin: 1em 0; 
    padding: 0; 
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #333; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #000; 
}
</style>
