import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material";

export const useStyles = makeStyles()(({ zIndex }: Theme) => ({
  tableContainer: {
    "& .MuiTableCell-root": {
      border: "1px solid black",
    },
  },
}));
