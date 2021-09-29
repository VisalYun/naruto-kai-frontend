<template>
    <div class="notFound">
        <h1>Not Enough Chaktra!</h1>
        <p>Look like you have stole the scroll of sealing to learn forbidden space time jutsu.</p>
        <base-button :isLink="true" link="/home" :width="18">Click here to back to home page</base-button>
    </div>
</template>

<style scoped>
.notFound{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2em 1em;
}
</style>