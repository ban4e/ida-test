<template>
    <div class="pagination">
        <slot/>
        <div class="pagination__threshold" ref="threshold"></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'InfinityPagination',
        props: {
            loading: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            isLoading() {
                return this.loading;
            }
        },
        data() {
            return {
                intersectionOptions: {
                    root: null,
                    rootMargin: '0px',
                    threshold: 1.0,
                },
                observer: null,
                threshold: null,
            }
        },
        methods: {
            thresholdReached() {
                this.$emit('nextPage');
            }
        },
        watch: {
            isLoading(newValue, oldValue) {
                if (this.observer) {
                    newValue ? this.observer.unobserve(this.threshold) : this.observer.observe(this.threshold);
                }
            }
        },
        mounted() {
            this.observer = new IntersectionObserver(this.thresholdReached, this.intersectionOptions);
            this.threshold = this.$refs.threshold;
            if (!this.isLoading) {
                this.observer.observe(this.threshold);
            }
        },
    }
</script>
