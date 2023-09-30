import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ExitConfirm from "./ExitConfirm";
import { modalBoxStyle } from "./componentStyle";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";

export default forwardRef(function CreateWindow(props, ref) {
  // State to render TopicWindow
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useImperativeHandle(ref, () => ({
    openTopicWindow: () => {
      setOpen(true);
    },
  }));

  // Ref to access ExitConfirm's state
  const exitConfirmRef = useRef(null);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={modalBoxStyle}>
            <ExitConfirm ref={exitConfirmRef} handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
});
