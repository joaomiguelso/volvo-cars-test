import React, { useEffect, useState } from "react";
import CarSlide from "../components/CarSlide.component";
import { CarModel } from "../types/Car.model";
import { CARS_API_ENDPOINT, WINDOW_BREAKPOINTS } from "../constants/constants";
import Carousel from "../components/Carousel.component";
import useWindowDimensions from "../hooks/useWindowDimensions";

function CarsPage() {
  const { width } = useWindowDimensions();
  const [cars, setCars] = useState<Array<CarModel>>([]);
  const [displayCars, setDisplayCars] = useState<Array<CarModel>>([]);
  const [filter, setFilter] = useState("");

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
          car.modelType.toLowerCase().includes(filter) ||
          car.bodyType.toLowerCase().includes(filter)
      );
      setDisplayCars(filteredCars);
    }
  }, [filter]);

  const hasNoResults = displayCars.length === 0;

  const numberCarouselColumns =
    width > WINDOW_BREAKPOINTS.SMALL_SCREENS
      ? 3
      : width > WINDOW_BREAKPOINTS.TABLETS
      ? 2
      : 1;

  return (
    <div className="volvo">
      <h2 className="volvo--title">All Recharge Models</h2>
      <div className="volvo--container">
        <input
          type="text"
          placeholder="Search for the model name, model type and body type..."
          onChange={(e: any) => setFilter(e.target.value.toLowerCase())}
        />
        {hasNoResults && (
          <h3 className="volvo--cars__no-results">No Results founded</h3>
        )}

        <Carousel show={numberCarouselColumns}>
          {displayCars.map((car: CarModel) => (
            <div key={`car-slide-${car.id}`}>
              <div style={{ padding: 8 }}>
                <CarSlide {...car} />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default CarsPage;
