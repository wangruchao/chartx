KISSY.add('dvix/chart/line/xaxis-min', function (a, b) {
    var c = function () {
        c.superclass.constructor.apply(this, arguments);
    };
    return a.extend(c, b, {
        _trimXAxis: function (a, b) {
            var c = a.length, d = [];
            if (1 == c)
                d.push({
                    content: a[0],
                    x: parseInt(b / 2)
                });
            else
                for (var e = 0, f = a.length; f > e; e++) {
                    var g = {
                            content: a[e],
                            x: parseInt(e / (c - 1) * b)
                        };
                    d.push(g);
                }
            return d;
        }
    }), c;
}, { requires: ['dvix/components/xaxis/xAxis'] });