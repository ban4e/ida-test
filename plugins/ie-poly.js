import cssVars from 'css-vars-ponyfill';
import svg4everybody from 'svg4everybody';
import detectIE from '~/helpers/detectIE.js';
import themeVariables from '~/helpers/themeVariables.js';

export default (ctx) => {
    if (detectIE()) {
        const theme = ctx.$storage.getUniversal('theme') || 'light';
        require('intersection-observer');
        svg4everybody();
        cssVars({
            watch: true,
            variables: themeVariables[theme]
        });
    }
}

