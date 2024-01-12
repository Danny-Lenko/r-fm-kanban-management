import { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { ICategory } from "../..";

interface Props {
  category: ICategory;
}

export const Row: React.FC<Props> = ({ category: cat }) => {
  const { category, boards } = cat;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {category}
        </TableCell>
        <TableCell align="right">{boards[0].name}</TableCell>
        <TableCell align="right">{boards[1]?.name || ""}</TableCell>
        <TableCell align="right">{boards[2]?.name || ""}</TableCell>
        <TableCell align="right">{boards[3]?.name || ""}</TableCell>
        <TableCell align="right">{boards[4]?.name || ""}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.history.map((historyRow) => (
                              <TableRow key={historyRow.date}>
                                 <TableCell component='th' scope='row'>
                                    {historyRow.date}
                                 </TableCell>
                                 <TableCell>{historyRow.customerId}</TableCell>
                                 <TableCell align='right'>
                                    {historyRow.amount}
                                 </TableCell>
                                 <TableCell align='right'>
                                    {Math.round(
                                       historyRow.amount * row.price * 100,
                                    ) / 100}
                                 </TableCell>
                              </TableRow>
                           ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
