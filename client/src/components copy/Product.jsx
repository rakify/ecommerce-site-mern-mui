import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { addCart } from './../redux/apiCalls';
import { useDispatch } from 'react-redux';


const Info = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1 1 0px;
  margin: 5px;
  min-width: 280px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
  flex-direction: column;
  position: relative;
  
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  max-width: 150px;
  max-height: 150px;
  flex:2 1 0px;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: gold;
    transform: scale(1.1);
  }
`;
const Product = ({ item }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.currentUser?._id);
  
  const productInfo = {
    productId: item._id,
    title: item.title,
    img: item.img,
    quantity: 1,
    price: item.price,
  };

  const handleClick = () => {
    !id && history.push("/login");
    id && addCart(id, productInfo, dispatch);
  };


  return (
    <Container>
    <Image src={item.img} />
    <Info>
      <Icon onClick={handleClick}>
        <ShoppingCartOutlined />
      </Icon>
      <Icon>
        <Link to={`/product/${item._id}`}>
        <SearchOutlined />
        </Link>
      </Icon>
      <Icon>
        <FavoriteBorderOutlined />
      </Icon>
    </Info>
  </Container>
  );
};

export default Product;
