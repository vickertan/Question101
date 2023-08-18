import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "beige",
  border: "none",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};

const buttonStyle = {
  m: "auto",
};

function ExitConfirm({ exitConfirmOpen, handleClose, handleCloseConfirm }) {
  return (
    <Modal open={exitConfirmOpen}>
      <Fade in={exitConfirmOpen}>
        <Box sx={{ ...modalStyle, width: 200 }}>
          <p>Unsaved data will be lost. Are you sure to exit?</p>
          <ButtonGroup
            sx={{
              display: "flex",
            }}
            orientation="horizontal"
          >
            <Button
              sx={buttonStyle}
              color="warning"
              onClick={() => {
                handleClose();
                handleCloseConfirm();
              }}
            >
              Yes
            </Button>
            <Button sx={buttonStyle} onClick={handleCloseConfirm}>
              No
            </Button>
          </ButtonGroup>
        </Box>
      </Fade>
    </Modal>
  );
}

export default function CreateModal({ open, handleClose }) {
  const [exitConfirmOpen, setExitConfirmOpen] = useState(false);

  const handleOpenConfirm = () => setExitConfirmOpen(true);
  const handleCloseConfirm = () => setExitConfirmOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleOpenConfirm}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <h1>Question Creating</h1>
            <p>Question: </p>
            <p>Category: </p>
            <h2>Category is set to global by default</h2>
            <ExitConfirm
              exitConfirmOpen={exitConfirmOpen}
              handleCloseConfirm={handleCloseConfirm}
              handleClose={handleClose}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
