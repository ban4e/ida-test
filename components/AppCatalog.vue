<template>
    <div class="grid-block catalog-wrapper">
        <div class="catalog catalog_full catalog_grow grid-container" :class="{'is-error': isFetchError}">
            <div class="catalog__error" v-if="isFetchError">
                <div class="catalog__error-title title-h1 -mb_xxtiny">An error has occurred</div>
                <div class="catalog__error-description -mb_xsmall">Please refresh the page</div>
                <base-button
                    :isLoading="isProductRequest"
                    @click.native.prevent="reloadData"
                    ref="reloadButton"
                >
                    Reload page
                </base-button>
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
                        <base-button icon="plus" class="button_icon" @click.native.prevent="openNewProductModal">Add new</base-button>
                    </div>
                </div>
                <div class="catalog__body">
                    <infinity-pagination @nextPage="onNextPage">
                        <transition-group class="grid-list" name="list" tag="div">
                            <div class="grid-item grid-item_flex grid-item_4x grid-item_md_6x grid-item_sm_12x -mb_small -mb_sm_tiny" v-for="productData in products" :key="productData.id">
                                <product-card :product-data="productData" class="product-card_grow"/>
                            </div>
                        </transition-group>
                    </infinity-pagination>
                </div>
            </div>
        </div>
        <add-product :isOpened="isAddModalOpened"/>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import BaseButton from '@/components/BaseButton.vue';
    import ProductCard from '@/components/ProductCard.vue';
    import BaseSelect from '@/components/BaseSelect.vue';
    import AppFilter from '@/components/AppFilter.vue';
    import InfinityPagination from '@/components/InfinityPagination.vue';

    import AddProduct from '@/components/modal/AddProduct.vue';

    export default {
        async fetch() {
            try {
                await this.fetchProducts();
            } catch(err) {
                //
            }
        },
        components: {
            BaseButton,
            ProductCard,
            BaseSelect,
            InfinityPagination,
            AddProduct
        },
        name: 'AppCatalog',
        data: () => ({
            errorMessage: '',
            page: 1,
            limit: 12,
            activeFilters: {},
            isAddModalOpened: false,
            isProductRequest: false,
        }),
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
                    { title: 'whatever', value: ' '},
                    ...types.map(productType => { return {title: productType, value: productType} })
                ];
            }
        },
        methods: {
            ...mapActions({
                changeProductsToDisplay: 'paginateFilteredProducts'
            }),
            reloadData(e) {
                this.isProductRequest = true;
                this.fetchProducts().finally(() => {
                    this.isProductRequest = false;
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
            },
            /** Открытие модального окна добавления нового продукта */
            openNewProductModal() {
                this.isAddModalOpened = true;
            }
        },
        // created() {
        //     this.fetchProducts();
        // },
    }
</script>

<style lang="scss">
    .list-enter-active, .list-leave-active {
        transition: .65s ease;
    }
    .list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
        opacity: 0;
        transform: translateY(200px);
    }
    .catalog-wrapper {
        display: flex;
        flex: 1;
    }
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
        &__actions {
            margin-left: auto;
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
