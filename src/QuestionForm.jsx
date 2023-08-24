import { Box, TextField, MenuItem, Button } from "@mui/material";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";

import { useState, useRef, forwardRef, useImperativeHandle } from "react";

const categories = ["Deep Thought", "Romance", "Food", "Fun", "This or That"];

const CategoryInput = forwardRef(function CategoryInput(props, ref) {
  const [selectedCategory, setSelectedCategory] = useState("");

  useImperativeHandle(ref, () => ({
    getSelectedCategory: () => {
      setSelectedCategory("");
      return selectedCategory ? selectedCategory : null;
    },
  }));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <CategoryRoundedIcon sx={{ color: "action.active", mr: 2, my: "auto" }} />
      <TextField
        sx={{ width: 200 }}
        select
        label="Category"
        onChange={(e) => setSelectedCategory(e.target.value)}
        value={selectedCategory}
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
});

const QuestionInput = forwardRef(function QuestionInput(props, ref) {
  const [userQuestion, setUserQuestion] = useState("");

  useImperativeHandle(ref, () => ({
    getUserQuestion: () => {
      setUserQuestion("");
      return userQuestion ? userQuestion : null;
    },
  }));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        my: 1,
        width: 1,
      }}
    >
      <QuestionAnswerRoundedIcon
        sx={{ color: "action.active", mr: 2.5, my: 0.5 }}
      />
      <TextField
        id="user-question"
        label="Your question here..."
        variant="standard"
        value={userQuestion}
        onChange={(e) => setUserQuestion(e.target.value)}
      />
    </Box>
  );
});

export default function QuestionForm() {
  const categoryInputRef = useRef(null);
  const questionInputRef = useRef(null);

  return (
    <Box>
      <h1>Question Creating</h1>
      <CategoryInput ref={categoryInputRef} />
      <QuestionInput ref={questionInputRef} />
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        endIcon={<UploadRoundedIcon />}
        onClick={() => {
          console.log(
            `Category: ${categoryInputRef.current.getSelectedCategory()}\nQuestion: ${questionInputRef.current.getUserQuestion()}`
          );
        }}
      >
        Upload
      </Button>
    </Box>
  );
}
