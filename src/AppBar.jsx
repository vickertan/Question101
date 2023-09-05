import { Box, Button, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import StyleRoundedIcon from "@mui/icons-material/StyleRounded";
import { auth, googleProvider } from "../firebase";
import { signInWithRedirect } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <Avatar
          alt={auth.currentUser.displayName}
          src={auth.currentUser.photoURL}
        />
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

export default function AppBar() {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "lightpink",
        display: "flex",
        height: "50px",
      }}
    >
      <Box sx={{ ml: 1.5, mt: 0.8, height: "fit-content" }}>
        <StyleRoundedIcon
          fontSize="large"
          onClick={() => {
            navigate("/");
          }}
        ></StyleRoundedIcon>
      </Box>
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
