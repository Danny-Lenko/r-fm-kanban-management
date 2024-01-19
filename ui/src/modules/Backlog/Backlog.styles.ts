import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material";

export const useStyles = makeStyles()(({ palette }) => ({
  tableContainer: {
    "& .MuiTableCell-head": {
      borderColor: palette.divider,
    },
  },

  paddingCell: {
    padding: "10px",
    width: 0,
    maxWidth: 0,
    border: "none",
  },

  extendTh: {
    width: "90px",
    minWidth: "90px",
  },

  categoryTh: {
    width: "300px",
    maxWidth: "300px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));
