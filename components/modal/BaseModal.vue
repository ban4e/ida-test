<!-- ToDo: проверить возможность обернуть в transition -->
<template>
    <div v-if="isShow" class="modal-layer" tabindex="-1" ref="layer">
        <transition :name="transitionName" appear>
            <div class="modal" :class="modalClassesNormalized" ref="modal">
                <template v-if="$slots.default">
                    <slot></slot>
                </template>
                <div v-else class="modal__container" ref="container">
                    <div v-if="$slots.header || title" class="modal__header">
                        <slot name="header">
                            <h3 v-if="title">{{ title }}</h3>
                        </slot>
                    </div>
                    <div v-if="$slots.body || description" class="modal__body">
                        <slot name="body">
                            <div v-if="description">{{ description }}</div>
                        </slot>
                    </div>
                    <div v-if="$slots.footer" class="modal__footer">
                        <slot name="footer"/>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import classModificator from '@/helpers/classModificator';

//ToDo: Не выпускать фокус из модального окна
export default {
    props: {
        title: {
            type: String
        },
        description: {
            type: String
        },
        modalClasses: {
            type: [String, Array, Object]
        },
        transitionName: {
            type: String,
            default: 'modal'
        },
        isShow: { // Пока используется только для применения transition. ToDo: Найти способ менять значение в случае если является дочерним компонентом (не дублируя пропы для родителя)
            type: Boolean,
            default: true
        }
    },
    computed: {
        modalClassesNormalized() {
            return classModificator('modal', this.modalClasses);
        }
    },
    mounted() {
        this.$refs.layer.focus();
    }
}
</script>

<style lang="scss" scoped>
    .modal-layer {
        position: absolute;
        @include trbl(0);
        display: flex;
        flex-direction: column;
        z-index: 1200;
        overflow-y: scroll;
        overflow-x: hidden;
        min-height: 100vh;
        outline: none;
        pointer-events: none;
    }

    .modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex: 1;
        max-width: 480px;
        width: 100%;
        pointer-events: auto;
        &__container {
            position: relative;
            display: flex;
            flex-direction: column;
            flex: 1;
            background-color: var(--color-sub);
            border-radius: 10px;
            padding-top: 64px;
            padding-bottom: 64px;
            overflow-x: hidden;
            overflow-y: auto;
            transition: transform .65s ease-in-out;
            @include media-breakpoint-down(lg) {
                padding-top: 48px;
                padding-bottom: 48px;
            }
            @include media-breakpoint-down(sm) {
                padding-top: 32px;
                padding-bottom: 32px;
            }
            @include media-breakpoint-down(xxs) {
                padding-top: 24px;
            }
        }
        &__header {
            padding: 0 72px;
            @include media-breakpoint-down(lg) {
                padding: 0 64px;
            }
            @include media-breakpoint-down(sm) {
                padding: 0 48px;
            }
            @include media-breakpoint-down(xs) {
                padding: 0 32px;
            }
            @include media-breakpoint-down(xxs) {
                padding: 0 16px;
            }
        }
        &__body {
            padding: 0 72px;
            @include media-breakpoint-down(lg) {
                padding: 0 64px;
            }
            @include media-breakpoint-down(sm) {
                padding: 0 48px;
            }
            @include media-breakpoint-down(xs) {
                padding: 0 24px;
            }
            @include media-breakpoint-down(xxs) {
                padding: 0 16px;
            }
        }
    }

    .modal_side {
        top: 0;
        right: 0;
        min-height: 100%;
        left: auto;
        transform: none;
        max-width: 600px;
        @include media-breakpoint-down(xs) {
            min-height: auto;
            top: auto;
            bottom: 0;
        }
        .modal__container {
            border-top-left-radius: 48px;
            border-top-right-radius: 0;
            border-bottom-left-radius: 48px;
            border-bottom-right-radius: 0;
            @include media-breakpoint-down(xs) {
                border-bottom-left-radius: 0;
                border-top-right-radius: 48px;
            }
            @include media-breakpoint-down(xxs) {
                border-top-left-radius: 24px;
                border-top-right-radius: 24px;
            }
        }
    }

    .modal_alert {
        .modal__container {
            @include media-breakpoint-down(xs) {
                margin-left: 16px;
                margin-right: 16px;
            }
        }
    }

    /* animations & transitions */
    .modal-enter-active, .modal-leave-active {
        transition: $transition-main;
    }
    .modal-enter, .modal-leave-to {
        transform: scale(0.7);
        opacity: 0;
    }

    .modal-slide-enter-active, .modal-slide-leave-active {
        transition: $transition-main;
    }
    .modal-slide-enter, .modal-slide-leave-to {
        transform: translateX(200%);
    }
</style>
