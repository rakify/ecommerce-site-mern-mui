import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ViewProfile = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Stack direction="row" justifyContent="space-around">
      <Stack direction="column">
        <Typography variant="h6" color="primary">
          Contact Information
        </Typography>
        <Stack direction="row">
          <Typography>Username:</Typography>
          <Typography>{user.username}</Typography>
        </Stack>
        <Stack direction="row">Email: {user.email}</Stack>
        <Stack direction="row">
          Phone Number: {user.phoneNumber || "Please provide a phone number"}
        </Stack>
      </Stack>
      <Stack direction="column">
        <Typography variant="h6" color="primary">
          More Information
        </Typography>

        <Stack direction="row">
          <Typography>Gender:</Typography>
          <Typography>{user.gender}</Typography>
        </Stack>
        <Stack direction="row">
          Account Type: {user.accountType === 1 ? "Seller" : "Customer"}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ViewProfile;
