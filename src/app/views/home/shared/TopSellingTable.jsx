// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import Table from "@mui/material/Table";
// import Select from "@mui/material/Select";
// import Avatar from "@mui/material/Avatar";
// import TableRow from "@mui/material/TableRow";
// import MenuItem from "@mui/material/MenuItem";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableHead from "@mui/material/TableHead";
// import IconButton from "@mui/material/IconButton";
// import { styled, useTheme } from "@mui/material/styles";
// import Edit from "@mui/icons-material/Edit";
// import { Paragraph } from "app/components/Typography";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday"; // at the top if needed

// // STYLED COMPONENTS
// const CardHeader = styled(Box)(() => ({
//   display: "flex",
//   paddingLeft: "24px",
//   paddingRight: "24px",
//   marginBottom: "12px",
//   alignItems: "center",
//   justifyContent: "space-between"
// }));

// const Title = styled("span")(() => ({
//   fontSize: "1rem",
//   fontWeight: "500",
//   textTransform: "capitalize"
// }));

// const ProductTable = styled(Table)(() => ({
//   minWidth: 400,
//   whiteSpace: "pre",
//   "& small": {
//     width: 50,
//     height: 15,
//     borderRadius: 500,
//     boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
//   },
//   "& td": { borderBottom: "none" },
//   "& td:first-of-type": { paddingLeft: "16px !important" }
// }));

// const Small = styled("small")(({ bgcolor }) => ({
//   width: 50,
//   height: 15,
//   color: "#fff",
//   padding: "2px 8px",
//   borderRadius: "4px",
//   overflow: "hidden",
//   background: bgcolor,
//   boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
// }));

// export default function TopSellingTable() {
//   const { palette } = useTheme();
//   const bgError = palette.error.main;
//   const bgPrimary = palette.primary.main;
//   const bgSecondary = palette.secondary.main;

//   return (
//     <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
//       <CardHeader>
//         <Title>Operations Log</Title>
//         <Select size="small" defaultValue="this_month">
//           <MenuItem value="this_month">Current</MenuItem>
//           <MenuItem value="last_month">Previous</MenuItem>
//         </Select>
//       </CardHeader>

//       <Box overflow="auto">
//         <ProductTable>
//           <TableHead>
//             <TableRow>
//               <TableCell colSpan={2} sx={{ px: 3 }}>
//                 Date-Time
//               </TableCell>

//               <TableCell colSpan={2} sx={{ px: 0 }}>
//                 Depot
//               </TableCell>

//               <TableCell colSpan={5} sx={{ px: 0 }}>
//                 Issue
//               </TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {productList.map((product, index) => (
//               <TableRow key={index} hover>
//                 <TableCell colSpan={2} align="left" sx={{ px: 0 }}>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <CalendarTodayIcon fontSize="small" color="action" />
//                     <Paragraph sx={{ fontSize: 13, color: "text.secondary" }}>
//                       {product.Date}
//                     </Paragraph>
//                   </Box>
//                 </TableCell>

//                 <TableCell sx={{ px: 0 }} align="left" colSpan={1}>
//                   <Small
//                     sx={{
//                       backgroundColor: (theme) => theme.palette.secondary.main,
//                       color: (theme) => theme.palette.secondary.contrastText,
//                       borderRadius: "999px",
//                       padding: "4px 12px",
//                       fontWeight: 500
//                       // display: "inline-block"
//                     }}
//                   >
//                     {product.depot}
//                   </Small>
//                 </TableCell>

//                 <TableCell colSpan={5} align="left" sx={{ px: 0, py: 1 }}>
//                   <Box
//                     sx={{
//                       maxWidth: 700, // Limits text width so it doesn’t stretch edge-to-edge
//                       whiteSpace: "normal", // Allows line wrapping
//                       wordBreak: "break-word",
//                       color: "text.secondary",
//                       fontSize: 13
//                     }}
//                   >
//                     {product.issue}
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </ProductTable>
//       </Box>
//     </Card>
//   );
// }

