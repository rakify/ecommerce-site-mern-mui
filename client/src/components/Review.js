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
import { addReview, getReviews, updateReview } from "../redux/apiCalls";

const Review = ({ productId, from, img, title }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [reviews, setReviews] = useState([]);
  const [response, setResponse] = useState(""); // success or failure status
  const [inputs, setInputs] = useState({
    username: user?.username,
    productId: productId,
    title: "",
    rating: 5,
    message: "",
  });
  // This handles the change in textfields
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    getReviews(productId).then((res) => {
      setReviews(res.data);
      let review = res.data.find((review) => review.username === user.username);
      review && setInputs(review);
    });
  }, [productId]);
  const reviewHandler = (e) => {
    e.preventDefault();
    inputs._id
      ? updateReview(inputs._id, inputs).then((res) => {
          setResponse(res);
          getReviews(productId).then((res) => setReviews(res.data));
        })
      : addReview(inputs).then((res) => {
          setResponse(res);
          getReviews(productId).then((res) => setReviews(res.data));
        });
  };
  return (
    <>
      <Container maxWidth="md">
        {from === "" && (
          <>
            <Typography
              variant="caption"
              sx={{ bgcolor: "gray", color: "white", width: 130 }}
            >
              Reviews {reviews.length > 0 && `(${reviews.length})`}
            </Typography>
            {reviews.length === 0 && (
              <Typography>This product has no reviews.</Typography>
            )}
            {reviews.length > 0 && (
              <Stack sx={{ height: 240, overflowY: "scroll" }}>
                {reviews.map((review) => (
                  <Box key={review._id}>
                    <Typography>
                      <Rating value={review.rating} readOnly />
                    </Typography>
                    <Typography variant="h5" component="div">
                      {review.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      reviewed on {new Date(review.createdAt).toDateString()} by{" "}
                      <b>{review.username}</b>
                    </Typography>
                    <Typography variant="body2">
                      <q>{review.message}</q>
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </>
        )}
        {/* If from order page show him input to add review */}
        {from === "order" && (
          <>
            <Stack
              direction="row"
              alignItems="center"
              gap={2}
              sx={{ bgcolor: "#d3d3d3" }}
            >
              <Avatar
                alt="Product Image"
                src={img}
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: 0,
                }}
              />
              <Typography variant="h6">{title}</Typography>
            </Stack>

            {response !== "" && (
              <Typography sx={{ color: "green" }}>{response}</Typography>
            )}

            <Box component="form" onSubmit={reviewHandler}>
              <Stack
                direction="column"
                gap={2}
                sx={{ width: 500, border: "2px solid whitesmoke" }}
              >
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography component="legend">Title:</Typography>
                  <TextField
                    name="title"
                    value={inputs?.title}
                    onChange={handleChange}
                  />
                </Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography component="legend">Rating:</Typography>
                  <Rating
                    name="rating"
                    value={parseInt(inputs?.rating)}
                    onChange={handleChange}
                  />
                </Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography component="legend">Message:</Typography>
                  <TextField
                    multiline
                    minRows={3}
                    name="message"
                    value={inputs?.message}
                    onChange={handleChange}
                  />
                </Stack>
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ width: 100 }}
                  disabled={response !== ""}
                >
                  {inputs._id ? "Update" : "Submit"}
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default Review;
