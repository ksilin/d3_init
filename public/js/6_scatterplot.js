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
    [ 220, 88 ]
];

var low = d3.max(dataset.map(function (array) {
    return array[1];
}));

var high = d3.min(dataset.map(function (array) {
    return array[1];
}));

var greenScale = d3.scale.linear()
    .domain([low, high])
    .range([59, 255]);

var blueScale = d3.scale.linear()
    .domain([low, high])
    .range([72, 255]);


var range = high - low;

norm = function (x) {
    return (x - low) / range
}

var w = 500;
var h = 200;

//separating bars
var barPadding = 1;

var svg = d3.select("svg")
    .attr("width", w)
    .attr("height", h);

var bars = svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle");

bars.attr("cx", function (d) {
    return d[0];
})
    .attr("cy", function (d) {
        return h - d[1];
    })
    .attr("r", function (d) {
        // mappign the values to the area of the circle, not it's radius
        return Math.sqrt(d[1] * 2);
    })
    .attr("fill", function (d) {
        return "rgb(10, " + Math.floor(greenScale(d[1])) + ", " + Math.floor(blueScale(d[1])) + ")";
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
        return d[0] + 4;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("y", function (d) {
        return h - d[1] + 15;
    });
