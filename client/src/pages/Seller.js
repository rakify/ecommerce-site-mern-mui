import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Slide,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { forwardRef, useState } from "react";
import { useSelector } from "react-redux";
import AddProduct from "../components/AddProduct";
import ViewSeller from "../components/ViewSeller";
import { Add } from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Seller = () => {
  const [addProductOpen, setAddProductOpen] = useState(false);

  const seller = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Box sx={{ position: "relative", textAlign: "left" }}>
        <Avatar
          src={seller?.img}
          sx={{ borderRadius: 0, width: "100%", height: 200 }}
        />
        <Typography
          variant="h3"
          sx={{
            position: "absolute",
            bottom: 0,
            background:
              "rgba(0, 0, 0, 0.5)" /* Black background with 0.5 opacity */,
            color: "#f1f1f1" /* Grey text */,
            width: "100%",
          }}
        >
          {seller?.username}
        </Typography>
      </Box>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <ViewSeller />

        <Tooltip title="Add New Product">
          <Fab
            onClick={() => setAddProductOpen(true)}
            color="primary"
            aria-label="add"
            sx={{ position: "fixed", bottom: 16, right: 16 }}
          >
            <Add />
          </Fab>
        </Tooltip>

        <Dialog
          TransitionComponent={Transition}
          transitionDuration={1000}
          open={addProductOpen}
          scroll="paper"
          aria-labelledby="title"
        >
          <DialogActions>
            <Button onClick={() => setAddProductOpen(false)}>Cancel</Button>
          </DialogActions>
          <DialogTitle id="title" variant="h6" sx={{ pb: 1 }}>
            Add New Product
          </DialogTitle>
          <DialogContent>
            <AddProduct />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default Seller;
