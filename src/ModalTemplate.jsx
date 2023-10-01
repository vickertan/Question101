import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ExitConfirm from "./ExitConfirm";
import { modalBoxStyle } from "./componentStyle";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";

export default forwardRef(function ModalTemplate(
  { children, checkInput, setMenuSelection },
  ref
) {
  // State to render ModalTemplate
  const [modalTemplate, setModalTemplate] = useState(false);

  const closeModalTemplate = () => {
    setModalTemplate(false);
    setMenuSelection("");
  };

  useImperativeHandle(ref, () => ({
    openModalTemplate: () => {
      setModalTemplate(true);
    },
  }));

  // Ref to access ExitConfirm's state
  const exitConfirmRef = useRef(null);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalTemplate}
        onClose={() => {
          if (checkInput()) {
            exitConfirmRef.current.openExitConfirm();
          } else {
            closeModalTemplate();
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
        <Fade in={modalTemplate}>
          <Box sx={modalBoxStyle}>
            {children}
            <ExitConfirm
              ref={exitConfirmRef}
              closeModalTemplate={closeModalTemplate}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
});
