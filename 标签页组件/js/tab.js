Vue.component('tabs', {
    template: '\
        <div class="tabs"> \
            <div class="tabs-bar"> \
                <div \
                    :class="tabCls(item)" \
                    v-for="(item, index) in navList" \
                    @click="handleChange(index)"> \
                    {{item.label}} \
                </div> \
            </div> \
            <div class="tabs-content"> \
                <slot><slot/> \
            </div> \
        </div>',
    props: {
        value: {
            type: { String, Number }
        }
    },
    data() {
        return {
            navList: [],
            currentValue: this.value
        };
    },
    methods: {
        tabCls(item) {
            return [
                'tabs-tab', {
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        getTabs() {
            return this.$children.filter((item) => {
                // 判断子组件的名字
                return item.$options.name = 'pane';
            });
        },
        updateNav() {
            this.navList = [];
            var _this = this;

            this.getTabs().forEach(function(pane, index) {
                _this.navList.push({
                    name: pane.name || index,
                    label: pane.label
                });
                if (!pane.name) {
                    pane.name = index;
                }
                if (index === 0) {
                    if (!_this.currentValue) {
                        _this.currentValue = pane.name || index;
                    }
                }
            });

            this.updateStatus();
        },
        updateStatus() {
            var tabs = this.getTabs();
            var _this = this;

            tabs.forEach(function(tab) {
                return tab.showPane = tab.name === _this.currentValue;
            });
        },
        handleChange(index) {
            var nav = this.navList[index];
            var name = nav.name;
            this.currentValue = name;
            this.$emit('input', name);
            this.$emit('on-click', name);
        }
    },
    watch: {
        value() {
            this.currentValue = this.value
        },
        currentValue() {
            this.updateStatus();
        }
    }
});
