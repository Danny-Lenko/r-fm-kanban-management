import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(({ palette }) => ({
  row: {
    "& .MuiTableCell-body": {
      borderColor: palette.divider,
    },

    "& .MuiTableCell-body:first-child, .MuiTableCell-body:last-child": {
      padding: "10px",
      border: "none",
    },
  },

  rowHead: {
    fontSize: "1rem",
  },

  plusButton: {
    background: "#cbe7fb",
    border: "#90CAF9 1px solid",
    width: "20px",
    height: "20px",
    marginRight: "4px",

    "& svg": {
      width: "16px",
      height: "16px",
    },
  },

  extendButton: {
    width: "28px",
    height: "28px",
  },

  boardCell: {
    width: "12%",
    fontSize: "0.9rem",
  },
}));
