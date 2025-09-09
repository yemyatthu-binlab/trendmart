"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronsRight, Loader2, UploadCloud, X } from "lucide-react";

import {
  useFindMyOrderForReturnLazyQuery,
  useUploadReturnImageMutation,
  useCreateReturnRequestMutation,
  FindMyOrderForReturnQuery,
} from "@/graphql/generated";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

// Type alias for easier access
type OrderForReturn = FindMyOrderForReturnQuery["findMyOrderForReturn"];

// Schema for step 1
const orderIdSchema = z.object({
  orderId: z.string().min(1, "Order ID is required."),
});

// Stepper UI Component
const Stepper = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    "Find Order",
    "Select Items",
    "Provide Details",
    "Confirmation",
  ];

  return (
    <div className="flex items-center justify-center mb-12">
      {steps.map((step, index) => {
        const stepIndex = index + 1;
        const isActive = currentStep === stepIndex;
        const isCompleted = currentStep > stepIndex;

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isActive
                    ? "bg-primary/20 border-2 border-primary text-primary"
                    : "bg-muted text-muted-foreground border"
                }`}
              >
                {isCompleted ? <Check size={24} /> : stepIndex}
              </div>
              <p
                className={`mt-2 text-sm text-center transition-colors duration-300 ${
                  isActive || isCompleted
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {step}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-4 transition-colors duration-500 ${
                  isCompleted ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Main Refund Form Component
export function RefundForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [order, setOrder] = useState<OrderForReturn>(null);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [itemDetails, setItemDetails] = useState<
    Record<
      string,
      { description: string; images: { url: string; uploading: boolean }[] }
    >
  >({});
  const [phoneNumber, setPhoneNumber] = useState("");

  const [findOrder, { loading: findOrderLoading, errors: onFindError }] =
    useFindMyOrderForReturnLazyQuery({
      onCompleted: (data) => {
        if (data.findMyOrderForReturn) {
          setOrder(data.findMyOrderForReturn);
          setCurrentStep(2);
        } else {
          toast.error(
            "We couldn't find an order with that ID associated with your account."
          );
        }
      },
      onError: (error) => {
        toast.error(error.message || "An unexpected error occurred.");
      },
      fetchPolicy: "network-only",
    });

  const [uploadImage] = useUploadReturnImageMutation();
  const [createReturnRequest, { loading: createRequestLoading }] =
    useCreateReturnRequestMutation();

  const form = useForm<z.infer<typeof orderIdSchema>>({
    resolver: zodResolver(orderIdSchema),
    defaultValues: { orderId: "" },
  });

  const handleFindOrder = (values: z.infer<typeof orderIdSchema>) => {
    findOrder({ variables: { orderId: values.orderId } });
  };

  const handleFileChange = async (itemId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    // Optimistic UI update
    const tempId = Date.now().toString();
    setItemDetails((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        images: [
          ...(prev[itemId]?.images || []),
          { url: tempId, uploading: true },
        ],
      },
    }));

    try {
      const { data } = await uploadImage({ variables: { file } });
      if (data?.uploadReturnImage.url) {
        // Replace temp image with actual URL
        setItemDetails((prev) => ({
          ...prev,
          [itemId]: {
            ...prev[itemId],
            images: prev[itemId].images.map((img) =>
              img.url === tempId
                ? { url: data.uploadReturnImage.url, uploading: false }
                : img
            ),
          },
        }));
      }
    } catch (error) {
      console.error("Upload failed:", error);
      // Remove the optimistic UI update on failure
      setItemDetails((prev) => ({
        ...prev,
        [itemId]: {
          ...prev[itemId],
          images: prev[itemId].images.filter((img) => img.url !== tempId),
        },
      }));
      toast.error("Upload Failed");
    }
  };

  const handleSubmitRequest = async () => {
    const itemsToReturn = Object.keys(selectedItems).filter(
      (id) => selectedItems[id]
    );

    if (itemsToReturn.length === 0) {
      toast.error("No items selected.");
      return;
    }
    if (!phoneNumber) {
      toast.error("Phone number is required.");
      return;
    }

    const input = {
      phoneNumber,
      items: itemsToReturn.map((itemId) => ({
        orderItemId: itemId,
        reason: "DAMAGED", // You can add a select input for this
        description: itemDetails[itemId]?.description || "",
        imageUrls: itemDetails[itemId]?.images.map((img) => img.url) || [],
      })),
    };

    try {
      await createReturnRequest({ variables: { input } });
      setCurrentStep(4);
    } catch (error: any) {
      toast.error("Could not submit your request.");
    }
  };

  const selectedItemCount = Object.values(selectedItems).filter(Boolean).length;

  return (
    <Card>
      <CardContent className="p-6 md:p-8">
        <Stepper currentStep={currentStep} />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Find Order */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-xl font-semibold text-center mb-1">
                  Enter Your Order ID
                </h3>
                <p className="text-muted-foreground text-center mb-6">
                  You can find this in your order confirmation email or your
                  account dashboard.
                </p>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleFindOrder)}
                    className="space-y-4 max-w-sm mx-auto"
                  >
                    <FormField
                      control={form.control}
                      name="orderId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order ID</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 10021" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={findOrderLoading}
                      className="w-full"
                    >
                      {findOrderLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Find Order
                    </Button>
                  </form>
                </Form>
              </div>
            )}

            {/* Step 2: Select Items */}
            {currentStep === 2 && order && (
              <div>
                <h3 className="text-xl font-semibold mb-1">
                  Select Damaged Item(s)
                </h3>
                <p className="text-muted-foreground mb-4">
                  Choose the products from Order #{order.id} that you wish to
                  return.
                </p>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start space-x-4 rounded-lg border p-4"
                    >
                      <Checkbox
                        id={item.id}
                        checked={!!selectedItems[item.id]}
                        onCheckedChange={(checked) =>
                          setSelectedItems((prev) => ({
                            ...prev,
                            [item.id]: !!checked,
                          }))
                        }
                        className="mt-1"
                      />
                      <div className="flex-1 flex items-center gap-4">
                        <Image
                          src={
                            item?.productVariant?.images?.[0]?.imageUrl ||
                            "/placeholder.png"
                          }
                          alt={item?.product?.name}
                          width={64}
                          height={64}
                          className="rounded-md object-cover"
                        />
                        <div>
                          <label
                            htmlFor={item.id}
                            className="font-semibold block cursor-pointer"
                          >
                            {item.product.name}
                          </label>
                          <p className="text-sm text-muted-foreground">
                            {item.productVariant.color.name} /{" "}
                            {item.productVariant.size.value}
                          </p>
                          <p className="text-sm">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-6">
                  <Button
                    onClick={() => setCurrentStep(3)}
                    disabled={selectedItemCount === 0}
                  >
                    Next ({selectedItemCount} selected){" "}
                    <ChevronsRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Provide Details */}
            {currentStep === 3 && order && (
              <div>
                <h3 className="text-xl font-semibold mb-1">
                  {" "}
                  Upload Proof & Details{" "}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Provide a photo of the damage for each item and your contact
                  number.
                </p>
                <div className="space-y-6">
                  {order.items
                    .filter((item) => selectedItems[item.id])
                    .map((item) => (
                      <div key={item.id} className="rounded-lg border p-4">
                        <p className="font-semibold">{item.product?.name}</p>
                        <div className="mt-4">
                          {/* Use regular Label, not FormLabel */}
                          <Label>Damage Description (Optional)</Label>
                          <Textarea
                            placeholder="e.g., The corner was chipped during shipping."
                            value={itemDetails[item.id]?.description || ""}
                            onChange={(e) =>
                              setItemDetails((prev) => ({
                                ...prev,
                                [item.id]: {
                                  ...(prev[item.id] || {
                                    description: "",
                                    images: [],
                                  }),
                                  description: e.target.value,
                                },
                              }))
                            }
                            className="mt-1"
                          />
                        </div>
                        <div className="mt-4">
                          <Label>Upload Image(s) of Damage</Label>
                          <div className="mt-2 flex items-center gap-4 flex-wrap">
                            {itemDetails[item.id]?.images?.map((image) => (
                              <div
                                key={image.url}
                                className="relative w-24 h-24"
                              >
                                {image.uploading ? (
                                  <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                                    <Loader2 className="animate-spin text-muted-foreground" />
                                  </div>
                                ) : (
                                  <>
                                    <Image
                                      src={image.url}
                                      alt="Uploaded damage"
                                      layout="fill"
                                      className="rounded-md object-cover"
                                    />
                                    <button
                                      onClick={() =>
                                        setItemDetails((prev) => ({
                                          ...prev,
                                          [item.id]: {
                                            ...prev[item.id],
                                            images: prev[item.id].images.filter(
                                              (i) => i.url !== image.url
                                            ),
                                          },
                                        }))
                                      }
                                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                                    >
                                      <X size={14} />
                                    </button>
                                  </>
                                )}
                              </div>
                            ))}
                            <label
                              htmlFor={`file-upload-${item.id}`}
                              className="w-24 h-24 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                            >
                              <UploadCloud
                                size={24}
                                className="text-muted-foreground"
                              />
                              <span className="text-xs mt-1 text-muted-foreground">
                                {" "}
                                Upload{" "}
                              </span>
                              <input
                                id={`file-upload-${item.id}`}
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={(e) =>
                                  handleFileChange(item.id, e.target.files)
                                }
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  <div className="mt-4">
                    <Label htmlFor="phone"> Your Contact Phone Number </Label>
                    <Input
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g., 09958453693"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    {" "}
                    Back{" "}
                  </Button>
                  <Button
                    onClick={handleSubmitRequest}
                    disabled={createRequestLoading}
                  >
                    {createRequestLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Submit Request
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <Check size={40} />
                </div>
                <h3 className="text-2xl font-semibold mt-6">
                  Request Submitted!
                </h3>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                  Thank you. Your damage report has been received. Our team will
                  review it and get back to you via your provided phone number
                  or email within 7 business days.
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  className="mt-8"
                >
                  Submit Another Request
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
