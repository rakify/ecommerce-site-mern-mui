import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getOrders } from "../redux/apiCalls";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

function preventDefault(event) {
  event.preventDefault();
}

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
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Delivery Slot</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.slice(0,10).map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order.createdAt}</TableCell>
              <TableCell>{order.user.username}</TableCell>
              <TableCell>
                {order.user.shippingInfo.district &&
                order.user.shippingInfo.division
                  ? order.user.shippingInfo.district +
                    "," +
                    order.user.shippingInfo.division
                  : "Not provided"}
              </TableCell>
              <TableCell>{order.paymentMethod || "Cash on delivery"}</TableCell>
              <TableCell>{order.deliveryTimeSlot || "Not provided"}</TableCell>
              <TableCell align="right">{`$${order.totalAmount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </>
  );
}
