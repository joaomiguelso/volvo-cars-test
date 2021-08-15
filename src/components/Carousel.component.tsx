import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { ReactComponent as ChevronCircled } from "../assets/chevron-circled.svg";
import { CHEVRON_CIRCLED_SIZE } from "../constants/constants";
import { CarouselModel } from "../types/Carousel.model";
import "./carousel.scss";

const Carousel = (props: CarouselModel) => {
  const { children, show } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  useEffect(() => {
    setCurrentIndex(0);
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const previousButtonClasses = classNames({
    "volvo--pagination__back": true,
    "volvo--pagination__back--disabled": currentIndex <= 0,
  });

  const nextButtonClasses = classNames({
    "volvo--pagination__next": true,
    "volvo--pagination__next--disabled": !(currentIndex < length - show),
  });

  const adjustment = currentIndex <= 0 || show === 1 ? 0 : 24;

  return (
    <div className="volvo--carousel">
      <div className="volvo--carousel__wraper">
        <div className="carousel-content-wrapper">
          <div
            className={`carousel-content show-${show}`}
            style={{
              transform: `translateX(calc(-${
                currentIndex * (100 / show)
              }% - ${adjustment}px))`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
      <p className="volvo--pagination">
        <span className={previousButtonClasses} onClick={prev}>
          <ChevronCircled
            width={CHEVRON_CIRCLED_SIZE}
            height={CHEVRON_CIRCLED_SIZE}
          />
        </span>
        <span className={nextButtonClasses} onClick={next}>
          <ChevronCircled
            width={CHEVRON_CIRCLED_SIZE}
            height={CHEVRON_CIRCLED_SIZE}
          />
        </span>
      </p>
    </div>
  );
};

export default Carousel;
