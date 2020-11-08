<template>
    <base-modal modalClasses="_side" transition-name="modal-slide">
        <template v-slot:header>
            <h1 class="-mb_xsmall">Add new vehicle</h1>
        </template>
        <template v-slot:body>
            <form-wrapper :schema="schema" @validationDone="onValidationDone" @validationPass="onValidationPass">
                <template v-slot="{ isSubmiting, inputChangeListener }">
                    <drop-area
                        v-model="schema.image.value"
                        :name="schema.image.name"
                        :error="schema.image.validation"
                        class="-mb_xxtiny"
                        ref="image"
                    />
                    <base-input class="-mb_xtiny"
                        v-model="schema.name.value"
                        :name="schema.name.name"
                        :error="schema.name.validation"
                        :settings="{ label: schema.name.label }"
                        :inputListeners="{ 'change': inputChangeListener.bind(this, schema.name.name) }"
                    />
                    <base-input class="-mb_xtiny"
                        v-model="schema.description.value"
                        :name="schema.description.name"
                        :error="schema.description.validation"
                        :settings="{ label: schema.description.label }"
                        :inputListeners="{ 'change': inputChangeListener.bind(this, schema.description.name) }"
                    />
                    <base-input class="-mb_xsmall"
                        v-model="schema.rent.value"
                        :name="schema.rent.name"
                        :error="schema.rent.validation"
                        :settings="{ label: schema.rent.label }"
                    >
                        <template v-slot:append>$/h</template>
                    </base-input>
                    <base-button
                        class="button_full"
                        type="submit"
                        :isLoading="isSubmiting"
                    >
                        Complete
                    </base-button>
                </template>
            </form-wrapper>
        </template>
    </base-modal>
</template>

<script>
    import { mapActions } from 'vuex';
    import BaseModal from '@/components/modal/BaseModal.vue';
    import DropArea from '@/components/DropArea.vue';
    import FormWrapper from '@/components/FormWrapper.vue';
    import BaseInput from '@/components/BaseInput.vue';

    export default {
        name: 'NewProduct',
        components: {
            BaseModal,
            DropArea,
            BaseInput,
            FormWrapper
        },
        data: () => ({
            schema: {
                name: {
                    name: 'name',
                    label: 'Name',
                    value: '',
                    rules: [{ name:'required', message: 'Заполните это поле' }],
                    validation: '',
                },
                description: {
                    name: 'description',
                    label: 'Description',
                    value: '',
                    rules: [{ name:'required', message: 'Заполните это поле' }],
                    validation: '',
                },
                rent: {
                    name: 'rent',
                    label: 'Rent price',
                    value: '',
                    rules: [{ name:'required', message: 'Заполните это поле' }],
                    validation: '',
                },
                image: {
                    name: 'image',
                    value: '',
                    rules: [{ name:'required', message: 'Загрузите картинку' }],
                    validation: '',
                }
            }
        }),
        methods: {
            ...mapActions(['addProduct']),
            onValidationDone(payload) {
                this.schema = payload;
            },
            onValidationPass() {
                const productData = {
                    type: 'custom',
                    name: this.schema.name.value,
                    description: this.schema.description.value,
                    rent: this.schema.rent.value,
                    image: this.$refs.image.preview,
                };

                console.log(productData);

                this.addProduct(productData);

            }
        },
        mounted() {
            console.log(this);
        }
    }
</script>
