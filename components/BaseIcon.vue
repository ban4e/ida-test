<template>
    <svg class="svg-icon" :viewbox="viewBox" preserveAspectRatio="none" :width="size.width" :height="size.height">
        <use :xlink:href="url"></use>
    </svg>
</template>

<script>
    export default {
        name: 'BaseIcon',
        props: {
            name: {
                type: String,
                required: true,
            },
            width: {
                type: String
            },
            height: {
                type: String
            },
        },
        data() {
            return {
                icon: null
            }
        },
        computed: {
            viewBox() {
                return this.icon.viewBox;
            },
            url() {
                return this.icon.url;
            },
            size() {
                let resultWidth = this.icon.width;
                let resultHeight = this.icon.height;
                if (this.width && !this.height) {
                    resultWidth = this.width;
                    resultHeight = (this.icon.height * this.width) / this.icon.width;
                } else if (!this.width && this.height) {
                    resultWidth = (this.icon.width * this.height) / this.icon.height;
                    resultHeight = this.height;
                } else if (this.width && this.height) {
                    resultWidth = this.width;
                    resultHeight = this.height;
                }
                return {width: resultWidth, height: resultHeight}
            },
        },
        created() {
            this.icon = require(`@/assets/svg/${this.name}.svg`).default;
        }
    }
</script>

<style lang="scss">
    .svg-icon {
        display: block;
    }
</style>