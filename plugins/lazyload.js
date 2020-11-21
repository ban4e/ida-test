import Vue from 'vue';

Vue.directive('lazyload', {
    inserted: (el, { modifiers }) => {
        function loadImage() {
            const src = el.dataset && el.dataset.src;
            if (!src) return;

            delete el.dataset.src;
            checkImageLoaded(src).then(resolve => {
                if (modifiers.hasOwnProperty('background')) {
                    el.style.backgroundImage = `url('${src}')`;
                } else {
                    el.src = src;
                }
            }, reject => {
                //ToDo: fallback;
            }).finally(() => {
                el.classList.add('-loaded');
            });

        }

        function reach(entires, observer) {
            entires.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage();
                    observer.unobserve(el);
                }
            });
        }

        function initIntersectionObserver() {
            const options = {
                root: null,
                threshold: 0
            };

            const observer = new IntersectionObserver(reach, options);
            observer.observe(el);
        }

        function checkImageLoaded(url) {
            return new Promise((resolve, reject) => {
                const imageElement = document.createElement('img');
                imageElement.src = url;
                if (imageElement.complete) {
                    resolve();
                } else {
                    imageElement.addEventListener('load', () => {
                        resolve();
                    });
                    imageElement.addEventListener('error', () => {
                        reject();
                    });
                }
            });
        }


        if (!window['IntersectionObserver']) {
            loadImage();
        } else {
            initIntersectionObserver();
        }
    }
});
