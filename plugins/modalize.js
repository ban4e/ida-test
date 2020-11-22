import Vue from 'vue';

const Modalize = {};

function animate({timing, draw, duration}) {
    let start = performance.now();

    return new Promise(resolve => {
        requestAnimationFrame(function animate(time) {
            // timeFraction изменяется от 0 до 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            // вычисление текущего состояния анимации
            let progress = timing(timeFraction);

            draw(progress); // отрисовать её


            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        });
    });
}

function detectIncomingComponentOptions(component) {
    const componentType = typeof component;

    if (Array.isArray(component) || component === null) {
        throw new Error('Modal component type is invalid');
    }

    switch (componentType) {
        case 'string': {
            const modalComponents = require.context('@/components/modal', false, /[A-Z]\w+\.(vue)$/);
            const modalNamesNormalized = modalComponents.keys().reduce((acc, name, i) => {
                const modalName = name.split('/').pop().split('.')[0];
                acc[modalName] = name;
                return acc;
            }, {});

            if (Object.keys(modalNamesNormalized).includes(component)) {
                const componentConfig = modalComponents(modalNamesNormalized[component]);
                const vueComponent = Vue.component(component, componentConfig.default || componentConfig);
                return vueComponent;
            }
            break;
        }
        case 'function': {
            return component;
        }
        case 'object' : {
            return component;
        }
        default: {
            throw new Error('Modal component type is invalid');
        }
    }
}

Modalize.install = (Vue) => {
    window.onNuxtReady((app) => {
        const options = {};
        for (let k in app.$options) {
            if (app.$options.hasOwnProperty(k)) {
                if (k.match(/^\$|^(router|store)$/)) {
                    options[k] = app.$options[k];
                }
            }
        }

        const $modalize = Vue.prototype.$modalize = window.$modalize = new Vue({
            ...options,
            name: '$modalize',
            data: () => ({
                modals: [],
                isOpen: false,
            }),
            methods: {
                /**
                 * Откырвает модальное окно
                 * @param {String|component} component
                 * @param {*} props
                 */
                open(component, props = {}) {
                    const componentInstance = detectIncomingComponentOptions.call(Vue, component);
                    const modalName = (typeof component === 'string') ? component : `modal-${ new Date().getTime() }`;

                    this.modals.push({
                        key: modalName,
                        component: componentInstance,
                        props: Object.assign({}, props, { isShow: true }),
                    });
                },
                close(key) {
                    if (!this.modals.length) return;

                    let modalIndex = null;
                    if (key) {
                        modalIndex = findModal(key);
                    } else {
                        modalIndex = this.modals.length - 1;
                    }

                    if (!isNaN(parseInt(modalIndex))) {
                        this.modals.splice(modalIndex, 1);
                    }
                },
                // ToDo: промис на закрытие
                alert(props) {
                    const alertProps = {
                        modalClasses: '_alert',
                        isCloseButton: true,
                        ...props
                    };
                    const baseModal = detectIncomingComponentOptions('BaseModal');
                    this.open(baseModal, alertProps);
                }
            },
            render(h) {
                // if (!this.modals.length) {
                //     return null;
                // } else {
                    // модальные окна
                    const modals = this.modals.reduce((acc, modal, i, modalsArr) => {
                        const modalComponent = h(modal.component, {
                            key: modal.key,
                            props: modal.props,
                        });


                        // ToDo: изменить логику для работы с несколькими окнами. Не очень работает переключение между модалками
                        // const modalTransition = h('transition', {
                        //     props: {
                        //         name: 'modal',
                        //         appear: true,
                        //     }
                        // }, [i === modalsArr.length - 1 ? modalComponent : null]);

                        if (i === modalsArr.length -1) {
                            acc.push(modalComponent);
                        }

                        return acc;
                    }, []);

                    // бэкдроп
                    const backdropTransition = h('transition', {
                        props: {
                            // name: 'backdrop',
                            appear: true,
                            css: false,
                        },
                        on: {
                            beforeEnter: (el) => {
                                el.style.opacity = 0;
                                el.style.pointerEvents = 'none';
                                document.body.classList.add('is-overlay');
                                this.isOpen = true;
                            },
                            enter: (el, done) => {
                                animate({
                                    duration: 300,
                                    timing(timeFraction) {
                                        return timeFraction;
                                    },
                                    draw(progress) {
                                        el.style.opacity = progress;
                                    }
                                }).then(done);
                            },
                            afterEnter: (el) => {
                                el.style.pointerEvents = 'auto';
                            },
                            leave: (el, done) => {
                                animate({
                                    duration: 300,
                                    timing(timeFraction) {
                                        return timeFraction;
                                    },
                                    draw(progress) {
                                        el.style.opacity = 1 - progress;
                                    }
                                }).then(done);
                            },
                            afterLeave: (el) => {
                                document.body.classList.remove('is-overlay');
                                this.isOpen = false;
                            }
                        }
                    }, [
                        this.modals.length ? h(
                            'div',
                            {
                                class: 'modal-backdrop',
                                on: {
                                    'click': () => {
                                        this.close();
                                    }
                                }
                            }) : null
                    ]);


                    return h('div', {
                        class: ['modals-container', { 'is-active': this.isOpen }],
                    }, [
                        backdropTransition,
                        modals
                    ]);
                // }
            }
        });

        document.body.appendChild($modalize.$mount().$el);
    });
};

Vue.use(Modalize);
