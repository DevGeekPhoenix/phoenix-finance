import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  CardContent,
  TextField,
  CardHeader,
  Divider,
  Container,
  Typography,
} from "@mui/material";
import { useMutation, gql } from "@apollo/client";
import AddNewTag from "./AddNewTag";
import { useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), {
  loading: () => <p>Map is loading</p>,
  ssr: false,
});

const addExpense = gql`
  mutation Create_expense($data: ExpenseInfo!) {
    create_expense(data: $data) {
      status
      msg
    }
  }
`;

export default ({ setIsTransitionModalOpen, isTransitionModalOpen }) => {
  const userData = useSelector((state) => state.data.userData);
  const reFetch = useSelector((state) => state.data.refetch);

  const [isAddNewTagModalOpen, setisAddNewTagModalOpen] = useState(false);
  const [dateValue, setdateValue] = useState(new Date());
  const [amount, setamount] = useState("");
  const [tagId, settagId] = useState([]);
  const [position, setPosition] = useState([35.6892, 51.389]);
  const [neighbourhood, setNeighbourhood] = useState("");
  const [place, setPlace] = useState("");
  const [address, setaddress] = useState("");
  const [municipalityZone, setmunicipalityZone] = useState(0);

  useEffect(() => {
    async function abc() {
      try {
        await fetch(`https://api.neshan.org/v4/reverse?lat=${position[1]}&lng=${position[0]}`, {
          headers: {
            "Api-Key": "service.IoJuxHt4xVr9xKK01aw0AjeiUYvbnL79DNZF2Nvt",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setaddress(data.formatted_address ? data.formatted_address : "-");
            setmunicipalityZone(data.municipality_zone ? data.municipality_zone : "-");
            setNeighbourhood(data.neighbourhood ? data.neighbourhood : "-");
            setPlace(data.place ? data.place : "-");
          });
      } catch (error) {
        alert("Something Went Wrong!!! Try Again");
      }
    }
    abc();
  }, [position]);

  const [submitAddExpense] = useMutation(addExpense);

  const handleAddExpense = async () => {
    try {
      const {
        data: { addExpense },
      } = await submitAddExpense({
        variables: {
          data: {
            amount: Number(amount),
            tags: tagId,
            geo: {
              lat: Number(position[0]),
              lon: Number(position[1]),
            },
            address: {
              MunicipalityZone: Number(municipalityZone),
              Neighbourhood: neighbourhood,
              FormattedAddress: address,
              Place: place,
            },
            date: dateValue.toISOString(),
          },
        },
      });
    } catch (error) {
      alert(error);
      setIsTransitionModalOpen(false);
    }
  };

  return (
    <div
      style={{
        display: isTransitionModalOpen ? "block" : "none",
        position: "relative",
      }}
    >
      <AddNewTag
        setisAddNewTagModalOpen={setisAddNewTagModalOpen}
        isAddNewTagModalOpen={isAddNewTagModalOpen}
      />
      <Box
        sx={{
          position: "absolute",
          zIndex: "100",
          top: -20,
          right: -10,
        }}
      ></Box>
      <Box
        onClick={() => setIsTransitionModalOpen(false)}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#111827",
          opacity: 0.8,
          zIndex: 50,
          width: "100vw",
          height: "100vh",
        }}
      />

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
        maxWidth="lg"
      >
        <Box
          item
          sx={{
            position: "fixed",
            zIndex: 100,
            height: "100vh",
            overflow: "auto",
            pb: 16,
            backgroundColor: "#fff",
            borderRadius: "10px",
            opacity: 100,
          }}
        >
          <Grid item lg={8} md={6} xs={12}>
            <form autoComplete="off" noValidate>
              <Card>
                <CardHeader title="Add Transaction" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={8} xs={12}>
                      <TextField
                        fullWidth
                        placeholder="Write amount of transaction"
                        label="Amount"
                        name="Amount"
                        onChange={(e) => setamount(e.target.value)}
                        required
                        value={amount}
                        type="number"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <Button
                        onClick={() => setisAddNewTagModalOpen(true)}
                        sx={{ height: "55px" }}
                        color="primary"
                        variant="contained"
                      >
                        Add New Tag
                      </Button>
                    </Grid>
                    <Grid
                      container
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                        mt: 1,
                        mx: 3,
                      }}
                      spacing={3}
                    >
                      <Typography sx={{ mr: 2 }}>Tags: </Typography>
                      {userData?.myTags.map((tag, i) => {
                        return (
                          <div
                            key={i}
                            onClick={() => settagId([tag._id])}
                            style={{
                              backgroundColor: `${tag.color}`,
                              width: "fit-content",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "35px",
                              padding: "10px ",
                              borderRadius: 10,
                              border: `${tagId[0] === tag._id ? "3px solid #000" : ""}`,
                              boxShadow: "0px 0px 3px #888888",
                              cursor: "pointer",
                              marginLeft: 2,
                              marginRight: 2,
                            }}
                          >
                            {tag.name.toUpperCase()}
                          </div>
                        );
                      })}
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <DatePicker
                            disableFuture
                            label="Choose Date"
                            openTo="year"
                            views={["year", "month", "day"]}
                            value={dateValue}
                            onChange={(newValue) => {
                              setdateValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item height="300px" md={12} xs={12}>
                      <Map position={position} setPosition={setPosition} />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 2,
                  }}
                >
                  <Button
                    onClick={() => {
                      handleAddExpense();
                      reFetch();
                      setdateValue(new Date());
                      setamount("");
                      settagId([]);
                      setPosition([35.6892, 51.389]);
                      setIsTransitionModalOpen(false);
                    }}
                    color="primary"
                    variant="contained"
                  >
                    Add Transaction
                  </Button>
                </Box>
              </Card>
            </form>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};
