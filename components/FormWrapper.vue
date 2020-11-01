<template>
    <form
        action="action"
        ref="form"
        novalidate
        @submit.prevent="onSubmit"
    >
        <slot :isSubmiting="isSubmiting" :inputChangeListener="onInputChange"></slot>
    </form>
</template>

<script>

    const RULE_REQUIRED = 'required';
    const RULE_REGEXP = 'regexp';
    const AVAILABLE_RULES = [RULE_REQUIRED, RULE_REGEXP];

    export default {
        name: 'FormWrapper',
        props: {
            schema: {
                type: Object,
            }
        },
        data: () => ({
            isSubmiting: false
        }),
        computed: {
            formSchema: {
                get() {
                    return this.schema
                },
                set(newValue) {
                     this.$emit('validationDone', this.formSchema);
                }
            }
        },
        methods: {
            onSubmit(e) {
                this.isSubmiting = true;
                this.validate();

                setTimeout(() => {
                    this.isSubmiting = false;
                }, 3000);
            },
            onInputChange(inputName) {
                console.log('changed', inputName)
            },
            getFormElements() {
                return [...this.$refs.form.elements].filter(elem => elem.tagName.toLowerCase() !== 'button');
            },
            validate() {
                const elems = this.getFormElements();
                elems.forEach(elem => {
                    const fieldError = this.validateField({ elem });
                    if (this.formSchema.hasOwnProperty(elem.name)) {
                        this.formSchema[elem.name] = Object.assign( {}, this.formSchema[elem.name], {validation: fieldError} );
                    }
                });
            },
            validateField({ elem }) {
                const elemName = elem.name;
                const elemValue = elem.value;
                let error = false;

                if (this.schema && this.schema.hasOwnProperty(elemName)) {
                    const rulesForElem = this.schema[elemName].rules;
                    if (!rulesForElem || !Array.isArray(rulesForElem)) return error;
                    rulesForElem.forEach(rule => {
                        if (!AVAILABLE_RULES.includes(rule.name)) return error;
                        switch (rule.name) {
                            case RULE_REQUIRED: {
                                if (!elemValue) error = rule.message || 'Заполните это поле!';

                                return error;
                            }
                        }
                    });
                }

                return error;
            },
        },
        watch: {
            formSchema: (oldValue, newValue) => {
                console.log(oldValue, newValue);
            }
        },
        beforeMount() {
            this.formSchema = this.schema;
        }
    }
</script>
