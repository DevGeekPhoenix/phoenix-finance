import Cookies from "universal-cookie";
import { setUserData, setUserToken, setRefetch } from "../Redux/Reducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const getUser = gql`
  query Query {
    me {
      _id
      name
      username
      img
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
        address {
          MunicipalityZone
          Neighbourhood
          FormattedAddress
          Place
        }
      }
      myTags {
        _id
        name
        color
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
    dispatch(setRefetch(refetch));
  }, [data]);
  useEffect(() => {
    dispatch(setUserToken(token));
  }, [token]);
  return null;
};
