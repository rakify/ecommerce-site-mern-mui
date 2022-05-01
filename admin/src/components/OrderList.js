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
import { DeleteOutlined, Edit } from "@mui/icons-material";
import { deleteOrder, getOrders } from "../redux/apiCalls";
import { Box } from "@mui/system";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderList() {
  const [orders, setOrders] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(false);

  useEffect(() => {
    getOrders().then((res) => setOrders(res));
  }, []);

  const handleDelete = (id) => {
    setDeleteOrderId(false);
    deleteOrder(id).then(() => getOrders().then((res) => setOrders(res)));
  };

  const handleCloseDialog = () => {
    setDeleteOrderId(false);
  };

  const columns = [
    {
      field: "_id",
      headerClassName: "super-app-theme--header",
      headerName: "Order ID",
      width: 200,
      editable: true,
    },
    {
      field: "user.username",
      headerName: "User",
      headerClassName: "super-app-theme--header",
      width: 200,
      editable: true,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Avatar src={params.row.user.img} alt="" />
            <Typography>{params.row.user.username}</Typography>
          </Stack>
        );
      },
    },
    {
      field: "createdAt",
      headerClassName: "super-app-theme--header",
      headerName: "Created At",
      width: 200,
      editable: true,
    },
    {
      field: "deliveryTimeSlot",
      headerClassName: "super-app-theme--header",
      headerName: "Time Slot",
      width: 150,
      editable: true,
    },
    {
      field: "orderStatus",
      headerClassName: "super-app-theme--header",
      headerName: "Status",
      width: 100,
      editable: true,
    },
    {
      field: "paymentMethod",
      headerClassName: "super-app-theme--header",
      headerName: "Payment",
      width: 150,
      editable: true,
    },
    {
      field: "totalAmount",
      headerClassName: "super-app-theme--header",
      headerName: "Amount",
      width: 100,
      editable: true,
    },
    {
      field: "action",
      headerClassName: "super-app-theme--header",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Link
              href={"/order/" + params.row._id}
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
              onClick={() => setDeleteOrderId(params.row._id)}
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
      <DataGrid
        rows={orders}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[4]}
        density="comfortable"
        loading={!orders}
        sx={{
          mt: 10,
          height: 500,
        }}
      />

      <Dialog
        open={Boolean(deleteOrderId)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you proceed now order with ID {deleteOrderId} will be erased.
            This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleDelete(deleteOrderId)}>Proceed</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
