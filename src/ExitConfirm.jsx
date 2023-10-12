import { useState, useImperativeHandle, forwardRef } from "react";
import { Modal, Fade, Box, ButtonGroup, Button } from "@mui/material";
import { modalBoxStyle, buttonStyle } from "./componentStyle";

const ExitConfirm = forwardRef(function ExitConfirm({ handleYesConfirm }, ref) {
  const [exitConfirm, setExitConfirm] = useState(false);

  const closeExitConfirm = () => setExitConfirm(false);

  useImperativeHandle(ref, () => ({
    openExitConfirm: () => {
      setExitConfirm(true);
    },
  }));

  return (
    <Modal open={exitConfirm}>
      <Fade in={exitConfirm}>
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
                handleYesConfirm();
                closeExitConfirm();
              }}
            >
              Yes
            </Button>
            <Button sx={buttonStyle} onClick={closeExitConfirm}>
              No
            </Button>
          </ButtonGroup>
        </Box>
      </Fade>
    </Modal>
  );
});

export default ExitConfirm;
