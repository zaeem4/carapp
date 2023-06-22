import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

export default function CustomCard({
  _id,
  name,
  color,
  type,
  image,
  value,
  price,
  max_speed,
}) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "auto",
        textAlign: "center",
        margin: { xs: 2, md: 4 },
      }}
    >
      <CardHeader
        title={`${color} (${name})`}
        sx={{ background: "lightblue" }}
      />
      <CardMedia
        component="img"
        height="auto"
        width="100%"
        image={`http://localhost:3001/${image}`}
        alt="car image"
      />
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ color: "green" }}>
          Type : {type}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            navigate(`/details/${_id}`, {
              state: {
                _id,
                name,
                color,
                type,
                image,
                value,
                price,
                max_speed,
              },
            });
          }}
        >
          View More
        </Button>
      </CardContent>
    </Card>
  );
}
