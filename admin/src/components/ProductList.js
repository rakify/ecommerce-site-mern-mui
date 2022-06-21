import { forwardRef, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, Edit } from "@mui/icons-material";
import { deleteProduct, getProducts } from "../redux/apiCalls";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [deleteProductId, setDeleteProductId] = useState(false);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    setDeleteProductId(false);
    deleteProduct(id, dispatch);
  };

  const handleCloseDialog = () => {
    setDeleteProductId(false);
  };

  const columns = [
    {
      field: "_id",
      headerClassName: "super-app-theme--header",
      headerName: "Product ID",
      width: 200,
      editable: true,
    },
    {
      field: "title",
      headerName: "Product",
      headerClassName: "super-app-theme--header",
      width: 300,
      editable: true,
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
      editable: true,
    },
    {
      field: "inStock",
      headerName: "Stock",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: true,
    },
    {
      field: "seller",
      headerName: "Seller",
      headerClassName: "super-app-theme--header",
      width: 200,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Link
              href={"/product/" + params.row._id}
              underline="none"
              color="inherit"
            >
              <IconButton aria-label="edit">
                <Edit />
              </IconButton>
            </Link>
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
    <Container
      sx={{
        "& .super-app-theme--header": {
          backgroundColor: "#c2cad0",
        },
      }}
    >
      <Dialog
        open={Boolean(deleteProductId)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you proceed now product with ID {deleteProductId} will be erased.
            This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleDelete(deleteProductId)}>Proceed</Button>
        </DialogActions>
      </Dialog>

      <DataGrid
        rows={products}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[4]}
        disableSelectionOnClick
        density="comfortable"
        sx={{ mt: 10, height: 500 }}
      />
    </Container>
  );
}
