import Vue from 'vue';
import Vuex from 'vuex';

import { getVehicles } from '@/api/request';

Vue.use(Vuex);

const store = () =>
    new Vuex.Store({
        state: {
            products: [],
            productsToDisplay: [],
            isLoading: true,
        },
        getters: {
            getProducts(state) {
                return state.products;
            },
            getProductsToDisplay(state) {
                return state.productsToDisplay;
            },
            getIsLoading(state) {
                return state.isLoading;
            },
            filterProducts(state, getters) {
                return ({ filters = {} }) => {
                    return getters.getProducts.filter(product => {
                        let productInFilter = true;
                        for (let param in filters) {
                            if (filters[param] && product.hasOwnProperty(param)) {
                                switch (param) {
                                    case 'type':
                                        productInFilter = product[param] === filters[param];
                                        break;
                                    default:
                                        productInFilter = product[param] === filters[param];
                                }
                            }
                        }
                        return productInFilter;
                    });
                }
            },
            getTypes(state) {
                let categories = [];
                if (state.products && state.products.length) {
                    categories = [...categories, ...new Set(state.products.map(product => product.type))];
                }
                return categories;
            }
        },
        mutations: {
            updateProducts(state, products) {
                state.products = products;
            },
            updateProductsToDisplay(state, products) {
                state.productsToDisplay = products;
            },
            setIsLoadingTrue(state) {
                state.isLoading = true;
            },
            setIsLoadingFalse(state) {
                state.isLoading = false;
            },
        },
        actions: {
            fetchProducts() {
                return getVehicles();
            },
            paginateFilteredProducts({commit, getters}, { filters = {}, page = 1, limit = 12 }) {
                commit('setIsLoadingTrue');
                const filteredProducts = getters.filterProducts({filters});
                const paginatedProducts = filteredProducts.splice(0, limit * page);
                // const totalPages = Math.round(filteredProducts.length / 12);
                commit('updateProductsToDisplay', paginatedProducts);
                commit('setIsLoadingFalse');
            }
        }
    });

export default store;