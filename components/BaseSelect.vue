<template>
    <div class="selector">
        <select class="selector__select" v-bind="$attrs">
            <option class="selector__option" v-for="optionData in options" :value="optionData.value">
                {{ optionData.title }}
            </option>
        </select>
        <div class="selector__indicator-wrapper">
            <base-icon name="angle-down" class="selector__indicator"/>
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

<style lang="scss">
    .selector {
        position: relative;
        display: inline-flex;
        align-items: center;
        color: $color-blue-500;
        &__select {
            display: inline-flex;
            border: none;
            background-color: transparent;
            outline: none;
            width: auto;
            color: currentColor;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }
        &__option {
            @include rhythm(16, 20);
            color: $color-text;
            padding: 3px 7px;
        }
        &__indicator-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 24px;
            width: 24px;
            height: 24px;
            margin-left: 12px;
        }
        &__indicator {
            fill: currentColor;
        }
    }
    select::-ms-expand.selector {
        display: none; /* Hide the default arrow in Internet Explorer 10 and Internet Explorer 11 */
    }
</style>