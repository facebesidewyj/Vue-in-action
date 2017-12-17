/**
 * 注册自定义事件
 */
Vue.directive('clickoutside', {
    bind: function(el, binding, vnode) {
        function documentHandle(e) {
            // 判断是否点击了菜单内部
            if (el.contains(e.target)) {
                return false;
            }

            // 判断有没有写表达式(执行的方法名)
            if (binding.expression) {
                // 执行上下文中指定的函数
                binding.value(e);
            }
        }
        el.__vueClickOutSide__ = documentHandle;
        document.addEventListener('click', documentHandle);
    },
    unbind: {
        function(el, binding) {
            document.removeEventListener('click', el.__vueClickOutSide__);
            delete el.__vueClickOutSide__;
        }
    }
});