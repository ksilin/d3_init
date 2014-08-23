var dataset = [];
var numDatapoints = 50;

var w = 500;
var h = 300;

var padding = 25;

var refreshData = function (dataset) {
    dataset = []
    var xR = Math.random() * 1000;
    var yR = Math.random() * 1000;

    for (var i = 0; i < numDatapoints; i++) {
        var valX = Math.floor(Math.random() * xR);
        var valY = Math.floor(Math.random() * yR);
        dataset.push([valX, valY])
    }
    return dataset;
}

dataset = refreshData(dataset);

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
    .range([padding, w - padding * 2]);

var rScale = d3.scale.linear()
    .domain([low, high])
    .range([8, 2])


var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function (d) {
        return d[1]
    })])
    .range([h - padding, padding]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom');

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');

var refreshScales = function () {

    var low = d3.max(dataset.map(function (array) {
        return array[1];
    }));

    var high = d3.min(dataset.map(function (array) {
        return array[1];
    }));

    greenScale.domain([low, high]);
    blueScale.domain([low, high]);

    xScale.domain([0, d3.max(dataset, function (d) {
        return d[0]
    })]);

    yScale.domain([0, d3.max(dataset, function (d) {
        return d[1]
    })]);

    rScale.domain([low, high]);

    xAxis.scale(xScale);
    yAxis.scale(yScale);
}

// ---

var svg = d3.select("svg")
    .attr("width", w)
    .attr("height", h);

var dots = svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle");

// expand on mouseover
dots.on('mouseover', function () {

    d3.select(this)
        .transition()
        .attr("r", function (d) {
            return rScale(d[1]);
        })
        .attr("fill", function (d) {
            return "rgb(10, " + greenScale(d[1]) + ", " + blueScale(d[1]) + ")";
        });
});

// collapse on mouseout
dots.on('mouseout', function () {

    d3.select(this)
        .transition()
        .attr("r", function (d) {
            return 2;
        })
        .attr("fill", 'black');
});

dots.attr("cx", function (d) {
    return xScale(d[0])
})
    .attr("cy", function (d) {
        return yScale(d[1]);
    })
    .attr("r", function (d) {
        // mapping the values to the area of the circle, not it's radius
        return rScale(d[1]);
    })
    .attr("fill", function (d) {
        return "rgb(10, " + greenScale(d[1]) + ", " + blueScale(d[1]) + ")";
    });

var refreshDots = function () {
    d3.selectAll('circle')
        .data(dataset)
        .transition()
        .duration(1000)
        // each("start", …) should be used only for immediate transformations, with no transitions.
        .each('end', function () {
            d3.select(this)
                .transition()
                .duration(3000)
                .attr('fill', 'black')
                .attr('r', 2)
        })
        .each("start", function () {
            d3.select(this)
                .attr('fill', 'darkgoldenrod')
                .attr('r', 3);
        })
        .attr("cx", function (d) {
            return xScale(d[0])
        })
        .attr("cy", function (d) {
            return yScale(d[1]);
        })
        .attr("r", function (d) {
            // mapping the values to the area of the circle, not it's radius
            return rScale(d[1]);
        })
        .attr("fill", function (d) {
            return "rgb(10, " + greenScale(d[1]) + ", " + blueScale(d[1]) + ")";
        });
}

//svg.on('mouseover', function(){
//   refreshDots();
//});


//svg.selectAll('text')
//    .data(dataset)
//    .enter()
//    .append('text')
//    .text(function (d) {
//        return d;
//    })
//    .attr('fill', 'white')
//    .attr("x", function (d) {
//        return xScale(d[0]) + 4
//    })
//    .attr("font-family", "sans-serif")
//    .attr("font-size", "11px")
//    .attr("y", ("cy", function (d) {
//        return yScale(d[1]) + 15;
//    }));

svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .attr("transform", "translate(" + padding + ", 0)")

svg.append('g')
    .attr('class', 'x axis')
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis)

d3.select('p').on('click', function () {
    console.log('clicked');
    dataset = refreshData(dataset);
    refreshScales();
    refreshDots();
    //Update x-axis
    svg.select(".x.axis")
        .transition()
        .duration(1000)
        .call(xAxis);

//Update y-axis
    svg.select(".y.axis")
        .transition()
        .duration(1000)
        .call(yAxis);
})
