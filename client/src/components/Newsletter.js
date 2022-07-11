import styled from "@emotion/styled";
import { Button, Stack, Typography } from "@mui/material";
import { SendOutlined } from "@mui/icons-material";

const InputContainer = styled("div")({
  width: "50%",
  height: "40px",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "space-between",
  border: "1px solid lightgreen",
  width: { md: "80%" },
});
const Input = styled("input")({
  border: "none",
  flex: 9,
  paddingLeft: "20px",
});

const Newsletter = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "60vh", backgroundColor: "#fcf5f5" }}
    >
      <Typography variant="h1" sx={{ fontSize: "70px", marginBottom: "20px" }}>
        Newsletter
      </Typography>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 300,
          mb: "20px",
          textAlign: { md: "center" },
        }}
      >
        Get updates for offers, promo codes directly in your inbox.
      </Typography>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button variant="contained" endIcon={<SendOutlined />}>
          Send
        </Button>
      </InputContainer>
    </Stack>
  );
};

export default Newsletter;
