import { Facebook, Instagram, MailOutlined, PhoneAndroidOutlined, Room, Twitter } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from './../responsive';

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h1``;
const Desc = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: green;
  margin-right: 10px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0; //ul has its own margin and padding
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ background: "lightgray" })}
`;
const ContactItem = styled.div`
margin-bottom: 20px;
display: flex;
align-items: center;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Rakify</Logo>
        <Desc>
          Cras facilisis quam dolor, eu ullamcorper odio sollicitudin vel. Nulla
          pharetra venenatis sagittis. Phasellus accumsan semper hendrerit. Nunc
          congue consectetur mauris non porttitor. Donec in massa dignissim,
          eleifend tellus a, dapibus leo. Mauris eu volutpat lorem. Duis at
          commodo augue, non ullamcorper tellus.
        </Desc>
        <SocialContainer>
          <SocialIcon>
            <Facebook />
          </SocialIcon>
          <SocialIcon>
            <Instagram />
          </SocialIcon>
          <SocialIcon>
            <Twitter />
          </SocialIcon>
        </SocialContainer>
      </Left>

      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Track Order</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms and Conditions</ListItem>
          <ListItem>Privacy Policy</ListItem>
          <ListItem>Purchasing Policy</ListItem>
          <ListItem>Career</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact Us</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}} />
          House #8, Road # 14, Dhanmondi, Dhaka-1209.
        </ContactItem>
        <ContactItem><PhoneAndroidOutlined style={{marginRight:"10px"}} /> +8801874557769</ContactItem>
        <ContactItem><MailOutlined style={{marginRight:"10px"}} /> irakibm@gmail.com</ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
