<template>
    <component :is="isLink ? 'a' : 'button'"
        class="button"
        :class="[normalizedSettings.classes, {'is-loading': isLoading}]"
        :type="type"
        :disabled="disabled"
        v-bind="normalizedSettings.attrs"
        @click="onClick"
        ref="button"
    >
        <span class="button__content">
            <span class="button__text" v-if="$slots.default">
                <slot>{{ normalizedSettings.title }}</slot>
            </span>
            <span class="button__icon" v-if="icon">
                 <base-icon :name="icon" class="button__icon-figure"/>
            </span>
        </span>
        <span class="button-pulsy" v-show="normalizedSettings.isPulse" ref="pulsy">
            <transition
                name="pulsy"
                @before-enter="pulsyBeforeEnter"
                @after-enter="pulsyAfterEnter"
            >
                <span class="button-pulsy__target" ref="pulsyTarget" v-if="isPulsyActivated"></span>
            </transition>
        </span>

        <span class="button__progress" role="progressbar" v-if="isLoading">
            <svg class="button__progress-icon" viewBox="22 22 44 44">
                <circle class="button__progress-circle" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle>
            </svg>
        </span>
    </component>
</template>

<script>
    import BaseIcon from '@/components/BaseIcon.vue';

    export default {
        components: {
            BaseIcon,
        },
        props: {
            settings: {
                type: Object
            },
            type: {
                type: String,
                default: 'button',
            },
            disabled: {
                type: Boolean,
                default: false
            },
            icon: {
                type: String
            },
            isLoading: {
                type: Boolean
            }
        },
        data: () => ({
            isPulsyActivated: false,
            clickY: null,
            clickX: null,
        }),
        computed: {
            normalizedSettings() {
                return Object.assign({
                    attrs: {},
                    classes: '',
                    isPulse: true,
                }, this.settings);
            },
            isLink() {
                return this.normalizedSettings.tag === 'a' || this.normalizedSettings.href;
            }
        },
        methods: {
            onClick(e) {
                if (this.normalizedSettings.isPulse && !this.isPulsyActivated) {
                    this.isPulsyActivated = true;
                    this.clickY = e.clientY;
                    this.clickX = e.clientX;
                }


                // const buttonElem = this.$refs.button;
                // const pulsyElem = this.$refs.pulsy;
                // const pulsyTarget = this.$refs.pulsyTarget;
                // const buttonRect = buttonElem.getBoundingClientRect();
                // const sideWidth = Math.max(buttonRect.width, buttonRect.height);

                // pulsyTarget.style.width = pulsyTarget.style.height = `${sideWidth}px`;
                // pulsyTarget.style.top = `${e.clientY - buttonRect.top - sideWidth/2}px`;
                // pulsyTarget.style.left = `${e.clientX - buttonRect.left - sideWidth/2}px`;

                // pulsyElem.classList.add('is-show');
                // pulsyTarget.addEventListener('animationend', () => {
                //     pulsyElem.classList.remove('is-show');
                // });
            },
            pulsyBeforeEnter(el) {
                const buttonElem = this.$refs.button;
                const buttonRect = buttonElem.getBoundingClientRect();
                const sideWidth = Math.max(buttonElem.offsetWidth, buttonElem.offsetHeight);

                el.style.width = el.style.height = `${sideWidth}px`;
                el.style.top = `${this.clickY - buttonRect.top - sideWidth/2}px`;
                el.style.left = `${this.clickX - buttonRect.left - sideWidth/2}px`;
            },
            pulsyAfterEnter(el) {
                this.isPulsyActivated = false;
            },
        }
    }
</script>

<style lang="scss">
    .button {
        @include rhythm(16, 16);
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 17px 32px;
        border-radius: 12px;
        color: $color-white-800;
        background-color: $color-blue-500;
        box-shadow: 0 8px 15px rgba($color-black, 0.1);
        font-weight: 700;
        outline: none;
        border: none;
        text-decoration: none;
        cursor: pointer;
        transition: $transition-main;
        &::before {
            content: '';
            position: absolute;
            @include trbl(0);
            border: 2px solid $color-blue-500;
            border-radius: inherit;
            transition: $transition-main;
        }
        &__content {
            display: flex;
            align-items: center;
        }
        &__content.is-invisible {
            opacity: 0;
        }
        &__icon {
            margin-left: 8px;
            transition: $transition-main;
        }
        &__progress {
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -10px;
            margin-left: -10px;
            color: $color-white;
            animation: rotate-360 1.4s linear infinite;
            width: 20px;
            height: 20px;
        }
        &__progress-icon {
            display: block;
        }
        &__progress-circle {
            stroke: $color-white;
            stroke-dasharray: 80px, 200px;
            stroke-dashoffset: 0px;
            animation: progress 1.4s ease-in-out infinite;
        }
    }
    .button:hover {
        background-color: lighten($color-blue-500, 5%);
        box-shadow: 0 8px 4px rgba(0, 0, 0, 0.1);
        &::before {
            border-color: lighten($color-blue-500, 5%);
        }
    }
    .button.is-disabled, .button:disabled, .button.button.is-disabled:hover, .button:disabled:hover {
        pointer-events: none;
        background-color: $color-gray-100;
        cursor: default;
        &::before {
            border-color: $color-gray-100;
        }
    }
    .button.is-loading {
        pointer-events: none;
        .button__content {
            opacity: 0;
        }
    }

    .button_full {
        width: 100%;
    }

    .button_icon {
        color: $color-blue-500;
        background-color: transparent;
        padding: 0;
        box-shadow: none;
        &::before {
            display: none;
        }
        .button__text {
            margin-right: 20px;
        }
        .button__icon {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 48px;
            width: 48px;
            height: 48px;
            fill: $color-white-800;
            background-color: $color-blue-500;
            border-radius: 16px;
            &-figure {
                transition: $transition-long;
            }
        }
    }
    .button_icon:hover {
        background-color: transparent;
        box-shadow: none;
        color: lighten($color-blue-500, 5%);
        .button__icon {
            background-color: lighten($color-blue-500, 5%);
            box-shadow: 0 6px 4px rgba(0, 0, 0, 0.1);
        }
    }

    .button_icon.button_white {
        color: $color-white-800;
        .button__icon {
            fill: $color-blue-500;
            background-color: $color-white-800;
        }
    }

    .button-pulsy {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        border-radius: inherit;
        transform: translateZ(0);
        color: inherit;
        pointer-events: none;
        &__target {
            position: absolute;
            background: rgba(0, 0, 0, 0.15);
            border-radius: 100%;
            transform: scale(0);
            transform-origin: center center;
            pointer-events: none;
            will-change: transform;
        }
    }

    .pulsy-enter-active {
        animation: pulsy 0.75s ease-out;
    }
    .pulsy-leave-active {
        animation: none;
    }
    @keyframes pulsy {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    @keyframes progress {
        0% {
            stroke-dasharray: 1px, 200px;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 100px, 200px;
            stroke-dashoffset: -15px;
        }
        100% {
            stroke-dasharray: 100px, 200px;
            stroke-dashoffset: -120px;
        }
    }
    @keyframes rotate-360 {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
