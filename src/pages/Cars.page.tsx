import React, { useEffect, useState } from "react";
import Car from "../components/Car.component";
import { CarModel } from "../types/Car.model";
import { CARS_API_ENDPOINT } from "../constants/constants";
import Carousel from "../components/Carousel.component";

function CarsPage() {
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

  return (
    <div className="volvo">
      <h2 className="volvo--title">All Recharge Models</h2>
      <div className="volvo--container">
        <input
          type="text"
          placeholder="Search for the model name, model type and body type..."
          onChange={(e: any) => setFilter(e.target.value.toLowerCase())}
        />
        {hasNoCars && (
          <h3 className="volvo--cars__no-results">No Results founded</h3>
        )}

        <Carousel show={3}>
          {displayCars.map((car: CarModel) => (
            <Car {...car} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default CarsPage;
