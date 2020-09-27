<template>
    <div class="header grid-block">
        <div class="header__container grid-container">
            <a href="javascript:void(0)" class="header__logo">
                <base-icon name="logo" class="header__logo-icon" :is-responsive="true"/>
            </a>
            <div class="header__note">World's first affordable airsharing</div>
            <mod-switcher class="header__switcher"/>
            <ul class="header__actions">
                <li class="header__actions-item">
                    <a href="javascript:void(0)" class="header-action">
                        <base-icon name="chat" class="header-action__icon"/>
                    </a>
                </li>
                <li class="header__actions-item">
                    <a href="javascript:void(0)" class="header-action is-alert">
                        <base-icon name="bell" class="header-action__icon"/>
                    </a>
                </li>
            </ul>
            <div class="header__user">
                <a href="javascript:void(0)" class="header__user-name">Bessie Cooper</a>
                <a href="javascript:void(0)" role="button" class="header__user-image" :style="{ backgroundImage: `url('${require('~/assets/img/user.jpg')}')` }"></a>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseIcon from '@/components/BaseIcon.vue';
    import ModSwitcher from '@/components/ModSwitcher.vue';

    export default {
        components: {
            BaseIcon,
            ModSwitcher,
        },
        name: 'AppHeader',
    }
</script>

<style lang="scss">
    .header {
        padding-top: 48px;
        color: $color-gray-500;
        @include media-breakpoint-down(sm) {
            padding-top: 12px;
        }
        @include media-breakpoint-down(xs) {
            padding-bottom: 12px;
        }
        &__container {
            display: flex;
            align-items: center;
        }
        &__logo {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            margin-right: 65px;
            @include media-breakpoint-down(md) {
                margin-right: 32px;
            }
            &-icon {
                width: 170px;
                fill: var(--color-caption);
                @include media-breakpoint-down(xs) {
                    width: 114px;
                }
            }
        }
        &__note {
            @include media-breakpoint-down(lg) {
                display: none;
            }
        }
        &__switcher {
            margin-left: auto;
            margin-right: 105px;
            @include media-breakpoint-down(md) {
                margin-right: 64px;
            }
            @include media-breakpoint-down(sm) {
                margin-right: 16px;
            }
        }
        &__actions {
            display: flex;
            align-items: center;
            margin-right: 56px;
            @include media-breakpoint-down(sm) {
                margin-right: 24px;
            }
            &-item {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                margin-right: 24px;
                @include media-breakpoint-down(sm) {
                    margin-right: 16px;
                }
                &:last-child {
                    margin-right: 0;
                }
            }
        }
        &__user {
            display: flex;
            align-items: center;
            &-name {
                display: block;
                flex: 0 0 auto;
                color: var(--color-caption);
                font-weight: bold;
                margin-right: 16px;
                transition: $transition-fast;
                @include media-breakpoint-down(sm) {
                    display: none;
                }
                &:hover {
                    color: $color-rose-500;
                }
            }
            &-image {
                position: relative;
                display: block;
                flex: 0 0 56px;
                width: 56px;
                border-radius: 50%;
                background: $color-gray-100 center center/cover no-repeat;
                @include media-breakpoint-down(sm) {
                    flex: 0 0 32px;
                    width: 32px;
                }
                &::before {
                    content: '';
                    display: block;
                    padding-top: 100%;
                }
            }
        }
    }

    .header-action {
        display: block;
        &__icon {
            fill: $color-gray-500;
            transition: $transition-fast;
        }
    }
    .header-action:hover {
        .header-action__icon {
            fill: $color-rose-500;
        }
    }
    .header-action.is-alert {
        position: relative;
        &::after {
            content: '';
            position: absolute;
            top: -1px;
            right: 0;
            display: block;
            width: 4px;
            height: 4px;
            background-color: $color-rose-500;
            border-radius: 50%;
        }
        &::before {
            content: '';
            position: absolute;
            top: -5px;
            right: -5px;
            display: block;
            width: 14px;
            height: 14px;
            background-color: $color-white;
            border-radius: 50%;
        }
    }
</style>