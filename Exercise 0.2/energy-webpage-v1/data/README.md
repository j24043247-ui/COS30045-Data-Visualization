# TV brand CSV data

Place the CSV exported from the KNIME workflow here as `tvBrandCount.csv`.

Required column names:

```csv
brand,count
```

The D3 code converts `count` to a number with `+d.count`, sorts the imported rows by count, and uses `scaleLinear()` and `scaleBand()` to size and position the bars.

The actual CSV values are intentionally not fabricated. Use the CSV exported from the supplied 2026 TV Data KNIME workflow.
