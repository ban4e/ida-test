<template>
    <div ref="filter">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'AppFilter',
        data() {
            return {
                filterInputs: [],
            }
        },
        methods: {
            getInputs() {
                this.filterInputs = [...this.$refs.filter.querySelectorAll('input, select, textarea')];
            },
            watchInputsChange() {
                this.filterInputs.forEach(inputItem => {
                    this.addInputListener(inputItem);
                });
            },
            addInputListener(input) {
                /** ToDO: не проверено на других типах инпутов. Возможно, потребуется другая логика */
                switch (input.nodeName.toLowerCase()) {
                    case 'select':
                        input.addEventListener('change', e => {
                            this.emitChanges();
                        });
                        break;
                    default:
                        input.addEventListener('change', e => {
                            this.emitChanges();
                        });
                }
            },
            emitChanges() {
                /** ToDO: не проверено на других типах инпутов. Возможно, потребуется другая логика получения данных */
                const filterData = Object.fromEntries(
                    this.filterInputs.map(inputItem => {
                        return [inputItem.name, inputItem.value]
                    })
                );
                this.$emit('filterChange', { filterData });
            }
        },
        mounted() {
            this.getInputs();
            this.watchInputsChange();
        }
    }
</script>