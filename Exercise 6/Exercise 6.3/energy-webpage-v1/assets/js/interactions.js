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
