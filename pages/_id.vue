<template>
    <div class="grid-block">
        <div class="grid-container">
            <div v-if="isProductReady" class="product">
                <div class="product__side">
                    <div v-lazyload.background :data-src="productData.image" class="product__image -skeleton"></div>
                </div>
                <div class="product__side product__side_info">
                    <h1 class="-mb_small -mb_sm_xtiny" v-text="productData.name"></h1>
                    <div v-if="tabs && tabs.length" class="product__tabs -mb_small -mb_sm_xtiny">
                        <div class="product__tabs-container">
                            <div v-for="(tab, i) in tabs" :key="i" class="product__tabs-item">
                                <nuxt-link :to="tab.to" class="product__tabs-link">{{ tab.title }}</nuxt-link>
                            </div>
                        </div>
                    </div>
                    <nuxt-child :product-data="productData" keep-alive/>
                    <div class="product__offer">
                        <div class="product__offer-container">
                            <div class="product__offer-info">
                                Rent for <span class="-rose">{{ productData.rent | numberFormat }} $/h</span>
                            </div>
                            <div class="product__offer-action">
                                <base-button>Rent now</base-button>
                            </div>
                        </div>
                    </div>
                    <div class="product__shadow-offer"></div>
                </div>
            </div>
            <div v-else-if="!$fetchState.pending">
                <h1>This product not found</h1>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import BaseButton from '@/components/BaseButton.vue';
import numberFormat from '~/helpers/numberFormat.js';

export default {
    async fetch() {
        const id = this.$route.params.id;
        try {
            await this.fetchProductsCycle();
            this.productData = await this.findProduct(id);
        } catch (err) {
            console.log(err);
        }
    },
    filters: {
        'numberFormat': numberFormat
    },
    components: {
        BaseButton
    },
    data: () => ({
        productData: {}
    }),
    computed: {
        isProductReady() {
            return this.productData && Object.keys(this.productData).length && !this.$fetchState.pending;
        },
        tabs() {
            const tabsDictionary = {
                'specifications_text': {
                    title: 'Specifications',
                    to: { name: 'id' }
                },
                'team_text': {
                    title: 'Team',
                    to: { name: 'id-team' }
                },
                'term_text': {
                    title: 'Rent terms',
                    to: { name: 'id-rent' }
                }
            }

            return Object.values(tabsDictionary);
        }
    },
    methods: {
        ...mapActions(['findProduct', 'fetchProducts']),
        async fetchProductsCycle() {
            try {
                await this.fetchProducts();
                return Promise.resolve();
            } catch (err) {
                return this.fetchProductsCycle();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.product {
    display: flex;
    margin-left: -32px;
    margin-right: -32px;
    @include media-breakpoint-down(lg) {
        margin-left: -16px;
        margin-right: -16px;
    }
    @include media-breakpoint-down(md) {
        flex-wrap: wrap;
        max-width: 680px;
        margin: 0 auto;
    }
    &__side {
        flex: 1 1 auto;
        padding-left: 32px;
        padding-right: 32px;
        box-sizing: content-box;
        @include media-breakpoint-down(lg) {
            padding-left: 16px;
            padding-right: 16px;
        }
        @include media-breakpoint-down(md) {
            flex: 1 1 100%;
            padding-left: 0;
            padding-right: 0;
        }
        &_info {
            max-width: 536px;
            width: 100%;
            padding-top: 56px;
            padding-bottom: 40px;
            @include media-breakpoint-down(lg) {
                max-width: 480px;
                padding-top: 32px;
            }
            @include media-breakpoint-down(md) {
                max-width: inherit;
            }
            @include media-breakpoint-down(sm) {
                padding-top: 22px;
                padding-bottom: 0;
            }
        }
    }
    &__image {
        position: relative;
        background: var(--color-secondary) center center/cover no-repeat;
        border-radius: 24px;
        &::after {
            content: '';
            display: block;
            padding-top: calc(100% - 12px);
        }
    }
    &__tabs {
        overflow: hidden;
        &-container {
            display: flex;
            align-items: center;
            margin-left: -16px;
            margin-right: -16px;
        }
        &-item {
            padding-left: 16px;
            padding-right: 16px;
        }
        &-link {
            color: var(--color-text);
            font-weight: 700;
            transition: $transition-main;
            user-select: none;
            &:hover {
                color: $color-link;
            }
            &.is-exactly-active-link {
                color: $color-link;
                pointer-events: none;
            }
        }
    }
    &__offer {
        position: fixed;
        bottom: 80px;
        width: inherit;
        max-width: inherit;
        border-radius: 16px;
        @include media-breakpoint-down(sm) {
            max-width: calc(100% - 16px * 2);
            width: 100%;
            bottom: 32px;
        }
        &::before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: calc(100% - 11px);
            display: block;
            height: 70px;
            background: linear-gradient(180deg, rgba($color-white, 0) 0%, var(--color-sub) 100%);
            @include media-breakpoint-down(sm) {
                height: 35px;
            }
        }
        &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: calc(100% - 11px);
            display: block;
            height: 100vh;
            background-color: var(--color-primary);
        }
        &-container {
            position: relative;
            display: flex;
            align-items: center;
            padding: 16px 32px;
            border-radius: inherit;
            background-color: var(--color-secondary);
            z-index: 1;
            @include media-breakpoint-down(sm) {
                padding: 12px 24px;
            }
        }
        &-info {
            color: var(--color-caption);
            font-weight: 700;
        }
        &-action {
            margin-left: auto;
        }
    }
    &__shadow-offer {
        margin-top: 32px;
        height: 82px;
        @include media-breakpoint-down(sm) {
            height: 68px;
        }
    }
}
html[theme="dark"] {
    .product {
        &__offer::before {
            background: linear-gradient(180deg, rgba($color-deep-blue-900, 0) 0%, var(--color-sub) 100%);
        }
    }
}
</style>
