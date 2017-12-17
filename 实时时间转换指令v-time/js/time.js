var Time = {
    // 获得当前时间戳
    getUnix: function() {
        var date = new Date();
        return date.getTime();
    },
    // 获取今天0点0分0秒的时间戳
    getTodayUnix: function() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    // 获取今年1月1日0分0秒的时间戳
    getYearUnix: function() {
        var date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    // 获取标准年月日
    getLastDate: function(time) {
        var date = new Date(time);

        // 格式化月和日
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return date.getFullYear() + '-' + month + '-' + day;
    },
    // 格式化日期（返回友好日期）
    getFormatTime: function(time) {
        var now = this.getUnix();
        var today = this.getTodayUnix();
        var year = this.getYearUnix();

        // 转换为秒级计算
        var timer = (now - time) / 1000;
        var tip = '';

        if (timer < 0) {
            tip = '刚刚';
        } else if (Math.floor(timer / 60) <= 0) {
            tip = '刚刚';
        } else if (timer < 3600) {
            tip = Math.floor(timer / 60) + '分钟前';
        } else if (timer >= 3600 && (time - today >= 0)) {
            tip = Math.floor(timer / 3600) + '小时前';
        } else if (timer / 86400 <= 31) {
            tip = Math.ceil(timer / 86400) + '天前';
        } else {
            tip = this.getLastDate(time);
        }
        return tip;
    },
    getDateFromBirthday(time) {
        var now = this.getUnix();
        var timer = (now - time) / 1000;
        var dateFromBirthday = Math.ceil(timer / 86400);
        var yearsOld = Math.floor(dateFromBirthday / 365);
        return '已经出生了' + dateFromBirthday + '天，' + yearsOld + '岁了';
    }
}

Vue.directive('time', {
    bind: function(el, binding) {
        el.innerHTML = Time.getFormatTime(binding.value);
        el.__timeout__ = setInterval(function() {
            el.innerHTML = Time.getFormatTime(binding.value);
        }, 1000);
    },
    unbind: function(el) {
        clearInterval(el.__timeout__);
        delete el.__timeout__;
    }
});
Vue.directive('birthday', {
    bind: function(el, binding) {
        el.innerHTML = Time.getDateFromBirthday(binding.value);
    }
});
