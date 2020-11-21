<template>
    <div class="body__wrapper">
        <div class="body__header">
            <app-header class="-mb_xsmall -mb_xs_mini"/>
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
    fetch() {
        this.mode = this.$storage.getUniversal('theme') || 'light';
    },
    data: () => ({
        mode: 'light'
    }),
    head() {
        return {
            htmlAttrs: {
                theme: this.mode
            },
            bodyAttrs: {
                class: 'body'
            }
        }
    },
    components: {
        AppHeader,
    }
}
</script>
