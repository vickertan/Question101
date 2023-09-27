import { ButtonGroup, IconButton } from "@mui/material";
import SwipeRightRoundedIcon from "@mui/icons-material/SwipeRightRounded";
import SwipeLeftRoundedIcon from "@mui/icons-material/SwipeLeftRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

export default function DeckButton({ swipe, goBack, handleFavorite }) {
  return (
    <div className="button-area">
      <ButtonGroup className="playground-button-group">
        <IconButton
          onClick={() => {
            swipe("left");
          }}
        >
          <SwipeLeftRoundedIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => goBack()}>
          <ReplayRoundedIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => handleFavorite()}>
          <FavoriteRoundedIcon fontSize="large" />
        </IconButton>
        <IconButton
          onClick={() => {
            swipe("right");
          }}
        >
          <SwipeRightRoundedIcon fontSize="large" />
        </IconButton>
      </ButtonGroup>
    </div>
  );
}
