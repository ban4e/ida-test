<template>
    <label class="mod-switcher">
        <input type="checkbox" class="mod-switcher__input" @change="changeMode">
        <base-icon :name="modeDictionary[mode].icon" class="mod-switcher__icon" :is-box="true"/>
        <div class="mod-switcher__title">{{ modeDictionary[mode].title }}</div>
    </label>
</template>

<script>
    import BaseIcon from '@/components/BaseIcon.vue';

    export default {
        components: {
            BaseIcon,
        },
        name: 'ModSwitcher',
        props: {
           mod: {
               type: String,
               default: 'light'
           }
        },
        data: () => ({
            mode: 'light',
            modeDictionary: {
                light: {icon: 'moon', title: 'Night mod'},
                dark:  {icon: 'sun', title: 'Day mod'}
            }
        }),
        methods: {
            changeMode() {
                const selectMode = Object.keys(this.modeDictionary).filter(mode => mode !== this.mode)[0];
                this.mode = selectMode;
                document.documentElement.setAttribute('palette', selectMode);
            }
        }
    }
</script>

<style lang="scss">
    .mod-switcher {
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: $transition-main;
        &__input {
            display: none;
        }
        &__icon {
            flex: 0 0 auto;
            width: 24px;
            margin-right: 16px;
            fill: currentColor;
            @include media-breakpoint-down(sm) {
                width: 20px;
                padding: 1px;
                margin-right: 0;
            }
        }
        &__title {
            pointer-events: none;
            @include media-breakpoint-down(sm) {
                display: none;
            }
        }
    }
    .mod-switcher:hover {
        color: $color-link;
    }
</style>
