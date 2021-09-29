<template>
    <router-link v-if="isLink" :to="link" :style="{width: width+'em'}">
        <slot></slot>
    </router-link>
    <button v-else :style="{width: width+'em'}">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        link: {
            type: String,
            required: false
        },
        width: {
            type: Number,
            required: false
        },
        isLink: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style scoped>
a, button{
    display: inline-block;
    text-decoration: none;
    color: #ccc;
    background-color: #195098;
    outline: none;
    padding: 0.5em;
    margin: 0.3em;
    text-align: center;
    border-radius: .2em;
}
a:hover, button:hover{
    background-color: #12396c;
}
button:disabled{
    opacity: 0.7;
}
</style>