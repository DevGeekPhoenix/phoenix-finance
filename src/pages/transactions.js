import Head from "next/head";
import { Box, Container } from "@mui/material";
import { ExpensesList } from "../components/Transactions/ExpensesList";
import { ExpensesListToolbar } from "../components/Transactions/ExpensesListToolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Customers = () => {
  const [filteredExpenses, setfilteredExpenses] = useState(null);
  const userData = useSelector((state) => state.data.userData);
  const [searchTransaction, setsearchTransaction] = useState("");

  useEffect(() => {
    setfilteredExpenses(userData);
  }, [userData]);

  return (
    <>
      <Head>
        <title>Transactions | Phoenix Finance</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ExpensesListToolbar
            filteredExpenses={filteredExpenses}
            setfilteredExpenses={setfilteredExpenses}
            setsearchTransaction={setsearchTransaction}
            searchTransaction={searchTransaction}
          />
          <Box sx={{ mt: 3 }}>
            <ExpensesList
              filteredExpenses={filteredExpenses}
              setfilteredExpenses={setfilteredExpenses}
              searchTransaction={searchTransaction}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
