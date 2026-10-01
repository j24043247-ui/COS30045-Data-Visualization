// Exercise 4.5 - Bind data to SVG rectangles and draw bars.

const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 500 1600");

const drawBarChart = data => {
    const barHeight = 30;
    const barSpacing = 12;

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", (d, i) => i * (barHeight + barSpacing))
        .attr("width", d => d.count)
        .attr("height", barHeight)
        .attr("fill", "steelblue");
};

d3.csv("../data/tvBrandCount.csv", d => ({
    brand: d.brand,
    count: +d.count
})).then(data => {
    data.sort((a, b) => d3.descending(a.count, b.count));
    drawBarChart(data);
});
