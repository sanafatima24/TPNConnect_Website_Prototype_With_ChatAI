import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import WarehouseIcon from "@mui/icons-material/Warehouse";

// Reuse styled components
const ContentBox = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  marginBottom: 16
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

export default function WarehouseStatusCard() {
  const data = {
    scanned: 26,
    processing: 17
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
      <ContentBox>
        <WarehouseIcon sx={{ color: "#795548", mr: 1 }} />
        <H3>Warehouse Status</H3>
      </ContentBox>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Span>
            <strong>Scanned in Warehouse:</strong> {data.scanned}
          </Span>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Span>
            <strong>Processing Delivery:</strong> {data.processing}
          </Span>
        </Grid>
      </Grid>
    </Paper>
  );
}
