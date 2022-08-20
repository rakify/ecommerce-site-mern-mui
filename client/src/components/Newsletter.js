import styled from "@emotion/styled";
import { Button, Stack, TextField, Typography } from "@mui/material";

const Newsletter = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ bgcolor:"#CBF1F5", flex:1 }}
    >
      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        Sign Up For 20% Off Your First Order
      </Typography>
      <Typography
        sx={{
          fontWeight: 300,
          mb: "20px",
          textAlign: { md: "center" },
        }}
      >
        Hear Updates (Get updates for offers, promo codes directly in your
        inbox.)
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <TextField
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          fullWidth
          label="Your email"
          size="smalll"
        />
        <Button variant="contained">Subscribe</Button>
      </Stack>
    </Stack>
  );
};

export default Newsletter;
