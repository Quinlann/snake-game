export default {
    props: [],
    emits: ['emit-loading-showing'],
    data() {
        return {
            isShowing: false
        }
    },
    methods: {
        showLoading() {
            this.isShowing = true;
            setTimeout(() => { // to make sure that the view is updated before proceeding
                this.$emit('emit-loading-showing');
            }, 0);
        },
        hideLoading() {
            this.isShowing = false;
        }
    },
    template: /* html */
    `
        <div v-if="isShowing" id="loading-screen">Loading...</div>
    `
}