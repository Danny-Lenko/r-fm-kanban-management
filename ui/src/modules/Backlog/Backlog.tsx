import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Row, useStyles } from ".";
import { useCategories } from "..";

export const Backlog = () => {
  const categories = useCategories();
  const { classes } = useStyles();

  console.log(categories);

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.paddingCell} />
            <TableCell className={classes.extendTh} />
            <TableCell className={classes.categoryTh}>Categories</TableCell>
            <TableCell align="left" scope="colgroup" colSpan={6}>
              Recent Boards
            </TableCell>
            <TableCell className={classes.paddingCell} />
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
