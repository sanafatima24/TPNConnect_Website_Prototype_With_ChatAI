import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import CollectionsIcon from "@mui/icons-material/Collections";

// Styled components reused
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

export default function CollectionSummaryCard() {
  const data = {
    total: { requested: 8, sent: 8, acknowledged: 11 },
    received: { requested: 8, sent: 8, acknowledged: 10 },
    unauthorized: { requested: "-", sent: "-", acknowledged: "-" }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
      <ContentBox>
        <CollectionsIcon sx={{ color: "#673ab7", mr: 1 }} />
        <H3>Collection Summary</H3>
      </ContentBox>

      <Grid container spacing={2}>
        {/* Total */}
        <Grid item xs={12} sm={4}>
          <Span>
            <strong>Total</strong>
          </Span>
          <br />
          <Span>Requested: {data.total.requested}</Span>
          <br />
          <Span>Sent: {data.total.sent}</Span>
          <br />
          <Span>Acknowledged: {data.total.acknowledged}</Span>
        </Grid>

        {/* Received */}
        <Grid item xs={12} sm={4}>
          <Span>
            <strong>Received</strong>
          </Span>
          <br />
          <Span>Requested: {data.received.requested}</Span>
          <br />
          <Span>Sent: {data.received.sent}</Span>
          <br />
          <Span>Acknowledged: {data.received.acknowledged}</Span>
        </Grid>

        {/* Unauthorized */}
        <Grid item xs={12} sm={4}>
          <Span>
            <strong>Unauthorized</strong>
          </Span>
          <br />
          <Span>Requested: {data.unauthorized.requested}</Span>
          <br />
          <Span>Sent: {data.unauthorized.sent}</Span>
          <br />
          <Span>Acknowledged: {data.unauthorized.acknowledged}</Span>
        </Grid>
      </Grid>
    </Paper>
  );
}
