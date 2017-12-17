var app = new Vue({
    el: '#app',
    data: {
        showMenu: false
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        closeMenu() {
            this.showMenu = false;
        }
    }
});