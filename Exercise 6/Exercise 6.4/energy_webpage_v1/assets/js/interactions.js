// ================================================================
// EXERCISE 6.2 - FILTER INTERACTIONS
// Builds LCD, LED, OLED and All buttons and updates the histogram.
// ================================================================

function populateFilters(data) {
    const container = d3.select("#filters_screen");

    if (container.empty()) {
        console.warn("Exercise 6.2: #filters_screen was not found.");
        return;
    }

    container.selectAll("*").remove();

    const controls = container
        .append("div")
        .attr("id", "filters")
        .attr("role", "group")
        .attr("aria-label", "Filter TV screen technology");

    controls
        .selectAll("button")
        .data(screenFilters)
        .join("button")
        .attr("type", "button")
        .attr("class", "filter")
        .classed("active", d => d.isActive)
        .attr("aria-pressed", d => d.isActive ? "true" : "false")
        .text(d => d.label)
        .on("click", function (event, filter) {
            // ----------------------------------------------------
            // EXERCISE 6.2 - Update filter state
            // ----------------------------------------------------
            if (filter.id === "all") {
                // All resets the other filters and shows the full dataset.
                screenFilters.forEach(d => {
                    d.isActive = d.id === "all";
                });
            } else {
                // Toggle the selected screen technology on/off.
                filter.isActive = !filter.isActive;

                // If at least one technology is selected, All is inactive.
                // If none are selected, return to All automatically.
                const activeTech = screenFilters.filter(d => d.id !== "all" && d.isActive);
                screenFilters.find(d => d.id === "all").isActive = activeTech.length === 0;
            }

            // Update button appearance and accessibility state.
            controls
                .selectAll("button")
                .classed("active", d => d.isActive)
                .attr("aria-pressed", d => d.isActive ? "true" : "false");

            // ----------------------------------------------------
            // EXERCISE 6.2 - Filter the data and update histogram
            // ----------------------------------------------------
            updateHistogramFromFilters(data);

            console.log(
                "Exercise 6.2 filter state:",
                screenFilters.map(d => ({ id: d.id, isActive: d.isActive }))
            );
        });
}

function updateHistogramFromFilters(data) {
    const allFilter = screenFilters.find(d => d.id === "all");
    const activeTech = screenFilters
        .filter(d => d.id !== "all" && d.isActive)
        .map(d => d.id.toLowerCase());

    let updatedData;

    if (allFilter.isActive || activeTech.length === 0) {
        updatedData = data;
    } else {
        updatedData = data.filter(d =>
            activeTech.includes(String(d.screenTech).trim().toLowerCase())
        );
    }

    console.log("Exercise 6.2 filtered data:", updatedData);
    drawHistogram(updatedData, true);
}


// ================================================================
// EXERCISE 6.4 - TOOLTIPS
// Creates a tooltip inside the scatterplot and handles mouse events.
// ================================================================

function createTooltip() {
    if (!innerChartS) {
        console.warn("Exercise 6.4: Scatterplot inner chart is not ready.");
        return;
    }

    // Avoid creating the tooltip more than once.
    innerChartS.selectAll(".scatter-tooltip").remove();

    const tooltip = innerChartS
        .append("g")
        .attr("class", "scatter-tooltip")
        .style("opacity", 0)
        .style("pointer-events", "none");

    tooltip
        .append("rect")
        .attr("class", "tooltip-background")
        .attr("width", tooltipWidthS)
        .attr("height", tooltipHeightS)
        .attr("rx", 8)
        .attr("ry", 8)
        .attr("fill", barColor)
        .attr("opacity", 0.94);

    tooltip
        .append("text")
        .attr("class", "tooltip-text")
        .attr("x", 12)
        .attr("y", 22)
        .text("");
}

function handleMouseEvents() {
    if (!innerChartS) {
        console.warn("Exercise 6.4: Scatterplot inner chart is not ready.");
        return;
    }

    const tooltip = innerChartS.select(".scatter-tooltip");

    innerChartS
        .selectAll(".scatter-point")
        .on("mouseenter", function (event, d) {
            const point = d3.select(this);
            const cx = +point.attr("cx");
            const cy = +point.attr("cy");

            // Keep the tooltip inside the chart where possible.
            const tooltipX = Math.min(
                Math.max(8, cx + 12),
                innerWidthS - tooltipWidthS - 8
            );

            const tooltipY = Math.max(8, cy - tooltipHeightS - 12);

            tooltip
                .select(".tooltip-text")
                .text(`${d.screenSize} inch TV`);

            tooltip
                .attr("transform", `translate(${tooltipX}, ${tooltipY})`)
                .raise()
                .transition()
                .duration(180)
                .style("opacity", 1);

            point
                .raise()
                .transition()
                .duration(120)
                .attr("r", 5)
                .attr("opacity", 0.9);
        })
        .on("mouseleave", function () {
            tooltip
                .transition()
                .duration(150)
                .style("opacity", 0);

            d3.select(this)
                .transition()
                .duration(120)
                .attr("r", 3.5)
                .attr("opacity", 0.5);
        });
}
