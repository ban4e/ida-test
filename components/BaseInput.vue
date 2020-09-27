<template>
    <div class="field" :class="[normalizedSettings.classes, {'is-error': errorInfo.isError}, typeClasses, stateClasses]" v-bind="normalizedSettings.fieldAttrs" ref="field">
        <div class="field__container">
            <fieldset v-if="normalizedSettings.type === this.types.TYPE_OUTLINED" class="field__fieldset">
                <legend class="field__legend" ref="legend"></legend>
            </fieldset>
            <div class="field__entry">
                <input
                    :type="type"
                    :name="name"
                    :placeholder="placeholder"
                    :required="required"
                    :disabled="disabled"
                    :value="localValue"
                    v-bind="normalizedSettings.attrs"
                    class="field__input"
                    @focus="onFocus"
                    @blur="onBlur"
                    @input="onInput"
                    ref="input"
                >
                <label v-if="!placeholder && normalizedSettings.label" class="field__label" ref="label">
                    {{ normalizedSettings.label }}
                </label>
                <slot name="append"></slot>
            </div>
        </div>
        <!--v-if="errorInfo.isError"-->
        <div class="field__error" ref="error" v-if="errorInfo.isError">
            <div class="field__error-figure">
                <base-icon width="4" height="16" name="warning" class="field__error-icon"/>
            </div>
            <!--<div class="field__error-message">{{ errorInfo.message }}</div>-->
        </div>
    </div>
</template>

<script>
    import tippy from 'tippy.js';
    import 'tippy.js/dist/tippy.css';

    import BaseIcon from '@/components/BaseIcon.vue';

    export default {
        components: {
            BaseIcon,
        },
        props: {
            settings: {type: Object},
            validation: {type: Object}, // regex
            value: {type: String, default: ''},
            type: {type: String, default: 'text'},
            name: {type: String, default: ''},
            placeholder: {type: String, default: ''},
            required: {type: Boolean, default: false},
            disabled: {type: Boolean, default: false},
            readonly: {type: Boolean, default: false}
        },
        data() {
            return {
                labelScale: 0.7,
                constraints: {
                    'required': {
                        pattern: /^\S+$/,
                        message: 'Заполните это поле',
                    },
                    'email': {
                        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Это не похоже на email'
                    }
                },
                localValue: this.value,
                isFill: Boolean(this.localValue),
                isFocus: false,
                isActivated: Boolean(this.localValue),
                types: {
                    TYPE_FILLED: 'filled',
                    TYPE_OUTLINED: 'outlined',
                    TYPE_LIGHT: 'light'
                }
            }
        },
        computed: {
            normalizedSettings() {
                return Object.assign({
                    label: 'текстовое поле',
                    type: this.types.TYPE_FILLED, // 'filled'|'outlined'|'light'
                    attrs: {},
                    fieldAttrs: {},
                    classes: '',

                }, this.settings);
            },
            /**
             * Проверка значения на соответсвие регулярному выражению.
             * Сравнение происходит по атрибуту `name` или по входящему prop`у validation
             * @returns {Object}
             */
            errorInfo() {
                let isError = false;
                let message = '';

                if (this.required && Object.keys(this.constraints).includes('required') && this.isActivated) {
                    isError = !this.constraints['required'].pattern.test(this.localValue);
                    message = isError ? this.constraints['required'].message : '';
                }
                else if (this.name && Object.keys(this.constraints).includes(this.name) && this.isActivated) {
                    isError = !this.constraints[this.name].pattern.test(this.localValue);
                    message = isError ? this.constraints[this.name].message : '';
                }

                return {isError, message};
            },
            stateClasses() {
                return {
                    'is-fill': this.isFill,
                    'is-focus': this.isFocus,
                }
            },
            typeClasses() {
                return {
                    'field_filled': this.normalizedSettings.type === this.types.TYPE_FILLED,
                    'field_outlined': this.normalizedSettings.type === this.types.TYPE_OUTLINED,
                    'field_light': this.normalizedSettings.type === this.types.TYPE_LIGHT,
                }
            }
        },
        methods: {
            onFocus(e) {
                const labelElem = this.$refs.label;
                const legendElem = this.$refs.legend;
                const labelRect = labelElem.getBoundingClientRect();
                const labelTop = parseFloat(getComputedStyle(labelElem).getPropertyValue('top'));
                const translateY = this.normalizedSettings.type === this.types.TYPE_FILLED
                    ? ((labelTop / 2) + (labelRect.height * this.labelScale * 0.5)) * -1
                    : (labelTop  + (labelRect.height * this.labelScale * 0.5)) * -1;

                this.isFocus = true;
                if (!this.isFill) {
                    console.log('top', labelTop, 'height', labelRect.height);
                    if (legendElem) legendElem.style.width = `${labelElem.offsetWidth * this.labelScale}px`;
                    labelElem.style.transform = `
                        translateY(${translateY}px)
                        scale(${this.labelScale})
                    `;
                }
            },
            onBlur(e) {
                const labelElem = this.$refs.label;
                const legendElem = this.$refs.legend;

                this.isFocus = false;
                if (!this.isFill) {
                    if (legendElem) legendElem.style.width = '';
                    labelElem.style.transform = '';
                }
            },
            onInput(e) {
                this.isActivated = true;
                this.localValue = e.target.value;
                this.localValue !== '' ? this.isFill = true : this.isFill = false;
                this.$emit('input', this.localValue);
            }
        },
        mounted() {
            console.log(tippy);
            tippy(this.$refs.error, {
                content: 'Заполните это поле',
                theme: 'error',
                arrow: tippy.roundArrow,
            });
        }
    }
