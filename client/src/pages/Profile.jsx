import styled from "styled-components";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/apiCalls";
import { useHistory } from "react-router";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import app from "../firebase";
import { updateUser } from "../redux/apiCalls";

const User = styled.div`
  flex: 4;
  padding: 20px;
`;

const UserTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserAddButton = styled.button`
  /* width: 80px; */
  border: none;
  padding: 5px;
  background-color: teal;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-size: 16px;
`;

const UserContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const UserShow = styled.div`
  flex: 1;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const UserUpdate = styled.div`
  flex: 2;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-left: 20px;
`;

const UserShowTop = styled.div`
  display: flex;
  align-items: center;
`;

const UserShowImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserShowTopTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const UserShowUsername = styled.span`
  font-weight: 600;
`;

const UserShowUserTitle = styled.span`
  font-weight: 300;
`;

const UserShowBottom = styled.div`
  margin-top: 20px;
`;

const UserShowTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: rgb(175, 170, 170);
`;

const UserShowInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
`;

const UserShowIcon = styled.div`
  font-size: 16px !important;
`;

const UserShowInfoTitle = styled.div`
  margin-left: 10px;
`;

const UserUpdateTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const UserUpdateForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const UserUpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

// const Label = styled.div`
//   margin-bottom: 5px;
//   font-size: 14px;
// `;

const UserUpdateInput = styled.input`
  border: none;
  width: 250px;
  height: 30px;
  border-bottom: 1px solid gray;
`;
const UserUpdateLeft = styled.div``;
const UserUpdateRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserUpdateUpload = styled.div`
  display: flex;
  align-items: center;
`;

const UserUpdateImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const UserUpdateIcon = styled.div`
  cursor: pointer;
`;

const UserUpdateButton = styled.div`
  border-radius: 5px;
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: darkblue;
  color: white;
  font-weight: 600;
`;

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    state.user.currentUser);
  const [inputs, setInputs] = useState({
    username: user.username,
    name: user.name,
    email: user.email,
    address: user.address,
    pn: user.pn,
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClickWithFile = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const updatedUser = {
            ...user,
            ...inputs,
            img: downloadURL,
          };
          updateUser(user._id, updatedUser, dispatch);
        });
      }
    );
  };

  const handleClick = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      ...inputs,
    };
    updateUser(user._id, updatedUser, dispatch);
  };

  return (
    <User>
      <UserTitleContainer>
        <h1>My Profile</h1>
        <Link to="/orders">
          <UserAddButton>My Orders</UserAddButton>
        </Link>
      </UserTitleContainer>
      <UserContainer>
        <UserShow>
          <UserShowTop>
            <UserShowImg src={user.img} />
            <UserShowTopTitle>
              <UserShowUsername>{user.username}</UserShowUsername>
              <UserShowUserTitle>{user?.name}</UserShowUserTitle>
            </UserShowTopTitle>
          </UserShowTop>
          <UserShowBottom>
            <UserShowTitle>Account Details</UserShowTitle>
            <UserShowInfo>
              <UserShowIcon>
                <PermIdentity />
              </UserShowIcon>
              <UserShowInfoTitle>{user.username}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <UserShowIcon>
                <CalendarToday />
              </UserShowIcon>
              <UserShowInfoTitle>{user?.birth}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowTitle>Contact Details</UserShowTitle>
            <UserShowInfo>
              <UserShowIcon>
                <PhoneAndroid />
              </UserShowIcon>
              <UserShowInfoTitle>{user?.pn}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <UserShowIcon>
                <MailOutline />
              </UserShowIcon>
              <UserShowInfoTitle>{user.email}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <UserShowIcon>
                <LocationSearching />
              </UserShowIcon>
              <UserShowInfoTitle>{user.address}</UserShowInfoTitle>
            </UserShowInfo>
          </UserShowBottom>
        </UserShow>
        <UserUpdate>
          <UserUpdateTitle>Edit</UserUpdateTitle>
          <UserUpdateForm>
            <UserUpdateLeft>
              <UserUpdateItem>
                <label>Username</label>
                <UserUpdateInput
                  type="text"
                  name="username"
                  value={inputs.username ? inputs.username : ""}
                  onChange={handleChange}
                  required
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Full Name</label>
                <UserUpdateInput
                  type="text"
                  name="name"
                  value={inputs.name ? inputs.name : ""}
                  onChange={handleChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Email</label>
                <UserUpdateInput
                  type="text"
                  name="email"
                  value={inputs.email ? inputs.email : ""}
                  onChange={handleChange}
                  required
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Phone</label>
                <UserUpdateInput
                  type="text"
                  name="pn"
                  value={inputs.pn ? inputs.pn : ""}
                  onChange={handleChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <label>Address</label>
                <UserUpdateInput
                  type="text"
                  name="address"
                  value={inputs.address ? inputs.address : ""}
                  onChange={handleChange}
                  required
                />
              </UserUpdateItem>
            </UserUpdateLeft>
            <UserUpdateRight>
              <UserUpdateUpload>
                <UserUpdateImg
                  src={file ? URL.createObjectURL(file) : user.img}
                  alt=""
                />
                <label htmlFor="file">
                  <UserUpdateIcon>
                    <Publish />
                  </UserUpdateIcon>
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </UserUpdateUpload>
              <UserUpdateButton
                onClick={file ? handleClickWithFile : handleClick}
              >
                Update
              </UserUpdateButton>
            </UserUpdateRight>
          </UserUpdateForm>
        </UserUpdate>
      </UserContainer>
    </User>
  );
}
