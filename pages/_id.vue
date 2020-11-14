<template>
    <div class="grid-block">
        <div class="grid-container">
            <div class="product">
                <div class="product__side">
                    <div class="product__image" :style="{ backgroundImage: `url('${productData.image}')` }"></div>
                </div>
                <div v-if="isProductReady" class="product__side product__side_info">
                    <h1 v-text="productData.name"></h1>
                    <nuxt-child :product-data="productData" keep-alive/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

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
    data: () => ({
        productData: {}
    }),
    computed: {
        isProductReady() {
            return Object.keys(this.productData).length && !this.$fetchState.pending;
        }
    },
    methods: {
        ...mapActions(['findProduct', 'fetchProducts']),
        async fetchProductsCycle() {
            try {
                await this.fetchProducts();
                console.log('fetch success');
                return Promise.resolve();
            } catch (err) {
                console.log('fetch error');
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
        &__side {
            flex: 1 1 auto;
            padding-left: 32px;
            padding-right: 32px;
            box-sizing: content-box;
            &_info {
                max-width: 536px;
                padding-top: 56px;
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
    }
</style>
