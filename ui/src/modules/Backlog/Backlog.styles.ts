import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material";

export const useStyles = makeStyles()(({ palette }) => ({
  tableContainer: {
    "& .MuiTableCell-head": {
      borderColor: palette.divider,
    },

    "& .MuiTableCell-head:first-child, .MuiTableCell-head:last-child": {
      padding: "10px",
      border: "none",
    },
  },

  extendTh: {
    width: "90px",
    minWidth: "90px",
  },

  categoryTh: {
    width: "300px",
  },
}));
