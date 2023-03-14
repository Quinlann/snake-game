import Canvas from './components/Canvas.js';
import SnakeHead from './components/SnakeHead.js';

const app = Vue.createApp({
    template: 
    /* html */
    `
    <Canvas/>
    `
});

app.component('Canvas', Canvas);
app.component('SnakeHead', SnakeHead);

app.mount('#app');