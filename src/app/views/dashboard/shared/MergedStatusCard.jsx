import { useState } from "react";
import { Box, Grid, MenuItem, Paper, Select, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReportIcon from "@mui/icons-material/Report";

// Reuse styled components
const ContentBox = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center"
}));

const H3 = styled("h3")(() => ({
  margin: 0,
  fontWeight: "500",
  marginLeft: "12px"
}));

const Span = styled("span")(() => ({
  fontSize: "13px",
  marginLeft: "4px"
}));

const statusData = {
  Inbound: {
    statuses: [
      {
        label: "At Hub",
        icon: <MoveToInboxIcon sx={{ color: "#4caf50", mr: 1 }} />,
        data: { nd: 6, ec: 0, rl: 0, weight: 2479 },
        color: "#4caf50"
      },
      {
        label: "Decked",
        icon: <CheckCircleIcon sx={{ color: "#ffc107", mr: 1 }} />,
        data: { nd: 0, ec: 2, rl: 0, weight: 800 },
        color: "#ffc107"
      },
      {
        label: "Requiring Action",
        icon: <ReportProblemIcon sx={{ color: "#f44336", mr: 1 }} />,
        data: { nd: 0, ec: 1, rl: 0, weight: 100 },
        color: "#f44336"
      }
    ]
  },
  Outbound: {
    statuses: [
      {
        label: "Decked at Hub",
        icon: <LocalShippingIcon sx={{ color: "#2196f3", mr: 1 }} />,
        data: { nd: 8, ec: 0, rl: 0, weight: 1000 },
        color: "#2196f3"
      },
      {
        label: "On Hold",
        icon: <ReportIcon sx={{ color: "#f44336", mr: 1 }} />,
        data: { nd: 59, ec: 0, rl: 0, weight: 7628 },
        color: "#f44336"
      }
    ]
  }
};

export default function MergedStatusCard() {
  const [selected, setSelected] = useState("Inbound");

  const currentData = statusData[selected].statuses;
  const totalWeight = currentData.reduce((sum, item) => sum + item.data.weight, 0);
  const getPercent = (weight) => (totalWeight ? (weight / totalWeight) * 100 : 0);

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <H3>{selected} Status Breakdown</H3>
        <Select size="small" value={selected} onChange={(e) => setSelected(e.target.value)}>
          <MenuItem value="Inbound">Inbound</MenuItem>
          <MenuItem value="Outbound">Outbound</MenuItem>
        </Select>
      </Box>

      {/* Progress bar */}
      <Box display="flex" height={24} borderRadius={2} overflow="hidden" mb={2}>
        {currentData.map((status, idx) => (
          <Box key={idx} width={`${getPercent(status.data.weight)}%`} bgcolor={status.color} />
        ))}
      </Box>

      {/* Breakdown Grid */}
      <Grid container spacing={2}>
        {currentData.map((status, idx) => {
          const { nd, ec, rl, weight } = status.data;
          return (
            <Grid item xs={12} md={12 / currentData.length} key={idx}>
              <ContentBox>
                {status.icon}
                <Box>
                  <H3>{status.label}</H3>
                  <Span>
                    Count: {nd + ec + rl} ({nd} ND, {ec} EC)
                  </Span>
                  <br />
                  <Span>Weight: {weight} kg</Span>
                </Box>
              </ContentBox>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}
