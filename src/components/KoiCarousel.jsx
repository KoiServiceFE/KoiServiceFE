import { Carousel } from "react-bootstrap";
export default function KoiCarousel() {
  const carousels = [
    { img: "/Images/fish.jpeg" },
    { img: "/Images/fish2.jpeg" },
    { img: "/Images/fish3.jpeg" },
  ];
  return (
    <div>
      {" "}
      <Carousel indicators={false}>
        {carousels.map((carousel, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 carousel-img"
              src={carousel.img}
              alt={carousel.script}
            />
            <Carousel.Caption>
              <h3>{carousel.script}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
