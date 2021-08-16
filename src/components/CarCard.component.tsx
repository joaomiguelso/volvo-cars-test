import React from "react";
import { CarModel } from "../types/Car.model";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Card, CardContent, Text, Spacer } from "vcc-ui";

const CarCard = (props: CarModel) => (
  <Card>
    <LazyLoadImage
      alt={props.modelName}
      src={props.imageUrl}
      effect="blur"
      className="volvo--cars__car__image"
      width={"100%"}
      height={"auto"}
    />
    <CardContent>
      {/** I'm sorry but I have to say this is the weirdest typography names I ever worked. */}
      <Text variant="hillary" subStyle="emphasis">{props.bodyType.toUpperCase()}</Text>
      <Text variant="ootah" subStyle="emphasis">
        {props.modelName}
      </Text>
      <Text variant="hillary">
        {props.modelType}
      </Text>
      <Spacer />
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis
        lacinia leo, fermentum scelerisque sapien eleifend in. Curabitur blandit
        odio non tortor scelerisque cursus. Quisque volutpat, tortor eget
        feugiat ullamcorper, leo quam auctor augue, et aliquet lorem sapien sed
        felis. Suspendisse ex eros, ultricies semper massa sed, iaculis luctus
        odio.
      </Text>
    </CardContent>
  </Card>
);

export default CarCard;
