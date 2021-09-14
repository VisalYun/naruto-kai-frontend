<template>
    <router-link :to="link" :style="{width: width+'em'}">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    props: ['link', 'width']
}
</script>

<style scoped>
a{
    display: inline-block;
    text-decoration: none;
    color: #ccc;
    background-color: #195098;
    /* width: 2em; */
    padding: 0.5em;
    margin: 0.3em;
    text-align: center;
    border-radius: .2em;
}
a:hover{
    background-color: #12396c;
}
</style>