// const productList = [
//   {
//     depot: "001",
//     Date: "Mon-28 12:18",
//     issue:
//       "The depot is experiencing a delay in outbound scans due to a local network outage. Engineers are currently investigating, and updates will follow."
//   },
//   {
//     depot: "002",
//     Date: "Mon-28 13:45",
//     issue:
//       "POD upload failures have been reported from partner depots. Please avoid resending batches until the sync issue is resolved."
//   },
//   {
//     depot: "003",
//     Date: "Mon-28 11:56",
//     issue:
//       "Due to a system patch applied this morning, some delivery confirmations are not showing in real time. A rollback is being planned."
//   },
//   {
//     depot: "004",
//     Date: "Mon-28 14:02",
//     issue:
//       "A power disruption has affected scanning stations in Depot 004. Temporary manual docket entry may be required for affected shipments."
//   },
//   {
//     depot: "005",
//     Date: "Mon-28 09:33",
//     issue:
//       "Due to severe weather conditions in the region, collections and deliveries from Depot 005 may be delayed by 2–4 hours."
//   }
// ];

import { useState } from "react";
import {
  Box,
  Card,
  Table,
  Select,
  Avatar,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TablePagination
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Edit from "@mui/icons-material/Edit";
import { Paragraph } from "app/components/Typography";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// STYLED COMPONENTS
const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between"
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize"
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: "pre",
  "& small": {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
  },
  "& td": { borderBottom: "none" },
  "& td:first-of-type": { paddingLeft: "16px !important" }
}));

const Small = styled("small")(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
}));

export default function TopSellingTable() {
  const { palette } = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3); // Customize how many rows to show

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const paginatedData = productList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <CardHeader>
        <Title>Operations Log</Title>
        <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">Current</MenuItem>
          <MenuItem value="last_month">Previous</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} sx={{ px: 3 }}>
                Date-Time
              </TableCell>
              <TableCell colSpan={2} sx={{ px: 0 }}>
                Depot
              </TableCell>
              <TableCell colSpan={5} sx={{ px: 0 }}>
                Issue
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={2} align="left" sx={{ px: 0 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CalendarTodayIcon fontSize="small" color="action" />
                    <Paragraph sx={{ fontSize: 13, color: "text.secondary" }}>
                      {product.Date}
                    </Paragraph>
                  </Box>
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={1}>
                  <Small
                    sx={{
                      backgroundColor: (theme) => theme.palette.secondary.main,
                      color: (theme) => theme.palette.secondary.contrastText,
                      borderRadius: "999px",
                      padding: "4px 12px",
                      fontWeight: 500
                    }}
                  >
                    {product.depot}
                  </Small>
                </TableCell>

                <TableCell colSpan={5} align="left" sx={{ px: 0, py: 1 }}>
                  <Box
                    sx={{
                      maxWidth: 700,
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      color: "text.secondary",
                      fontSize: 13
                    }}
                  >
                    {product.issue}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>

        <TablePagination
          component="div"
          count={productList.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[3, 5, 10]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Card>
  );
}

const productList = [
  {
    depot: "001",
    Date: "Mon-28 12:18",
    issue:
      "The depot is experiencing a delay in outbound scans due to a local network outage. Engineers are currently investigating, and updates will follow."
  },
  {
    depot: "002",
    Date: "Mon-28 13:45",
    issue:
      "POD upload failures have been reported from partner depots. Please avoid resending batches until the sync issue is resolved."
  },
  {
    depot: "003",
    Date: "Mon-28 11:56",
    issue:
      "Due to a system patch applied this morning, some delivery confirmations are not showing in real time. A rollback is being planned."
  },
  {
    depot: "004",
    Date: "Mon-28 14:02",
    issue:
      "A power disruption has affected scanning stations in Depot 004. Temporary manual docket entry may be required for affected shipments."
  },
  {
    depot: "005",
    Date: "Mon-28 09:33",
    issue:
      "Due to severe weather conditions in the region, collections and deliveries from Depot 005 may be delayed by 2–4 hours."
  }
];
