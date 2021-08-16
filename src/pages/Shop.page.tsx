import React, { useEffect, useState } from "react";
import { Link, matchPath, useHistory } from "react-router-dom";
import { CARS_API_ENDPOINT, CAR_SHOP_PATH } from "../constants/constants";
import _ from "lodash";
import { CarModel } from "../types/Car.model";
import { Grid, Col, Row, Spacer } from "vcc-ui";
import CarCard from "../components/CarCard.component";

const ShopPage = () => {
  const [car, setCar] = useState<CarModel>();
  const history = useHistory();
  const match: any = matchPath(history.location.pathname, {
    path: CAR_SHOP_PATH,
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
      <h1 className="volvo--title">Shop Page</h1>
      <div className="volvo--container">
        <Grid>
          <Row align="center">
            <Col size={8}>
              <>
                {car && <CarCard {...car} />}
                <Spacer />
                <Link to="/">Go back</Link>
              </>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
};

export default ShopPage;
