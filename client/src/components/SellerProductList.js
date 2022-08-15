import { forwardRef, useState } from "react";
import {
  IconButton,
  Typography,
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Stack,
  Fab,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, Edit, Add } from "@mui/icons-material";
import { deleteSellerProduct, getProductsAsSeller } from "../redux/apiCalls";
import EditProduct from "./EditProduct";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

export default function SellerProductList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const products = useSelector((state) => state.product.products);
  const [deleteProductId, setDeleteProductId] = useState(false);
  const [editProductId, setEditProductId] = useState(false);

  const handleDelete = (id) => {
    setDeleteProductId(false);
    deleteSellerProduct(id).then(getProductsAsSeller(user.username, dispatch));
  };

  const handleCloseDialog = () => {
    setDeleteProductId(false);
  };

  const columns = [
    {
      field: "_id",
      headerClassName: "super-app-theme--header",
      headerName: "Product ID",
      width: 250,
    },
    {
      field: "title",
      headerName: "Product",
      headerClassName: "super-app-theme--header",
      width: 350,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Avatar src={params.row.img} alt="" />
            <Typography>{params.row.title}</Typography>
          </Stack>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      headerClassName: "super-app-theme--header",
      width: 150,
    },
    {
      field: "inStock",
      headerName: "Stock",
      headerClassName: "super-app-theme--header",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 220,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <IconButton
              aria-label="edit"
              onClick={() => setEditProductId(params.row._id)}
            >
              <Edit />
            </IconButton>
            <IconButton
              disabled={params.row.isAdmin === true}
              aria-label="delete"
              onClick={() => setDeleteProductId(params.row._id)}
            >
              <DeleteOutlined />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
    <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
            
      {products.length === 0 && (
        <Typography>Start adding product to see them appear here.</Typography>
      )}

      <DataGrid
        rows={products}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        density="comfortable"
        sx={{ height: 500, width: "100%" }}
      />

      <Dialog
        TransitionComponent={Transition}
        transitionDuration={1000}
        open={Boolean(editProductId)}
        scroll="paper"
        aria-labelledby="title"
      >
        <DialogActions>
          <Button onClick={() => setEditProductId(false)}>Cancel</Button>
        </DialogActions>
        <DialogTitle id="title" variant="h6" sx={{ pb: 1 }}>
          Edit Product
        </DialogTitle>
        <DialogContent>
          <EditProduct productId={editProductId} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(deleteProductId)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you proceed now product with ID {deleteProductId} will be erased.
            This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleDelete(deleteProductId)}>Proceed</Button>
        </DialogActions>
      </Dialog>
      </Container>
    </>
  );
}
