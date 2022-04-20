import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  CardHeader,
  Divider,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { useSelector } from "react-redux";
import { useState, useMemo } from "react";

export const LatestTransactions = () => {
  const userData = useSelector((state) => state.data.userData);
  const [Expenses, setExpenses] = useState([]);
  useMemo(() => {
    let latestTransactions = [];
    for (let i = userData?.myExpenses.length - 1; i > userData?.myExpenses.length - 6; i--) {
      latestTransactions.push(userData?.myExpenses[i]);
    }
    setExpenses(latestTransactions);
  }, [userData]);

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <CardHeader title="Latest Transactions" subheader="Your Last 5 Transactions" />
      <Divider />
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Place</TableCell>
                <TableCell
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Tag
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Expenses?.map((Expense) => {
                const date = Expense.date.split("-");

                return (
                  <TableRow hover key={Expense._id}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {Expense.amount} Toman
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {date[2].substr(0, 2) + "/" + date[1] + "/" + date[0]}
                      </Typography>
                    </TableCell>
                    <TableCell>{Expense.address.Neighbourhood}</TableCell>
                    <TableCell>{Expense.address.Place}</TableCell>
                    <TableCell
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          backgroundColor: `${Expense.tags[0].color}`,
                          borderRadius: "15px",
                          fontWeight: "bold",
                          fontSize: "14px",
                          py: 1,
                          px: 2,
                        }}
                      >
                        {Expense.tags[0].name.toUpperCase()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

LatestTransactions.propTypes = {
  customers: PropTypes.array.isRequired,
};
