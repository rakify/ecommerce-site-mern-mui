import { Category, DraftsSharp, InboxSharp } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const Sidebar = () => {
  return (
    <Box
      flex={1}
      bgcolor="whitesmoke"
      p={2}
      sx={{
        display: { xs: "none", sm: "block" },
      }}
    >
      <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
        <Category sx={{ paddingRight: 1 }} />
        Categories
      </Typography>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 150,
          "& ul": { padding: 0 },
        }}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Tshirts" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Fruits" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Vegetables" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Electronics" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Kids Zone" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Mobiles" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
