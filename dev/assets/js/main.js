import './validation';
import Splide from '@splidejs/splide';
import { Fancybox } from '@fancyapps/ui';

new Splide('.splide', {
    heightRatio: 0.5625 // 16/9 ratio
}).mount();

Fancybox.bind('[data-fancybox]', {});