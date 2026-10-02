// D3.js code for Exercises 4.2 and 4.3
// Exercise 4.2: select and modify an HTML element.
d3.select(".d3-section h2")
    .style("color", "green");

// Exercise 4.2: append a paragraph to a div using D3.
d3.select(".d3-demo-container")
    .append("p")
    .text("Purchasing a low energy consumption TV will help with your energy bills!");

// Exercise 4.3: create a responsive SVG canvas.
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black")
    .attr("role", "img")
    .attr("aria-label", "D3 test SVG canvas");

// Exercise 4.3: add the test rectangle.
svg.append("rect")
    .attr("x", 20)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");

//Exercise 4.4: Import the CSV data and log it to the console.
d3.csv("assets/data/tv_2026.csv", d => {
    console.log(d);
    return {
        brand: d.brand,
        count: +d.count
    };
}).then(data => {

    // Display data in console
    console.log(data);

    // Display number of records
    console.log(data.length);

    // Display maximum count
    console.log(d3.max(data, d => d.count));

    // Display minimum count
    console.log(d3.min(data, d => d.count));

    // Display minimum and maximum
    console.log(d3.extent(data, d => d.count));

    // Sort from highest count to lowest count
    data.sort((a, b) => b.count - a.count);

    // Pass data to bar chart function
    drawBarChart(data);
});

//Exercise 4.5: Create a bar chart using D3.js
const drawBarChart = data => {

    // Height of each bar
    const barHeight = 20;

    // Space between each bar
    const barSpacing = 5;

    svg
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => {
            console.log(d);
            return `bar bar-${d.count}`;
        })
        .attr("width", d => d.count)
        .attr("height", barHeight)
        .attr("fill", "blue")
        .attr("x", 0)
        .attr("y", (d, i) => i * (barHeight + barSpacing));
};