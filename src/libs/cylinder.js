/*
 Highcharts JS v8.1.2 (2020-06-16)

 Highcharts cylinder module

 (c) 2010-2019 Kacper Madej

 License: www.highcharts.com/license
*/
(function (b) { "object" === typeof module && module.exports ? (b["default"] = b, module.exports = b) : "function" === typeof define && define.amd ? define("highcharts/modules/cylinder", ["highcharts", "highcharts/highcharts-3d"], function (g) { b(g); b.Highcharts = g; return b }) : b("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (b) {
    function g(b, h, f, g) { b.hasOwnProperty(h) || (b[h] = g.apply(null, f)) } b = b ? b._modules : {}; g(b, "modules/cylinder.src.js", [b["parts/Globals.js"], b["parts/Color.js"], b["parts/Utilities.js"]], function (b,
        g, f) {
        var h = g.parse; g = f.merge; var r = f.pick, t = f.seriesType, u = b.charts, v = b.deg2rad, w = b.perspective; f = b.Renderer.prototype; var x = f.cuboidPath, k = function (a) { return !a.some(function (a) { return "C" === a[0] }) }; t("cylinder", "column", {}, {}, { shapeType: "cylinder", hasNewShapeType: b.seriesTypes.column.prototype.pointClass.prototype.hasNewShapeType }); b = g(f.elements3d.cuboid, {
            parts: ["top", "bottom", "front", "back"], pathType: "cylinder", fillSetter: function (a) {
                this.singleSetterForParts("fill", null, {
                    front: a, back: a, top: h(a).brighten(.1).get(),
                    bottom: h(a).brighten(-.1).get()
                }); this.color = this.fill = a; return this
            }
        }); f.elements3d.cylinder = b; f.cylinder = function (a) { return this.element3d("cylinder", a) }; f.cylinderPath = function (a) { var c = u[this.chartIndex], d = x.call(this, a), e = !d.isTop, b = !d.isFront, f = this.getCylinderEnd(c, a); a = this.getCylinderEnd(c, a, !0); return { front: this.getCylinderFront(f, a), back: this.getCylinderBack(f, a), top: f, bottom: a, zIndexes: { top: e ? 3 : 0, bottom: e ? 0 : 3, front: b ? 2 : 1, back: b ? 1 : 2, group: d.zIndexes.group } } }; f.getCylinderFront = function (a,
            c) { a = a.slice(0, 3); if (k(c)) { var d = c[0]; "M" === d[0] && (a.push(c[2]), a.push(c[1]), a.push(["L", d[1], d[2]])) } else { d = c[0]; var e = c[1]; c = c[2]; "M" === d[0] && "C" === e[0] && "C" === c[0] && (a.push(["L", c[5], c[6]]), a.push(["C", c[3], c[4], c[1], c[2], e[5], e[6]]), a.push(["C", e[3], e[4], e[1], e[2], d[1], d[2]])) } a.push(["Z"]); return a }; f.getCylinderBack = function (a, c) {
                var d = []; if (k(a)) { var e = a[0], b = a[2]; "M" === e[0] && "L" === b[0] && (d.push(["M", b[1], b[2]]), d.push(a[3]), d.push(["L", e[1], e[2]])) } else "C" === a[2][0] && d.push(["M", a[2][5], a[2][6]]),
                    d.push(a[3], a[4]); k(c) ? (e = c[0], "M" === e[0] && (d.push(["L", e[1], e[2]]), d.push(c[3]), d.push(c[2]))) : (a = c[2], e = c[3], c = c[4], "C" === a[0] && "C" === e[0] && "C" === c[0] && (d.push(["L", c[5], c[6]]), d.push(["C", c[3], c[4], c[1], c[2], e[5], e[6]]), d.push(["C", e[3], e[4], e[1], e[2], a[5], a[6]]))); d.push(["Z"]); return d
            }; f.getCylinderEnd = function (a, c, d) {
                var e = r(c.depth, c.width), b = Math.min(c.width, e) / 2, f = v * (a.options.chart.options3d.beta - 90 + (c.alphaCorrection || 0)); d = c.y + (d ? c.height : 0); var g = .5519 * b, h = c.width / 2 + c.x, k = e / 2 + c.z, l =
                    [{ x: 0, y: d, z: b }, { x: g, y: d, z: b }, { x: b, y: d, z: g }, { x: b, y: d, z: 0 }, { x: b, y: d, z: -g }, { x: g, y: d, z: -b }, { x: 0, y: d, z: -b }, { x: -g, y: d, z: -b }, { x: -b, y: d, z: -g }, { x: -b, y: d, z: 0 }, { x: -b, y: d, z: g }, { x: -g, y: d, z: b }, { x: 0, y: d, z: b }], p = Math.cos(f), q = Math.sin(f), m, n; l.forEach(function (a, b) { m = a.x; n = a.z; l[b].x = m * p - n * q + h; l[b].z = n * p + m * q + k }); a = w(l, a, !0); return 2.5 > Math.abs(a[3].y - a[9].y) && 2.5 > Math.abs(a[0].y - a[6].y) ? this.toLinePath([a[0], a[3], a[6], a[9]], !0) : this.getCurvedPath(a)
            }; f.getCurvedPath = function (a) {
                var b = [["M", a[0].x, a[0].y]], d = a.length -
                    2, e; for (e = 1; e < d; e += 3)b.push(["C", a[e].x, a[e].y, a[e + 1].x, a[e + 1].y, a[e + 2].x, a[e + 2].y]); return b
            }
    }); g(b, "masters/modules/cylinder.src.js", [], function () { })
});
    //# sourceMappingURL=cylinder.js.map