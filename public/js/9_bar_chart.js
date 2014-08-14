var dataset = [];

var refresh_data = function (dataset) {
    dataset = []
    for (var i = 0; i < 25; i++) {            //Loop 25 times
        var newNumber = 5 + Math.floor(Math.random() * 30);   //New random number (0-30)
        dataset.push(newNumber);              //Add new number to array
    }
    return dataset;
}

dataset = refresh_data(dataset);

var low = d3.min(dataset);
var high = d3.max(dataset);
var range = high - low;

norm = function (x) {
    return (x - low) / range
}

var w = 600;
var h = 300;

var xScale = d3.scale.ordinal()
    .domain(d3.range(dataset.length))
    .rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

//separating bars
var barPadding = 1;

var svg = d3.select("svg")
    .attr("width", w)
    .attr("height", h);

var bars = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect");

bars.attr("x", function (d, i) {
    return xScale(i);
})
    .attr("y", function (d) {
        return h - yScale(d);
    })
    .attr("height", function (d) {
        return yScale(d);
    })
    .attr("width", xScale.rangeBand())
    .attr("fill", function (d) {

        // 03FBF2 - 3, 251, 242 - light
        // 163B48 - 22, 59, 72 - dark

        return "rgb(10, " + (59 + Math.floor(192 * norm(d))) + ", " + (72 + Math.floor(170 * norm(d))) + ")";
    });

svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(function (d) {
        return d;
    })
    .attr('fill', 'white')
    .attr("x", function (d, i) {
        return xScale(i) + xScale.rangeBand() / 2 - 6;
    })
    .attr("y", function (d) {
        return h - yScale(d) + 14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px");

d3.select('p').on('click', function () {
    dataset = refresh_data(dataset)
    svg.selectAll("rect")
        .data(dataset)
        .transition()
        .duration(1000)
//        .ease('bounce')
        .attr("y", function (d) {
            return h - yScale(d);
        })
        .attr("fill", function (d) {
            return "rgb(10, " + (59 + Math.floor(192 * norm(d))) + ", " + (72 + Math.floor(170 * norm(d))) + ")";
        })
        .attr("height", function (d) {
            return yScale(d);
        });

    svg.selectAll("text")
        .data(dataset)
        .transition()
        .duration(1000)
//        .ease('bounce')
        .text(function (d) {
            return d;
        })
        .attr("x", function (d, i) {
            return xScale(i) + xScale.rangeBand() / 2 - 6;
        })
        .attr("y", function (d) {
            return h - yScale(d) + 14;
        });
})
