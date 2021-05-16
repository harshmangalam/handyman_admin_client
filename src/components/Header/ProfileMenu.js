import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const router = useRouter();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuId = "menu";

  return (
    <Fragment>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id={menuId}
        keepMounted
        open={isOpen}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            router.push("/account/profile");
            setAnchorEl(null);
          }}
        >
          Profile
        </MenuItem>
        <MenuItem onClick={() => {}}>Settings</MenuItem>
      </Menu>
    </Fragment>
  );
}
