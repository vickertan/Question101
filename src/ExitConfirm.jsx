import { useState, useImperativeHandle, forwardRef } from "react";
import { Modal, Fade, Box, ButtonGroup, Button } from "@mui/material";
import { modalBoxStyle, buttonStyle } from "./componentStyle";

const ExitConfirm = forwardRef(function ExitConfirm(
  { handleYesConfirm, children },
  ref
) {
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
          <p>{children}</p>
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
