import Canvas from './components/Canvas.js';
import SnakeHead from './components/SnakeHead.js';
import SplashScreen from './components/SplashScreen.js';

const app = Vue.createApp({
    template: 
    /* html */
    `
    <Canvas/>
    <SplashScreen/>
    `
});

app.component('Canvas', Canvas);
app.component('SnakeHead', SnakeHead);
app.component('SplashScreen', SplashScreen);

app.mount('#app');