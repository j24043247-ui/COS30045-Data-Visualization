// ================================================================
// EXERCISE 6.1 - HISTOGRAM
// Builds a D3 histogram of TV energy consumption.
// ================================================================

function drawHistogram(data) {
    const container = d3.select("#histogram");

    // Clear the chart if drawHistogram is called again later.
    container.selectAll("*").remove();

    if (!data || data.length === 0) {
        d3.select("#histogram-status").text(
            "No valid energy consumption data was found in the CSV file."
        );
        return;
    }

    // ------------------------------------------------------------
    // EXERCISE 6.1 - Set up SVG and inner chart
    // ------------------------------------------------------------
    const svg = container
        .append("svg")
        .attr("viewBox", `0 0 ${chartWidth} ${chartHeight}`)
        .attr("role", "img")
        .attr("aria-labelledby", "histogram-title histogram-description");

    svg.append("title")
        .attr("id", "histogram-title")
        .text("TV energy consumption histogram");

    svg.append("desc")
        .attr("id", "histogram-description")
        .text(
            "A histogram showing the frequency distribution of television energy consumption in kilowatt-hours per year."
        );

    svg.append("text")
        .attr("class", "histogram-title")
        .attr("x", chartWidth / 2)
        .attr("y", 32)
        .attr("text-anchor", "middle")
        .text("Distribution of TV Energy Consumption");

    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // ------------------------------------------------------------
    // EXERCISE 6.1 - Create histogram bins
    // ------------------------------------------------------------
    const bins = binGenerator(data);

    console.log("Exercise 6.1 bins:", bins);
    console.log("Exercise 6.1 number of bins:", bins.length);

    // ------------------------------------------------------------
    // EXERCISE 6.1 - Define scales from the generated bins
    // ------------------------------------------------------------
    const xMin = bins.length ? bins[0].x0 : 0;
    const xMax = bins.length ? bins[bins.length - 1].x1 : 1;
    const binsMaxLength = d3.max(bins, function (d) {
        return d.length;
    }) || 1;

    xScale
        .domain([xMin, xMax])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .nice()
        .range([innerHeight, 0]);

    // ------------------------------------------------------------
    // EXERCISE 6.1 - Add horizontal grid lines
    // ------------------------------------------------------------
    innerChart
        .append("g")
        .attr("class", "histogram-grid")
        .call(
            d3
                .axisLeft(yScale)
                .ticks(6)
                .tickSize(-innerWidth)
                .tickFormat("")
        );

    // ------------------------------------------------------------
    // EXERCISE 6.1 - Draw histogram bars
    // ------------------------------------------------------------
    innerChart
        .selectAll(".histogram-bar")
        .data(bins)
        .join("rect")
        .attr("class", "histogram-bar")
        .attr("x", function (d) {
            return xScale(d.x0) + 1;
        })
        .attr("y", function (d) {
            return yScale(d.length);
        })
        .attr("width", function (d) {
            return Math.max(0, xScale(d.x1) - xScale(d.x0) - 2);
        })
        .attr("height", function (d) {
            return innerHeight - yScale(d.length);
        })
        .attr("fill", barColor)
        .append("title")
        .text(function (d) {
            return `${d.length} TV${d.length === 1 ? "" : "s"}\n${d.x0}–${d.x1} kWh/year`;
        });

    // ------------------------------------------------------------
    // EXERCISE 6.1 - Add x-axis
    // ------------------------------------------------------------
    innerChart
        .append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale).ticks(10));

    // ------------------------------------------------------------
    // EXERCISE 6.1 - Add y-axis
    // ------------------------------------------------------------
    innerChart
        .append("g")
        .attr("class", "axis y-axis")
        .call(d3.axisLeft(yScale).ticks(6));

    // ------------------------------------------------------------
    // EXERCISE 6.1 - Add axis labels
    // ------------------------------------------------------------
    innerChart
        .append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 58)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");

    innerChart
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -58)
        .attr("text-anchor", "middle")
        .text("Frequency (Number of TVs)");

    d3.select("#histogram-status").text(
        `Showing ${data.length.toLocaleString()} TVs across ${bins.length} energy-consumption bins.`
    );
}
