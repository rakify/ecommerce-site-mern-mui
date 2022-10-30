import { Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
export default function AddressBook() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Stack direction="column" justifyContent="space-between" gap={2}>
        <Stack>
          {/* Shipping */}
          <Typography variant="body2">Shipping Info</Typography>
          <Typography variant="h6">{user?.shippingInfo?.fullName}</Typography>
          {user.shippingInfo.street && (
            <Typography>{user.shippingInfo.street}</Typography>
          )}
          <Typography>
            {user.shippingInfo.upazila ? user.shippingInfo.upazila + " - " : ""}
            {user.shippingInfo.district
              ? user.shippingInfo.district + " - "
              : ""}
            {user.shippingInfo.division ? user.shippingInfo.division : ""}
          </Typography>
          {user.shippingInfo.phoneNumber && (
            <Typography>{user.shippingInfo.phoneNumber}</Typography>
          )}
        </Stack>
        <Stack>
          {/* Billing */}
          <Typography variant="body2">Billing Info</Typography>
          <Typography variant="h6">{user?.billingInfo?.fullName}</Typography>
          {user.billingInfo.street && (
            <Typography>{user.billingInfo.street}</Typography>
          )}
          <Typography>
            {user.billingInfo.upazila ? user.billingInfo.upazila + " - " : ""}
            {user.billingInfo.district ? user.billingInfo.district + " - " : ""}
            {user.billingInfo.division ? user.billingInfo.division : ""}
          </Typography>
          {user.billingInfo.phoneNumber && (
            <Typography>{user.billingInfo.phoneNumber}</Typography>
          )}
        </Stack>
      </Stack>
    </>
  );
}
