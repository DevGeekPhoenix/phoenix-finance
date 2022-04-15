import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  CardContent,
  TextField,
  Divider,
  Container,
  Typography,
} from "@mui/material";
import { useMutation, gql, useQuery } from "@apollo/client";
import { SketchPicker } from "react-color";

const addTag = gql`
  mutation Create_expense($data: tagInfo!) {
    create_tag(data: $data) {
      status
      msg
    }
  }
`;
const getUser = gql`
  query Query {
    me {
      name
      img
      _id
      username
      myTags {
        _id
        name
        color
      }
      myExpenses {
        _id
        amount
        tags {
          _id
          name
          color
        }
        geo {
          lat
          lon
        }
      }
    }
  }
`;

export default ({ setisAddNewTagModalOpen, isAddNewTagModalOpen }) => {
  const { refetch } = useQuery(getUser);
  const [submitAddTag] = useMutation(addTag);

  const [tagName, settagName] = useState("");
  const [tagColor, settagColor] = useState("");

  const handleAddTag = async () => {
    try {
      const {
        data: { addTag },
      } = await submitAddTag({
        variables: {
          data: {
            name: tagName,
            color: tagColor,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: isAddNewTagModalOpen ? "block" : "none",
        position: "relative",
      }}
    >
      <Box
        onClick={() => setisAddNewTagModalOpen(false)}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#111827",
          opacity: 0.8,
          zIndex: 150,
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
            zIndex: 200,
            backgroundColor: "#fff",
            borderRadius: "10px",
            opacity: 100,
          }}
        >
          <Grid item lg={8} md={6} xs={12}>
            <form autoComplete="off" noValidate>
              <Card>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        placeholder="Write Tag Name"
                        label="Tag Name"
                        name="tagName"
                        onChange={(e) => settagName(e.target.value)}
                        required
                        value={tagName}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <Button
                        onClick={() => {
                          handleAddTag();
                          refetch();
                          setisAddNewTagModalOpen(false);
                        }}
                        sx={{ height: "55px" }}
                        color="primary"
                        variant="contained"
                      >
                        Add New Tag
                      </Button>
                    </Grid>
                    <Grid sx={{ display: "flex" }} item md={6} xs={12}>
                      <Typography sx={{ mr: 2 }}>Choose Tag Color </Typography>
                      <SketchPicker
                        color={tagColor}
                        onChangeComplete={(color) => settagColor(color.hex)}
                      />
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
                    onClick={() => setisAddNewTagModalOpen(false)}
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
