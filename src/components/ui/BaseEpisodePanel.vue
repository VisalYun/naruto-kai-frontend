<template>
    <div class="ep" :style="{margin: margin+'em'}">
        <router-link :to="'/episode/'+id">
            <div class="thumbnail" :style="{width: thumbnail_width+'%'}">
                <base-thumbnail
                    :thumbnail_url="thumbnail"
                    duration="1:27:04"
                    :height="thumbnail_height"
                    :bottom="bottom"
                ></base-thumbnail>
            </div>
            <div class="info" :style="{width: info_width+'%'}">
                <h3>Ep{{episode}}: {{title}}</h3>
                <router-link :to="'/arc/'+arcId">
                    <p>{{arc}}</p>
                </router-link>
                <p class="description" :style="{display: display}">{{description}}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
import BaseThumbnail from '../ui/BaseThumbnail.vue'

export default {
    props: {
        thumbnail_width: {
            type: Number,
            required: true
        }, 
        thumbnail_height: {
            type: Number,
            required: true
        },
        info_width: {
            type: Number,
            required: true
        },
        bottom: {
            type: Number,
            required: true
        },
        margin: {
            type: Number,
            required: true
        },
        display: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        episode: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        arc: {
            type: String,
            required: true
        },
        arcId: {
            type: Number,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        }, 
        description: {
            type: String,
            required: false
        },
    },
    components: {
        BaseThumbnail
    },
}
</script>

<style scoped>
.ep{
    width: 100%;
}
.ep:hover{
    background-color: rgba(33, 33, 33, 0.1);
}
a{
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    flex: 45%;
}
.ep a .thumbnail{
    position: relative;
}
.ep a .info{
    margin: 1em;
}
.ep a .info a{
    display: block;
}

@media screen and (max-width: 1024px) and (min-width: 768px){
    .ep a .thumbnail{
        width: 30% !important;
    }
    .ep{
        flex: 100%;
    }
    .ep a .info{
        width: 70% !important;
    }
    .ep a .info .description{
        display: block !important;
    }
}

@media screen and (max-width: 767px) and (orientation: portrait){
    a{
        flex-direction: column;
        align-items: center;
    }
    .ep a .thumbnail{
        width: 80% !important;
    }
    .ep a .info{
        width: 80% !important;
    }
    .ep a .info .description{
        display: none !important;
    }
}

</style>