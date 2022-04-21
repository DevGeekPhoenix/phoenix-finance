import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Divider,
  TableRow,
  Typography,
} from "@mui/material";
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
    const filterundifinded = latestTransactions.filter((item) => item);
    setExpenses(filterundifinded);
  }, [userData]);

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
              {Expenses === [] || Expenses[0] === undefined ? (
                <TableRow hover>
                  <Typography
                    sx={{ py: 2, ml: 3, fontWeight: "bold" }}
                    color="textPrimary"
                    variant="body1"
                  >
                    You have no EXPENSE Yet!!!!
                  </Typography>
                </TableRow>
              ) : (
                Expenses.map((Expense) => {
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
                })
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
