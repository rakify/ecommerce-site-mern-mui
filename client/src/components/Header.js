import {
  AccountCircle,
  Favorite,
  Inventory,
  LocalFlorist,
  LogoutSharp,
  SearchRounded,
  ShoppingCart,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Divider,
  IconButton,
  InputAdornment,
  InputBase,
  Link,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { logout } from "../redux/apiCalls";
import Notification from "./Notification";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Logo = styled("div")(({ theme }) => ({
}));
const Search = styled("div")(({ theme }) => ({
  width: "40%",
  padding: "0 10px",
  backgroundColor:"white",
  borderRadius: theme.shape.borderRadius,
}));
const Icons = styled("Box")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap:20
}));
const Title = styled(Box)({
  display: "inline-block",
  overflow: "hidden",
  margin: "0 auto",
  whiteSpace: "nowrap",
  fontWeight: 800,
  fontSize: 20,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  animation: "typing 3.5s steps(40, end), blink-caret .75s step-end infinite",
  "@keyframes typing": {
    from: {
      width: 0,
    },
    to: {
      width: "100%",
    },
  },
  "@keyframes blink-caret": {
    "from, to": { borderColor: "transparent" },
    "50%": { borderColor: "orange" },
  },
});
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = useSelector((state) => state.user.currentUser) || "";
  const cart = useSelector((state) => state.cart);

  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar sx={{ bgcolor: "#E3FDFD" }}>
          <Logo>
            <Link href="/" underline="none">
              <LocalFlorist sx={{ display: { sm: "none", xs: "block" } }} />
              <Title sx={{ display: { sm: "block", xs: "none" } }}>
                Bettermart
              </Title>
            </Link>
          </Logo>

          <Search>
            <InputBase
              startAdornment={
                <InputAdornment position="start">
                  <SearchRounded />
                </InputAdornment>
              }
              placeholder="Search..."
            ></InputBase>
          </Search>

          {user === "" && (
            <>
              <Icons>
                <Stack direction="column" justifyContent="space-between">
                  <Link href="/login" underline="hover">
                    <p>Login</p>
                  </Link>
                  <Link href="/register" underline="hover">
                    <p>Register</p>
                  </Link>
                </Stack>
              </Icons>
            </>
          )}

          {user && (
            <Icons>
              {user.accountType === 0 && (
                <Link href="/cart/" underline="none" color="inherit">
                  <Tooltip title="Shopping Cart">
                    <Badge
                      badgeContent={cart.products ? cart.products.length : 0}
                      color="error"
                    >
                      <ShoppingCart color="primary" />
                    </Badge>
                  </Tooltip>
                </Link>
              )}
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                sx={{ width: 20, height: 20 }}
              >
                <Avatar
                  alt="pic"
                  sx={{ width: 20, height: 20, cursor: "pointer" }}
                  src={user.img}
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  onMouseOver={handleClick}
                ></Avatar>
              </StyledBadge>
            </Icons>
          )}
        </StyledToolbar>
      </AppBar>

      {/* Menu on click profile picture */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          onMouseLeave: handleClose,
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{ pointer: "grab" }}
      >
        <MenuItem
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <AccountCircle fontSize="small" color="primary" />
          <Link href="/profile/" underline="none" color="inherit">
            Profile
          </Link>
        </MenuItem>
        {user.accountType === 0 && (
          <>
            <MenuItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Inventory fontSize="small" color="primary" />
              <Link href="/orders/" underline="none" color="inherit">
                Orders
              </Link>
            </MenuItem>
            <MenuItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ShoppingCart fontSize="small" color="primary" />
              <Link href="/cart/" underline="none" color="inherit">
                Cart
              </Link>
            </MenuItem>
            <MenuItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Favorite fontSize="small" color="primary" />
              <Link href="/wishlist/" underline="none" color="inherit">
                Wishlist
              </Link>
            </MenuItem>
          </>
        )}
        <Divider />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ pointer: "grab" }}
        >
          <IconButton onClick={() => logout()}>
            <Tooltip title="Logout">
              <LogoutSharp fontSize="small" color="primary" />
            </Tooltip>
          </IconButton>
          <Notification />
        </Stack>
      </Menu>
    </>
  );
}
