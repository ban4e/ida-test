<template>
    <div class="selector">
        <select class="selector__select" v-bind="$attrs">
            <option class="selector__option" v-for="(optionData, i) in options" :value="optionData.value" :key="i">
                {{ optionData.title }}
            </option>
        </select>
        <div class="selector__indicator-wrapper">
            <base-icon name="angle-down" class="selector__indicator" :is-box="true"/>
        </div>
    </div>
</template>

<script>
    import BaseIcon from '@/components/BaseIcon.vue';

    export default {
        name: 'BaseSelect',
        inheritAttrs: false,
        props: {
            options: {
                type: Array,
                reqiured: true,
            }
        },
        components: {
            BaseIcon
        },
    }
</script>

<style lang="scss" scoped>
    .selector {
        position: relative;
        display: inline-flex;
        align-items: center;
        color: $color-blue-500;
        user-select: none;
        &__select {
            display: inline-flex;
            border: none;
            background-color: transparent;
            outline: none;
            width: auto;
            padding-right: 36px;
            color: currentColor;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            cursor: pointer;
            &::-ms-expand {
                display: none;
            }
            @include media-breakpoint-down(sm) {
                padding-right: 20px;
            }
        }
        &__option {
            @include rhythm(16, 20);
            color: $color-text;
            padding: 3px 7px;
        }
        &__indicator-wrapper {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(0, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 auto;
            pointer-events: none;
        }
        &__indicator {
            fill: currentColor;
            width: 24px;
            @include media-breakpoint-down(sm) {
                width: 16px;
            }
        }
    }
    select::-ms-expand.selector {
        display: none; /* Hide the default arrow in Internet Explorer 10 and Internet Explorer 11 */
    }
</style>
