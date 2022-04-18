import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/apiCalls";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center", flex: 2 })}
`;

const MenuItem = styled.div`
  font-weight: 300;
  font-size: 18px;
  margin-left: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Logout = styled.span`
  margin-left: 10px;
  color: red;
  cursor: pointer;
`;

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.cart.products.length);
  const dispatch = useDispatch();

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>

        <Center>
          <Logo>
            <Link style={{ textDecoration: "none" }} to="/">
              Shop Non-Stop
            </Link>
          </Logo>
        </Center>

        <Right>
          {user && (
            <MenuItem>
              <Link
                style={{ textDecoration: "none", marginRight: "10px" }}
                to="/profile"
              >
                {user.username}
              </Link>
              <Image src={user.img} />
              <Logout onClick={() => logout(dispatch)}>(Logout)</Logout>
            </MenuItem>
          )}
          {!user && (
            <>
              <MenuItem>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  Register
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </MenuItem>
            </>
          )}
          <MenuItem>
            <Link to="/cart">
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
