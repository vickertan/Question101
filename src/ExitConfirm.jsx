import { useState, useImperativeHandle, forwardRef } from "react";
import { Modal, Fade, Box, ButtonGroup, Button } from "@mui/material";
import { modalBoxStyle, buttonStyle } from "./componentStyle";

const ExitConfirm = forwardRef(function ExitConfirm({ handleClose }, ref) {
  const [exitConfirmOpen, setExitConfirmOpen] = useState(false);

  const handleCloseConfirm = () => setExitConfirmOpen(false);

  useImperativeHandle(ref, () => ({
    handleOpenConfirm: () => {
      setExitConfirmOpen(true);
    },
  }));

  return (
    <Modal open={exitConfirmOpen}>
      <Fade in={exitConfirmOpen}>
        <Box sx={{ ...modalBoxStyle, width: 200 }}>
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
});

export default ExitConfirm;
