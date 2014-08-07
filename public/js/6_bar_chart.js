var dataset = [];

for (var i = 0; i < 25; i++) {            //Loop 25 times
    var newNumber = 5 + Math.floor(Math.random() * 30);   //New random number (0-30)
    dataset.push(newNumber);              //Add new number to array
}

var w = 500;
var h = 200;

var barPadding = 1;

var svg = d3.select("svg")
    .attr("width", w)
    .attr("height", h);

var bars = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect");

bars.attr("x", function (d, i) {
    return i * (w / dataset.length);
})
    .attr("y", function (d) {
        return h - (d * 4);
    })
    .attr("height", function (d) {
        return d * 4;
    })
    .attr("width", w / dataset.length - barPadding)
    .attr("fill", function (d) {
        return "rgb(20, 20, " + (d * 8) + 50 + ")";
    });

svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(function (d) {
        return d;
    })
    .attr('fill', 'white')
    .attr("x", function(d, i) {
        return i * (w / dataset.length) + 4;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("y", function(d) {
        return h - (d * 4) + 15;
    });
