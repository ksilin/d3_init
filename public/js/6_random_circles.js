var dataset = [];

for (var i = 0; i < 25; i++) {            //Loop 25 times
    var newNumber = Math.floor(Math.random() * 30);   //New random number (0-30)
    dataset.push(newNumber);              //Add new number to array
}

var w = 500;
var h = 50;

var svg = d3.select("svg")
    .attr("width", w)
    .attr("height", h);

var circles = svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle");

circles.attr("cx", function (d, i) {
    return (i * 50) + 25;
})
    .attr("cy", h / 2)
    .attr("r", function (d) {
        return d;
    })
    .attr("fill", "yellow")
    .attr("stroke", "orange")
    .attr("stroke-width", function (d) {
        return 10;
    });