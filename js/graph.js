$(function() {

    var width = 1038,
        height = 620,
        textPosition = height / 2 - 5,
        circleRadius = height / 2 - 38;

    var svg = d3.select('#graph')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    var scale = d3.scaleLinear()
        .domain([0.0, 1.0])
        .range([0, circleRadius]);

    var data = [{
        label: 'sad',
        value: 0.3
    }, {
        label: 'happy',
        value: 1.0
    }, {
        label: 'angry',
        value: 0.6
    }, {
        label: 'crazy',
        value: 0.1
    }, {
        label: 'crazy',
        value: 1.0
    }, {
        label: 'crazy',
        value: .4
    }, {
        label: 'crazy',
        value: 0.3
    }];

    var graphContainer = svg.append('g');
    var centerGragraphContainer = graphContainer.append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // draw circle background
    var circleContainer = svg.append('g');

    for (var i = 0; i < 8; i++) {
        circleContainer.append('circle')
            .attr('cx', width / 2)
            .attr('cy', height / 2)
            .attr('r', i * 38 + 1);
    }

    // iterate over the data to display the labels
    var textEntity = graphContainer.selectAll('.textEntity')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'textEntity');

    textEntity.append('text')
        .attr('x', function(d, index) {
            return width / 2 + Math.cos(index / data.length * Math.PI * 2) * textPosition;
        })
        .attr('y', function(d, index) {
            return height / 2 + Math.sin(index / data.length * Math.PI * 2) * textPosition;
        })
        .text(function(d) {
            return d.label;
        });

    // draw line chart
    var polygon = centerGragraphContainer.selectAll('polygon')
        .data([data])
        .enter()
        .append('polygon')
        .attr('class', 'lines')
        .attr('points', function(d) {
            return d.map(function(d, index) {
                return [
                    Math.cos(index / data.length * Math.PI * 2) * scale(d.value),
                    Math.sin(index / data.length * Math.PI * 2) * scale(d.value)
                ].join(',')
            }).join(' ');
        })
        .attr('transform', 'scale(0.0)')
        .transition()
        .delay(1000)
        .attr('transform', 'scale(1.0)');

    var dots = centerGragraphContainer.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', function(d, index) {
            return Math.cos(index / data.length * Math.PI * 2) * scale(d.value);
        }).attr('cy', function(d, index) {
            return Math.sin(index / data.length * Math.PI * 2) * scale(d.value);
        })
        .attr('r', 7)
        .attr('transform', 'scale(0.0)')
        .transition()
        .delay(1000)
        .attr('transform', 'scale(1.0)');


});
