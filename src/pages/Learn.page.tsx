import React, { useEffect, useState } from "react";
import { Link, matchPath, useHistory } from "react-router-dom";
import { CARS_API_ENDPOINT, CAR_LEARN_PATH } from "../constants/constants";
import _ from "lodash";
import { CarModel } from "../types/Car.model";
import { LazyLoadImage } from "react-lazy-load-image-component";

const LearnPage = () => {
  const [car, setCar] = useState<CarModel>();
  const history = useHistory();
  const match: any = matchPath(history.location.pathname, {
    path: CAR_LEARN_PATH,
    exact: true,
    strict: false,
  });
  const id = match && match.params && match.params.id;

  useEffect(() => {
    fetch(CARS_API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        const car = _.find(data, { id: id });
        setCar(car);
      });
  }, []);

  return (
    <div className="volvo">
      <h1 className="volvo--title">Learn Page</h1>
      <div className="volvo--container">
        {car && (
          <div className="volvo--cars__car">
            <p className="volvo--cars__car__body-type">{car.bodyType}</p>
            <p className="volvo--cars__car__name">
              <b>{car.modelName}</b> {car.modelType}
            </p>
            <LazyLoadImage
              alt={car.modelName}
              src={car.imageUrl}
              effect="blur"
              className="volvo--cars__car__image"
              width={"100%"}
              height={"100%"}
            />
          </div>
        )}
        <br />
        <Link to="/">Go back</Link>
      </div>
    </div>
  );
};

export default LearnPage;
