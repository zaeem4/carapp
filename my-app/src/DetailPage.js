import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { format, addDays } from "date-fns";
import swal from "sweetalert";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import axios from "axios";

export default function DetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [updatedValue, setUpdatedValue] = React.useState(0);
  const [carDetail, setCarDetail] = React.useState({});
  const [datasets, setDatasets] = React.useState({ labels: [], datasets: [] });

  React.useEffect(() => {
    const { _id, name, color, type, image, value, price, max_speed } = state;
    if (!_id) {
      navigate("/");
    } else {
      setCarDetail({ _id, name, color, type, image, value, price, max_speed });
      const lables = value?.map((element) =>
        format(new Date(element.date), "yyyy-MM-dd")
      );
      const data = value?.map((element) => element.amount);

      setDatasets({
        labels: lables,
        datasets: [
          {
            label: "Value",
            data: data,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
    }
  }, []);

  const handleUpdatedValue = (event) => {
    setUpdatedValue(event.target.value);
  };

  const handleSubmit = async () => {
    const isPrev = localStorage.getItem(carDetail._id);

    if (isPrev) {
      const newDate = addDays(new Date(isPrev), 1);
      if (newDate > new Date()) {
        swal("Oops...", "New value can only updated after 24 hours", "error");
        return;
      }
    }

    const response = (
      await axios.post(`http://localhost:3001/update-car-value`, {
        _id: carDetail._id,
        amount: updatedValue,
      })
    ).data;
    if (response.success) {
      setCarDetail(response.car);
      const lables = response.car?.value?.map((element) =>
        format(new Date(element.date), "yyyy-MM-dd")
      );
      const data = response.car?.value?.map((element) => element.amount);
      setDatasets({
        labels: lables,
        datasets: [
          {
            label: "Value",
            data: data,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
      localStorage.setItem(carDetail._id, new Date());
      swal("Done...", "Value updated", "success");
    } else {
      swal("Oops...", "Database is down", "error");
    }
  };

  const options = {
    responsive: true,
  };

  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          marginY: "4rem",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                p: { xs: 1, md: 4 },
                maxWidth: "100%",
                margin: "auto",
                marginLeft: "1rem",
                background: "#FFFFFF",
                border: "1px solid lightgray",
              }}
            >
              <Stack direction="column">
                <Box
                  component="img"
                  src={`http://localhost:3001/${carDetail.image}`}
                  alt="car image"
                  sx={{
                    width: "100%",
                    height: "50%",
                  }}
                />
                <br />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Value</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Max Speed</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {carDetail.name}
                        </TableCell>
                        <TableCell align="center">
                          {carDetail.value?.length > 0 &&
                            carDetail.value[carDetail.value.length - 1].amount}
                        </TableCell>
                        <TableCell align="center">{carDetail.price}</TableCell>
                        <TableCell align="center">{carDetail.type}</TableCell>
                        <TableCell align="center">
                          {carDetail.max_speed}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <br />
                <Box sx={{ background: "whitesmoke" }}>
                  <Line options={options} data={datasets} />
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                marginRight: "1rem",
                background: "#FFFFFF",
                border: "1px solid lightgray",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "black",
                  background: "lightgray",
                  p: { xs: 1, nd: 2 },
                  border: "1px solid lightgray",
                }}
              >
                Update Value
              </Typography>
              <br />

              <Box sx={{ p: { xs: 1, md: 3 } }}>
                <TextField
                  label="value"
                  id="value"
                  value={updatedValue}
                  onChange={handleUpdatedValue}
                  fullWidth
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <br />
                <br />
                <Button variant="contained" onClick={handleSubmit}>
                  Update
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
