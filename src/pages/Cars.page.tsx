import React, { useEffect, useRef, useState } from "react";
import Car from "../components/Car.component";
import { CarModel } from "../types/Car.model";
import { CARS_API_ENDPOINT } from "../constants/constants";
import { ReactComponent as ChevronCircled } from "../assets/chevron-circled.svg";
import classNames from "classnames";
import "react-lazy-load-image-component/src/effects/blur.css";

function CarsPage() {
  const [cars, setCars] = useState<Array<CarModel>>([]);
  const [displayCars, setDisplayCars] = useState<Array<CarModel>>([]);
  const [filter, setFilter] = useState("");
  const [backDisabled, setBackDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const ref: any = useRef(null);

  useEffect(() => {
    fetch(CARS_API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
        setDisplayCars(data);
      });
  }, []);

  useEffect(() => {
    if (!filter || filter === "") {
      setDisplayCars(cars);
    } else {
      const filteredCars = cars.filter(
        (car: CarModel) =>
          car.modelName.toLowerCase().includes(filter) ||
          car.bodyType.toLowerCase().includes(filter)
      );
      setDisplayCars(filteredCars);
    }
  }, [filter]);

  const scroll = (scrollOffset: number) => {
    ref.current.scrollLeft += scrollOffset;
    const isBackDisabled = ref.current.scrollLeft < 363;
    const isNextDisabled =
      ref.current.scrollLeft + ref.current.offsetWidth >=
      ref.current.scrollWidth;

    if (ref.current.scrollLeft < 363) ref.current.scrollLeft = 0;

    setBackDisabled(isBackDisabled);
    setNextDisabled(isNextDisabled);
  };

  const backClasses = classNames({
    "volvo--pagination__back": true,
    "volvo--pagination__back--disabled": backDisabled,
  });

  const nextClasses = classNames({
    "volvo--pagination__next": true,
    "volvo--pagination__next--disabled": nextDisabled,
  });

  console.log("ref", ref.current && ref.current.scrollLeft);

  console.log(cars);

  return (
    <div className="volvo">
      <div className="volvo__background" />
      <div className="volvo__background-2" />

      <h2 className="volvo--title">All Recharge Models</h2>
      <div className="volvo--container">
        <input
          type="text"
          placeholder="Search for the model name, model type and body type..."
          onChange={(e: any) => setFilter(e.target.value.toLowerCase())}
        ></input>
        <div className="volvo--cars" ref={ref}>
          {displayCars.map((car: CarModel) => (
            <Car {...car} />
          ))}
          {displayCars.length === 0 && (
            <h3 className="volvo--cars__no-results">No Results founded</h3>
          )}
        </div>
        <p className="volvo--pagination">
          <span
            className={backClasses}
            onClick={() => (!backDisabled ? scroll(-363) : {})}
          >
            <ChevronCircled width="40" height="40" />
          </span>
          <span className={nextClasses} onClick={() => scroll(363)}>
            <ChevronCircled width="40" height="40" />
          </span>
        </p>
      </div>
    </div>
  );
}

export default CarsPage;
