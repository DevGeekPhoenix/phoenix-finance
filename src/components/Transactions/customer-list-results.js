import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Avatar,
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
import { useSelector } from "react-redux";

export const CustomerListResults = ({ customers, ...rest }) => {
  const userData = useSelector((state) => state.data.userData);

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handle = () => {
    fetch(
      `https://api.neshan.org/v4/reverse?lat=${userData?.myExpenses[0].geo.lon}&lng=${userData?.myExpenses[0].geo.lat}`,
      {
        headers: {
          "Api-Key": "service.IoJuxHt4xVr9xKK01aw0AjeiUYvbnL79DNZF2Nvt",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 900 }}>
          <button onClick={handle}>Fuck You NESHAN</button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Registration date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData?.myExpenses.slice(0, limit).map((Expense) => {
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
                      <a
                        target={"_blank"}
                        href={`https://maps.google.com/?q=${Expense.geo.lon},${Expense.geo.lat}`}
                      >
                        Show Address
                      </a>
                    </TableCell>
                    <TableCell>{Expense?.phone}</TableCell>
                    {/* <TableCell>{format(Expense?.createdAt, "dd/MM/yyyy")}</TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        // count={Expenses.length}
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
