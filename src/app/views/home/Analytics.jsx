import { Fragment } from "react";
import Grid from "@mui/material/Grid2";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import StatCards from "./shared/StatCards";
import TopSellingTable from "./shared/TopSellingTable";

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

export default function Analytics() {
  const { palette } = useTheme();

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid size={{ md: 8, xs: 12 }}>
          <Box mb={4}>
            <img
              src="/assets/images/welcome.svg"
              alt="Welcome to TPN Connect"
              style={{ width: "100%", margin: "auto", display: "block" }}
            />
          </Box>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Popular Options
          </Typography>
          <StatCards />
          <TopSellingTable />
        </Grid>
      </ContentBox>
    </Fragment>
  );
}
