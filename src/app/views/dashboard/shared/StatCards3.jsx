import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import { lighten, styled, useTheme } from "@mui/material/styles";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import OutboundOutlinedIcon from '@mui/icons-material/OutboundOutlined';
import { Box } from "@mui/material";
// STYLED COMPONENTS
const ContentBox = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center"
}));

const FabIcon = styled(Fab)(() => ({
  width: "44px !important",
  height: "44px !important",
  boxShadow: "none !important"
}));

const H3 = styled("h3")(() => ({
  margin: 0,
  fontWeight: "500",
  marginLeft: "12px"
}));

const H1 = styled("h1")(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary
}));

const Span = styled("span")(() => ({
  fontSize: "13px",
  marginLeft: "4px"
}));

const IconBox = styled("div")(() => ({
  width: 16,
  height: 16,
  color: "#fff",
  display: "flex",
  overflow: "hidden",
  borderRadius: "300px ",
  justifyContent: "center",
  "& .icon": { fontSize: "14px" }
}));

export default function StatCards2() {
  const { palette } = useTheme();
  const bgError = lighten(palette.error.main, 0.85);

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid size={{ md: 6, xs: 12 }}>
        <Card elevation={3} sx={{ p: 2 }}>
          <ContentBox>
            <FabIcon
              size="medium"
              sx={{ backgroundColor: "rgba(9, 182, 109, 0.15)", overflow: "hidden" }}
            >
              <TaskAltIcon color="success" />
            </FabIcon>

            <H3 color="#08ad6c">Inbound XL</H3>
          </ContentBox>
          <Box ml={1}>
            <Span style={{ fontSize: "12px", color: "#999", marginLeft: "50px" }}>
              Today's Trunk (06-08-2025)
            </Span>
          </Box>

          <ContentBox sx={{ pt: 2 }}>
            <H1>0</H1>

            {/* <IconBox sx={{ backgroundColor: "success.main" }}>
              <ExpandLess className="icon" />
            </IconBox> */}

            <Span color="#08ad6c">0 kg</Span>
          </ContentBox>
        </Card>
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <Card elevation={3} sx={{ p: 2 }}>
          <ContentBox>
            <FabIcon size="medium" sx={{ background: "#1976d24c" }}>
              <OutboundOutlinedIcon color="#222A45" />
            </FabIcon>

            <H3 color="error.main">Outbound XL</H3>
          </ContentBox>
          <Box ml={1}>
            <Span style={{ fontSize: "12px", color: "#999", marginLeft: "50px" }}>
              Today's Trunk (06-08-2025)
            </Span>
          </Box>
          <ContentBox sx={{ pt: 2 }}>
            <H1>0</H1>

            <Span color="error.main">0 kg</Span>
          </ContentBox>
        </Card>
      </Grid>
    </Grid>
  );
}
