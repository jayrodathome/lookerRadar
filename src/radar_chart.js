import { dscc } from "@google/dscc";
import Chart     from "chart.js/auto";

function draw(data, styles) {
  // Wipe out any existing content
  document.body.innerHTML = "";

  // Create a full‑size canvas and append to the document
  const canvas = document.createElement("canvas");
  canvas.style.width  = "100%";
  canvas.style.height = "100%";
  document.body.appendChild(canvas);

  // Prepare labels & datasets
  const labels = data.tables.DEFAULT.map(r => r.dimension[0]);
  const datasets = data.fields.metrics.map((m, i) => ({
    label:           m.name,
    data:            data.tables.DEFAULT.map(r => r.metric[i]),
    borderColor:     styles.seriesColors[i]?.color,
    backgroundColor: styles.fillAreas
      ? styles.seriesColors[i]?.color + "33"
      : "transparent",
    borderWidth:     styles.lineWidth
  }));

  // Render the radar chart
  new Chart(canvas.getContext("2d"), {
    type: "radar",
    data: { labels, datasets },
    options: {
      responsive:       true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: styles.axisRange?.min,
          max: styles.axisRange?.max
        }
      },
      plugins: {
        legend: {
          display:  styles.showLegend,
          position: styles.legendPosition
        }
      }
    }
  });
}

dscc.subscribeToData((data) => {
  const styles = dscc.getStyle();
  draw(data, styles);
});
