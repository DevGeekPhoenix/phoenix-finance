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
import { useState, useEffect } from "react";

export const LatestTransactions = () => {
  const userData = useSelector((state) => state.data.userData);
  const [Expenses, setExpenses] = useState(null);
  useEffect(() => {
    const expenses = [];

    expenses.push(
      userData?.myExpenses[userData?.myExpenses.length - 1],
      userData?.myExpenses[userData?.myExpenses.length - 2],
      userData?.myExpenses[userData?.myExpenses.length - 3],
      userData?.myExpenses[userData?.myExpenses.length - 4],
      userData?.myExpenses[userData?.myExpenses.length - 5]
    );

    console.log(expenses);
    setExpenses(expenses);
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
                <TableCell>Tag</TableCell>
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
                        backgroundColor: `${Expense.tags[0].color}`,
                        borderRadius: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      {Expense.tags[0].name.toUpperCase()}
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
