import {
  Create,
  Email,
  Badge,
  Man,
  Person,
  PhoneAndroid,
  Woman,
} from "@mui/icons-material";
import { Container, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ViewProfile = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Stack justifyContent="center" sx={{ width:"50%" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Person />
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {user.username}, {user.gender === "male" ? <Man /> : <Woman />}
            </Typography>
          </Stack>{" "}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Email /> {user.email}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <PhoneAndroid />{" "}
            {user.phoneNumber || "Please provide a phone number"}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Badge /> {user.accountType === 1 ? "Seller" : "Customer"}
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
