<template>
    <transition name="slideIn">
        <div v-if="isOpened" class="modal-overlay">
            <div class="modal-backdrop"></div>
            <div class="modal" ref="modal">
                <div class="modal__container" ref="container">
                    <div v-if="$slots.header || title" class="modal__header">
                        <slot name="header">
                            <div class="title-h4">{{ title }}</div>
                        </slot>
                    </div>
                    <div v-if="$slots.body" class="modal__body">
                        <slot name="body"/>
                    </div>
                    <div v-if="$slots.footer" class="modal__footer">
                        <slot name="footer"/>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'SimpleModal',
        props: {
            isOpened: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
            }
        },
        methods: {
           toggleBodyFixedState(isFixed) {
               isFixed ? document.body.classList.remove('is-overlay') : document.body.classList.add('is-overlay')
           },
        },
        watch: {
            isOpened: function(newValue, oldValue) {
                console.log(newValue, oldValue);
                this.toggleBodyFixedState(oldValue);
            }
        },
    }
</script>

<style lang="scss">
    .modal-overlay {
        position: absolute;
        @include trbl(0);
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        z-index: 1200;
        overflow-y: scroll;
        overflow-x: hidden;
        min-height: 100vh;
    }
    .modal-backdrop {
        position: fixed;
        @include trbl(0);
        display: block;
        background-color: rgba($color-black, .5);
        transition: $transition-main;
    }
    .modal {
        display: flex;
        flex: 1;
        width: 600px;
        &__container {
            position: relative;
            display: flex;
            flex-direction: column;
            flex: 1 0 auto;
            background: $color-white;
            border-top-left-radius: 48px;
            border-bottom-left-radius: 48px;
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


</style>