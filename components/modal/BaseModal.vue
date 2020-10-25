<template>
    <div class="modal-layer">
        <div class="modal" ref="modal">
            <div class="modal__container" ref="container">
                <div v-if="$slots.header" class="modal__header">
                    <slot name="header" />
                </div>
                <div v-if="$slots.body" class="modal__body">
                    <slot name="body"/>
                </div>
                <div v-if="$slots.footer" class="modal__footer">
                    <slot name="footer"/>
                </div>
            </div>
        </div>
        <!-- <slot></slot> -->
    </div>
</template>

<style lang="scss" scoped>
    .modal-layer {
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
