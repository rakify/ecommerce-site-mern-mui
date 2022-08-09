import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link
        variant="body2"
        color="inherit"
        href="https://www.linkedin.com/in/rakib-miah/"
        underline="hover"
        sx={{ fontSize: "large" }}
      >
        Bettermart
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}

// import { Container, CssBaseline, Link, Stack, Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import React from "react";

// const Footer = () => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         color: "white",
//         bgcolor: "#71C9CE",
//         minHeight: "100vh",
//       }}
//     >
//       <CssBaseline />
//       <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
//         <Typography variant="h2" component="h1" gutterBottom>
//           Sticky footer
//         </Typography>
//         <Typography variant="h5" component="h2" gutterBottom>
//           {"Pin a footer to the bottom of the viewport."}
//           {"The footer will move as the main element of the page grows."}
//         </Typography>
//         <Typography variant="body1">Sticky footer placeholder.</Typography>
//       </Container>
//       <Box
//         component="footer"
//         sx={{
//           py: 3,
//           px: 2,
//           mt: "auto",
//           backgroundColor: "",
//         }}
//       >
//         <Container maxWidth="sm">
//           <Typography variant="body1">
//             My sticky footer can be found here.
//           </Typography>
//           <Typography variant="body2" color="text.secondary" align="right">
//             {"Copyright © "}
//             <Link
//               variant="body2"
//               color="inherit"
//               href="https://www.linkedin.com/in/rakib-miah/"
//               underline="hover"
//               sx={{ fontSize: "large" }}
//             >
//               Bettermart
//             </Link>{" "}
//             {new Date().getFullYear()}
//             {"."}
//           </Typography>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Footer;
