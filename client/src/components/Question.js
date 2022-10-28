import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Box,
  Rating,
  Stack,
  TextField,
  Typography,
  Container,
  Paper,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { addQuestion, getQuestions } from "../redux/apiCalls";

const Question = ({ productId, seller }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    getQuestions(productId).then((res) => setQuestions(res.data));
  }, [productId]);

  const questionHandler = (e) => {
    e.preventDefault();
    const questionData = {
      username: user?.username,
      productId: productId,
      question: question,
      answer: "",
      status: 0,
    };
    question !== "" &&
      addQuestion(questionData).then((res) => {
        setResponse(res);
      });
  };
  return (
    <>
      <Container maxWidth="md">
        <Typography
          variant="caption"
          sx={{ bgcolor: "gray", color: "white", width: 130 }}
        >
          Questions About This Product{" "}
          {questions.length > 0 && `(${questions.length})`}
        </Typography>
        {questions.length === 0 && (
          <Typography>There are no questions yet.</Typography>
        )}
        {questions.length > 0 && (
          <Stack sx={{ height: 120, overflowY: "scroll" }}>
            {questions.map((question) => (
              <Box key={question._id}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Avatar sx={{ bgcolor: "red", width: 20, height: 20 }}>
                    Q
                  </Avatar>{" "}
                  <Typography variant="caption">{question.question}</Typography>
                </Stack>
                <Typography sx={{ mb: 1, fontSize: 10 }} color="text.secondary">
                  questioned on {new Date(question.createdAt).toDateString()} by{" "}
                  <b>{question.username}</b>
                </Typography>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Avatar sx={{ bgcolor: "green", width: 20, height: 20 }}>
                    A
                  </Avatar>{" "}
                  <Typography variant="caption">{question.answer}</Typography>
                </Stack>
                <Typography sx={{ mb: 1, fontSize: 10 }} color="text.secondary">
                  answered on {new Date(question.updatedAt).toDateString()} by{" "}
                  <b>{seller}</b>
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Container>
      <Container maxWidth="md">
        {!user ? (
          <Typography>You must login first to ask question.</Typography>
        ) : (
          <Box component="form" onSubmit={questionHandler}>
            {response !== "" && (
              <Typography variant="body2" sx={{ color: "green" }}>
                {response}
              </Typography>
            )}
            <Stack direction="row" alignItems="center">
              <TextField
                size="small"
                name="question"
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="ask seller a question"
                fullWidth={question !== ""}
              />
              <Button
                disabled={response !== ""}
                type="submit"
                variant="contained"
                sx={{ width: 200, borderRadius: 0, ml: 1, bgcolor: "black" }}
              >
                Ask Question
              </Button>
            </Stack>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Question;
