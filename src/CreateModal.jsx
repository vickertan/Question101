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

function ExitModal({ exitModalOpen }) {
  return (
    <Modal open={exitModalOpen}>
      <Fade in={exitModalOpen}>
        <Box sx={{ ...modalStyle, width: 200 }}>
          <p>Unsaved data will be lost. Are you sure to proceed?</p>
          <ButtonGroup
            sx={{
              display: "flex",
            }}
            orientation="horizontal"
          >
            <Button sx={buttonStyle} color="warning">
              Yes
            </Button>
            <Button sx={buttonStyle}>No</Button>
          </ButtonGroup>
        </Box>
      </Fade>
    </Modal>
  );
}

export default function CreateModal({ open, handleClose }) {
  const [exitModalOpen, setExitModalOpen] = useState(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setExitModalOpen(true)}
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
            <ExitModal exitModalOpen={exitModalOpen} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
