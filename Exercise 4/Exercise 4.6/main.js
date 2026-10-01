// COS30045 Exercises 4.3–4.6
// Separate D3 file: do not place D3 code in script.js.

document.addEventListener("DOMContentLoaded", function () {
    const container = d3.select(".responsive-svg-container");
    const status = d3.select("#chart-status");

    const svg = container
        .append("svg")
        .attr("viewBox", "0 0 500 650")
        .attr("role", "img")
        .attr("aria-labelledby", "d3-chart-title d3-chart-description");

    svg.append("title")
        .attr("id", "d3-chart-title")
        .text("Televisions by brand");

    svg.append("desc")
        .attr("id", "d3-chart-description")
        .text("A D3 bar chart showing television counts by brand.");

    const xScale = d3.scaleLinear()
        .domain([0, 1200])
        .range([0, 330]);

    const yScale = d3.scaleBand()
        .range([40, 610])
        .padding(0.18);

    svg.append("line")
        .attr("class", "d3-axis-line")
        .attr("x1", 150)
        .attr("x2", 150)
        .attr("y1", 30)
        .attr("y2", 620);

    d3.csv("../data/tvBrandCount.csv", function (d) {
        return {
            brand: d.brand,
            count: +d.count
        };
    })
    .then(function (data) {
        console.log(data);
        console.log("Number of rows:", data.length);
        console.log("Maximum count:", d3.max(data, d => d.count));
        console.log("Minimum count:", d3.min(data, d => d.count));
        console.log("Extent:", d3.extent(data, d => d.count));

        data.sort((a, b) => d3.descending(a.count, b.count));

        const maxCount = d3.max(data, d => d.count) || 0;
        xScale.domain([0, Math.max(1, maxCount)]);
        yScale.domain(data.map(d => d.brand));

        drawBarChart(data);

        status.text(
            data.length
                ? "Loaded " + data.length + " brand categories from tvBrandCount.csv."
                : "The CSV loaded successfully but contains no data rows."
        );
    })
    .catch(function (error) {
        console.error("Unable to load tvBrandCount.csv:", error);
        status.text("Add data/tvBrandCount.csv to display the chart. Expected columns: brand,count.");
    });

    function drawBarChart(data) {
        svg.selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .attr("x", 150)
            .attr("y", d => yScale(d.brand))
            .attr("width", d => xScale(d.count))
            .attr("height", yScale.bandwidth());

        svg.selectAll(".brand-label")
            .data(data)
            .join("text")
            .attr("class", "brand-label")
            .attr("x", 140)
            .attr("y", d => yScale(d.brand) + yScale.bandwidth() / 2)
            .attr("text-anchor", "end")
            .attr("dominant-baseline", "middle")
            .text(d => d.brand);

        svg.selectAll(".value-label")
            .data(data)
            .join("text")
            .attr("class", "value-label")
            .attr("x", d => 158 + xScale(d.count))
            .attr("y", d => yScale(d.brand) + yScale.bandwidth() / 2)
            .attr("dominant-baseline", "middle")
            .text(d => d.count);
    }
});