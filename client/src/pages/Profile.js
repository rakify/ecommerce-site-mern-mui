import PropTypes from "prop-types";
import { Paper, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import EditProfile from "../components/EditProfile";
import ViewProfile from "../components/ViewProfile";
import { useState } from "react";
import { useSelector } from "react-redux";

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
      <Paper variant="outlined" sx={{ backgroundColor: "##d0eafb" }}>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={user.username} {...a11yProps(0)} />
          <Tab label="Edit Profile" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ViewProfile />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <EditProfile />
        </TabPanel>
      </Paper>
    </>
  );
};

export default Profile;
