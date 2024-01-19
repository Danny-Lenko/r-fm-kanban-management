import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles<{ open: boolean }>()(
  ({ palette }, { open }) => ({
    row: {
      "& .MuiTableCell-body": {
        borderColor: palette.divider,
        borderBottom: open ? "none" : "",
      },
    },

    paddingCell: {
      padding: "unset",
      border: "none",
    },

    rowHead: {
      fontSize: open ? "1.3rem" : "1rem",
      overflow: "hidden",
      textOverflow: "ellipsis",
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
  })
);
