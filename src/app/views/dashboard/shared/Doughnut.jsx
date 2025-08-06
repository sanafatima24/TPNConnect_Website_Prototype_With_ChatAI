// import ReactEcharts from "echarts-for-react";
// import { useTheme } from "@mui/material/styles";

// export default function DoughnutChart({ height, color = [] }) {
//   const theme = useTheme();

//   const option = {
//     legend: {
//       bottom: 0,
//       show: true,
//       itemGap: 20,
//       icon: "circle",
//       textStyle: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: "roboto" }
//     },
//     tooltip: { show: false, trigger: "item", formatter: "{a} <br/>{b}: {c} ({d}%)" },
//     xAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],
//     yAxis: [{ axisLine: { show: false }, splitLine: { show: false } }],

//     series: [
//       {
//         name: "Traffic Rate",
//         type: "pie",
//         hoverOffset: 5,
//         radius: ["45%", "72.55%"],
//         center: ["50%", "50%"],
//         avoidLabelOverlap: false,
//         stillShowZeroSum: false,
//         labelLine: { show: false },
//         label: {
//           show: false,
//           fontSize: 13,
//           formatter: "{a}",
//           position: "center",
//           fontFamily: "roboto",
//           color: theme.palette.text.secondary
//         },
//         emphasis: {
//           label: {
//             show: true,
//             fontSize: "14",
//             padding: 4,
//             fontWeight: "normal",
//             // formatter: "{b} \n{c} ({d}%)"
//             formatter: "{b} ({d}%)"
//           },
//           itemStyle: {
//             shadowBlur: 10,
//             shadowOffsetX: 0,
//             shadowColor: "rgba(0, 0, 0, 0.5)"
//           }
//         },
//         data: [
//           { value: 77, name: "ND" },
//           { value: 21, name: "RL" },
//           { value: 3, name: "EC" }
//         ]
//       }
//     ]
//   };

//   return <ReactEcharts style={{ height }} option={{ ...option, color: [...color] }} />;
// }
import { useState } from "react";
import ReactEcharts from "echarts-for-react";
import { Tabs, Tab, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function DoughnutChartWithTabs({ height = 300, color = [] }) {
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);

  // Shipment data
  const shipmentData = {
    Inbound: [
      { value: 77, name: "ND" },
      { value: 21, name: "EC" },
      { value: 3, name: "RL" }
    ],
    Outbound: [
      { value: 59, name: "ND" },
      { value: 22, name: "EC" },
      { value: 0, name: "RL" }
    ]
  };

  const currentData = tabIndex === 0 ? shipmentData.Inbound : shipmentData.Outbound;

  const option = {
    legend: {
      bottom: 0,
      show: true,
      itemGap: 20,
      icon: "circle",
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 13,
        fontFamily: "roboto"
      }
    },
    tooltip: {
      show: false,
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
      {
        name: tabIndex === 0 ? "Inbound" : "Outbound",
        type: "pie",
        hoverOffset: 5,
        radius: ["45%", "72.55%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        stillShowZeroSum: false,
        labelLine: { show: false },
        label: {
          show: false,
          fontSize: 13,
          formatter: "{a}",
          position: "center",
          fontFamily: "roboto",
          color: theme.palette.text.secondary
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "14",
            padding: 4,
            fontWeight: "normal",
            formatter: "{b} ({d}%)"
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        data: currentData
      }
    ]
  };

  return (
    <Box>
      <Tabs
        value={tabIndex}
        onChange={(e, newIndex) => setTabIndex(newIndex)}
        textColor="primary"
        indicatorColor="primary"
        centered
        sx={{ mb: 2 }}
      >
        <Tab label="Inbound" />
        <Tab label="Outbound" />
      </Tabs>

      <ReactEcharts style={{ height }} option={{ ...option, color: [...color] }} />
    </Box>
  );
}
