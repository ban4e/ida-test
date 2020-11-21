<template>
    <div class="person-card">
        <div class="person-card__image" :style="{backgroundImage: `url('${person.image}')`}"></div>
        <div class="person-card__container">
            <div class="person-card__title" v-text="person.name"></div>
            <div class="person-card__position" v-text="person.position"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PersonCard',
    props: {
        person: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
    .person-card {
        overflow: hidden;
        @include media-breakpoint-down(sm) {
            display: flex;
            align-items: center;
        }
        &__image {
            position: relative;
            background: var(--color-secondary) center center/cover no-repeat;
            border-radius: 16px;
            margin-bottom: 16px;
            @include media-breakpoint-down(sm) {
                flex: 0 0 132px;
                margin-right: 16px;
                margin-bottom: 0;
            }
            &::after {
                content: '';
                display: block;
                padding-top: (96 / 162) * 100%;
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
        &__position {
            @include rhythm(12, 18);
            font-weight: 300;
        }
    }
</style>
