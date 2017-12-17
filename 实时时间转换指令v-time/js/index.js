var app = new Vue({
    el: '#app',
    data: {
        timeNow: 1513400164222,
        timeBefore: 1488930695721
    },
    computed:{
        birthday(){
            var date = new Date();
            date.setFullYear(1993, 7, 25);
            return date.getTime();
        }
    }
});
