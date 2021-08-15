import React from "react";
import { CarModel } from "../types/Car.model";
import { ReactComponent as Chevron } from "../assets/chevron-small.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const Car = (props: CarModel) => (
  <div className="volvo--cars__car">
    <p className="volvo--cars__car__body-type">{props.bodyType}</p>
    <p className="volvo--cars__car__name">
      <b>{props.modelName}</b> {props.modelType}
    </p>
    <LazyLoadImage
      alt={props.modelName}
      src={props.imageUrl}
      effect="blur"
      className="volvo--cars__car__image"
      width={"100%"}
      height={"100%"}
    />
    <div className="volvo--cars__car__links">
      <Link to={`/learn/${props.id}`} className="volvo--cars__car__links__link">
        Learn&nbsp;
        <Chevron width="11" height="11" />
      </Link>
      <Link to={`/shop/${props.id}`} className="volvo--cars__car__links__link">
        Shop&nbsp;
        <Chevron width="11" height="11" />
      </Link>
    </div>
  </div>
);

export default Car;
