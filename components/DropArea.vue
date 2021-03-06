<template>
    <div class="drop-area" :class="{'is-error': error}">
        <label class="drop-area__zone"
               @dragenter="enterArea"
               @dragover="enterArea"
               @dragleave="leaveArea"
               @drop="dropFile($event); leaveArea($event);"
               :style="{ backgroundImage: preview ? `url('${preview}')` : null }"
               ref="droparea"
        >
            <span v-if="error" class="drop-area__error" v-text="error"></span>
            <input
                ref="inputFile"
                class="drop-area__input"
                type="file"
                v-bind="$attrs"
                v-on="inputListeners"
                @change="onChange"
            >
            <base-button
                v-if="!preview"
                key="addBtn"
                icon="add-image"
                theme="sub"
                mod="_icon"
            />
            <base-button
                v-else
                key="removeBtn"
                icon="cross"
                theme="sub"
                mod="_icon drop-area__remove"
                @click.native.prevent="removeFile"
            />
            <span v-if="isFileLoading" class="drop-area__loader" ref="loader">
                <svg class="drop-area__loader-icon" viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <circle :r="circleRadius" :cx="circleSide" :cy="circleSide" fill="transparent" stroke="white" :stroke-width="circleStrokeWidth - 1" class="drop-area__loader-circle"></circle>
                    <circle :r="circleRadius" :cx="circleSide" :cy="circleSide" fill="transparent" stroke="blue" :stroke-width="circleStrokeWidth" :stroke-dasharray="strokeDasharray" :stroke-dashoffset="circleOffset" class="drop-area__loader-circle"></circle>
                </svg>
            </span>
        </label>
    </div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
    name: 'DropArea',
    inheritAttrs: false,
    components: {
        BaseIcon,
        BaseButton
    },
    props: {
        value: {},
        error: { type: String },
        inputListeners: { type: Object, default: () => ({}) },
    },
    data() {
        return {
            circleSide: 40,
            circleStrokeWidth: 4,
            circleOffset: 0,
            file: null,
            preview: null,
            isFileLoading: false,
        }
    },
    computed: {
        localValue: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit('input', newValue);
            }
        },
        circleRadius() {
            return this.circleSide - this.circleStrokeWidth;
        },
        circumference() {
            return this.circleRadius * 2 * Math.PI;
        },
        strokeDasharray() {
            return `${this.circumference} ${this.circumference}`;
        }
    },
    methods: {
        enterArea(e) {
            e.preventDefault();
            this.$refs.droparea.classList.add('is-enter');
        },
        leaveArea(e) {
            e.preventDefault();
            this.$refs.droparea.classList.remove('is-enter');
        },
        dropFile(e) {
            e.preventDefault();
            const dt = e.dataTransfer;
            const files = dt.files;
            this.handleFiles(files);
        },
        onChange(e) {
            const filesList = e.target && e.target.files;
            if (filesList && filesList.length) {
                this.localValue = filesList[0];
                this.handleFiles(e.target.files);
            }
        },

        /**
         * @param {FileList} files - файлы
         */
        handleFiles(files) {
            const filesArr = [...files];
            this.file = filesArr[0];
            const fileSize = this.file.size;
            const isFileLarge = fileSize > 100 * 1024 * 1024; // размер файла более 100 мб

            // ToDO: вынести прелоадер в компонент
            const reader = new FileReader();
            reader.onerror = (e) => { removeFile() };
            reader.onabort = (e) => { removeFile() };

            if (isFileLarge) {
                reader.onloadstart = this.showProgress;
                reader.onprogress = this.updateProgress;
            }

            reader.onload = (e) => {
                if (isFileLarge) {
                    this.circleOffset = this.circumference;
                    this.hideProgress();
                }
                this.preview = e.target.result;
            };
            reader.readAsDataURL(filesArr[0]);
        },

        removeFile() {
            this.file = null;
            this.preview = null;
            this.localValue = '';
            this.$refs.inputFile.value = '';
        },
        showProgress() {
            this.isFileLoading = true;
        },
        hideProgress() {
            this.isFileLoading = false;
        },
        updateProgress(e) {
            if (e.lengthComputable) {
                const percentLoaded = Math.round((e.loaded / e.total) * 100);
                if (percentLoaded < 100) {
                    this.circleOffset = this.circumference - percentLoaded / 100 * this.circumference;
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.drop-area {
    &__zone {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background: center center/cover no-repeat;
        background-color: var(--color-secondary);
        border-radius: 24px;
        cursor: pointer;
        transition: $transition-main;
        &::before {
            content: '';
            display: block;
            padding-top: (348/456) * 100%;
        }
        &::after {
            content: '';
            position: absolute;
            @include trbl(0);
            z-index: 1;
        }
        &.is-enter {
            box-shadow: 0 0 8px inset $color-blue-500;
        }
    }
    &__error {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translate(-50%, 0);
        color: $color-danger
    }
    &__input {
        display: none;
    }
    &__remove {
        position: absolute;
        top: 16px;
        right: 16px;
        z-index: 2;
    }
    &__loader {
        display: block;
        position: relative;
        width: 60px;
        height: 60px;
        overflow: hidden;
        &-icon {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
    &__loader-circle {
        transform: rotate(-90deg);
        transform-origin: center;
        transition: $transition-main;
    }
}
.drop-area.is-error {
    .drop-area__zone {
        box-shadow: 0 0 0 2px inset $color-danger;
    }
}
</style>
