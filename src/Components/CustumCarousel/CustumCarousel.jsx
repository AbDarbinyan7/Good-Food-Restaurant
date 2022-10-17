import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "Components/CustumCarousel/CustumCarousel.scss";
import MealItem from "Components/Meal/Meal";

function CustumCarousel({ title, iconName, data, selectedPath }) {
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

  if (!data.length) {
    return <React.Fragment />;
  }

  return (
    <div className="custum_section container">
      <span className="section__title">
        <p>{title}</p>
        <div>
          <i className={iconName}></i>
        </div>
      </span>
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
    </div>
  );
}

export default CustumCarousel;
