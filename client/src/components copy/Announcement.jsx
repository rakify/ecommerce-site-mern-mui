import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center; //vartically
  justify-content: center; //horizontally
  font-size: 14px; //fz shortcode
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>Super Deal! Free Shipping on Orders above $100</Container>;
};

export default Announcement;
