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
} from "@mui/material";
import { addReview, getReviews } from "../../redux/apiCalls";

const Review = ({ productId }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [reviews, setReviews] = useState([]);
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
    getReviews(productId).then((res) => setReviews(res.data));
  }, [productId]);

  const reviewHandler = (e) => {
    e.preventDefault();
    addReview(inputs).then((res) => {
      getReviews(productId).then((res) => setReviews(res.data));
    });
  };
  return (
    <>
      <Container>
        <Typography
          variant="caption"
          sx={{ bgcolor: "gray", color: "white", pl: 1, width: 130 }}
        >
          Product Reviews
        </Typography>
        <Card variant="outlined">
          {reviews.map((review) => (
            <CardContent key={review._id}>
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
            </CardContent>
          ))}
        </Card>
        {!user ? (
          <Typography>You must login first to add review.</Typography>
        ) : (
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
                  value={inputs.title}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" alignItems="center" gap={2}>
                <Typography component="legend">Rating:</Typography>
                <Rating
                  name="rating"
                  value={parseInt(inputs.rating)}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" alignItems="center" gap={2}>
                <Typography component="legend">Message:</Typography>
                <TextField
                  multiline
                  minRows={3}
                  name="message"
                  value={inputs.message}
                  onChange={handleChange}
                />
              </Stack>
              <Button type="submit" variant="outlined" sx={{ width: 100 }}>
                Submit
              </Button>
            </Stack>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Review;
