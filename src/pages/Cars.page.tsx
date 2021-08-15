import React, { useEffect, useState } from "react";
import Car from "../components/Car.component";
import { CarModel } from "../types/Car.model";
import { CARS_API_ENDPOINT } from "../constants/constants";
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
          car.bodyType.toLowerCase().includes(filter)
      );
      setDisplayCars(filteredCars);
    }
  }, [filter]);

  const hasNoCars = displayCars.length === 0;

  const numberOfCards = width > 1024 ? 3 : width > 720 ? 2 : 1;

  return (
    <div className="volvo">
      <h2 className="volvo--title">All Recharge Models {width}</h2>
      <div className="volvo--container">
        <input
          type="text"
          placeholder="Search for the model name, model type and body type..."
          onChange={(e: any) => setFilter(e.target.value.toLowerCase())}
        />
        {hasNoCars && (
          <h3 className="volvo--cars__no-results">No Results founded</h3>
        )}

        <Carousel show={numberOfCards}>
          {displayCars.map((car: CarModel) => (
            <Car {...car} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default CarsPage;
