// Exercise 4.4 - Load and type CSV data.

d3.csv("../data/tvBrandCount.csv", d => ({
    brand: d.brand,
    count: +d.count
})).then(data => {
    console.log(data);
    console.log(data.length);
    console.log(d3.max(data, d => d.count));
    console.log(d3.min(data, d => d.count));
    console.log(d3.extent(data, d => d.count));
    data.sort((a, b) => d3.descending(a.count, b.count));
    drawBarChart(data);
});

const drawBarChart = data => {
    console.log("Exercise 4.4: drawBarChart received", data.length, "rows.");
};
