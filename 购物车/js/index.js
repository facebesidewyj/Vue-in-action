var app = new Vue({
    el: '#app',
    data: {
        list: [{
                id: 1,
                name: 'iPhone8',
                price: 1000,
                count: 1
            },
            {
                id: 2,
                name: 'iPhone6',
                price: 800,
                count: 1
            },
            {
                id: 3,
                name: 'MacBook Pro',
                price: 2000,
                count: 1
            }
        ]
    },
    computed: {
        totalPrice() {
            let totalPrice = 0;
            this.list.forEach((item) => {
                totalPrice += item.price * item.count;
            });
            return totalPrice.toString().replace(/\B(?=(\d{3})+$)/g, ',');
        }
    },
    methods: {
        reduce(index) {
            if (this.list[index].count > 1) {
                this.list[index].count--;
            }
        },
        add(index) {
            this.list[index].count++;
        },
        remove(index) {
            // 删除index的位置，删除一项
            this.list.splice(index, 1);
        }
    }
});