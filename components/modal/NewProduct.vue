<template>
    <base-modal modalClasses="_side" transition-name="modal-slide">
        <template v-slot:header>
            <div class="grid-list grid-list_space-between grid-list_align-center -mb_xsmall -mb_lg_xxtiny">
                <div class="grid-item">
                    <div class="title-h1">Add new vehicle</div>
                </div>
                <div class="grid-item">
                    <base-button icon="cross" mod="_icon" theme="secondary" @click.native.prevent="$modalize.close()" />
                </div>
            </div>
        </template>
        <template v-slot:body>
            <form-wrapper :schema="schema" @validationDone="onValidationDone" @validationPass="onValidationPass">
                <template v-slot="{ isSubmiting, inputChangeListener }">
                    <drop-area
                        v-model="schema.image.value"
                        ref="image"
                        class="-mb_xxtiny -mb_sm_xtiny"
                        :name="schema.image.name"
                        :error="schema.image.validation"
                        :inputListeners="{ 'change': inputChangeListener.bind(this, schema.image.name) }"
                    />
                    <base-input class="-mb_xtiny"
                        v-model="schema.name.value"
                        :name="schema.name.name"
                        :error="schema.name.validation"
                        :label="schema.name.label"
                        :inputListeners="{ 'input': inputChangeListener.bind(this, schema.name.name) }"
                    />
                    <base-input class="-mb_xtiny"
                        v-model="schema.description.value"
                        :name="schema.description.name"
                        :error="schema.description.validation"
                        :label="schema.description.label"
                        :inputListeners="{ 'input': inputChangeListener.bind(this, schema.description.name) }"
                    />
                    <base-input class="-mb_xsmall -mb_sm_xxtiny"
                        v-model="schema.rent.value"
                        :name="schema.rent.name"
                        :error="schema.rent.validation"
                        :label="schema.rent.label"
                        :inputListeners="{ 'input': inputChangeListener.bind(this, schema.rent.name) }"
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
                    rules: [{ name:'required', message: 'Field is required' }],
                    validation: '',
                },
                description: {
                    name: 'description',
                    label: 'Description',
                    value: '',
                    rules: [{ name:'required', message: 'Field is required' }],
                    validation: '',
                },
                rent: {
                    name: 'rent',
                    label: 'Rent price',
                    value: '',
                    rules: [{ name:'required', message: 'Field is required' }],
                    validation: '',
                },
                image: {
                    name: 'image',
                    value: '',
                    rules: [{ name:'required', message: 'Please upload image' }],
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
                    image: this.$refs.image.preview, // this.schema.image.value = File
                    preview: this.$refs.image.preview // this.schema.image.value = File
                };

                this.addProduct(productData);
                this.$modalize.close();
                this.$modalize.alert({
                    title: 'Congratulations',
                    description: 'You have successfully added a new product'
                });
            }
        }
    }
</script>
