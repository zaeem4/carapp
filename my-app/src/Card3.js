import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

export default function CustomCard({ _id, name, color, type, image }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        textAlign: "center",
        border: "1px solid gray",
      }}
    >
      <CardHeader title={`${color} (${name})`} sx={{ background: "#0DCAF0" }} />
      <CardMedia
        component="img"
        width="100%"
        height="150"    
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
            navigate(`/details/${_id}`);
          }}
        >
          View More
        </Button>
      </CardContent>
    </Card>
  );
}
