import PropTypes from "prop-types";
import {
  Container,
  Fade,
  Stack,
  Link,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import EditProfile from "../../components/EditProfile";
import ViewProfile from "../../components/ViewProfile";
import { forwardRef, useState } from "react";
import { useSelector } from "react-redux";
import AddressBook from "../../components/AddressBook";
import { AddRoad, Edit } from "@mui/icons-material";
import EditAddressBook from "../../components/EditAddressBook";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade direction="left" ref={ref} {...props} />;
});

const Profile = () => {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addressBookOpen, setAddressBookOpen] = useState(false);

  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Container maxWidth="xl" sx={{ bgcolor: "#d3d3d3", p: 2 }} disableGutters>
        <Typography sx={{ pb: 2 }} variant="h5">
          Manage My Account
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          sx={{ bgcolor: "white" }}
        >
          <Stack>
            <Typography variant="h6" sx={{ mb: 2, mt: 1 }}>
              Personal Profile{" | "}
              <Link component="button" onClick={() => setEditProfileOpen(true)}>
                <Edit />
              </Link>
            </Typography>
            <Stack direction="row" justifyContent="center">
              <ViewProfile />
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="h6" sx={{ mb: 2, mt: 1 }}>
              Address Book{" | "}
              <Link component="button" onClick={() => setAddressBookOpen(true)}>
                <Edit />
              </Link>
            </Typography>
            <Stack direction="row" justifyContent="center">
              <AddressBook />
            </Stack>
          </Stack>
        </Stack>
      </Container>

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
          <EditAddressBook />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
