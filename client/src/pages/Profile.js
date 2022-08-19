import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Typography,
} from "@mui/material";
import EditProfile from "../components/EditProfile";
import ViewProfile from "../components/ViewProfile";
import { forwardRef, useState } from "react";
import { useSelector } from "react-redux";
import AddressBook from "../components/AddressBook";
import { AddRoad, Edit } from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade direction="left" ref={ref} {...props} />;
});

const actions = [
  { icon: <Edit />, name: "Edit Profile" },
  { icon: <AddRoad />, name: "Address Book" },
];

const Profile = () => {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addressBookOpen, setAddressBookOpen] = useState(false);

  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Typography variant="h6">Your Profile</Typography>
      <Stack
        direction="row"
        sx={{
          height: "100vh",
        }}
      >
        <ViewProfile />

        <SpeedDial
          ariaLabel="SpeedDial"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              onClick={() =>
                action.name === "Edit Profile"
                  ? setEditProfileOpen(true)
                  : action.name === "Address Book"
                  ? setAddressBookOpen(true)
                  : ""
              }
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
            />
          ))}
        </SpeedDial>

        <Dialog
          TransitionComponent={Transition}
          open={editProfileOpen}
          scroll="paper"
          aria-labelledby="title"
        >
          <DialogActions>
            <Button onClick={() => setEditProfileOpen(false)}>Cancel</Button>
          </DialogActions>
          <DialogTitle id="title" variant="h6" sx={{ pb: 1 }}>
            Edit Profile
          </DialogTitle>
          <DialogContent>
            <EditProfile />
          </DialogContent>
        </Dialog>

        <Dialog
          TransitionComponent={Transition}
          open={addressBookOpen}
          scroll="paper"
          aria-labelledby="title"
        >
          <DialogActions>
            <Button onClick={() => setAddressBookOpen(false)}>Cancel</Button>
          </DialogActions>
          <DialogTitle id="title" variant="h6" sx={{ pb: 1 }}>
            Address Book
          </DialogTitle>
          <DialogContent>
            <AddressBook />
          </DialogContent>
        </Dialog>
      </Stack>
    </>
  );
};

export default Profile;
