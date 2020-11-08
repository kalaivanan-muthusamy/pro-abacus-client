import React from "react";
import ReactApexChart from "react-apexcharts";

const AreaLineChart = ({ labelName = "series1", data = [], labels = [] }) => {
  const series = [
    {
      name: labelName,
      data,
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    labels,
    yaxis: {
      decimalsInFloat: true,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#556ee6", "#34c38f"],
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height="250"
    />
  );
};

export default AreaLineChart;
