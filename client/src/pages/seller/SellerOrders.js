import React, { useEffect } from "react";
import { getOrdersAsSeller } from "../../redux/apiCalls";

export default function SellerOrders() {
  useEffect(() => {
    getOrdersAsSeller().then((res) => console.log(res));
  }, []);
  return <div>Coming Soon</div>;
}
