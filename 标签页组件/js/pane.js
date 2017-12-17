Vue.component('pane', {
    template: ' \
            <div class="pane" v-show="showPane"> \
                <slot></slot> \
            </div>',
    data() {
        return {
            showPane: true
        };
    },
    props: {
        name: {
            type: String
        },
        label: {
            type: String,
            default: ''
        }
    },
    methods: {
        updateNav() {
            this.$parent.updateNav();
        }
    },
    watch: {
        // 监听label更新时，调用父组件的方法
        label() {
            this.updateNav();
        }
    },
    mounted() {
        this.updateNav();
    }
});
