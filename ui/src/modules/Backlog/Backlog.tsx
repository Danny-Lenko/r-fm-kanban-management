import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Row } from ".";
import { useCategories } from "..";
import { useStyles } from "./Backlog.styles";

export const Backlog = () => {
  const categories = useCategories();
  const { classes } = useStyles();

  console.log(categories);

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Categories</TableCell>
            <TableCell align="left" scope="colgroup" colSpan={5}>
              Recent Boards
            </TableCell>
            {/* <TableCell align="right">Fat&nbsp;(g)</TableCell> */}
            {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <Row key={crypto.randomUUID()} category={category} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
