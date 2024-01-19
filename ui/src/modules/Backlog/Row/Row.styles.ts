import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles<{ open: boolean }>()(
  ({ palette }, { open }) => ({
    row: {
      "& .MuiTableCell-body": {
        // borderColor: open ? "transparent" : palette.divider,
        borderColor: palette.divider,
        borderBottom: open ? "none" : "",
      },
    },

    paddingCell: {
      padding: "10px",
      width: 0,
      maxWidth: 0,
      border: "none",
    },

    rowHead: {
      fontSize: open ? "1.3rem" : "1rem",
      "& .MuiTableCell-root": {
        width: "300px",
        maxWidth: "300px",
      },

      width: "300px",
      maxWidth: "300px",
      boxSizing: "border-box",
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
