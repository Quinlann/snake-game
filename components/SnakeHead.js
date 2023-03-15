export default {
    props: ['cellSize'],
    data() {
        return {}
    },
    methods: {},
    mounted() {},
    template:/* html */
    `
        <div id="snake-head" class="up" :style="{width: this.cellSize + 'px'}"></div>
    `
}