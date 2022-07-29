import { Container, Link, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const ToBeSeller = () => {
  const user = useSelector((state) => state.user.currentUser) || "";
  return (
    <Container>
      <Typography variant="h3" sx={{ color: "red" }}>
        Notice!
      </Typography>
      <Typography>
        You are waiting for approval to be seller.{" "}
        {user.phoneNumber && (
          <p>
            One of our representative will contact you soon to this{" "}
            <u>{user.phoneNumber}</u> number.
          </p>
        )}
        <br /> In the meantime you might want to make some changes to your{" "}
        <Link href="/profile" underline="hover">
          profile
        </Link>
        .
      </Typography>
    </Container>
  );
};

export default ToBeSeller;
