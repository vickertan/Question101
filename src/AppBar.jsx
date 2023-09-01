import { Box, Button, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import { auth, googleProvider } from "../firebase";
import { signInWithRedirect } from "firebase/auth";
import { useState } from "react";

export default function ButtonAppBar() {
  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };

  function UserIcon() {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (e) => {
      setAnchorElUser(e.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return (
      <Box sx={{ ml: "auto" }}>
        <IconButton onClick={handleOpenUserMenu} size="small">
          <Avatar alt="Remy Sharp" src={auth.currentUser.photoURL} />
        </IconButton>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem key="Log Out" onClick={() => auth.signOut()}>
            Log Out
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "lightpink",
        display: "flex",
        height: "fill-content",
      }}
    >
      {auth.currentUser ? (
        <UserIcon />
      ) : (
        <Button sx={{ ml: "auto", height: "50px" }} onClick={signInWithGoogle}>
          Log In
        </Button>
      )}
    </Box>
  );
}
