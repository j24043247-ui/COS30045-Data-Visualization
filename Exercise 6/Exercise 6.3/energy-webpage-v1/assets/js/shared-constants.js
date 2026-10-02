// ================================================================
// EXERCISE 6.1 & 6.2 - SHARED CONSTANTS
// Shared chart dimensions, colours, bin generator and D3 scales.
// These are kept outside histogram.js so Exercise 6.2 can reuse them.
// ================================================================

const chartWidth = 1000;
const chartHeight = 620;

const margin = {
    top: 70,
    right: 35,
    bottom: 80,
    left: 85
};

const innerWidth = chartWidth - margin.left - margin.right;
const innerHeight = chartHeight - margin.top - margin.bottom;

const bodyBackgroundColor = "#ffffff";
const barColor = "#0b5ed7";
const barHoverColor = "#084298";

// EXERCISE 6.1: d3.bin() creates the histogram bins.
// A threshold of 14 follows the exercise walkthrough.
const binGenerator = d3
    .bin()
    .value(function (d) {
        return d.energyConsumption;
    })
    .thresholds(14);

// These scales are configured inside drawHistogram after the bins are known.
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();


// ================================================================
// EXERCISE 6.2 - FILTER CONFIGURATION
// Filter labels and active state used by interactions.js.
// ================================================================
const screenFilters = [
    { id: "all", label: "All", isActive: true },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "LED", label: "LED", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];


// ================================================================
// EXERCISE 6.3 - SCATTERPLOT SHARED CONSTANTS
// Separate constants prevent the scatterplot from interfering with
// the histogram scales and inner chart.
// ================================================================
const chartWidthS = 1000;
const chartHeightS = 620;

const marginS = {
    top: 70,
    right: 180,
    bottom: 80,
    left: 95
};

const innerWidthS = chartWidthS - marginS.left - marginS.right;
const innerHeightS = chartHeightS - marginS.top - marginS.bottom;

const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();

let innerChartS;

// Screen technology categories used for the colour legend.
const screenTechCategories = ["LCD", "LED", "OLED"];
const colorScale = d3
    .scaleOrdinal()
    .domain(screenTechCategories)
    .range(["#2563eb", "#0f766e", "#9333ea"]);
