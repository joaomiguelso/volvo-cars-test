import React, { useEffect, useState } from "react";
import { Link, matchPath, useHistory } from "react-router-dom";
import { CARS_API_ENDPOINT, CAR_LEARN_PATH } from "../constants/constants";
import _ from "lodash";
import { CarModel } from "../types/Car.model";
import { Grid, Col, Row, Spacer, Text } from "vcc-ui";
import CarCard from "../components/CarCard.component";

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
        <Grid>
          <Row align="center">
            <Col size={7}>
              <>
                {car && <CarCard {...car} />}
                <Spacer size="4" />
                <Link to="/">
                  <Text subStyle="inline-link"> GO BACK</Text>
                </Link>
              </>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
};

export default LearnPage;
