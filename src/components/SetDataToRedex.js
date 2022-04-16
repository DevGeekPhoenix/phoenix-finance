import Cookies from "universal-cookie";
import { setUserData, setUserToken } from "../Redux/Reducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

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
        date
      }
    }
  }
`;

export default () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const token = cookies.get("ut");
  const { data, refetch } = useQuery(getUser);
  useEffect(() => {
    dispatch(setUserData(data?.me));
    console.log("data is changed");
  }, [data]);
  useEffect(() => {
    dispatch(setUserToken(token));
  }, [token]);
  return null;
};
