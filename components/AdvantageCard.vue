<template>
    <div class="advantage">
        <div class="advantage__icon">
            <base-icon :name="advantage.icon" class="advantage__icon-figure" :class="['advantage__icon-figure_' + advantage.icon]" :is-box="true"/>
        </div>
        <div class="advantage__container">
            <div class="advantage__title">{{ advantage.title }}</div>
            <div class="advantage__description">{{ advantage.description }}</div>
        </div>
    </div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue';

export default {
    name: 'AdvantageCard',
    components: {
        BaseIcon,
    },
    props: {
        advantage: {
            type: Object,
            required: true
        }
    },
}
</script>

<style lang="scss" scoped>
.advantage {
    display: flex;
    align-items: flex-start;
    &__container {
        padding-top: 12px;
        @include media-breakpoint-down(sm) {
            padding-top: 4px;
        }
    }
    &__icon {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 80px;
        max-width: 80px;
        border-radius: 16px;
        margin-right: 24px;
        background-color: var(--color-secondary);
        @include media-breakpoint-down(sm) {
            flex: 0 0 64px;
            max-width: 64px;
            margin-right: 16px;
        }
        &::after {
            content: '';
            display: block;
            padding-top: 120%;
            @include media-breakpoint-down(sm) {
                padding-top: 80px;
            }
        }
    }
    &__icon-figure {
        width: 30px;
        fill: var(--color-text);
        @include media-breakpoint-down(sm) {
            width: 22px;
            &_pilot {
                width: 16px;
            }
        }
    }
    &__title {
        color: var(--color-caption);
        font-weight: 700;
        margin-bottom: 8px;
        @include media-breakpoint-down(sm) {
            margin-bottom: 4px;
        }
    }
    &__description {
        @include rhythm(14px, 20px);
    }
}
</style>
