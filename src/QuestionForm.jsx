import { Box, TextField, MenuItem } from "@mui/material";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";

import { useState } from "react";

const categories = [
  "Deep Thought",
  "Romance",
  "Food",
  "Fun",
  "This or That",
  "Random",
];

function CategoryInput() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <CategoryOutlinedIcon
        sx={{ color: "action.active", mr: 1, my: "auto" }}
      />
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
}

function QuestionInput() {
  const [userQuestion, setUserQuestion] = useState("");

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", my: 1 }}>
      <QuestionAnswerOutlinedIcon
        sx={{ color: "action.active", mr: 1, my: 0.5 }}
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
}

export default function QuestionForm() {
  return (
    <>
      <h1>Question Creating</h1>
      <CategoryInput />
      <QuestionInput />
    </>
  );
}
