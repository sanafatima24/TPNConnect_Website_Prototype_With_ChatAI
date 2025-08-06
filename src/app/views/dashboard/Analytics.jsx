import { Fragment } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import Campaigns from "./shared/Campaigns";
import StatCards2 from "./shared/StatCards2";
import StatCards3 from "./shared/StatCards3";
import DoughnutChart from "./shared/Doughnut";
import CollectionSummaryCard from "./shared/CollectionSummaryCard";
import MessagesCard from "./shared/MessagesCard";
import WarehouseStatusCard from "./shared/WarehouseStatusCard";
import MergedStatusCard from "./shared/MergedStatusCard";
// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  margin: "2rem",
  [theme.breakpoints.down("sm")]: { margin: "1rem" }
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize"
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "1rem",
  textTransform: "capitalize",
  color: theme.palette.text.secondary
}));

const totalWeight = 2479 + 0 + 0; // atHub + decked + action

const percentages = {
  atHub: (2479 / totalWeight) * 100,
  decked: 0,
  requiring: 0
};

function StatCard({ title, value, color }) {
  return (
    <Box p={2} borderRadius={2} bgcolor={color} color="#fff">
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="h6">{value}</Typography>
    </Box>
  );
}

export default function Analytics() {
  const { palette } = useTheme();

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid size={{ md: 8, xs: 12 }}>
            {/* <StatCards /> */}

            <StatCards2 />
            <Box mb={3}>
              {" "}
              <MergedStatusCard />
            </Box>

            <Box mb={3}>
              <Campaigns />
            </Box>

            <StatCards3 />

            <CollectionSummaryCard />
            {/* <TopSellingTable /> */}
          </Grid>

          <Grid size={{ md: 4, xs: 12 }}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              {/* <Title>Inbound</Title> */}
              <SubTitle>Shipment Compositions</SubTitle>

              <DoughnutChart
                height="300px"
                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
              />
            </Card>

            <MessagesCard />
            <WarehouseStatusCard />
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
}
