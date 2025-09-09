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
import {
  useGetProductByIdQuery,
  useCreateProductFeedbackMutation,
} from "@/graphql/generated";

import { Star } from "lucide-react";
import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";

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

const RatingsSummary = ({
  averageRating,
  totalReviews,
  ratingCounts,
}: {
  averageRating: number;
  totalReviews: number;
  ratingCounts: { star: number; count: number }[];
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg">
        <p className="text-5xl font-bold">{averageRating.toFixed(1)}</p>
        <ReviewStars rating={Math.round(averageRating)} />
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
              value={totalReviews > 0 ? (count / totalReviews) * 100 : 0}
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

const ReviewForm = ({ productId }: { productId: number }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [createFeedback, { loading, error }] = useCreateProductFeedbackMutation(
    {
      refetchQueries: ["GetProductById"], // Automatically refetch the product data after a successful mutation
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || comment.length < 1) return;

    try {
      await createFeedback({
        variables: {
          input: {
            productId: productId,
            rating,
            comment,
          },
        },
      });
      // Clear the form on success
      setRating(0);
      setComment("");
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

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
        <Button
          onClick={handleSubmit}
          disabled={loading || rating === 0 || comment.length < 1}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </CardFooter>
      {error && (
        <p className="text-sm text-red-500 px-6 pb-4">*{error.message}</p>
      )}
    </Card>
  );
};

export const ProductReviews = ({ productId }: { productId: string }) => {
  const { data, loading, error } = useGetProductByIdQuery({
    variables: { id: productId },
  });

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error loading reviews: {error.message}</div>;

  const product = data?.getProductById;

  if (!product) return <div>No product found.</div>;

  const { averageRating, totalReviews, ratingCounts, feedback } = product;

  return (
    <div className="space-y-12">
      {/* --- Section 1: Ratings Summary --- */}
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-4">
          Customer Reviews
        </h3>
        <RatingsSummary
          averageRating={averageRating || 0}
          totalReviews={totalReviews || 0}
          ratingCounts={ratingCounts || []}
        />
      </div>

      {/* --- Section 2: Individual Reviews --- */}
      <div className="space-y-8">
        {feedback?.map((review) => (
          <div key={review.id} className="flex gap-4">
            <Avatar>
              <AvatarImage
                src={`https://ui-avatars.com/api/?name=${review.user.fullName}&background=random&color=ffffff`}
                alt={review.user.fullName}
              />
              <AvatarFallback>{review.user.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{review.user.fullName}</p>
                <p className="text-xs text-muted-foreground">
                  {/* {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                  })} */}
                </p>
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
      <ReviewForm productId={parseInt(productId)} />
    </div>
  );
};
