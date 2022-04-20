import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

const editUser = gql`
  mutation EditMe($name: String!, $img: Upload) {
    editMe(name: $name, img: $img) {
      status
      msg
    }
  }
`;

export const AccountProfileDetails = ({ setpreview }) => {
  const userData = useSelector((state) => state.data.userData);
  const refetch = useSelector((state) => state.data.refetch);

  const [submitEditUser] = useMutation(editUser);

  const [name, setName] = useState("");
  const [img, setimg] = useState(null);

  useEffect(() => {
    setName(userData?.name);
  }, [userData]);

  useEffect(() => {
    if (img) {
      const fileReader = new FileReader();

      fileReader.onload = async function (fileLoadedEvent) {
        setpreview(fileLoadedEvent.target.result);
      };
      fileReader.readAsDataURL(img);
    }
  }, [img]);

  const handleEditUser = async () => {
    try {
      const {
        data: {
          editMe: { status },
        },
      } = await submitEditUser({
        variables: {
          name: name,
          img: img,
        },
      });

      if (status === 200) alert("Profile Updated Successfully");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Name"
                name="Name"
                onChange={(e) => setName(e.target.value)}
                required
                value={name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label=""
                name="ProfileImgUrl"
                onChange={(e) => setimg(e.target.files[0])}
                required
                type="file"
                variant="outlined"
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
            onClick={() => {
              handleEditUser();
              refetch();
            }}
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
