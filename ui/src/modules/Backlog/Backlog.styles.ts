import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material";

export const useStyles = makeStyles()(({ palette, breakpoints }) => ({
  tableContainer: {
    "& .MuiTableCell-head": {
      borderColor: palette.divider,
    },
  },

  paddingCell: {
    tableLayout: "fixed",
    padding: "10px",
    width: 0,
    border: "none",
  },

  extendTh: {
    width: "90px",
    minWidth: "90px",
  },

  categoryTh: {
    width: 150,

    [breakpoints.up("sm")]: {
      width: 200,
    },

    [breakpoints.up("md")]: {
      width: 300,
    },
  },
}));
