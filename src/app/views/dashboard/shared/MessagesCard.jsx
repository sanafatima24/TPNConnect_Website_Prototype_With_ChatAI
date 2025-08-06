// import { Box, Paper, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import ChatIcon from "@mui/icons-material/Chat";

// // Sample messages (customize with actual data)
// const messages = [
//   { depot: "015", time: "13:24", text: "Phone line issues." },
//   { depot: "050", time: "13:06", text: "Delay uploading PODs." },
//   { depot: "064", time: "08:45", text: "OOH sign issues, nurse unavailable." }
// ];

// const H3 = styled("h3")(() => ({
//   margin: 0,
//   fontWeight: "500",
//   marginLeft: "12px"
// }));

// const ContentBox = styled("div")(() => ({
//   display: "flex",
//   alignItems: "center",
//   marginBottom: 16
// }));

// export default function MessagesCard() {
//   return (
//     <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
//       <ContentBox>
//         <ChatIcon sx={{ color: "#0097a7", mr: 1 }} />
//         <H3>Depot Messages</H3>
//       </ContentBox>

//       {messages.map((msg, i) => (
//         <Box key={i} mb={2}>
//           <Typography variant="body2" color="textSecondary">
//             <strong>Depot {msg.depot}</strong> • {msg.time}
//           </Typography>
//           <Typography variant="body2">{msg.text}</Typography>
//         </Box>
//       ))}
//     </Paper>
//   );
// }
import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

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

export default function MessagesCard() {
  const data = {
    descraps: 0,
    preAlerts: 0,
    creditRevenue: 0,
    other: 0
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
      <ContentBox>
        <ChatBubbleOutlineIcon sx={{ color: "#1976d2", mr: 1 }} />
        <H3>Messages</H3>
      </ContentBox>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Span>
            <strong>Descraps:</strong> {data.descraps}
          </Span>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Span>
            <strong>Pre Alerts:</strong> {data.preAlerts}
          </Span>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Span>
            <strong>Credit/Revenue:</strong> {data.creditRevenue}
          </Span>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Span>
            <strong>Other:</strong> {data.other}
          </Span>
        </Grid>
      </Grid>
    </Paper>
  );
}
