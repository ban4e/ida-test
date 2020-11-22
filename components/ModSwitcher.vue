<template>
    <label class="mod-switcher">
        <input type="checkbox" class="mod-switcher__input" @change="changeMode">
        <base-icon :name="modeDictionary[mode].icon" class="mod-switcher__icon" :key="modeDictionary[mode].icon" :is-box="true"/>
        <div class="mod-switcher__title">{{ modeDictionary[mode].title }}</div>
    </label>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue';
import cssVars from 'css-vars-ponyfill';
import detectIE from '~/helpers/detectIE.js';
import themeVariables from '~/helpers/themeVariables.js';

export default {
    fetch() {
        this.mode = this.$storage.getUniversal('theme') || 'light';
    },
    components: {
        BaseIcon,
    },
    name: 'ModSwitcher',
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
            this.$storage.setUniversal('theme', selectMode);
            document.documentElement.setAttribute('theme', selectMode);
            if (detectIE()) {
                cssVars({
                    watch: true,
                    variables: themeVariables[selectMode]
                });
           }
        }
    }
}
</script>

<style lang="scss" scoped>
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
        user-select: none;
        @include media-breakpoint-down(sm) {
            display: none;
        }
    }
}
.mod-switcher:hover {
    color: $color-link;
}
</style>
