import * as React from "react";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import swal from "sweetalert";
import axios from "axios";

import CustomCard from "./Card";

export default function Home() {
  const [sortBy, setSortBy] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(0);

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  const handleMin = (event) => {
    setMin(event.target.value);
  };

  const handleMax = (event) => {
    setMax(event.target.value);
  };

  const [cars, setCars] = React.useState([]);

  const getAllCars = async () => {
    const response = (
      await axios.post(`http://localhost:3001/cars`, {
        sort: sortBy,
        search: search,
        min: min,
        max: max,
      })
    ).data;
    if (response.success) {
      setCars(response.cars);
    } else {
      swal("Oops...", "Database is down", "error");
    }
  };

  useEffect(() => {
    getAllCars();
  }, [sortBy, min, max]);

  return (
    <Container
      sx={{
        marginY: { xs: "2rem", md: "4rem" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#f8fafc",
        }}
      >
        <Box
          sx={{
            p: { xs: 1, md: 4 },
            maxWidth: "100%",
            margin: "auto",
          }}
        >
          <Stack direction="row">
            <TextField
              fullWidth
              label="search"
              id="search"
              value={search}
              onChange={handleInput}
            />
            <IconButton aria-label="search" onClick={getAllCars}>
              <SearchIcon />
            </IconButton>
          </Stack>
        </Box>
        <Box sx={{ p: { xs: 1, md: 4 } }}>
          <Stack direction="row">
            <FormControl fullWidth>
              <InputLabel htmlFor="uncontrolled-native">Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={handleChange}
                label="Sort By"
                id="demo-select-small-label"
              >
                <MenuItem value={"name"}>A - Z</MenuItem>
                <MenuItem value={"price"}>least to gratest</MenuItem>
              </Select>
            </FormControl>
            <TextField label="min" id="min" value={min} onChange={handleMin} />
            <TextField label="max" id="max" value={max} onChange={handleMax} />
          </Stack>
        </Box>
      </Box>
      <br />
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Grid container spacing={2}>
          {cars.length > 0 ? (
            cars.map((item, key) => {
              return (
                <Grid item xs={12} md={4} key={key}>
                  <CustomCard
                    _id={item._id}
                    name={item.name}
                    color={item.color}
                    type={item.type}
                    image={item.image}
                    value={item.value}
                    price={item.price}
                    max_speed={item.max_speed}
                  />
                </Grid>
              );
            })
          ) : (
            <></>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
