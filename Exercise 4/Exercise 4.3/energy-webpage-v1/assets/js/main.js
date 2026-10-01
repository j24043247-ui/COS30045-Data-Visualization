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
    .attr("role", "img")
    .attr("aria-label", "D3 test SVG canvas");

// Exercise 4.3: add the test rectangle.
svg.append("rect")
    .attr("x", 20)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");
