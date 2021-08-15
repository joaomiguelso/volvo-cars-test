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
  const [touchPosition, setTouchPosition] = useState(null);

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

  const handleTouchStart = (e: any) => {
    if (e.touches) {
      const touchDown = e.touches[0].clientX;
      setTouchPosition(touchDown);
    }
  };

  const handleTouchMove = (e: any) => {
    console.log(e);
    if (e && e.touches && e.touches[0] && e.touches[0].clientX) {
      const touchDown = touchPosition;

      if (touchDown === null) {
        return;
      }

      const currentTouch = e.touches[0].clientX;
      const diff = touchDown - currentTouch;

      if (diff > 5) {
        next();
      }

      if (diff < -5) {
        prev();
      }

      setTouchPosition(null);
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

  return (
    <div className="volvo--carousel">
      <div className="volvo--carousel__wraper">
        <div
          className="carousel-content-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`carousel-content show-${show}`}
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / show)}%))`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
      {length > 0 && (
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
      )}
    </div>
  );
};

export default Carousel;
