// ================================================================
// EXERCISE 6.1 & 6.2 - HISTOGRAM
// Exercise 6.1 builds the histogram. Exercise 6.2 updates it when
// the LCD, LED, OLED or All filter button is selected.
// ================================================================

function drawHistogram(data, animateUpdate = false) {
    const container = d3.select("#histogram");

    if (!data || data.length === 0) {
        container.selectAll("*").remove();
        d3.select("#histogram-status").text(
            "No TV records match the selected screen technology filter."
        );
        return;
    }

    // ------------------------------------------------------------
    // EXERCISE 6.1 - Create the SVG and inner chart once.
    // ------------------------------------------------------------
    let svg = container.select("svg");

    if (svg.empty()) {
        svg = container
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

        svg.append("g")
            .attr("class", "inner-chart")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
    }

    const innerChart = svg.select(".inner-chart");

    // ------------------------------------------------------------
    // EXERCISE 6.1 & 6.2 - Create/update bins using shared generator
    // ------------------------------------------------------------
    const bins = binGenerator(data);

    console.log("Exercise 6.2 bins:", bins);

    const xMin = bins.length ? bins[0].x0 : 0;
    const xMax = bins.length ? bins[bins.length - 1].x1 : 1;
    const binsMaxLength = d3.max(bins, d => d.length) || 1;

    xScale
        .domain([xMin, xMax])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .nice()
        .range([innerHeight, 0]);

    // ------------------------------------------------------------
    // EXERCISE 6.2 - Update grid, axes and bars with transitions.
    // ------------------------------------------------------------
    const duration = animateUpdate ? 500 : 0;
    const ease = d3.easeCubicInOut;

    let grid = innerChart.select(".histogram-grid");
    if (grid.empty()) {
        grid = innerChart.append("g").attr("class", "histogram-grid");
    }
    grid
        .transition()
        .duration(duration)
        .ease(ease)
        .call(d3.axisLeft(yScale).ticks(6).tickSize(-innerWidth).tickFormat(""));

    let bars = innerChart
        .selectAll(".histogram-bar")
        .data(bins, d => `${d.x0}-${d.x1}`);

    bars.exit()
        .transition()
        .duration(duration)
        .ease(ease)
        .attr("y", innerHeight)
        .attr("height", 0)
        .remove();

    const barsEnter = bars
        .enter()
        .append("rect")
        .attr("class", "histogram-bar")
        .attr("x", d => xScale(d.x0) + 1)
        .attr("y", innerHeight)
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 2))
        .attr("height", 0)
        .attr("fill", barColor);

    bars = barsEnter.merge(bars);

    bars
        .attr("fill", barColor)
        .attr("x", d => xScale(d.x0) + 1)
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 2))
        .selectAll("title")
        .data(d => [d])
        .join("title")
        .text(d => `${d.length} TV${d.length === 1 ? "" : "s"}\n${d.x0}–${d.x1} kWh/year`);

    bars
        .transition()
        .duration(duration)
        .ease(ease)
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length));

    let xAxis = innerChart.select(".x-axis");
    if (xAxis.empty()) {
        xAxis = innerChart.append("g").attr("class", "axis x-axis");
    }
    xAxis
        .transition()
        .duration(duration)
        .ease(ease)
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale).ticks(10));

    let yAxis = innerChart.select(".y-axis");
    if (yAxis.empty()) {
        yAxis = innerChart.append("g").attr("class", "axis y-axis");
    }
    yAxis
        .transition()
        .duration(duration)
        .ease(ease)
        .call(d3.axisLeft(yScale).ticks(6));

    // Axis labels only need to be created once.
    if (innerChart.select(".x-axis-label").empty()) {
        innerChart
            .append("text")
            .attr("class", "axis-label x-axis-label")
            .attr("x", innerWidth / 2)
            .attr("y", innerHeight + 58)
            .attr("text-anchor", "middle")
            .text("Energy Consumption (kWh/year)");

        innerChart
            .append("text")
            .attr("class", "axis-label y-axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -innerHeight / 2)
            .attr("y", -58)
            .attr("text-anchor", "middle")
            .text("Frequency (Number of TVs)");
    }

    d3.select("#histogram-status").text(
        `Showing ${data.length.toLocaleString()} TVs across ${bins.length} energy-consumption bins.`
    );
}
