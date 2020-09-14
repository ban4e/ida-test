<template>
    <div class="body__wrapper">
        <div class="body__header">
            <app-header class="-mb_small"/>
        </div>
        <div class="body__container">
            <nuxt/>
        </div>
        <div class="body__footer">
        </div>
    </div>
</template>

<script>
    import AppHeader from '@/components/AppHeader.vue';

    export default {
        head: {
            bodyAttrs: {
                class: 'body'
            }
        },
        components: {
            AppHeader,
        }
    }
</script>
