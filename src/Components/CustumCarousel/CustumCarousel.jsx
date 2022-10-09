import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "Components/CustumCarousel/CustumCarousel.scss";
import MealItem from "Components/Meal/Meal";

function CustumCarousel({ title, data, selectedPath }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel responsive={responsive} className="carousel">
      {data &&
        Array.isArray(data) &&
        data.map((meal, index) => {
          return (
            <div key={index} className="p-4 carousel__item">
              <MealItem selectedPath={selectedPath} meal={meal} />
            </div>
          );
        })}
    </Carousel>
  );
}

export default CustumCarousel;
