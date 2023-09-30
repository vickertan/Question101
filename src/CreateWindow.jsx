import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ExitConfirm from "./ExitConfirm";
import QuestionForm from "./QuestionForm";
import { modalBoxStyle } from "./componentStyle";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";

export default forwardRef(function CreateWindow(props, ref) {
  // State to render CreateWindow
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useImperativeHandle(ref, () => ({
    openCreateWindow: () => {
      setOpen(true);
    },
  }));

  // Ref to access ExitConfirm's state
  const exitConfirmRef = useRef(null);

  // Ref to access QuestionForm's child's state
  const questionFormRef = useRef(null);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          if (
            questionFormRef.current.getUserCategory() ||
            questionFormRef.current.getUserQuestion()
          ) {
            exitConfirmRef.current.handleOpenConfirm();
          } else {
            handleClose();
          }
        }}
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
            <QuestionForm ref={questionFormRef} />
            <ExitConfirm ref={exitConfirmRef} handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
});
