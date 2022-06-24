import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getOrders } from "../redux/apiCalls";
import { CircularProgress, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import styled from "@emotion/styled";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Orders() {
  const [orders, setOrders] = useState([]);
  // Get All Orders
  useEffect(() => {
    getOrders().then((res) => setOrders(res));
  }, []);

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        10 Recent Orders
      </Typography>
      <Paper
        sx={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        {!orders ? (
          <CircularProgress />
        ) : orders.length === 0 ? (
          <Typography>No order has been placed yet.</Typography>
        ) : (
          <Table size="small" sx={{ minWidth: 300 }}>
            <>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Placed At</StyledTableCell>
                  <StyledTableCell>Customer</StyledTableCell>
                  <StyledTableCell>Ship To</StyledTableCell>
                  <StyledTableCell>Payment Method</StyledTableCell>
                  <StyledTableCell>Delivery Slot</StyledTableCell>
                  <StyledTableCell align="right">Total Amount</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {orders.slice(0, 10).map((order) => (
                  <StyledTableRow key={order._id}>
                    <StyledTableCell>
                      <Moment fromNow>{order.createdAt}</Moment>
                    </StyledTableCell>
                    <StyledTableCell>{order.user.username}</StyledTableCell>
                    <StyledTableCell>
                      {order.shippingInfo.district &&
                      order.shippingInfo.division
                        ? order.shippingInfo.district +
                          "," +
                          order.shippingInfo.division
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell>
                      {order.paymentMethod || "Cash on delivery"}
                    </StyledTableCell>
                    <StyledTableCell>{order.deliveryTimeSlot}</StyledTableCell>
                    <StyledTableCell align="right">{`৳${order.totalAmount}`}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </>
          </Table>
        )}
      </Paper>
      {orders.length > 10 && (
        <Link color="primary" href="/orders" sx={{ mt: 3 }}>
          See more orders
        </Link>
      )}
    </>
  );
}
