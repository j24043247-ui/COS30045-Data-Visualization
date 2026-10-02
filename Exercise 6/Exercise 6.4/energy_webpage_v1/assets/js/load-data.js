// ================================================================
// EXERCISE 6.1, 6.2 & 6.4 - LOAD DATA
// Loads the TV dataset and prepares energyConsumption as a number.
// ================================================================

d3.csv("assets/data/Ex6_TVdata_withStar.csv", function (d) {
    return {
        brand: d.brand,
        model: d.model,
        screenSize: +d.screenSize,
        screenTech: d.screenTech,
        star: +d.star,
        energyConsumption: +d.energyConsumption
    };
})
.then(function (data) {
    // Keep only records with a valid numeric energy consumption value.
    const validData = data.filter(function (d) {
        return Number.isFinite(d.energyConsumption);
    });

    console.log("Exercise 6.1 data:", validData);
    console.log("Exercise 6.1 number of valid rows:", validData.length);
    console.log(
        "Exercise 6.1 energy extent:",
        d3.extent(validData, function (d) {
            return d.energyConsumption;
        })
    );

    // EXERCISE 6.1: Draw the initial histogram.
    drawHistogram(validData);

    // EXERCISE 6.2: Build the filter controls using the same dataset.
    populateFilters(validData);

    // EXERCISE 6.3: Draw the scatterplot using the same TV dataset.
    drawScatterplot(validData);

    // EXERCISE 6.4: Create and activate the scatterplot tooltip.
    createTooltip();
    handleMouseEvents();
})
.catch(function (error) {
    console.error("Exercise 6.1 data loading error:", error);

    const status = document.getElementById("histogram-status");
    if (status) {
        status.textContent = "Unable to load the Exercise 6.1 TV dataset.";
    }
});
