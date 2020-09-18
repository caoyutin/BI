// import Vue from 'vue'
// Vue.filter('timeForm', function (value) {
//     if (typeof (value) == "undefined" || value === null) return "";

//     let date = new Date(value);
//     var y = date.getFullYear();
//     var m = date.getMonth() + 1;
//     var d = date.getDate();
//     if (isNaN(y) && y != 0) {
//         y = " ";
//     }
//     if (isNaN(m) && m != 0) {
//         m = " ";
//     } else {
//         (m < 10 ? "0" + m : m);
//     }
//     if (isNaN(d) && d != 0) {
//         d = " ";
//     } else {
//         (d < 10 ? "0" + d : d);
//     }
//     return y + "-" + m + "-" + d + " " + date.toTimeString().substr(0, 5);
// });

// export default Vue.filter('timeForm')
// const formatUtcTime = function (value) {
//     // if (typeof (value) == "undefined" || value === null) return "";
//     // let date = new Date(value);
//     // var y = date.getFullYear();
//     // var m = date.getMonth() + 1;
//     // var d = date.getDate();
//     // if (isNaN(y) && y != 0) {
//     //     y = " ";
//     // }
//     // if (isNaN(m) && m != 0) {
//     //     m = " ";
//     // } else {
//     //     (m < 10 ? "0" + m : m);
//     // }
//     // if (isNaN(d) && d != 0) {
//     //     d = " ";
//     // } else {
//     //     (d < 10 ? "0" + d : d);
//     // }
//     // return y + "-" + m + "-" + d + " " + date.toTimeString().substr(0, 5);
//     return 1111
// }
export default {
    filters: {
        /* 格式化时间戳 */

        formatDate(val) {
            const date = new Date(val);

            const year = date.getFullYear();

            const month =
                date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;

            const day =
                date.getDate() > 9 ? date.getDate() + 1 : `0${date.getDate() + 1}`;

            return `${year}-${month}-${day}`;

            console.log(val);
        },
    },
}