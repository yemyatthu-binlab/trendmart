// app/(customer)/product/[id]/ProductReviews.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import clsx from "clsx";

// Mock data - replace with your actual data fetching logic
const MOCK_REVIEWS = {
  averageRating: 4.3,
  totalReviews: 83,
  ratingCounts: [
    { star: 5, count: 52 },
    { star: 4, count: 18 },
    { star: 3, count: 5 },
    { star: 2, count: 3 },
    { star: 1, count: 5 },
  ],
  reviews: [
    {
      id: "1",
      author: "Jane Doe",
      avatarUrl: "https://github.com/shadcn.png",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Absolutely love this! The quality is amazing and it fits perfectly. I've already gotten so many compliments on it. Highly recommend to anyone on the fence.",
    },
    {
      id: "2",
      author: "John Smith",
      avatarUrl: "", // Example with no avatar
      rating: 4,
      date: "1 month ago",
      comment:
        "Great product overall. It's comfortable and looks good. My only small issue is that the color is slightly different from the photos, but it's still very nice.",
    },
    {
      id: "3",
      author: "Emily White",
      avatarUrl: "https://github.com/vercel.png",
      rating: 5,
      date: "1 month ago",
      comment:
        "Exceeded my expectations. Will be buying another one in a different color!",
    },
  ],
};

// ============================================================================
//  Review Stars Component (for displaying ratings)
// ============================================================================
const ReviewStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={clsx(
          "h-4 w-4",
          rating >= star
            ? "text-yellow-500 fill-yellow-500"
            : "text-muted-foreground"
        )}
      />
    ))}
  </div>
);

// ============================================================================
//  Ratings Summary Component
// ============================================================================
const RatingsSummary = () => {
  const { averageRating, totalReviews, ratingCounts } = MOCK_REVIEWS;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg">
        <p className="text-5xl font-bold">{averageRating.toFixed(1)}</p>
        <ReviewStars rating={averageRating} />
        <p className="mt-2 text-sm text-muted-foreground">
          Based on {totalReviews} reviews
        </p>
      </div>
      <div className="space-y-2">
        {ratingCounts.map(({ star, count }) => (
          <div key={star} className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground w-12">
              {star} star
            </span>
            <Progress
              value={(count / totalReviews) * 100}
              className="flex-1 h-3"
            />
            <span className="text-sm text-muted-foreground w-8 text-right">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
//  Review Form Component
// ============================================================================
const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
        <CardDescription>
          Share your thoughts with other customers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Your Rating</p>
          <div
            className="flex items-center gap-1"
            onMouseLeave={() => setHoverRating(0)}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={clsx(
                  "h-6 w-6 cursor-pointer transition-colors",
                  hoverRating >= star || rating >= star
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-muted-foreground"
                )}
                onMouseEnter={() => setHoverRating(star)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <Textarea
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
      </CardContent>
      <CardFooter>
        <Button disabled={rating === 0 || comment.length < 10}>
          Submit Review
        </Button>
      </CardFooter>
    </Card>
  );
};

// ============================================================================
//  Main Product Reviews Component
// ============================================================================
export const ProductReviews = () => {
  return (
    <div className="space-y-12">
      {/* --- Section 1: Ratings Summary --- */}
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-4">
          Customer Reviews
        </h3>
        <RatingsSummary />
      </div>

      {/* --- Section 2: Individual Reviews --- */}
      <div className="space-y-8">
        {MOCK_REVIEWS.reviews.map((review) => (
          <div key={review.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={review.avatarUrl} alt={review.author} />
              <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{review.author}</p>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
              <div className="my-1">
                <ReviewStars rating={review.rating} />
              </div>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- Section 3: Add Review Form --- */}
      <ReviewForm />
    </div>
  );
};
