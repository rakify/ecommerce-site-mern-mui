import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0", flexDirection: "column" })}
`;

const Categories = () => {
  const categories = [
    {
      id: 1,
      img: "https://i.postimg.cc/bJdWfc45/basket-918416-1920.jpg",
      title: "GROCERIES!",
      cat: "women"
    },
    {
      id: 2,
      img: "https://i.postimg.cc/26vdZ0W6/gadgets-336635-1920.jpg",
      title: "ACCESSORIES",
      cat: "tshirt"
    },
    {
      id: 3,
      img: "https://i.postimg.cc/zDpmb7Fp/tshirt-2428521-1920.jpg",
      title: "Casual Clothes",
      cat: "man"
    },
  ];
  
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
