import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { ReactComponent as ChevronCircled } from "../assets/chevron-circled.svg";
import {
  CHEVRON_CIRCLED_SIZE,
  TOUCH_MARGIN,
  WINDOW_BREAKPOINTS,
} from "../constants/constants";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { CarouselModel } from "../types/Carousel.model";
import "./carousel.scss";

const Carousel = (props: CarouselModel) => {
  const { children, show } = props;
  const [length, setLength] = useState(children.length);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    setCurrentSlideIndex(0);
    setLength(children.length);
  }, [children]);

  const previousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prevState) => prevState - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlideIndex < length - show) {
      setCurrentSlideIndex((prevState) => prevState + 1);
    }
  };

  const handleTouchStart = (e: any) => {
    if (e.touches) {
      const touchDown = e.touches[0].clientX;
      setTouchPosition(touchDown);
    }
  };

  const handleTouchMove = (e: any) => {
    if (e && e.touches && e.touches[0] && e.touches[0].clientX) {
      const touchDown = touchPosition;
      if (touchDown === null) return;

      const currentTouch = e.touches[0].clientX;
      const difference = touchDown - currentTouch;

      if (difference > TOUCH_MARGIN) nextSlide();
      if (difference < -TOUCH_MARGIN) previousSlide();

      setTouchPosition(null);
    }
  };

  const previousButtonClasses = classNames({
    "volvo--carousel__pagination__back": true,
    "volvo--carousel__pagination__back--disabled": currentSlideIndex <= 0,
  });

  const nextButtonClasses = classNames({
    "volvo--carousel__pagination__next": true,
    "volvo--carousel__pagination__next--disabled": !(currentSlideIndex < length - show),
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
            className={`volvo--carousel__content show-${show}`}
            style={{
              transform: `translateX(calc(-${
                currentSlideIndex * (100 / show)
              }%))`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
      {width <= WINDOW_BREAKPOINTS.MOBILE && (
        <div className="volvo--carousel__pagination--mobile">
          {children.map((_: any, index: number) => {
            return index !== currentSlideIndex ? (
              <div className="volvo--carousel__pagination--mobile__dot" />
            ) : (
              <div className="volvo--carousel__pagination--mobile__dot volvo--carousel__pagination--mobile__dot--active" />
            );
          })}
        </div>
      )}
      {width > WINDOW_BREAKPOINTS.MOBILE && length > 0 && (
        <p className="volvo--carousel__pagination">
          <span className={previousButtonClasses} onClick={previousSlide}>
            <ChevronCircled
              width={CHEVRON_CIRCLED_SIZE}
              height={CHEVRON_CIRCLED_SIZE}
            />
          </span>
          <span className={nextButtonClasses} onClick={nextSlide}>
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
