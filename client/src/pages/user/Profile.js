import PropTypes from "prop-types";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Link,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Typography,
} from "@mui/material";
import EditProfile from "../../components/EditProfile";
import ViewProfile from "../../components/ViewProfile";
import { forwardRef, useState } from "react";
import { useSelector } from "react-redux";
import AddressBook from "../../components/AddressBook";
import { AddRoad, Edit } from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade direction="left" ref={ref} {...props} />;
});

const Profile = () => {
  const [nowShowing, setNowShowing] = useState("My Profile");

  const user = useSelector((state) => state.user.currentUser);

  return (
    <Container maxWidth="xl">
      <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "row" }}>
        <Stack
          direction="column"
          sx={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
            height: "90vh",
          }}
        >
          <Link
            variant="button"
            onClick={() => setNowShowing("My Profile")}
            underline="none"
            sx={{ cursor: "pointer" }}
          >
            My Profile
          </Link>
          <Link
            variant="button"
            onClick={() => setNowShowing("Edit Profile")}
            sx={{ cursor: "pointer" }}
            underline="none"
          >
            Edit Profile
          </Link>
          <Link
            variant="button"
            onClick={() => setNowShowing("Address Book")}
            underline="none"
            sx={{ cursor: "pointer" }}
          >
            Address Book
          </Link>
        </Stack>
        <Stack
          sx={{
            flex: 9,
          }}
        >
          <Typography variant="h6">{nowShowing}</Typography>
          <Stack sx={{ bgcolor: "white", height: "80vh", overflowY: "scroll" }}>
            {nowShowing === "My Profile" ? (
              <ViewProfile />
            ) : nowShowing === "Edit Profile" ? (
              <EditProfile />
            ) : (
              nowShowing === "Address Book" && <AddressBook />
            )}
          </Stack>
          {/* 
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
        </Dialog> */}
        </Stack>
      </Container>
    </Container>
  );
};

export default Profile;
