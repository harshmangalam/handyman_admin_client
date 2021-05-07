import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemIcon,
  makeStyles,
  Card,
  CardHeader,
  Typography,
} from "@material-ui/core";

import Link from "next/link";
import { FaHome, FaPeopleCarry, FaTag, FaUser } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { AiFillNotification } from "react-icons/ai";
import { RiPagesFill } from "react-icons/ri";

import { SiCodefactor } from "react-icons/si";
import { SupervisorAccount } from "@material-ui/icons";
import { Dashboard } from "@material-ui/icons";

import { useAuthState } from "../../context/auth";

export default function Sidebar({ open, setOpen }) {
  const { isAuthenticated, user } = useAuthState();

  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className={classes.drawerContainer}>
        {isAuthenticated && (
          <Card style={{ borderRadius: "0px" }}>
            <CardHeader
              avatar={
                <Avatar aria-label="profile" src={user.profilePic}></Avatar>
              }
              title={<Typography variant="h6">{user.name}</Typography>}
              subheader={user.email}
            />
          </Card>
        )}
        <List>
          {lists.map((list) => (
            <Link href={list.href} passHref>
              <ListItem key={list.title} button onClick={() => setOpen(false)}>
                <ListItemIcon style={{ fontSize: "20px" }}>
                  {list.icon}
                </ListItemIcon>
                <ListItemText primary={list.title} />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    </Drawer>
  );
}

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const lists = [
  {
    title: "Home",
    icon: <FaHome />,
    href: "/",
  },
  {
    title: "Customer",
    icon: <FaUser />,
    href: "/customer",
  },
  {
    title: "Tasker",

    icon: <FaPeopleCarry />,
    href: "/tasker",
  },
  {
    title: "Admin",

    icon: <SupervisorAccount />,

    href: "/admin",
  },

  {
    title: "Bookings",

    icon: <FaUser />,
    href: "/bookings",
  },

  {
    title: "Regions",

    icon: <BiWorld />,
    href: "/region",
  },
  {
    title: "Categories",

    icon: <FaTag />,
    href: "/category",
  },
  {
    title: "Services",

    icon: <SiCodefactor />,
    href: "/service",
  },

  {
    title: "Appointment",

    icon: <AiFillNotification />,
    href: "/appointment",
  },

  {
    title: "Pages",

    icon: <RiPagesFill />,
    href: "/page",
  },
];
