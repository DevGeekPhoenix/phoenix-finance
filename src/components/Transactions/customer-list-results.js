import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";

export const CustomerListResults = ({
  filteredExpenses,
  setfilteredExpenses,
  searchTransaction,
}) => {
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
              {filteredExpenses?.myExpenses
                .filter((expense) => {
                  return (
                    expense.tags[0].name.toLowerCase().includes(searchTransaction.toLowerCase()) ||
                    expense.address.Neighbourhood.toLowerCase().includes(
                      searchTransaction.toLowerCase()
                    ) ||
                    `${expense.amount}`.includes(searchTransaction.toLowerCase()) ||
                    expense.address.Place.toLowerCase().includes(searchTransaction.toLowerCase())
                  );
                })

                .map((Expense) => {
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
      <TablePagination
        component="div"
        count={filteredExpenses?.myExpenses.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
