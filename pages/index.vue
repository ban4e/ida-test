<template>
    <app-catalog/>
</template>

<script>
    import AppCatalog from '@/components/AppCatalog.vue';

    export default {
        components: {
            AppCatalog
        },
        mounted() {
            this.$modalize.open('NewProduct');
        },
    }
</script>
