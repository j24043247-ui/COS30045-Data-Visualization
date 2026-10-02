// ================================================================
// EXERCISE 6.3 - SCATTERPLOT
// Plots TV energy consumption against star rating and uses colour
// to identify screen technology.
// ================================================================

function drawScatterplot(data) {
    const container = d3.select("#scatterplot");

    if (container.empty()) {
        console.warn("Exercise 6.3: #scatterplot was not found.");
        return;
    }

    const validData = data.filter(function (d) {
        return Number.isFinite(d.star) &&
            Number.isFinite(d.energyConsumption) &&
            d.screenTech;
    });

    if (validData.length === 0) {
        container.selectAll("*").remove();
        return;
    }

    // ------------------------------------------------------------
    // EXERCISE 6.3 - SVG and inner chart
    // ------------------------------------------------------------
    const svg = container
        .append("svg")
        .attr("viewBox", `0 0 ${chartWidthS} ${chartHeightS}`)
        .attr("role", "img")
        .attr("aria-labelledby", "scatterplot-title scatterplot-description");

    svg.append("title")
        .attr("id", "scatterplot-title")
        .text("TV energy consumption by star rating");

    svg.append("desc")
        .attr("id", "scatterplot-description")
        .text("A scatterplot showing television energy consumption against star rating, with colours representing screen technology.");

    svg.append("text")
        .attr("class", "scatterplot-title")
        .attr("x", chartWidthS / 2)
        .attr("y", 32)
        .attr("text-anchor", "middle")
        .text("TV Energy Consumption by Star Rating");

    // Use the shared scatterplot inner chart variable.
    innerChartS = svg
        .append("g")
        .attr("class", "scatter-inner-chart")
        .attr("transform", `translate(${marginS.left}, ${marginS.top})`);

    // ------------------------------------------------------------
    // EXERCISE 6.3 - Scales
    // ------------------------------------------------------------
    const maxStar = d3.max(validData, d => d.star) || 1;
    const maxEnergy = d3.max(validData, d => d.energyConsumption) || 1;

    xScaleS
        .domain([0, maxStar])
        .nice()
        .range([0, innerWidthS]);

    yScaleS
        .domain([0, maxEnergy])
        .nice()
        .range([innerHeightS, 0]);

    // ------------------------------------------------------------
    // EXERCISE 6.3 - Grid and axes
    // ------------------------------------------------------------
    innerChartS.append("g")
        .attr("class", "scatter-grid")
        .call(d3.axisLeft(yScaleS).ticks(8).tickSize(-innerWidthS).tickFormat(""));

    innerChartS.append("g")
        .attr("class", "axis scatter-x-axis")
        .attr("transform", `translate(0, ${innerHeightS})`)
        .call(d3.axisBottom(xScaleS).ticks(Math.min(10, maxStar)));

    innerChartS.append("g")
        .attr("class", "axis scatter-y-axis")
        .call(d3.axisLeft(yScaleS).ticks(8));

    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidthS / 2)
        .attr("y", innerHeightS + 58)
        .attr("text-anchor", "middle")
        .text("Star Rating");

    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeightS / 2)
        .attr("y", -62)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");

    // ------------------------------------------------------------
    // EXERCISE 6.3 - Scatterplot circles
    // ------------------------------------------------------------
    innerChartS.selectAll(".scatter-point")
        .data(validData)
        .join("circle")
        .attr("class", "scatter-point")
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("r", 3.5)
        .attr("fill", d => colorScale(String(d.screenTech).trim().toUpperCase()))
        .attr("opacity", 0.5);

    // ------------------------------------------------------------
    // EXERCISE 6.3 - Legend
    // ------------------------------------------------------------
    const legend = svg.append("g")
        .attr("class", "scatter-legend")
        .attr("transform", `translate(${chartWidthS - marginS.right + 25}, ${marginS.top})`);

    legend.append("text")
        .attr("class", "legend-title")
        .attr("x", 0)
        .attr("y", -12)
        .text("Screen Type");

    screenTechCategories.forEach(function (screenType, index) {
        const item = legend.append("g")
            .attr("transform", `translate(0, ${index * 28})`);

        item.append("circle")
            .attr("cx", 7)
            .attr("cy", 0)
            .attr("r", 6)
            .attr("fill", colorScale(screenType));

        item.append("text")
            .attr("x", 20)
            .attr("y", 5)
            .text(screenType);
    });

    console.log("Exercise 6.3 scatterplot data:", validData);
    console.log("Exercise 6.3 scatterplot points:", validData.length);
}
