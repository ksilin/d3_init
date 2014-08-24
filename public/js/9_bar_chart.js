var dataset = [];

var key = function(d) {
    return d.key;
};

var barCount = 20;
var maxValue = 30;
var valuePadding = 5;

var refresh_data = function (dataset) {
    count = (dataset.length == 0 ? barCount : dataset.length);
    dataset = []
    var dynMaxValue = (maxValue - Math.random() * 20);
    for (var i = 0; i < count; i++) {
        var newNumber = valuePadding + Math.floor(Math.random() * dynMaxValue);
        dataset.push({key: i, value: newNumber});
    }
    return dataset;
}

dataset = refresh_data(dataset);

var low = d3.min(dataset, key);
var high = d3.max(dataset, key);
var range = high - low;
var padding = 30;

var norm = function (x) {
    return (x - low) / range
}

function addNumberToDataset(dataset) {
    var newNumber = Math.floor(Math.random() * maxValue);
    dataset.push(newNumber);
}

function removeNumberFromDataset(dataset) {
    // for some reason, results of shift() and pop() look exactly the same.
    // I suppose it has something to do with object constancy.
//    dataset.pop();
    dataset.shift();
}

function makeBars() {
    var bars = barGroup.selectAll("rect")
        .data(dataset);							//Re-bind data to existing bars, return the 'update' selection

    bars.enter()
        .append('rect')
        .attr("x", w)
        .attr("y", function (d) {
            return yScale(d.value);
        })
        .attr("height", function (d) {
            return h - yScale(d.value);
        });

    bars.exit()
        .transition()
        .duration(500)
        .attr("x", -xScale.rangeBand())
        .remove();

    bars.transition()
        .attr("fill", function (d) {
            return "rgb(10, " + (59 + Math.floor(192 * norm(d.value))) + ", " + (72 + Math.floor(170 * norm(d.value))) + ")";
            //    return "rgb(10, " + greenScale(d) + ", " + blueScale(d) + ")";
        })
        .delay(function (d, i) {
            return i / dataset.length * 500;
        })
        .duration(500)
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d) {
            return yScale(d.value);
        })
        .attr("fill", function (d) {
            return "rgb(10, " + (59 + Math.floor(192 * norm(d.value))) + ", " + (72 + Math.floor(170 * norm(d.value))) + ")";
            // return "rgb(10, " + greenScale(d) + ", " + blueScale(d) + ")";
        })
        .attr("width", xScale.rangeBand())
        .attr("height", function (d) {
            return h - yScale(d.value);
        });
}

function makeLabels() {

    var txt = textGgroup.selectAll("text")
        .data(dataset);

    txt.enter()
        .append('text');

    txt.exit()
        .transition()
        .duration(500)
        .attr("x", -xScale.rangeBand())
        .remove();

    txt.text(function (d) {
        return d.value;
    })
        .attr('fill', 'white')
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("x", function (d, i) {
            return xScale(i) + xScale.rangeBand() / 2 - 6;
        })
        .attr("y", padding);

    txt.transition()
        .delay(function (d, i) {
            return i / dataset.length * 500;
        })
        .duration(500)
        .attr("x", function (d, i) {
            return xScale(i) + xScale.rangeBand() / 2 - 6;
        })
        .attr("y", function (d) {
            return yScale(d.value) + 14;
        });
}

function refreshScales() {
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset, function(d){return d.value;})]);

    greenScale.domain([0, d3.max(dataset, function(d){return d.value;})]);
    blueScale.domain([0, d3.max(dataset, function(d){return d.value;})]);
}

var w = 600;
var h = 300;

var xScale = d3.scale.ordinal()
    .rangeRoundBands([padding, w - padding], 0.05);

var yScale = d3.scale.linear()
    .range([h, 0]);

var greenScale = d3.scale.linear()
    .range([59, 251]);

var blueScale = d3.scale.linear()
    .range([72, 242]);

refreshScales();

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');

var svg = d3.select("svg")
    .attr("width", w)
    .attr("height", h);

var barGroup = svg.append('g')
    .attr('class', 'barGroup');
makeBars();

var textGgroup = svg.append('g')
    .attr('class', 'txtGroup');
makeLabels();

function refreshEverything() {
    dataset = refresh_data(dataset)
    refreshScales();
    makeBars();
    makeLabels();

    d3.select('.y.axis')
        .transition()
        .duration(1000)
        .call(yAxis);
}

d3.select('p.adder').on('click', function () {
    addNumberToDataset(dataset);
    refreshEverything();
})

d3.select('p.remover').on('click', function () {
    removeNumberFromDataset(dataset);
    refreshEverything();
})

svg.append('g')
    .attr('class', 'y axis')
    .attr("transform", "translate(" + 30 + ", 0)")
    .call(yAxis)
