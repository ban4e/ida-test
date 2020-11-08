import Vue from 'vue';
import Vuex from 'vuex';

import { getVehicles } from '@/api/request';

Vue.use(Vuex);

const store = () =>
    new Vuex.Store({
        state: {
            products: [],
        },
        getters: {
            getProducts(state) {
                return state.products;
            },
            filterProducts(state, getters) {
                return ({ filters = {}, page = 1, limit = 12 }) => {
                    const filteredProducts = getters.getProducts.filter(product => {
                        let isProductInFilter = true;
                        for (let param in filters) {
                            if (filters[param] && product.hasOwnProperty(param)) {
                                switch (param) {
                                    case 'type':
                                        isProductInFilter = product[param] === filters[param];
                                        break;
                                    default:
                                        isProductInFilter = product[param] === filters[param];
                                }
                            }
                        }

                        return isProductInFilter;
                    });

                    if (page) {
                        return filteredProducts.splice(0, limit * page);
                    }

                    return filteredProducts;
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
            addProduct(state, product) {
                const productData = { id: new Date().getTime(), ...product };
                state.products.push(productData);
            }
        },
        actions: {
            fetchProducts() {
                return getVehicles();
            },
            addProduct({commit}, product) {
                commit('addProduct', product);
            }
        }
    });

export default store;
