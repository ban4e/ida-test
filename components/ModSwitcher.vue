<template>
    <div class="mod-switcher">
        <base-icon :name="modDictionary[mod].icon" class="mod-switcher__icon"/>
        <div class="mod-switcher__title">{{ modDictionary[mod].title }}</div>
    </div>
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
        data: () => {
            return {
                modDictionary: {
                    light: {icon: 'moon', title: 'Night mod'},
                    dark:  {icon: 'sun', title: 'Day mod'}
                }
            }
        }
    }
</script>

<style lang="scss">
    .mod-switcher {
        display: flex;
        align-items: center;
        &__icon {
            flex: 0 0 auto;
            margin-right: 16px;
            fill: $color-gray-500;
        }
    }
</style>