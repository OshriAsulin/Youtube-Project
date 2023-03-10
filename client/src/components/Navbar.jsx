import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { logout } from "../redux/userSlice";
import './NavBar.css'
import ArrowDropDownCircleTwoToneIcon from '@mui/icons-material/ArrowDropDownCircleTwoTone';
// import {Cookies} from 'react-cookie'
import Cookie from 'js-cookie'
import Cookies from 'universal-cookie';
import { Upload } from "./Upload";
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};

`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
display: flex;
align-items: center;
gap: 10px;
font-weight: 500;
color: ${({ theme }) => theme.text};
`
const Avatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
background-color: #999`


const Navbar = () => {
  const { currentUser } = useSelector(state => state.user)
  const [q, setQ] = useState("")
const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const sopen = () => {
    setOpen(!open)
  }
  const [dropDownBtn, setdropDownBtn] = useState(false);
  const openLogoutbtn = () => {
    setdropDownBtn(!dropDownBtn)
  }
  const dispatch = useDispatch()
  const logOut = () => {
    dispatch(logout())
    // localStorage.removeItem("persist:root");
    // const cookies = Cookies
    // cookies.remove('access_token')
    // let removeCookie = browser.Cookies.remove('access_token', )
    // Cookies.remove('access_token', { path:'http://localhost:3000/signin'})


    // const cookies = new Cookies();

    // console.log(cookies.get())



  }
  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search" onChange={e=>setQ(e.target.value)}/>
            <SearchOutlinedIcon className="searchbtn" onClick={()=>navigate(`/search?q=${q}`)}/>
          </Search>
          {
            currentUser ? <ArrowDropDownCircleTwoToneIcon onClick={openLogoutbtn} className="dropdownbtn" />
              : null
          }
          {dropDownBtn &&
            <div className="logutDiv">
              {
                currentUser ?
                  <Button className="logoutbtn" onClick={logOut}>logout</Button> : ""
              }

            </div>
          }
          <button onClick={logOut}>delete</button>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon className="addbtn" onClick={sopen} />
              <Avatar src={currentUser.img} />
              {currentUser.name}
            </User>
          ) : (<Link to="signin" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>)}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen}/>}
    </>
  );
};

export default Navbar;
