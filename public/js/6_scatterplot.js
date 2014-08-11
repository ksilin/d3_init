var dataset = [
    [ 5,     20 ],
    [ 480,   90 ],
    [ 250,   50 ],
    [ 100,   33 ],
    [ 330,   95 ],
    [ 410,   12 ],
    [ 475,   44 ],
    [ 25,    67 ],
    [ 85,    21 ],
    [ 220,   88 ]
];

// TODO: generate randomlys
//for (var i = 0; i < 25; i++) {            //Loop 25 times
//    var newNumber = 5 + Math.floor(Math.random() * 30);   //New random number (0-30)
//    dataset.push(newNumber);              //Add new number to array
//}

var low = d3.min(dataset);
var high = d3.max(dataset);
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
        return d[1];
    })
    .attr("r", function (d) {
        return 5;
    });
//    .attr("fill", function (d) {

//        return "rgb(10, " + (59 + Math.floor(192 * norm(d))) + ", " + (72 + Math.floor(170 * norm(d))) + ")";
//    });

//svg.selectAll('text')
//    .data(dataset)
//    .enter()
//    .append('text')
//    .text(function (d) {
//        return d;
//    })
//    .attr('fill', 'white')
//    .attr("x", function (d, i) {
//        return i * (w / dataset.length) + 4;
//    })
//    .attr("font-family", "sans-serif")
//    .attr("font-size", "11px")
//    .attr("y", function (d) {
//        return h - (d * 4) + 15;
//    });
