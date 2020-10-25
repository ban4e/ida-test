import Vue from 'vue'

const Modalize = {};

function detectIncomingComponentOptions(component) {
    const componentType = typeof component;

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
                return Vue.component(component, componentConfig.default || componentConfig);
                // console.log(Vue.options);
                // Vue.component(components (x).default.name, components(x).default ) );
            }
            break;
        }
        default: {
            console.log(component);
        }
    }


    // console.log(modalNamesNormalized);
    // components.keys(), fileName => {
    //     const componentConfig = components(fileName)
    //     const componentName = fileName.split('/').pop().split('.')[0]
    //     Vue.component(componentName, componentConfig.default || componentConfig)
    // });
}

Modalize.install = (Vue) => {
    const $modalize = Vue.prototype.$modalize = new Vue({
        name: '$modalize',
        data: () => ({
            modals: []
        }),
        methods: {
            /**
             * Откырвает модальное окно
             * @param {String|component} component
             * @param {*} props
             */
            open(component, props = {}) {
                const componentInstance = detectIncomingComponentOptions(component);
                const modalName = (typeof component === 'string') ? component : componentInstance.name || 'layer';

                this.modals.push({
                    modalName,
                    component: componentInstance,
                    props,
                });
            },
            close(name) {

            }
        },
        render(h) {
            const modals = [];

            this.modals.forEach((modal, i) => {
                modals.push(h(modal.component, {
                    key: modal.modalName,
                    props: modal.props,
                    on: {
                        close(result) {
                            $layer.close(modal.modalName);
                        }
                    }
                }));
            });



            if (!this.modals.length) { return null; }

            return h('div', {
                class: 'modals-container',
            }, modals);
        }
    });

    document.body.appendChild($modalize.$mount().$el);
};

Vue.use(Modalize);

// export default Modalize;
