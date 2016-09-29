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

    var data = [];
    data.push({
        label: "ease",
        value: Math.random()
    });
    data.push({
        label: "smile",
        value: Math.random()
    });
    data.push({
        label: "calm",
        value: Math.random()
    });
    data.push({
        label: "anger",
        value: Math.random()
    });
    data.push({
        label: "joy",
        value: Math.random()
    });
    data.push({
        label: "sorrow",
        value: Math.random()
    });
    data.push({
        label: "laughter",
        value: Math.random()
    });
    data.push({
        label: "excitement",
        value: Math.random()
    });
    data.push({
        label: "surprise",
        value: Math.random()
    });

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

    // iterate over the data to display the labels and lines
    var textEntity = graphContainer.selectAll('.textEntity')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'textEntity');

    textEntity.append('line')
        .attr('x1', width / 2)
        .attr('y1', height / 2)
        .attr('x2', function(d, index) {
            return width / 2 + Math.cos(index / data.length * Math.PI * 2) * circleRadius;
        })
        .attr('y2', function(d, index) {
            return height / 2 + Math.sin(index / data.length * Math.PI * 2) * circleRadius;
        });

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
        .attr('transform', 'scale(1.0)');


    // get ALMood Properties
    QiSession(function(session) {
        console.log("connected!");
        session.service("ALMood").then(function(mood) {
            console.log("got mood");
            window.setInterval(function() {
                mood.subscribe("TEST_EMOTION", "Active").then(function() {
                    mood.currentPersonState().then(function(m) {
                        console.log(JSON.stringify(m));
                        var data = [];
                        data.push({
                            label: "ease",
                            value: m.bodyLanguageState.ease.level * m.bodyLanguageState.ease.confidence
                        });
                        data.push({
                            label: "smile",
                            value: m.smile.value * m.smile.confidence
                        });
                        data.push({
                            label: "calm",
                            value: m.expressions.calm.value * m.expressions.calm.confidence
                        });
                        data.push({
                            label: "anger",
                            value: m.expressions.anger.value * m.expressions.anger.confidence
                        });
                        data.push({
                            label: "joy",
                            value: m.expressions.joy.value * m.expressions.joy.confidence
                        });
                        data.push({
                            label: "sorrow",
                            value: m.expressions.sorrow.value * m.expressions.sorrow.confidence
                        });
                        data.push({
                            label: "laughter",
                            value: m.expressions.laughter.value * m.expressions.laughter.confidence
                        });
                        data.push({
                            label: "excitement",
                            value: m.expressions.excitement.value * m.expressions.excitement.confidence
                        });
                        data.push({
                            label: "surprise",
                            value: m.expressions.surprise.value * m.expressions.surprise.confidence
                        });
                        centerGragraphContainer.selectAll('polygon')
                            .data([data])
                            .transition()
                            .duration(1000)
                            .attr('points', function(d) {
                                return d.map(function(d, index) {
                                    return [
                                        Math.cos(index / data.length * Math.PI * 2) * scale(d.value),
                                        Math.sin(index / data.length * Math.PI * 2) * scale(d.value)
                                    ].join(',')
                                }).join(' ');
                            });
                        centerGragraphContainer.selectAll('.dot')
                            .data(data)
                            .transition()
                            .duration(1000)
                            .attr('cx', function(d, index) {
                                return Math.cos(index / data.length * Math.PI * 2) * scale(d.value);
                            }).attr('cy', function(d, index) {
                                return Math.sin(index / data.length * Math.PI * 2) * scale(d.value);
                            })
                    });
                });
            }, 2000);
        }, function(error) {
            console.log("An error occurred:", error);
        });
    }, function() {
        console.log("disconnected");
    });

});
