import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { format, addDays, subDays } from "date-fns";
import swal from "sweetalert";

import CustomCard from "./Card3";

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
  const navigate = useNavigate();
  const [updatedValue, setUpdatedValue] = React.useState(0);
  const [carDetail, setCarDetail] = React.useState({});
  const [datasets, setDatasets] = React.useState({ labels: [], datasets: [] });
  const { _id } = useParams();

  const [recentSubmissions, setRecentSubmissions] = React.useState([]);

  function calculateAverageValues(objArray) {
    var resultArray = [];
    var keyMap = {};

    // Calculate sum and count for each date
    for (var i = 0; i < objArray.length; i++) {
      debugger;
      var obj = objArray[i];
      var date = format(new Date(obj.date), "yyyy-MM-dd");
      var value = obj.amount;

      if (!keyMap[date]) {
        keyMap[date] = { sum: 0, count: 0 };
      }

      keyMap[date].sum += value;
      keyMap[date].count++;
    }

    // Calculate average and push into result array
    for (var date in keyMap) {
      if (keyMap.hasOwnProperty(date)) {
        var average = keyMap[date].sum / keyMap[date].count;
        resultArray.push({ date: date, average: average });
      }
    }

    return resultArray;
  }

  const getDetails = async (_id) => {
    const response = (await axios.get(`http://localhost:3001/car/${_id}`)).data;
    if (response.success) {
      const result = calculateAverageValues(response.car.value);

      const lables = result?.map((element) =>
        format(new Date(element.date), "yyyy-MM-dd")
      );

      const data = result?.map((element) => element.average);

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
      const dateFrom = subDays(new Date(), 30);
      const filtered = response.car.value.filter(
        (item) => new Date(item.date) > dateFrom
      );
      const average =
        filtered.reduce((a, b) => a + b.amount, 0) / filtered.length;
      response.car.value = Math.ceil(average);
      setCarDetail(response.car);
      setRecentSubmissions(response.recent);
    }
  };

  React.useEffect(() => {
    if (!_id) {
      navigate("/");
    } else {
      getDetails(_id);
    }
  }, [_id]);

  const handleUpdatedValue = (event) => {
    setUpdatedValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (Number(updatedValue) > Math.ceil(carDetail.value) * 0.35) {
      swal("Oops...", "New value exceded 35% limit", "error");
      return;
    }

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
      localStorage.setItem(carDetail._id, new Date());
      // const lables = response.car?.value?.map((element) =>
      //   format(new Date(element.date), "yyyy-MM-dd")
      // );
      // const data = response.car?.value?.map((element) => element.amount);

      const result = calculateAverageValues(response.car.value);

      const lables = result?.map((element) =>
        format(new Date(element.date), "yyyy-MM-dd")
      );

      const data = result?.map((element) => element.average);

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
      const dateFrom = subDays(new Date(), 30);
      const filtered = response.car.value.filter(
        (item) => new Date(item.date) > dateFrom
      );
      const average =
        filtered.reduce((a, b) => a + b.amount, 0) / filtered.length;
      response.car.value = Math.ceil(average);
      setCarDetail(response.car);
      setRecentSubmissions(response.recent);
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
          marginY: { xs: "2rem", md: "4rem" },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                p: { xs: 1, md: 4 },
                maxWidth: "100%",
                margin: "auto",
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
                        <TableCell align="center">{carDetail.value}</TableCell>
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
            <br />
            <Box
              sx={{
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
                Recent Submissions
              </Typography>

              <Box sx={{ p: { xs: 1, md: 3 } }}>
                <Stack direction="column" spacing={2}>
                  {recentSubmissions.map((item, index) => {
                    return (
                      <CustomCard
                        key={index}
                        _id={item.car._id}
                        name={item.car.name}
                        color={item.car.color}
                        type={item.car.type}
                        image={item.car.image}
                        value={item.value}
                      />
                    );
                  })}
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
