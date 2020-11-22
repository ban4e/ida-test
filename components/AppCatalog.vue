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
                        <base-button icon="plus" class="button_icon" @click.native.prevent="$modalize.open('NewProduct')">Add new</base-button>
                    </div>
                </div>
                <div class="catalog__body">
                    <infinity-pagination @nextPage="onNextPage">
                        <transition-group
                            class="catalog__list grid-list"
                            name="list"
                            tag="div"
                            mode="out-in"
                            @before-leave="beforeLeave"
                        >
                            <div class="grid-item grid-item_flex grid-item_4x grid-item_md_6x grid-item_sm_12x -mb_small -mb_sm_tiny" v-for="productData in products" :key="Object.keys(activeFilters).length ? `${productData.id}-${activeFilters.type}` : productData.id" :data-id="productData.id">
                                <product-card :product-data="productData" class="product-card_grow"/>
                            </div>
                        </transition-group>
                    </infinity-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '@/components/BaseButton.vue';
import ProductCard from '@/components/ProductCard.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import AppFilter from '@/components/AppFilter.vue';
import InfinityPagination from '@/components/InfinityPagination.vue';

export default {
    async fetch() {
        try {
            const data = await this.fetchProducts();
        } catch(err) {
            //
        }
    },
    components: {
        BaseButton,
        ProductCard,
        BaseSelect,
        InfinityPagination
    },
    name: 'AppCatalog',
    data: () => ({
        errorMessage: '',
        page: 1,
        limit: 12,
        activeFilters: {},
        isProductRequest: false
    }),
    computed: {
        ...mapGetters({
            filteredProducts: 'filterProducts',
            getTypes: 'getTypes'
        }),
        isFetchError() {
            return Boolean(this.errorMessage);
        },
        products() {
            return this.filteredProducts({ filters: this.activeFilters, page: this.page });
        },
        productTypes() {
            const types = this.getTypes;
            return [
                { title: 'whatever', value: ''},
                ...types.map(productType => { return {title: productType, value: productType} })
            ];
        }
    },
    methods: {
        ...mapActions({
            loadProducts: 'fetchProducts'
        }),
        async reloadData(e) {
            if (this.isProductRequest) return;

            this.isProductRequest = true;

            try {
                await this.fetchProducts();
                this.errorMessage = '';
            } catch(err) {
                this.$modalize.alert({
                    title: 'Something goes wrong...',
                    description: 'Please try again'
                });
            } finally {
                this.isProductRequest = false;
            }
        },
        async fetchProducts() {
            return new Promise((res, rej) => {
                return this.loadProducts().then(() => res()).catch((err) => {
                    this.errorMessage = err.error;
                    rej(err);
                });
            });
        },
        /** Изменения в фильтре */
        onFilterChange(payload) {
            this.page = 1;
            this.activeFilters = Object.assign({}, this.activeFilters, payload.filterData);
        },
        /** Загрузка новой страницы */
        onNextPage() {
            this.page++;
        },

        beforeLeave(el) {
            const top = el.offsetTop;
            const left = el.offsetLeft;
            const width = el.offsetWidth;
            const height = el.offsetHeight;
            this.$nextTick(() => {
                el.style.position = 'absolute';
                el.style.left = `${ left }px`;
                el.style.top = `${ top }px`;
                el.style.width = `${ width }px`;
                el.style.height = `${ height }px`;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.catalog-wrapper {
    display: flex;
    flex: 1;
    height: 100%;
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
    &__list {
        position: relative;
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

.list-enter-active, .list-leave-active {
    transition: opacity $transition-long, transform $transition-long;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    // transform: translateY(200px);
}
.list-enter {
    transform: translateY(200px);
}
.list-leave-active {
    // position: absolute;
    transition: opacity $transition-main;
}
.list-move {
    transition: transform $transition-long;
}
</style>
