<template>
    <div v-if="isResponsive" class="svg-container" :style="{paddingTop: `${ (size.height / size.width) * 100}%`}">
        <svg class="svg-icon" :viewbox="viewBox" preserveAspectRatio="none">
            <use :xlink:href="url"></use>
        </svg>
    </div>
    <div v-else-if="isBox" class="svg-box">
        <div class="svg-container" :style="{maxWidth: `${size.width}px`}">
            <div class="svg-container__height" :style="{paddingTop: `${ (size.height / size.width) * 100}%`}"></div>
            <svg class="svg-icon" :viewbox="viewBox" preserveAspectRatio="none" :width="size.width" :height="size.height">
                <use :xlink:href="url"></use>
            </svg>
        </div>
    </div>
    <svg v-else class="svg-icon" :viewbox="viewBox" preserveAspectRatio="none" :width="size.width" :height="size.height">
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
            isResponsive: {
                type: Boolean,
                default: false
            },
            isBox: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                icon: require(`@/assets/svg/${this.name}.svg`).default
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
        }
    }
</script>

<style lang="scss">
    .svg-container {
        position: relative;
        display: inline-flex;
        & > .svg-icon {
            position: absolute;
            @include trbl(0);
            display: inline-block;
            max-width: 100%;
            max-height: 100%;
        }
    }
    .svg-icon {
        display: block;
    }
    .svg-box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        &::before {
            content: '';
            display: block;
            padding-top: 100%;
        }
        .svg-container {
            width: 100%;
        }
    }
</style>
