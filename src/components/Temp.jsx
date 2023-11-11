import React, {useEffect} from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/constants";
import axios from "axios";

export default function CurrentTrack() {
    const [{token, currentlyPlaying}, dispatch]= useStateProvider();
    useEffect(() => {
      const getCurrentTrack = async () => {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data !== "") {
          const currentPlaying = {
            id: response.data.item.id,
            name: response.data.item.name,
            artists: response.data.item.artists.map((artist) => artist.name),
            image: response.data.item.album.images[2].url,
          };
          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
        } else {
          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
        }
        console.log(response);
      };
      getCurrentTrack();
    }, [token, dispatch]);

  return (
    <Container>
      Current track
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &_image {
    }
    &_info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      &__track__name {
        color: white;
      }
      &__track__artists {
        color: #b3b3b3;
      }
    }
  }
`;