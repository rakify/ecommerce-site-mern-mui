import styled from "@emotion/styled";
import {
  Apartment,
  Badge,
  Cottage,
  Create,
  Key,
  Mail,
  PermPhoneMsg,
  Person,
  Phone,
  Portrait,
  Wc,
} from "@mui/icons-material";
import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const ViewProfile = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Stack direction="column" justifyContent="center" gap={2}>
        <Stack flex={2}>
          <Typography variant="body2">
            Contact Information
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Mail />
              </ListItemIcon>
              <ListItemText primary={user.email} secondary="Email" />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <Phone />
              </ListItemIcon>
              <ListItemText
                primary={user.phoneNumber || "Please provide a phone number"}
                secondary="Phone"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PermPhoneMsg />
              </ListItemIcon>
              <ListItemText
                primary={
                  user.secondaryPhoneNumber ||
                  "Please provide a secondary phone number"
                }
                secondary="Secondary Phone"
              />
            </ListItem>
          </List>
        </Stack>

        <Stack flex={2}>
          <Typography sx={{ mb: 2 }} variant="body2">
            More Information
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Key />
              </ListItemIcon>
              <ListItemText
                primary={user.username}
                secondary={user.accountType ? "Shop Name" : "Username"}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Portrait />
              </ListItemIcon>
              <ListItemText
                primary={user.firstName + " " + user.lastName}
                secondary="Full Name"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Apartment />
              </ListItemIcon>
              <ListItemText
                primary={user.currentCity || "Not provided"}
                secondary="Current City"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Cottage />
              </ListItemIcon>
              <ListItemText
                primary={user.hometown || "Not provided"}
                secondary="Hometown"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Wc />
              </ListItemIcon>
              <ListItemText
                primary={
                  user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
                }
                secondary="Gender"
              />
            </ListItem>
          </List>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack flex={1}>
          <Typography sx={{ mb: 2 }} variant="body2">
            Account Information
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Badge />
              </ListItemIcon>
              <ListItemText
                primary={user.accountType === 1 ? "Seller" : "Customer"}
                secondary="Account Type"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Create />
              </ListItemIcon>
              <ListItemText
                primary={
                  new Date(user.createdAt).getDate() +
                  " " +
                  new Date(user.createdAt).toLocaleString("default", {
                    month: "long",
                  }) +
                  " " +
                  new Date(user.createdAt).getFullYear()
                }
                secondary="Registered"
              />
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </>
  );
};

export default ViewProfile;
