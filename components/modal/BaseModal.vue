<!-- ToDo: проверить возможность обернуть в transition -->
<template>
    <div class="modal-layer" tabindex="-1">
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
        }
    },
    computed: {
        modalClassesNormalized() {
            return classModificator('modal', this.modalClasses);
        }
    },
    mounted() {
        this.$el.focus();
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
        overflow: hidden;
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
            flex: 1 0 auto;
            background: $color-white;
            border-radius: 10px;
            padding-top: 64px;
            padding-bottom: 64px;
            overflow: hidden;
            transition: transform .65s ease-in-out
        }
        &__header {
            padding: 0 72px;
        }
        &__body {
            padding: 0 72px;
        }
    }

    .modal_side {
        top: 0;
        right: 0;
        bottom: 0;
        left: auto;
        transform: none;
        max-width: 600px;
        .modal__container {
            border-top-left-radius: 48px;
            border-top-right-radius: 0;
            border-bottom-left-radius: 48px;
            border-bottom-right-radius: 0;
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
