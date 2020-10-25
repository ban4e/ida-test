<template>
    <simple-modal :isOpened="isOpened">
        <template v-slot:header>
            <h1>Add new vehicle</h1>
        </template>
        <template v-slot:body>
            <form-wrapper :schema="schema" @validationDone="onValidationDone">
                <template v-slot="{ isSubmiting, inputChangeListener }">
                    <drop-area class="-mb_xxtiny"></drop-area>
                    <base-input class="-mb_xtiny"
                        :name="schema.name.name"
                        :error="schema.name.validation"
                        :settings="{
                            label: schema.name.label,
                        }"
                        :inputListeners="{ 'change': inputChangeListener.bind(this, schema.name.name) }"
                        @errorReset="schema.name.validation = ''"
                    />
                    <base-input class="-mb_xtiny"
                        :name="schema.description.name"
                        :error="schema.description.validation"
                        :settings="{
                            label: schema.description.label,
                        }"
                        :inputListeners="{ 'change': inputChangeListener.bind(this, schema.description.name) }"
                        @errorReset="schema.description.validation = ''"
                    />
                    <base-input class="-mb_xsmall"
                        :name="schema.rent.name"
                        :error="schema.rent.validation"
                        :settings="{
                            label: schema.rent.label,
                        }"
                        @errorReset="schema.rent.validation = ''"
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
    </simple-modal>
</template>

<script>
    import SimpleModal from '@/components/SimpleModal.vue';
    import DropArea from '@/components/DropArea.vue';
    import FormWrapper from '@/components/FormWrapper.vue';
    import BaseInput from '@/components/BaseInput.vue';

    export default {
        name: 'AddProduct',
        components: {
            SimpleModal,
            DropArea,
            BaseInput,
            FormWrapper
        },
        props: {
            isOpened: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                schema: {
                    name: {
                        name: 'name',
                        label: 'Name',
                        rules: [{ name:'required', message: 'Заполните это поле' }],
                        validation: '',
                    },
                    description: {
                        name: 'description',
                        label: 'Description',
                        rules: [{ name:'required', message: 'Заполните это поле' }],
                        validation: '',
                    },
                    rent: {
                        name: 'rent',
                        label: 'Rent price',
                        rules: [{ name:'required', message: 'Заполните это поле' }],
                        validation: '',
                    }
                },
            }
        },
        methods: {
            onValidationDone(payload) {
                this.schema = payload;
            },
        }
    }
</script>
