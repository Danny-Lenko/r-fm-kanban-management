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
import AddIcon from "@mui/icons-material/Add";

import { useStyles } from ".";
import { ICategory } from "../..";

interface Props {
  category: ICategory;
}

export const Row: React.FC<Props> = ({ category: cat }) => {
  const { category, boards } = cat;
  const [open, setOpen] = useState(false);
  const { classes } = useStyles({ open });

  const recentBoards = boards.slice(0, 5);
  const paddedBoards = Array.from(
    { length: 6 },
    (_, index) => recentBoards[index] || { id: index, name: "" }
  );

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className={classes.row}
      >
        <TableCell className={classes.paddingCell} />
        <TableCell>
          <IconButton className={classes.plusButton} size="small">
            <AddIcon />
          </IconButton>
          <IconButton
            className={classes.extendButton}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className={classes.rowHead}>
          {category}
        </TableCell>
        {paddedBoards.map(({ id, name }) => (
          <TableCell key={id} align="left" className={classes.boardCell}>
            {!open && (name || "")}
          </TableCell>
        ))}
        <TableCell className={classes.paddingCell} />
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={7}
          width="100%"
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: "8px 48px" }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Boards</TableCell>
                    <TableCell colSpan={10}>Columns</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {boards.map(({ id, name, columns }) => (
                    <TableRow key={id}>
                      <TableCell component="th" scope="row">
                        {name}
                      </TableCell>
                      {columns.map(({ name, id }) => (
                        <TableCell key={id}>{name}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