</script>

<style lang="scss">
    .field {
        position: relative;
        &__container {
            position: relative;
            display: flex;
            align-items: center;
            min-height: 48px;
            padding: 0 48px 0 24px;
            border-radius: 12px;
            background-color: $color-gray-100;
        }
        &__fieldset {
            position: absolute;
            @include trbl(-1px);
            padding: inherit;
            border: 1px solid $color-gray-100;
            border-radius: inherit;
            transition: border $transition-main;
        }
        &__legend {
            width: 0;
            padding: 0;
            margin-left: -5px;
            margin-right: -5px;
            box-sizing: content-box;
            transition: width $transition-main, padding $transition-main;
        }
        &__entry {
            position: relative;
            padding: 21px 0;
            flex: 1;
        }
        &__label {
            @include rhythm(16px, 16px);
            position: absolute;
            left: 0;
            top: 50%;
            max-width: 100%;
            transform-origin: left top;
            transform: translateY(-50%);
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            pointer-events: none;
            transition: transform $transition-main;
        }
        &__input {
            position: relative;
            display: block;
            width: 100%;
            @include rhythm(16px, 16px);
            padding: 0;
            border: none;
            border-radius: inherit;
            background-color: transparent;
            color: inherit;
            outline: none;
            resize: none;
            z-index: 1;
        }
        &__details {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            padding-top: 5px;
            font-size: 11px;
        }
        &__error {
            //display: none;
            position: absolute;
            top: 50%;
            right: 16px;
            transform: translate(0, -50%);
            //font-size: 14px;
            //opacity: 0;
            //margin-top: 3px;
            &-figure {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background-color: $color-danger;
            }
            &-icon {
                fill: $color-white;
            }
        }
        &__error-message {
            color: $color-danger;
        }
    }
    .field.is-focus {
        .field__fieldset {
            border-color: darken($color-gray-100, 10%);
        }
        .field__legend {
            padding-left: 5px;
            padding-right: 5px;
        }
    }
    .field.is-fill {
        .field__fieldset {
            border-color: darken($color-gray-100, 10%);
        }
        .field__legend {
            padding-left: 5px;
            padding-right: 5px;
        }
    }
    .field.is-error {
        .field__fieldset {
            border-color: $color-danger;
        }
        .field__error {
            display: block;
            opacity: 1;
        }
    }


    .field_filled.is-fill, .field_filled.is-focus  {
        .field__label {
            color: $color-blue-500;
        }
    }

    .field_light {
        .field__container {
            padding: 0;
            align-items: flex-end;
            &::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                display: block;
                height: 1px;
                background-color: $color-gray-100;
            }
        }
        .field__entry {
            padding: 16px 0 8px;
        }
        .field__label {
            opacity: 1;
            transform-origin: left top;
        }
    }
    .field_light.is-error {
        .field__container {
            &::before {
                background-color: $color-danger;
            }
        }
        .field__input {
            padding-right: 30px;
        }
    }

    .field_textarea {
        .field__entry {
            padding-top: 18px;
        }
        .field__label {
            top: 18px;
            transform: translateY(0);
        }
        .field__input {
            @include rhythm(14, 20);
            font-weight: 300;
        }
    }

    .tippy-box[data-theme~='error'] {
        background-color: $color-danger;
    }
    .tippy-box[data-theme~='error'][data-placement^='top'] > .tippy-arrow::before {
        border-top-color: $color-danger;
    }
    .tippy-box[data-theme~='error'][data-placement^='bottom'] > .tippy-arrow::before {
        border-bottom-color: $color-danger;
    }
    .tippy-box[data-theme~='error'][data-placement^='left'] > .tippy-arrow::before {
        border-left-color: $color-danger;
    }
    .tippy-box[data-theme~='error'][data-placement^='right'] > .tippy-arrow::before {
        border-right-color: $color-danger;
    }
    .tippy-box[data-theme~='error'] > .tippy-svg-arrow {
        fill: $color-danger;
    }
</style>
