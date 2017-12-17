Vue.component('input-number', {
    template: '\
        <div class="input-number">\
            <input \
                type="text" \
                :value="currentValue" \
                @change="handleChange" \
                @keyup.up="handleUp" \
                @keyup.down="handleDown" \
                @change="handleChange"> \
            <button \
                @click="handleDown" \
                :disabled="currentValue <= min">-</button> \
            <button \
                @click="handleUp" \
                :disabled="currentValue >= max">+</button> \
        </div>',
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }

    },
    data() {
        return {
            currentValue: this.value
        }
    },
    watch: {
        currentValue(value) {
            this.$emit('input', value);
            this.$emit('on-change', value);
        },
        value(val) {
            this.updateValue(val);
        }
    },
    methods: {
        handleDown() {
            if (this.currentValue >= this.min) {
                this.currentValue -= 1;
            }
        },
        handleUp() {
            if (this.currentValue <= this.max) {
                this.currentValue += 1;
            }
        },
        handleChange(event) {
            var val = Number(event.target.value);
            var max = this.max;
            var min = this.min;

            if (typeof val === 'number' && !isNaN(val)) {
                if (val > max) {
                    this.currentValue = max
                } else if (val < min) {
                    this.currentValue = min;
                } else {
                    this.currentValue = val;
                }
            } else {
                event.target.value = this.currentValue;
            }
        },
        updateValue(value) {
            if (value < this.min) {
                value = this.min;
            }
            if (value > this.max) {
                value = this.max;
            }
            this.currentValue = value;
        },
    },
    mounted() {
        this.updateValue(this.value);
    }
})
