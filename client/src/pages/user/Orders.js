import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Container,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderDetails from "../../components/OrderDetails";
import { getOrders } from "../../redux/apiCalls";

const Orders = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  useEffect(() => {
    getOrders(user._id).then((res) => setOrders(res));
  }, [user._id]);

  return (
    <>
      {showDetails ? (
        <OrderDetails orderDetails={orderDetails} />
      ) : (
        <Container maxWidth="xl" sx={{ bgcolor: "whitesmoke" }}>
          <Typography variant="h6">Order History</Typography>
          <Container>
            {orders.length === 0 ? (
              <Typography>You have no orders.</Typography>
            ) : (
              <Typography>
                You have made total {orders.length}{" "}
                {orders.length === 1 ? "order" : "orders"} with us. Thanks for
                staying with us.
              </Typography>
            )}
            {orders.map((order) => (
              <Paper key={order._id} elevation={1} sx={{ p: 1, m: 1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  sx={{ marginTop: 2 }}
                >
                  <Stack direction="column" flex={4}>
                    <Typography variant="h6">
                      Order{" "}
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                          setShowDetails(true);
                          setOrderDetails(order);
                        }}
                        underline="hover"
                      >
                        #{order._id}
                      </Link>
                    </Typography>
                    <Typography variant="caption">
                      Placed on {new Date(order.createdAt).toLocaleString()} |
                      Status: <b>{order.orderStatus.toUpperCase()}</b>
                    </Typography>
                  </Stack>
                  <Stack sx={{ flex: 1, alignItems: "flex-end" }}>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => {
                        setShowDetails(true);
                        setOrderDetails(order);
                      }}
                      underline="hover"
                    >
                      Manage
                    </Link>
                  </Stack>
                </Stack>
              </Paper>
            ))}
          </Container>
        </Container>
      )}
    </>
  );
};

export default Orders;
