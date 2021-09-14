<template>
    <section>
        <h2>{{ title }}</h2>
        <hr>
        <div class="container">
            <slot></slot>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
    }
}
</script>

<style scoped>
section{
    width: 100%;
}

.container{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

@media screen and (max-width: 1024px) {
    section{
        margin: 1em 0;
    }
    .container{
        /* flex-direction: column;
        align-content: center; */
        justify-content: center;
    }
}
</style>