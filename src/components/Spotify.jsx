import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/constants";

export default function Spotify() {
  const[{token}, dispatch] = useStateProvider();
  const bodyRef = useRef();
  const[navbackground, setnavbackground] = useState(false);
  const[headerbackground, setheaderbackground] = useState(false);
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30 ? setnavbackground(true) : setnavbackground(false);
    bodyRef.current.scrollTop >= 268 ? setheaderbackground(true) : setheaderbackground(false);
  }

  useEffect(() =>{
    const getUserInfo = async () => {
      const {data} = await axios.get(
        "https://api.spotify.com/v1/me",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        const userInfo = {
          userID: data.id,
          userName: data.display_name,
        };
        dispatch({type: reducerCases.SET_USER, userInfo});
        console.log({data});
    };
    getUserInfo();
  }, [dispatch, token]);

  return (
    <Container>
      <div className="spotify_body">
        <Sidebar />
        <div className="body" ref = {bodyRef} onScroll={bodyScrolled}>
          <Navbar navbackground={navbackground}/>
          <div className="body_contents">
            <Body headerbackground={headerbackground}/>
          </div>
        </div>
      </div>
      <div className="spotify_footer">
        <Footer />
      </div>
    </Container>
  )
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100 vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify_body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
  }
  .body {
    height: 100%;
    width: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(0,255,150,.6);
      }
    }
  }
`;