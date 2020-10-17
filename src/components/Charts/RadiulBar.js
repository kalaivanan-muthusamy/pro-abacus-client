import React from "react";
import ReactApexChart from "react-apexcharts";

const RadialChart = ({ series, height, valueFormatter, labels }) => {
  const options = {
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        offsetX: 0,
        offsetY: -35,
        dataLabels: {
          name: {
            fontSize: "15px",
            color: undefined,
            offsetY: 0,
          },
          value: {
            offsetY: 10,
            fontSize: "16px",
            fontWeight: "bold",
            color: "#aaa",
            formatter: valueFormatter,
          },
        },
      },
    },
    labels: labels,
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radialBar"
      height={height}
    />
  );
};

export default RadialChart;
