// COS30045 Exercises 4.3–4.7
// D3 interactive TV brand bar chart

d3.select(".d3-demo-container")
    .append("b")
    .text("Purchasing a low energy consumption TV will help with your energy bills!");

document.addEventListener("DOMContentLoaded", function () {

    const container = d3.select(".responsive-svg-container");
    const status = d3.select("#chart-status");

    // Create SVG
    const svg = container
        .append("svg")
        .attr("viewBox", "0 0 600 700")
        .attr("role", "img")
        .attr("aria-labelledby", "d3-chart-title d3-chart-description");

    // Accessibility title
    svg.append("title")
        .attr("id", "d3-chart-title")
        .text("Televisions by brand");

    svg.append("desc")
        .attr("id", "d3-chart-description")
        .text("A horizontal bar chart showing the number of televisions by brand.");

    // Chart dimensions
    const chartLeft = 160;
    const chartRight = 470;

    // X scale
    const xScale = d3.scaleLinear()
        .range([0, chartRight - chartLeft]);

    // Y scale
    const yScale = d3.scaleBand()
        .range([100, 650])
        .padding(0.18);

    // Load CSV
    d3.csv("assets/data/tv_2026.csv", function (d) {
        return {
            brand: d.brand,
            count: +d.count
        };
    })
    .then(function (data) {

        console.log(data);
        console.log("Number of rows:", data.length);
        console.log("Maximum count:", d3.max(data, d => d.count));
        console.log("Minimum count:", d3.min(data, d => d.count));
        console.log("Extent:", d3.extent(data, d => d.count));

        // Sort highest to lowest
        data.sort((a, b) => d3.descending(a.count, b.count));

        // Calculate total
        const totalCount = d3.sum(data, d => d.count);

        // Set scales
        const maxCount = d3.max(data, d => d.count) || 1;

        xScale.domain([0, maxCount]);
        yScale.domain(data.map(d => d.brand));

        // Draw chart
        drawBarChart(data, totalCount);

        // Status
        status.text(
            data.length
                ? `Loaded ${data.length} TV brand categories from tv_2026.csv.`
                : "The CSV loaded successfully but contains no data rows."
        );
    })
    .catch(function (error) {

        console.error("Unable to load tv_2026.csv:", error);

        status.text(
            "Unable to load tv_2026.csv. Please check the file location."
        );
    });


    // Draw chart
    function drawBarChart(data, totalCount) {

        // --------------------------------------------------
        // Chart title
        // --------------------------------------------------

        svg.append("text")
            .attr("class", "chart-title")
            .attr("x", 300)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .text("TV Brands by Number of TVs");

        svg.append("text")
            .attr("class", "chart-subtitle")
            .attr("x", 300)
            .attr("y", 55)
            .attr("text-anchor", "middle")
            .text("Number of televisions recorded for each brand");


        // --------------------------------------------------
        // Grid lines
        // --------------------------------------------------

        const gridValues = xScale.ticks(5);

        svg.selectAll(".grid-line")
            .data(gridValues)
            .join("line")
            .attr("class", "grid-line")
            .attr("x1", d => chartLeft + xScale(d))
            .attr("x2", d => chartLeft + xScale(d))
            .attr("y1", 90)
            .attr("y2", 650);


        // --------------------------------------------------
        // X-axis labels
        // --------------------------------------------------

        svg.selectAll(".x-axis-label")
            .data(gridValues)
            .join("text")
            .attr("class", "x-axis-label")
            .attr("x", d => chartLeft + xScale(d))
            .attr("y", 82)
            .attr("text-anchor", "middle")
            .text(d => d);


        // --------------------------------------------------
        // Group for each bar + labels
        // --------------------------------------------------

        const barAndLabel = svg
            .selectAll(".bar-group")
            .data(data)
            .join("g")
            .attr("class", "bar-group")
            .attr(
                "transform",
                d => `translate(0, ${yScale(d.brand)})`
            );


        // --------------------------------------------------
        // Brand labels
        // --------------------------------------------------

        barAndLabel
            .append("text")
            .attr("class", "brand-label")
            .attr("x", chartLeft - 15)
            .attr("y", yScale.bandwidth() / 2)
            .attr("text-anchor", "end")
            .attr("dominant-baseline", "middle")
            .text(d => d.brand);


        // --------------------------------------------------
        // Bars
        // --------------------------------------------------

        barAndLabel
            .append("rect")
            .attr("class", "bar")
            .attr("x", chartLeft)
            .attr("y", 0)
            .attr("width", d => xScale(d.count))
            .attr("height", yScale.bandwidth())
            .attr("rx", 5)
            .attr("ry", 5)

            // Hover interaction
            .on("mouseover", function (event, d) {

                d3.select(this)
                    .classed("bar-hover", true);

                showTooltip(event, d, totalCount);
            })

            .on("mousemove", function (event, d) {

                moveTooltip(event);
            })

            .on("mouseout", function () {

                d3.select(this)
                    .classed("bar-hover", false);

                hideTooltip();
            })

            // Click interaction for easier use on touch devices
            .on("click", function (event, d) {

                showTooltip(event, d, totalCount);
            });


        // --------------------------------------------------
        // Value labels
        // --------------------------------------------------

        barAndLabel
            .append("text")
            .attr("class", "value-label")
            .attr(
                "x",
                d => chartLeft + xScale(d.count) + 8
            )
            .attr("y", yScale.bandwidth() / 2)
            .attr("dominant-baseline", "middle")
            .text(d => d.count);
    }


    // ------------------------------------------------------
    // Tooltip
    // ------------------------------------------------------

    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "d3-tooltip")
        .style("opacity", 0);


    function showTooltip(event, d, totalCount) {

        const percentage = ((d.count / totalCount) * 100).toFixed(1);

        tooltip
            .html(`
                <div class="tooltip-title">${d.brand}</div>
                <div class="tooltip-row">
                    <span>TV count</span>
                    <strong>${d.count.toLocaleString()}</strong>
                </div>
                <div class="tooltip-row">
                    <span>Share</span>
                    <strong>${percentage}%</strong>
                </div>
            `)
            .style("opacity", 1);

        moveTooltip(event);
    }


    function moveTooltip(event) {

        const tooltipNode = tooltip.node();

        if (!tooltipNode) {
            return;
        }

        const tooltipWidth = tooltipNode.offsetWidth;
        const tooltipHeight = tooltipNode.offsetHeight;

        let x = event.pageX + 15;
        let y = event.pageY - tooltipHeight - 15;

        // Prevent tooltip from going outside right side
        if (x + tooltipWidth > window.scrollX + window.innerWidth) {
            x = event.pageX - tooltipWidth - 15;
        }

        // Prevent tooltip from going above page
        if (y < window.scrollY) {
            y = event.pageY + 15;
        }

        tooltip
            .style("left", `${x}px`)
            .style("top", `${y}px`);
    }


    function hideTooltip() {

        tooltip
            .style("opacity", 0);
    }

});