<template>
    <div class="field" :class="[fieldTypeClasses, stateClasses, {'is-error': error}]" ref="field">
        <div class="field__container">
            <fieldset v-if="fieldType === fieldTypes.TYPE_OUTLINED" class="field__fieldset">
                <legend class="field__legend" :style="legendStyles" ref="legend"></legend>
            </fieldset>
            <div class="field__entry">
                <input
                    v-model="localValue"
                    :type="type"
                    class="field__input"
                    ref="input"
                    v-bind="$attrs"
                    v-on="inputListeners"
                    @focus="onFocus"
                    @blur="onBlur"
                    @input="onInput"
                >
                <label v-if="!$attrs.placeholder && label" class="field__label" :style="labelStyles" ref="label">
                    {{ label }}
                </label>
                <div class="field__append" v-if="$slots.append">
                    <slot name="append"></slot>
                </div>
            </div>
        </div>
        <transition name="jello">
            <div class="field__error" v-if="error">
                <div class="field__error-figure" ref="error">
                    <base-icon width="4" height="16" name="warning" class="field__error-icon"/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import BaseIcon from '@/components/BaseIcon.vue';

export default {
    inheritAttrs: false,
    components: {
        BaseIcon,
    },
    props: {
        value: { type: String, default: '' },
        label: { type: String, default: 'текстовое поле' },
        type: { type: String, default: 'text' },
        fieldType: { type: String, default: 'filled' },
        inputListeners: { type: Object, default: () => ({}) },
        error: { type: String },
    },
    data() {
        return {
            labelScale: 0.7,
            isActivated: Boolean(this.localValue),
            labelTranslateY: false,
            isFocus: false,
            fieldTypes: {
                TYPE_FILLED: 'filled',
                TYPE_OUTLINED: 'outlined',
                TYPE_LIGHT: 'light'
            }
        }
    },
    computed: {
        localValue: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit('input', newValue)
            }
        },
        isFill() {
            return Boolean(this.localValue);
        },
        stateClasses() {
            return {
                'is-fill': this.isFill,
                'is-focus': this.isFocus,
            }
        },
        fieldTypeClasses() {
            return {
                'field_filled': this.fieldType === this.fieldTypes.TYPE_FILLED,
                'field_outlined': this.fieldType === this.fieldTypes.TYPE_OUTLINED,
                'field_light': this.fieldType === this.fieldTypes.TYPE_LIGHT,
            }
        },
        labelStyles() {
            let styles = {};

            if ((this.isFocus || this.isFill) && this.$refs.label) {
                styles = { 'transform': `translateY(${this.labelTranslateY}px) scale(${this.labelScale})` };
            }

            return styles;
        },
        legendStyles() {
            let styles = {};

            if ((this.isFocus || this.isFill) && this.$refs.label && this.$refs.legend) {
                stlyes = { 'width': `${this.$refs.label.offsetWidth * this.labelScale}px` };
            }

            return styles;
        }
    },
    methods: {
        onFocus(e) {
            this.isFocus = true;
        },
        onBlur(e) {
            this.isFocus = false;
        },
        onInput(e) {
            this.isActivated = true;
        },
        calcLabelTranslate() {
            const labelElem = this.$refs.label;
            const labelRect = labelElem.getBoundingClientRect();
            const labelTop = labelElem.offsetTop;
            const translateY = this.fieldType === this.fieldTypes.TYPE_FILLED
                ? ((labelTop / 2) + (labelRect.height * this.labelScale * 0.5)) * -1
                : (labelTop  + (labelRect.height * this.labelScale * 0.5)) * -1;

            return translateY;
        }
    },
    watch: {
        error(newValue, oldValue) {
            if (newValue) {
                this.$nextTick(() => {
                    tippy(this.$refs.error, {
                        content: newValue,
                        theme: 'error',
                        arrow: tippy.roundArrow,
                        // showOnCreate: true,
                        delay: [150, 0],
                    });
                });
            }
        }
    },
    mounted() {
        this.$nextTick(() => { // browser paint
            this.labelTranslateY = this.calcLabelTranslate();
        });
    }
}
</script>

<style lang="scss" scoped>
.field {
    position: relative;
    &__container {
        position: relative;
        display: flex;
        align-items: center;
        min-height: 48px;
        max-height: 56px;
        padding: 0 48px 0 24px;
        border-radius: 12px;
        background-color: var(--color-secondary);
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
        @include rhythm(16px, 16px);
        display: flex;
        align-items: center;
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
        padding: 0;
        border: none;
        border-radius: inherit;
        background-color: transparent;
        color: inherit;
        outline: none;
        resize: none;
        z-index: 1;
        &:-webkit-autofill, &-internal-autofill-selected {
            background-color: transparent !important;
            -webkit-box-shadow: 0 0 0 20px var(--color-secondary) inset !important;
            -webkit-text-fill-color: var(--color-text);
            caret-color: var(--color-text);
        }
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        &[type=number] {
            -moz-appearance: textfield;
        }
    }
    &__append {
        margin-left: 8px;
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
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 16px;
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
// Состояние фокуса
.field.is-focus {
    .field__fieldset {
        border-color: darken($color-gray-100, 10%);
    }
    .field__legend {
        padding-left: 5px;
        padding-right: 5px;
    }
}
// Состояние заполненного поля
.field.is-fill {
    .field__fieldset {
        border-color: darken($color-gray-100, 10%);
    }
    .field__legend {
        padding-left: 5px;
        padding-right: 5px;
    }
}
// Состояние с ошибкой
.field.is-error {
    .field__fieldset {
        border-color: $color-danger;
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

.jello-enter-active {
    animation: jello-horizontal .65s;
}

.jello-leave-active {
    animation: none;
}

@keyframes jello-horizontal {
    0% {
        transform: scale3d(1, 1, 1);
    }
    30% {
        transform: scale3d(1.125, 0.875, 1);
    }
    40% {
        transform: scale3d(0.875, 1.125, 1);
    }
    50% {
        transform: scale3d(1.08, 0.96, 1);
    }
    65% {
        transform: scale3d(0.98, 1.02, 1);
    }
    75% {
        transform: scale3d(1.02, 0.98, 1);
    }
    100% {
        transform: scale3d(1, 1, 1);
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
