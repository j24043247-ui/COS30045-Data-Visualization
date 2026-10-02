// ================================================================
// EXERCISE 5.1 - Vertical Bar Chart with Axis
// COS30045 D3.js Exercise
// ================================================================

document.addEventListener("DOMContentLoaded", function () {
    const chartContainer = d3.select("#bar-chart");
    const status = d3.select("#bar-chart-status");

    const drawBarChart = data => {
        // Exercise 5.1: margin values leave space for the axes and labels.
        const margin = {
            top: 70,
            right: 35,
            bottom: 90,
            left: 80
        };

        const width = 850;
        const height = 520;

        const svg = chartContainer
            .append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("role", "img")
            .attr("aria-labelledby", "exercise-5-1-title exercise-5-1-description");

        svg.append("title")
            .attr("id", "exercise-5-1-title")
            .text("Exercise 5.1: TV energy consumption by screen type");

        svg.append("desc")
            .attr("id", "exercise-5-1-description")
            .text("A vertical bar chart comparing average annual energy consumption for 55-inch TV screen technologies.");

        svg.append("text")
            .attr("class", "exercise-5-1-title")
            .attr("x", width / 2)
            .attr("y", 32)
            .attr("text-anchor", "middle")
            .text("55-Inch TV Energy Consumption");

        svg.append("text")
            .attr("class", "exercise-5-1-subtitle")
            .attr("x", width / 2)
            .attr("y", 54)
            .attr("text-anchor", "middle")
            .text("Average annual energy consumption by screen technology");

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Exercise 5.1: create the inner chart and move it inside the margins.
        const innerChart = svg.append("g")
            .attr(
                "transform",
                `translate(${margin.left}, ${margin.top})`
            );

        // Exercise 5.1: screen technology is categorical, so use scaleBand.
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.screenType))
            .range([0, innerWidth])
            .padding(0.25);

        // Exercise 5.1: energy consumption is quantitative, so use scaleLinear.
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.energy)])
            .nice()
            .range([innerHeight, 0]);

        // Exercise 5.1: bottom x-axis.
        const xAxis = d3.axisBottom(xScale);

        // Exercise 5.1: left y-axis.
        const yAxis = d3.axisLeft(yScale)
            .ticks(6)
            .tickFormat(d => `${d}`);

        // Exercise 5.1: add horizontal grid lines to improve readability.
        innerChart.append("g")
            .attr("class", "exercise-5-1-grid")
            .call(
                d3.axisLeft(yScale)
                    .ticks(6)
                    .tickSize(-innerWidth)
                    .tickFormat("")
            );

        // Exercise 5.1: add the x-axis at the bottom of the chart.
        innerChart.append("g")
            .attr("class", "exercise-5-1-axis")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(xAxis);

        // Exercise 5.1: add the y-axis.
        innerChart.append("g")
            .attr("class", "exercise-5-1-axis")
            .call(yAxis);

        // Exercise 5.1: y-axis label.
        innerChart.append("text")
            .attr("fill", "currentColor")
            .attr("transform", "rotate(-90)")
            .attr("x", -innerHeight / 2)
            .attr("y", -55)
            .attr("text-anchor", "middle")
            .style("font-size", "13px")
            .style("font-weight", "700")
            .text("Average Energy Consumption (kWh/year)");

        // Exercise 5.1: x-axis label.
        innerChart.append("text")
            .attr("x", innerWidth / 2)
            .attr("y", innerHeight + 62)
            .attr("text-anchor", "middle")
            .style("font-size", "13px")
            .style("font-weight", "700")
            .text("Screen Technology");

        // Exercise 5.1: draw one vertical bar for each screen technology.
        innerChart.selectAll(".exercise-5-1-bar")
            .data(data)
            .join("rect")
            .attr("class", "exercise-5-1-bar")
            .attr("x", d => xScale(d.screenType))
            .attr("y", d => yScale(d.energy))
            .attr("width", xScale.bandwidth())
            .attr("height", d => innerHeight - yScale(d.energy))
            .attr("rx", 5);

        // Exercise 5.1: add the energy value above each bar.
        innerChart.selectAll(".exercise-5-1-value")
            .data(data)
            .join("text")
            .attr("class", "exercise-5-1-value")
            .attr("x", d => xScale(d.screenType) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.energy) - 10)
            .attr("text-anchor", "middle")
            .text(d => d.energy.toFixed(2));
    };

    // Exercise 5.1: load and convert the CSV data.
    d3.csv("assets/data/Data_exercise_5.1.csv", function (d) {
        return {
            screenType: d.screenType || d.screen_type || d["Screen Type"] || d["Screen type"] || d[Object.keys(d)[0]],
            energy: +(d.energy || d.averageEnergy || d["Average Energy"] || d[Object.keys(d)[1]])
        };
    })
    .then(function (data) {
        // Exercise 5.1: remove invalid rows and sort by energy consumption.
        data = data
            .filter(d => d.screenType && Number.isFinite(d.energy))
            .sort((a, b) => d3.descending(a.energy, b.energy));

        console.log("Exercise 5.1 data:", data);

        if (!data.length) {
            status.text("No valid chart data was found in the CSV file.");
            return;
        }

        drawBarChart(data);
        status.text(`Loaded ${data.length} screen technology categories.`);
    })
    .catch(function (error) {
        console.error("Exercise 5.1 CSV loading error:", error);
        status.text("Unable to load Data_exercise_5.1.csv.");
    });
});
