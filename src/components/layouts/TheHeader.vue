<template>
    <header :class="{active: navBarToggle}">
        <div class="logo" :class="{active: navBarToggle}">
            <router-link to="/">
                <h2>Unofficial Naruto Kai</h2>
            </router-link>
        </div>
        <button class="navbar-toggler" @click="toggleNavBar">
            <i class="fas fa-bars"></i>
        </button>
        <nav :class="{active: navBarToggle}">
            <ul>
                <li>
                    <router-link to="/naruto">Naruto</router-link>
                </li>
                <li>
                    <router-link to="/naruto-shippuden">Naruto Shippuden</router-link>
                </li>
                <li>
                    <router-link to="/about">About</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    data(){
        return {
            navBarToggle: false
        }
    },
    methods: {
        toggleNavBar(){
            this.navBarToggle = !this.navBarToggle
        }
    }
}
</script>

<style scoped>
header{
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2em;
    color: white;
    background-color: #195098;
}

.logo a{
    text-decoration: none;
    color: white;
}

.logo h2:hover{
    color: #cccccc;
    cursor: pointer;
}

nav ul{
    display: flex;
    list-style-type: none;
}

nav ul li{
    margin: 0 1em;
}

nav ul li a{
    text-decoration: none;
    color: white;
}

nav ul li a:hover{
    color: #cccccc
}

.navbar-toggler{
    padding: .5em .75em;
    background-color: #195098;
    outline: none;
    border: 2px solid #fff;
    border-radius: .5em;
    color: #fff;
    display: none;
}

@media screen and (max-width: 767px) {
    .logo h2{
        font-size: 1.2em;
    }

    .navbar-toggler{
        display: block;
    }

    nav{
        display: none;
    }

    header.active{
        flex-wrap: wrap;
    }

    .logo.active{
        flex-basis: 75%;
    }

    .navbar-toggler.active{
        flex-basis: 25%;
    }

    nav.active{
        display: block;
    }

    nav.active ul{
        display: block;
        padding: 0;
    }

    nav ul li{
        margin: 1em 0;
    }
}
</style>