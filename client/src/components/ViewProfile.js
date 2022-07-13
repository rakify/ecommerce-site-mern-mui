import { Email, PhoneAndroid } from "@mui/icons-material";
import { Container, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ViewProfile = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack justifyContent="center">
          <Typography variant="h6">
            {user.username}, {user.gender}
          </Typography>
          <Stack direction="row" alignItems="center">
            <Email /> {user.email}
          </Stack>
          <Stack direction="row" alignItems="center">
            <PhoneAndroid />{" "}
            {user.phoneNumber || "Please provide a phone number"}
          </Stack>
          <Stack direction="row" alignItems="center">
            Registered {user.createdAt}
          </Stack>
        </Stack>
        <img
          src={user.img}
          alt=""
          style={{ borderRadious: 1, height: 300, width: 300 }}
        />
      </Stack>
    </Container>
  );
};

export default ViewProfile;
