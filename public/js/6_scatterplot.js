var dataset = [
    [ 5, 20 ],
    [ 480, 90 ],
    [ 250, 50 ],
    [ 100, 33 ],
    [ 330, 95 ],
    [ 410, 12 ],
    [ 475, 44 ],
    [ 25, 67 ],
    [ 85, 21 ],
    [ 220, 88 ],
    [ 600, 150 ]
];

var w = 500;
var h = 300;

var padding = 25;

var low = d3.max(dataset.map(function (array) {
    return array[1];
}));

var high = d3.min(dataset.map(function (array) {
    return array[1];
}));

var greenScale = d3.scale.linear()
    .domain([low, high])
    .rangeRound([59, 255]);

var blueScale = d3.scale.linear()
    .domain([low, high])
    .rangeRound([72, 255]);

var xScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function (d) {
        return d[0]
    })])
    .range([padding, w - padding*2]);

var rScale = d3.scale.linear()
    .domain([low, high])
    .range([12, 2])


var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function (d) {
        return d[1]
    })])
    .range([h - padding, padding]);


var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom');

// ---

var svg = d3.select("svg")
    .attr("width", w)
    .attr("height", h);

var dots = svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle");

dots.attr("cx", function (d) {
    return xScale(d[0])
})
    .attr("cy", function (d) {
        return yScale(d[1]);
    })
    .attr("r", function (d) {
        // mapping the values to the area of the circle, not it's radius
        return rScale(d[1]);
        //Math.sqrt(d[1] * 2);
    })
    .attr("fill", function (d) {
        return "rgb(10, " + greenScale(d[1]) + ", " + blueScale(d[1]) + ")";
    });

svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(function (d) {
        return d;
    })
    .attr('fill', 'white')
    .attr("x", function (d) {
        return xScale(d[0]) + 4
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("y", ("cy", function (d) {
        return yScale(d[1]) + 15;
    }));

svg.append('g')
    .attr('class', 'axis')
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis)
