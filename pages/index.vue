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
            // setTimeout(() => {
            //     this.$modalize.open('NewProduct');
            // }, 3000);

            // setTimeout(() => {
            //     this.$modalize.close();
            // }, 8000);
        },
    }
</script>
