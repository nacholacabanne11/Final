import React from "react";
import Slider from "react-slick";
import { Box, Image } from "@chakra-ui/react";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Box maxW="90%" mx="auto" mt={5}>
      <Slider {...settings}>
        <Box p={2}>
          <Image
            src="https://media.istockphoto.com/id/1363976548/es/foto/raqueta-de-p%C3%A1del-y-pelotas-en-la-pista-de-p%C3%A1del-azul.jpg?s=612x612&w=0&k=20&c=SKdeeGEcpZIxKbOUeCuEzBHcLD8CUOsNtMsZ-r9rLq4="
            alt="Imagen 1"
            boxSize="300px"
            objectFit="cover"
            borderRadius="lg"
          />
        </Box>
        <Box p={2}>
          <Image
            src="https://http2.mlstatic.com/D_NQ_NP_819604-MLV49422723980_032022-O.webp"
            alt="Imagen 2"
            boxSize="300px"
            objectFit="cover"
            borderRadius="lg"
          />
        </Box>
        <Box p={2}>
          <Image
            src="https://http2.mlstatic.com/D_NQ_NP_950966-MLV49422719926_032022-O.webp"
            alt="Imagen 3"
            boxSize="300px"
            objectFit="cover"
            borderRadius="lg"
          />
        </Box>
        <Box p={2}>
          <Image
            src="https://belgranotenis.com.ar/img/tr-007.jpg"
            alt="Imagen 3"
            boxSize="300px"
            objectFit="cover"
            borderRadius="lg"
          />
        </Box>
        <Box p={2}>
          <Image
            src="https://belgranotenis.com.ar/img/backgrounds/header-bg-three_ch.jpg"
            alt="Imagen 3"
            boxSize="300px"
            objectFit="cover"
            borderRadius="lg"
          />
        </Box>
      </Slider>
    </Box>
  );
};

export default Carousel;
