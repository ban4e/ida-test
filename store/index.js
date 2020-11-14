import Vue from 'vue';
import Vuex from 'vuex';

import { getVehicles } from '@/api/request';

Vue.use(Vuex);

const store = () =>
    new Vuex.Store({
        state: {
            products: [],
            isProductsFetched: false
        },
        getters: {
            getProducts(state) {
                return state.products;
            },
            getProduct(state) {
                return (id) => {
                    return state.products.find((product) => {
                        return product.id === id;
                    });
                }

            },
            getIsProductsFetched(state) {
                return state.isProductsFetched;
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
            updateProductsFetched(state, value) {
                state.isProductsFetched = value;
            },
            addProduct(state, product) {
                const productData = { id: new Date().getTime(), ...product };
                state.products.push(productData);
            }
        },
        actions: {
            async fetchProducts({ commit, getters }) {
                if (!getters.getIsProductsFetched) {
                    try {
                        const products = await getVehicles();
                        commit('updateProducts', products);
                        commit('updateProductsFetched', true);
                    } catch(err) {
                        return Promise.reject(err);
                    }
                }
            },
            addProduct({ commit }, product) {
                commit('addProduct', product);
            },
            async findProduct({ getters, dispatch }, productID) {
                return getters.getProduct(productID);
                // const products = getters.getIsProductsFetched && getters.getProducts;
                // console.log('products', products);
                // try {
                //     if (products && products.length) {
                //         return getters.getProduct(productID);
                //     } else if (!getters.getIsProductsFetched) {
                //         await dispatch('fetchProducts');
                //         console.log(getters.getProducts.length);
                //         return dispatch('findProduct', productID);
                //     } else {
                //         return Promise.reject({ error: 'Can`t get product' });
                //     }
                // } catch (err) {
                //     return Promise.reject(err);
                // }
            }
        }
    });

export default store;
