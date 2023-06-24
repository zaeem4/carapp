import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

export default function CustomCard3({ _id, name, color, type, image }) {
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
    </Card>
  );
}
