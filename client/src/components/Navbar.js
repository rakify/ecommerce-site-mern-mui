import styled from "@emotion/styled";
import { ChevronRight } from "@mui/icons-material";
import {
  Avatar,
  Button,
  ButtonBase,
  Divider,
  Link,
  Paper,
  Stack,
  Tooltip,
  tooltipClasses,
  Typography,
} from "@mui/material";
import SubCatList from "./SubCatList";
import { getCats } from "../redux/apiCalls";
import React, { useEffect, useState } from "react";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "100vw",
    padding: 20,
    fontSize: 15,
    mr: 20,
  },
}));

const Navbar = () => {
  const [catList, setCatList] = useState([]);

  // get categories from api
  useEffect(() => {
    getCats().then((res) => {
      setCatList(res.data.slice(0, 8));
    });
  }, []);

  return (
    <>
      <Typography sx={{ pl: 5, fontSize: 15 }}>Categories</Typography>
      <Divider sx={{ m: 2 }} />
      <Stack
        justifyContent="space-between"
        sx={{
          padding: 2,
          gap: 2,
          cursor: "grab",
        }}
      >
        {catList.map((cat) => (
          <React.Fragment key={cat._id}>
            <Link
              underline="hover"
              href={"/products/" + cat.value}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Avatar src={cat.img} sx={{ width: 25, height: 25 }} alt="img" />
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  fontSize: 10,
                }}
              >
                {cat.label}
              </Typography>
              <ChevronRight />
            </Link>
          </React.Fragment>
        ))}
      </Stack>
    </>
  );
};

export default Navbar;
