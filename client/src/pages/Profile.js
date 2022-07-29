import PropTypes from "prop-types";
import { Avatar, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import EditProfile from "../components/EditProfile";
import ViewProfile from "../components/ViewProfile";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddressBook from "../components/AddressBook";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Profile = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ pt: 2, bgcolor: "#66BFBF" }}
      >
        <Avatar
          src={user.img}
          alt=""
          sx={{
            height: 220,
            width: 250,
            objectFit: "contain",
            border: "1px solid black",
          }}
        />
        <Typography variant="subtitle1">{user.username}</Typography>
      </Stack>
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ borderRight: 2, borderColor: "divider", flex: 1 }}
        >
          <Tab label={user.username} {...a11yProps(0)} />
          <Tab label="Edit Profile" {...a11yProps(1)} />
          <Tab label="Address Book" {...a11yProps(2)} />
        </Tabs>
        <Stack sx={{ flex: 5 }}>
          <TabPanel value={value} index={0}>
            <ViewProfile />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EditProfile />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AddressBook />
          </TabPanel>
        </Stack>
      </Box>
    </>
  );
};

export default Profile;
