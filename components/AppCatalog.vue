<template>
    <div class="catalog" :class="{'is-error': isFetchError}">
        <div class="catalog__error" v-if="isFetchError">
            <div class="catalog__error-title title-h1 -mb_xxtiny">An error has occurred</div>
            <div class="catalog__error-description -mb_xsmall">Please refresh the page</div>
            <base-button @click.native.prevent="reloadData" ref="reloadButton">Reload page</base-button>
        </div>
        <div class="catalog__container" v-else>
            <div class="catalog__header">
                <div class="catalog__filter">
                    <div class="catalog__filter-title title-h1">Rent&nbsp;</div>
                    <app-filter class="catalog__filter-select" @filterChange="onFilterChange">
                        <base-select name="type" :options="productTypes" class="title-h1"/>
                    </app-filter>
                </div>
                <div class="catalog__actions">
                    <!-- TODO: add product -->
                </div>
            </div>
            <div class="catalog__body">
                <infinity-pagination class="grid-list" @nextPage="onNextPage">
                    <div class="grid-item grid-item_flex grid-item_4x grid-item_md_6x grid-item_sm_12x -mb_small -mb_sm_tiny" v-for="productData in products" :key="productData.id">
                        <product-card :product-data="productData" class="product-card_grow"/>
                    </div>
                </infinity-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import BaseButton from '@/components/BaseButton.vue';
    import ProductCard from '@/components/ProductCard.vue';
    import BaseSelect from '@/components/BaseSelect.vue';
    import AppFilter from '@/components/AppFilter.vue';
    import InfinityPagination from '@/components/InfinityPagination.vue';

    export default {
        components: {
            BaseButton,
            ProductCard,
            BaseSelect,
            InfinityPagination
        },
        name: 'AppCatalog',
        data() {
            return {
                errorMessage: '',
                page: 1,
                limit: 12,
                activeFilters: {},
            }
        },
        computed: {
            isFetchError() {
                return Boolean(this.errorMessage);
            },
            products() {
                return this.$store.getters.getProductsToDisplay;
            },
            productTypes() {
                const types = this.$store.getters.getTypes;
                return [
                    {title: 'whatever', value: ''},
                    ...types.map(productType =>
                        { return {title: productType, value: productType} }
                    )];
            }
        },
        methods: {
            ...mapActions({
                changeProductsToDisplay: 'paginateFilteredProducts'
            }),
            reloadData(e) {
                this.$refs.reloadButton.$el.classList.add('is-loading');
                const fetchResult = this.fetchProducts();
                fetchResult.finally(() => {
                    this.$refs.reloadButton.$el.classList.remove('is-loading');
                }).then(() => {
                    this.errorMessage = '';
//                    console.log('resolved');
                }).catch(() => {
//                    console.log('rejected');
                })
            },
            async fetchProducts() {
                try {
                    const products = await this.$store.dispatch('fetchProducts');
                    this.$store.commit('updateProducts', products);
                    this.changeProductsToDisplay({
                        filters: this.activeFilters,
                        page: this.page
                    });
                    return Promise.resolve();
                } catch (err) {
                    this.errorMessage = err.error;
                    return Promise.reject();
                }
            },
            /** Изменения в фильтре */
            onFilterChange(payload) {
                this.page = 1;
                this.activeFilters = Object.assign({}, this.activeFilters, payload.filterData);
                this.changeProductsToDisplay({
                    filters: this.activeFilters,
                    page: this.page
                });
            },
            /** Загрузка новой страницы */
            onNextPage() {
                this.page++;
                this.changeProductsToDisplay({
                    filters: this.activeFilters,
                    page: this.page
                });
            }
        },
        created() {
            this.fetchProducts();
        },
        mounted() {
            //
        }
    }
</script>

<style lang="scss">
    .catalog {
        padding: 56px 64px;
        border-radius: 48px;
        background-color: var(--color-secondary);
        @include media-breakpoint-down(lg) {
            padding-left: 32px;
            padding-right: 32px;
        }
        @include media-breakpoint-down(sm) {
            margin-left: -$grid-gap;
            margin-right: -$grid-gap;
            padding: 24px 16px;
            border-radius: 24px;
        }
        &__header {
            display: flex;
            align-items: center;
            margin-bottom: 40px;
            @include media-breakpoint-down(sm) {
                margin-bottom: 24px;
            }
        }
        &__filter {
            display: flex;
            align-items: center;
            flex: 0 0 auto;
            &-title, &-select {
                flex: 0 0 auto;
            }
        }
        &__body {
            //
        }
        &__error {
            text-align: center;
            &-descrtiption {
                @include rhythm(14, 20)
            }
        }
    }
    .catalog.is-error {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .catalog_grow {
        flex-grow: 1;
    }
    .catalog_full {
        width: 100%;
    }
</style>