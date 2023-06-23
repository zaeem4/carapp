import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

export default function CustomCard2({
  _id,
  name,
  color,
  type,
  image,
  pushCar,
  index,
}) {
  const navigate = useNavigate();

  return (
    <Card sx={{ p: { xs: 2, md: 4 } }}>
      <CardHeader
        title={`${color} (${name})`}
        sx={{ background: "lightblue" }}
      />
      <CardMedia
        component="img"
        width="100%"
        height="200"
        image={`http://localhost:3001/${image}`}
        alt="car image"
      />
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "#198754", fontWeight: "bold" }}
        >
          Type : {type}
        </Typography>
        <br />
        <Button
          variant="contained"
          onClick={() => {
            pushCar(index);
          }}
        >
          Add
        </Button>
      </CardContent>
    </Card>
  );
}
