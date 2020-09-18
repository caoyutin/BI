export default {
    data() {
        return {
            max: 0,
            inx: 0
        };
    },
    created() {

    },

    beforeDestroy() {

    },
    methods: {
        maxData(val, num, type) {
            let ary = [];
            for (let item in val) {
                if (type === "Merges") {
                    if (item < val.length - 1) {
                        ary.push(
                            Math.ceil(
                                Math.max.apply(null, val[item].data)
                            )
                        );
                    }
                } else {
                    ary.push(
                        Math.ceil(
                            Math.max.apply(null, val[item].data)
                        )
                    );
                }

            }
            if (type === "disMerges") {
                this.max = Math.ceil(Math.max.apply(null, ary) * 1.2);
            } else {
                this.max = Math.ceil(eval(ary.join("+")) * 1.2);
            }

            this.inx = parseInt(this.max / num);
        },
        resizes() {
            window.addEventListener("resize", () => {
                this.chart.resize();
            });
        }
    },
};