"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils"; // Make sure you have this utility from shadcn/ui

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { GetProductByIdQuery } from "@/graphql/generated";

// Define the validation schema using Zod
const checkoutSchema = z.object({
  // Delivery Information
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(9, { message: "Please enter a valid phone number." }),
  address: z.string().min(10, { message: "Please enter a detailed address." }),
  city: z.string().min(3, { message: "City is required." }),
  postalCode: z
    .string()
    .min(5, { message: "Please enter a valid postal code." }),
  saveAddress: z.boolean().default(false).optional(),

  // Shipping Method
  shippingMethod: z.enum(["ninjavan", "royal", "bee"], {
    required_error: "You need to select a shipping method.",
  }),

  // Payment Method
  paymentMethod: z.enum(["kpay", "ayapay", "wavemoney", "ayabank", "kbzbank"], {
    required_error: "You need to select a payment method.",
  }),
});

// Define shipping and payment options for easier mapping
const shippingOptions = [
  { id: "ninjavan", label: "Ninja Van", price: 3500 },
  { id: "royal", label: "Royal Express", price: 3000 },
  { id: "bee", label: "Bee Express", price: 3200 },
];

const paymentOptions = [
  { id: "kpay", label: "KPay" },
  { id: "ayapay", label: "AYA Pay" },
  { id: "wavemoney", label: "Wavemoney" },
  { id: "ayabank", label: "AYA Bank" },
  { id: "kbzbank", label: "KBZ Bank" },
];

// Define Props for the component
// You'll need to export the ProductVariant type from your page or define it here.
// For simplicity, I've added a basic structure.
type ProductVariant = GetProductByIdQuery["getProductById"]["variants"][0];

interface CheckoutDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  variant: ProductVariant | null;
  productName: string;
  quantity: number;
}

export function CheckoutDialog({
  isOpen,
  onOpenChange,
  variant,
  productName, // <-- Use the new prop
  quantity,
}: CheckoutDialogProps) {
  // ... (useForm hook and initial checks remain the same)
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      city: "Yangon",
      postalCode: "",
      saveAddress: true,
    },
  });

  if (!variant) return null;

  const subtotal = variant.price * quantity;
  // This could be dynamic based on selection, but for now we'll use a fixed value.
  const shippingFee = 3000;
  const total = subtotal + shippingFee;

  const primaryImage = variant.images.find((img) => img.isPrimary);

  async function onSubmit(data: z.infer<typeof checkoutSchema>) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Order Data:", data);
    toast.success("Order placed successfully!");
    onOpenChange(false); // Close dialog on success
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] md:w-[90vw] lg:w-[80vw] xl:w-6xl h-[90vh] p-0 bg-background text-foreground">
        <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
          {/* Left Side: Form */}
          <div className="lg:col-span-3 h-full">
            <ScrollArea className="h-full p-6 md:p-8">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold tracking-tight">
                  Checkout
                </DialogTitle>
                <DialogDescription>
                  Please fill in your details to complete the purchase.
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 space-y-8"
                >
                  {/* Delivery Section */}
                  <section>
                    <h3 className="text-lg font-semibold mb-4">
                      1. Delivery Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="09 ... " {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Detailed Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="123, Main Street, Ward 7"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City / Region</FormLabel>
                            <FormControl>
                              <Input placeholder="Yangon" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="11011" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="md:col-span-2 flex items-center space-x-2 mt-2">
                        <FormField
                          control={form.control}
                          name="saveAddress"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Save this information for next time
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </section>

                  {/* Shipping Method */}
                  <section>
                    <h3 className="text-lg font-semibold mb-4">
                      2. Shipping Method
                    </h3>
                    <FormField
                      control={form.control}
                      name="shippingMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              {shippingOptions.map((option) => (
                                <FormItem
                                  key={option.id}
                                  className="flex items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors"
                                >
                                  <FormControl>
                                    <RadioGroupItem value={option.id} />
                                  </FormControl>
                                  <FormLabel className="font-normal w-full flex justify-between">
                                    <span>{option.label}</span>
                                    <span>{formatPrice(option.price)}</span>
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>

                  {/* Payment Method */}
                  <section>
                    <h3 className="text-lg font-semibold mb-4">
                      3. Payment Method
                    </h3>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-2 gap-4"
                            >
                              {paymentOptions.map((option) => (
                                <FormItem key={option.id}>
                                  <FormControl>
                                    <RadioGroupItem
                                      value={option.id}
                                      className="sr-only"
                                    />
                                  </FormControl>
                                  <FormLabel
                                    className={cn(
                                      "flex items-center justify-center rounded-md border-2 p-4 font-normal hover:bg-muted/50 transition-colors cursor-pointer",
                                      field.value === option.id &&
                                        "border-primary ring-2 ring-primary"
                                    )}
                                  >
                                    {/* You can add logos here */}
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg font-semibold"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting && (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    )}
                    Complete Order
                  </Button>
                </form>
              </Form>
            </ScrollArea>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-2 bg-muted/30 h-full">
            <ScrollArea className="h-full p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-6">Order Summary</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="relative w-24 h-24 rounded-md overflow-hidden border">
                    <Image
                      src={primaryImage?.imageUrl || "/placeholder.svg"}
                      alt={primaryImage?.altText || productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{productName}</p>
                    <p className="text-sm text-muted-foreground">
                      {variant.color.name} / {variant.size.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {formatPrice(variant.price * quantity)}
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-foreground font-medium">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="text-foreground font-medium">
                    {formatPrice(shippingFee)}
                  </span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)} MMK</span>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
