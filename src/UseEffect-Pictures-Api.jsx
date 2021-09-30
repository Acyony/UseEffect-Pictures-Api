import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
// import {FaSpinner} from 'react-icons/fa';
import Spin from "./spinner.png";

// -----------=^.^=-------- Stylizing components with "styled-components"
const Container = styled.div`
  border: 1px solid grey;
  margin: 2rem 1rem;
`;
const Tittle = styled.h3`
  color: darkgray;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin: 1rem 2rem 0 2rem;
`;

const Input = styled.input`
  height: 2rem;
  width: 30vw;
  margin: 0rem 2rem;
`;

const Img = styled.img`
  object-fit: cover;
  border: 1px solid white;
  border-radius: 5px;
  margin: 10px;
  width: 100%;
  height: 100%;
`;

const ImgDisplay = styled.div`
  width: 30vw;
  height: 45vh;
  margin-bottom: 2rem;
`;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-areas: "img img img";
  grid-gap: 1rem;
`;

const Button = styled.button`
  background: pink;
  width: 6rem;
  height: 2rem;
  margin: 1rem 2rem;
  color: white;
  font-weight: bold;
`;

const SubTittle = styled(Tittle)`
  font-size: 1rem;
`;

// -----------=^.^=-------- Animation spinner

const animate = keyframes`
from{
    transform: rotate(0deg)
}
from {
    transform: rotate(360deg)

}
`;

const Spinner = styled.img`
  width: 1rem;
  height: 1rem;
  margin: 10px;
  animation: ${animate} 1000ms linear infinite;
`;

// -----------=^.^=-------- My component
export default function Gallery() {
  const [query, setQuery] = useState("flowers");
  const [totalImagesToFetch, setTotalImagesToFetch] = useState(1);
  const [images, setImages] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  // -----=^.^-=-----
  const [loading, setLoading] = useState(false);

  // -----=^.^-=----- To get the data from the Api
  let url = `https://api.unsplash.com/search/photos?per_page=${totalImagesToFetch}&query=${query}&client_id=QlPLII17-U31C8RMJEeA-ZSoXyf_GcgeWJxUOjCKOn4`;

  // -----=^.^-=----- UseEffect
  useEffect(() => {
    //-----=^.^-=----- the following code will be execute after mounting and after every update
    setLoading(true); // -----=^.^-=----- Making the spinner visible

    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        setImages(resData.results);
        setLoading(false); // -----=^.^-=----- Making the spinner invisible
      });

    setLoading(false);
  }, [query]);

  
  // -----=^.^-=----- UseEffect with Async
  //   useEffect(async() => {
  //     //-----=^.^-=----- the following code will be execute after mounting and after every update
  //     setLoading(true); // -----=^.^-=----- Making the spinner visible

  //     let res = await fetch(url);
  //     let data = await res.json();

  //     await setImages(data.results);
  //     setLoading(false); // -----=^.^-=----- Making the spinner invisible
  //   }, [query]);


  // -----=^.^-=----- To get the input value (search)
  const handleSearchInputChange = function (event) {
    setSearchInputValue(event.target.value);
  };

  // -----=^.^-=----- To get the input value (Number of images)
  const handleTotalImagesToFetchChange = function (event) {
    setTotalImagesToFetch(event.target.value);
  };

  return (
    <>
      <Container>
        <Tittle>IMAGE PEDIA</Tittle>
        <SubTittle>Type your keyword and value here</SubTittle>

        <Input
          placeholder={"Search..."}
          onChange={handleSearchInputChange}
        ></Input>

        <Input
          placeholder={"Number of pictures"}
          onChange={handleTotalImagesToFetchChange}
        ></Input>

        <Button
          onClick={(event) => {
            setQuery(searchInputValue);
          }}
        >
          Submit
        </Button>

        <ImagesContainer>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "60%",
                height: "",
              }}
            >
              <Spinner src={Spin} />
            </div>
          ) : (
            images.map((image, index) => (
              <ImgDisplay key={index}>
                <Img src={image.urls.small} key={index + 1}></Img>
              </ImgDisplay>
            ))
          )}
        </ImagesContainer>
      </Container>
    </>
  );
}
