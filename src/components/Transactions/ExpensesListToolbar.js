import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";

export const ExpensesListToolbar = ({ searchTransaction, setsearchTransaction }) => {
  const [isTransitionModalOpen, setIsTransitionModalOpen] = useState(false);

  return (
    <>
      <div>
        <AddTransactionModal
          setIsTransitionModalOpen={setIsTransitionModalOpen}
          isTransitionModalOpen={isTransitionModalOpen}
        />
      </div>
      <Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            m: -1,
          }}
        >
          <Typography sx={{ m: 1 }} variant="h4">
            Transactions
          </Typography>
          <Box sx={{ m: 1 }}>
            <Button
              onClick={() => setIsTransitionModalOpen(true)}
              color="primary"
              variant="contained"
            >
              New Transactions
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 900 }}>
                <TextField
                  fullWidth
                  value={searchTransaction}
                  onChange={(e) => setsearchTransaction(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search Transaction"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};
