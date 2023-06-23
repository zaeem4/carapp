import * as React from "react";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import CustomCard from "./Card2";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 400, md: 600 },
  height: 500,
  overflow: "scroll",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

let side = "";

export default function Calculator() {
  const [cars, setCars] = React.useState([]);
  const [selectedCars, setSelectedCars] = React.useState([]);
  const [selectedCarsRight, setSelectedCarsRight] = React.useState([]);
  const [values, setValues] = React.useState(0);
  const [valuesRight, setValuesRight] = React.useState(0);

  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (selectedSide) => {
    setOpen(true);
    side = selectedSide;
  };

  const pushCar = (index) => {
    if (side === "left") {
      setSelectedCars([...selectedCars, cars[index]]);
      setValues(
        values + cars[index].value[cars[index].value.length - 1].amount
      );
    } else if (side == "right") {
      setSelectedCarsRight([...selectedCarsRight, cars[index]]);
      setValuesRight(
        values + cars[index].value[cars[index].value.length - 1].amount
      );
    }
    handleClose();
  };

  const getAllCars = async () => {
    const response = (
      await axios.post(`http://localhost:3001/cars`, {
        sort: null,
        search: null,
        min: null,
        max: null,
      })
    ).data;
    setCars(response.cars);
  };

  const removeCar = (index, value) => {
    const temp = selectedCars;
    temp.splice(index, 1);
    setSelectedCars(temp);
    setValues(values - value);
  };

  const removeCarRight = (index, value) => {
    const temp = selectedCarsRight;
    temp.splice(index, 1);
    setSelectedCarsRight(temp);
    setValuesRight(valuesRight - value);
  };

  useEffect(() => {
    getAllCars();
  }, []);

  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#f8fafc",
          margin: "auto",
          textAlign: "center",
          p: { xs: 1, md: 4 },
          marginY: "4rem",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Calculator
        </Typography>
        <Grid container sx={{ columnGap: "1rem", rowGap: "1rem" }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ background: "#f8fafc", border: "1px solid lightgray" }}
          >
            <Grid container spacing={2} sx={{ alignItems: "center" }}>
              <Grid item xs={8}>
                <Stack direction="column">
                  {selectedCars.map((car, index) => {
                    return (
                      <Box
                        component="img"
                        src={`http://localhost:3001/${car.image}`}
                        alt="car image"
                        sx={{ height: 200, width: "auto", cursor: "pointer" }}
                        key={index}
                        onClick={() => {
                          removeCar(
                            index,
                            car.value[car.value.length - 1].amount
                          );
                        }}
                      />
                    );
                  })}
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <IconButton
                  aria-label="add"
                  sx={{ fontSize: "3rem" }}
                  onClick={() => {
                    handleOpen("left");
                  }}
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </Grid>
              <Grid Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                  Values {values}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={5.5}
            sx={{ background: "#f8fafc", border: "1px solid lightgray" }}
          >
            <Grid container spacing={2} sx={{ alignItems: "center" }}>
              <Grid item xs={8}>
                <Stack direction="column">
                  {selectedCarsRight.map((car, index) => {
                    return (
                      <Box
                        component="img"
                        src={`http://localhost:3001/${car.image}`}
                        alt="car image"
                        sx={{ height: 200, width: "auto", cursor: "pointer" }}
                        key={index}
                        onClick={() => {
                          removeCarRight(
                            index,
                            car.value[car.value.length - 1].amount
                          );
                        }}
                      />
                    );
                  })}
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <IconButton
                  aria-label="add"
                  sx={{ fontSize: "3rem" }}
                  onClick={() => {
                    handleOpen("right");
                  }}
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </Grid>
              <Grid Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                  Values {valuesRight}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            {cars.map((item, index) => {
              return (
                <Grid item xs={12} sx={{ textAlign: "center" }} key={item._id}>
                  <CustomCard
                    _id={item._id}
                    name={item.name}
                    color={item.color}
                    type={item.type}
                    image={item.image}
                    pushCar={pushCar}
                    index={index}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Modal>
    </Container>
  );
}
