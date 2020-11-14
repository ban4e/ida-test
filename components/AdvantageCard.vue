<template>
    <div class="advantage">
        <div class="advantage__figure"></div>
        <div class="advantage__container">
            <div class="advantage__title">{{ advantage.title }}</div>
            <div class="advantage__description">{{ advantage.description }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdvantageCard',
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
    align-items: center;
    &__figure {
        position: relative;
        flex: 0 0 80px;
        border-radius: 16px;
        background-color: var(--color-secondary);
        &::after {
            content: '';
            display: block;
            padding-top: 120%;
        }
    }
    &__title {
        color: var(--color-caption);
        font-weight: 700;
    }
    &__description {
        @include rhythm(14px, 20px);
    }
}
</style>
