import { Box, Button, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import StyleRoundedIcon from "@mui/icons-material/StyleRounded";
import { auth, googleProvider } from "../firebase";
import { signInWithRedirect } from "firebase/auth";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ExitConfirm from "./ExitConfirm";

function UserIcon() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
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
  const location = useLocation();

  const exitConfirmRef = useRef(null);

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
        justifyContent: "space-between",
        height: "50px",
      }}
    >
      <IconButton
        size="large"
        onClick={() => {
          if (location.pathname == "/playground") {
            exitConfirmRef.current.openExitConfirm();
          }
        }}
      >
        <StyleRoundedIcon
          fontSize="large"
          sx={{ color: "action.active" }}
        ></StyleRoundedIcon>
      </IconButton>
      {auth.currentUser ? (
        <UserIcon />
      ) : (
        <Button onClick={signInWithGoogle}>Log In</Button>
      )}

      <ExitConfirm
        ref={exitConfirmRef}
        handleYesConfirm={() => navigate("/")}
      />
    </Box>
  );
}
