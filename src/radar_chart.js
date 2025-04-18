import { dscc } from "@google/dscc";
import Chart from "chart.js/auto";

function draw(data, styles) {
  const labels = data.tables.DEFAULT.map(r => r.dimension[0]);
  const datasets = data.fields.metrics.map((m,i) => ({
    label: m.name,
    data: data.tables.DEFAULT.map(r => r.metric[i]),
    borderColor: styles.seriesColors[i].color,
    backgroundColor: styles.fillAreas
      ? styles.seriesColors[i].color + "33" : "transparent",
    borderWidth: styles.lineWidth
  }));

  new Chart(document.getElementById("chartContainer"), {
    type: "radar",
    data: { labels, datasets },
    options: {
      scales: { r: { min: styles.axisRange?.min, max: styles.axisRange?.max } },
      plugins: {
        legend: { display: styles.showLegend, position: styles.legendPosition }
      }
    }
  });
}

dscc.subscribeToData((data) => {
  const styles = dscc.getStyle();
  draw(data, styles);
});
