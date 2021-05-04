import {
  Avatar,
  colors,
  fade,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
export default function ShortCard({ card }) {
  const classes = useStyles();
  const router = useRouter();

  function randomColor() {
    const colors = ["#f44336", "#e91e63", "#9c27b0", "#ff1744", "#2196f3"];

    const random = colors[Math.floor(Math.random() * (5 - 1) + 1)];
    return random;
  }

  randomColor();
  return (
    <Paper className={classes.root} onClick={() => router.push(card.href)}>
      <Paper
        className={classes.inner}
        style={{ backgroundColor: randomColor() }}
      >
        {card.icon}
      </Paper>

      <Typography variant="h5">{card.title}</Typography>
      <Typography variant="h4">{card.value}</Typography>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    padding: theme.spacing(3),
    position: "relative",
    transition: "0.7s",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.16),
      transform: "scale(1.03)",
    },
  },
  inner: {
    position: "absolute",
    top: "-20%",
    left: "5%",
    padding: theme.spacing(2),
    fontSize: theme.spacing(4),
  },
}));
