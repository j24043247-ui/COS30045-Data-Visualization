// ================================================================
// EXERCISE 5.2 - Line Chart
// COS30045 D3.js Exercise
// ================================================================

document.addEventListener("DOMContentLoaded", function () {
    const chartContainer = d3.select("#line-chart");
    const status = d3.select("#line-chart-status");

    const drawLineChart = data => {
        // Exercise 5.2: use the same margin values as Exercise 5.1
        // so the charts have a consistent size and layout.
        const margin = {
            top: 70,
            right: 35,
            bottom: 75,
            left: 80
        };

        const width = 850;
        const height = 520;

        const svg = chartContainer
            .append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("role", "img")
            .attr("aria-labelledby", "exercise-5-2-title exercise-5-2-description");

        svg.append("title")
            .attr("id", "exercise-5-2-title")
            .text("Exercise 5.2: Australian electricity spot prices");

        svg.append("desc")
            .attr("id", "exercise-5-2-description")
            .text("A line chart showing average Australian electricity spot prices from 1998 to 2024.");

        svg.append("text")
            .attr("class", "exercise-5-2-title")
            .attr("x", width / 2)
            .attr("y", 32)
            .attr("text-anchor", "middle")
            .text("Australian Electricity Spot Prices");

        svg.append("text")
            .attr("class", "exercise-5-2-subtitle")
            .attr("x", width / 2)
            .attr("y", 54)
            .attr("text-anchor", "middle")
            .text("Average spot price from 1998 to 2024");

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Exercise 5.2: create the inner chart and apply margins.
        const innerChart = svg.append("g")
            .attr(
                "transform",
                `translate(${margin.left}, ${margin.top})`
            );

        // Exercise 5.2: both year and price are continuous values,
        // so scaleLinear is appropriate for both axes.
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.year))
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.averagePrice)])
            .nice()
            .range([innerHeight, 0]);

        // Exercise 5.2: create the x-axis and show whole years.
        const xAxis = d3.axisBottom(xScale)
            .ticks(8)
            .tickFormat(d3.format("d"));

        // Exercise 5.2: create the y-axis.
        const yAxis = d3.axisLeft(yScale)
            .ticks(6);

        // Exercise 5.2: add horizontal grid lines.
        innerChart.append("g")
            .attr("class", "exercise-5-2-grid")
            .call(
                d3.axisLeft(yScale)
                    .ticks(6)
                    .tickSize(-innerWidth)
                    .tickFormat("")
            );

        // Exercise 5.2: add the x-axis.
        innerChart.append("g")
            .attr("class", "exercise-5-2-axis")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(xAxis);

        // Exercise 5.2: add the y-axis.
        innerChart.append("g")
            .attr("class", "exercise-5-2-axis")
            .call(yAxis);

        // Exercise 5.2: y-axis label.
        innerChart.append("text")
            .attr("fill", "currentColor")
            .attr("transform", "rotate(-90)")
            .attr("x", -innerHeight / 2)
            .attr("y", -55)
            .attr("text-anchor", "middle")
            .style("font-size", "13px")
            .style("font-weight", "700")
            .text("Average Spot Price");

        // Exercise 5.2: x-axis label.
        innerChart.append("text")
            .attr("x", innerWidth / 2)
            .attr("y", innerHeight + 55)
            .attr("text-anchor", "middle")
            .style("font-size", "13px")
            .style("font-weight", "700")
            .text("Year");

        // Exercise 5.2: create a D3 line generator using the scales.
        const lineGenerator = d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.averagePrice));

        // Exercise 5.2: draw the line as an SVG path.
        innerChart.append("path")
            .datum(data)
            .attr("class", "exercise-5-2-line")
            .attr("d", lineGenerator);

        // Exercise 5.2: draw the data points as a scatter plot.
        innerChart.selectAll(".exercise-5-2-point")
            .data(data)
            .join("circle")
            .attr("class", "exercise-5-2-point")
            .attr("cx", d => xScale(d.year))
            .attr("cy", d => yScale(d.averagePrice))
            .attr("r", 4);
    };

    // Exercise 5.2: load year and averagePrice from the CSV.
    d3.csv("assets/data/ARE_Spot_Prices.csv", function (d) {
        return {
            year: +d.Year,
            averagePrice: +(d["Average Price (notTas-Snowy)"] || d.averagePrice)
        };
    })
    .then(function (data) {
        // Exercise 5.2: remove invalid rows and sort chronologically.
        data = data
            .filter(d => Number.isFinite(d.year) && Number.isFinite(d.averagePrice))
            .sort((a, b) => d3.ascending(a.year, b.year));

        console.log("Exercise 5.2 data:", data);

        if (!data.length) {
            status.text("No valid line chart data was found in the CSV file.");
            return;
        }

        drawLineChart(data);
        status.text(`Loaded ${data.length} yearly observations from ${data[0].year} to ${data[data.length - 1].year}.`);
    })
    .catch(function (error) {
        console.error("Exercise 5.2 CSV loading error:", error);
        status.text("Unable to load ARE_Spot_Prices.csv.");
    });
});
