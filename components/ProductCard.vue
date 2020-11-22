<template>
    <div class="product-card">
        <nuxt-link :to="{name: 'id', params: { id: productData.id }}" class="product-card__link"></nuxt-link>
        <div class="product-card__container">
            <div v-lazyload.background :data-src="productData.preview" class="product-card__image -skeleton"></div>
            <div class="product-card__info">
                <div class="product-card__title">{{ productData.name }}</div>
                <div class="product-card__description">{{ productData.description }}</div>
                <div class="product-card__rent">{{ productData.rent | numberFormat }} $/h</div>
            </div>
        </div>
    </div>
</template>

<script>
import numberFormat from '~/helpers/numberFormat.js';

export default {
    name: 'ProductCard',
    filters: {
        'numberFormat': numberFormat
    },
    props: {
        productData: {
            type: Object,
            required: true,
        },
    }
}
</script>

<style lang="scss" scoped>
.product-card {
    position: relative;
    padding: 24px 32px 25px;
    background-color: var(--color-sub);
    border-radius: 32px;
    transition: box-shadow $transition-main;
    @include media-breakpoint-down(lg) {
        padding: 20px;
    }
    &__link {
        position: absolute;
        @include trbl(0);
        z-index: 1;
    }
    &__container {
        display: flex;
        align-items: flex-start;
    }
    &__image {
        position: relative;
        flex: 0 0 88px;
        width: 88px;
        background: var(--color-secondary) center center/cover no-repeat;
        border-radius: 24px;
        margin-right: 24px;
        @include media-breakpoint-down(lg) {
            margin-right: 20px;
        }
        &::after {
            content: '';
            display: block;
            padding-top: 100%;
        }
    }
    &__info {
        flex: 1 1 auto;
        padding-top: 16px;
        @include media-breakpoint-down(lg) {
            padding-top: 12px;
        }
    }
    &__title {
        @include rhythm(16, 16);
        font-weight: bold;
        color: var(--color-caption);
        transition: $transition-main;
    }
    &__description {
        @include rhythm(12, 18);
        margin-top: 12px;
    }
    &__rent {
        @include rhythm(14, 21);
        margin-top: 16px;
        font-weight: bold;
        color: $color-rose-400;
    }
}

.product-card:hover {
    box-shadow: 0 8px 15px rgba($color-black, 0.1);
    .product-card__title {
        color: $color-rose-500;
    }
}
.product-card_grow {
    flex: 1;
}
</style>
