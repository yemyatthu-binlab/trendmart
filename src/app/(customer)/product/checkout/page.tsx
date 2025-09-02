// app/(customer)/product/checkout/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

// --- UI Imports ---
import { Button } from "@/components/ui/button";
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
import { ArrowLeft, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import {
  GetProductByIdDocument,
  useCreateOrderMutation,
  useGetMeQuery,
  useGetProductByIdQuery,
  useUploadImageMutation,
} from "@/graphql/generated";
import { useAuthStore } from "@/store/auth";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const checkoutSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(9, { message: "Please enter a valid phone number." }),
  address: z.string().min(10, { message: "Please enter a detailed address." }),
  city: z.string().min(3, { message: "City is required." }),
  postalCode: z
    .string()
    .min(5, { message: "Please enter a valid postal code." }),
  saveAddress: z.boolean().default(false).optional(),
  shippingMethod: z.enum(["ninjavan", "royal", "bee"], {
    message: "You need to select a shipping method.",
  }),
  paymentMethod: z.enum(["kpay", "ayapay", "wavemoney", "ayabank", "kbzbank"], {
    message: "You need to select a payment method.",
  }),
  paymentScreenshot: z
    .any()
    .refine((file) => file, "Payment screenshot is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

const shippingOptions = [
  { id: "ninjavan", label: "Ninja Van", price: 3500 },
  { id: "royal", label: "Royal Express", price: 3000 },
  { id: "bee", label: "Bee Express", price: 3200 },
];
const paymentOptions = [
  { id: "kpay", label: "KPay" },
  { id: "ayapay", label: "AYA Pay" },
  { id: "wavemoney", label: "Wave Money" },
  { id: "ayabank", label: "AYA Bank" },
  { id: "kbzbank", label: "KBZ Bank" },
];

// The main component, now a page
export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. CHANGED: Get productId, variantId, and quantity from URL
  const productId = searchParams.get("productId");
  const selectedVariantId = searchParams.get("variantId");
  const quantity = Number(searchParams.get("quantity") || 1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedScreenshotUrl, setUploadedScreenshotUrl] = useState<
    string | null
  >(null);

  const { data: meData } = useGetMeQuery();

  const { data, loading, error } = useGetProductByIdQuery({
    variables: { id: productId! },
    skip: !productId,
  });

  const [uploadScreenshot, { loading: isUploading }] = useUploadImageMutation();
  const [createOrder, { loading: isCreatingOrder }] = useCreateOrderMutation({
    onCompleted: () => {
      toast.success("Order placed successfully! Redirecting...");
      router.push("/order-success");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to place order.");
    },
    refetchQueries: [
      {
        query: GetProductByIdDocument,
        variables: { id: productId },
      },
    ],
  });

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

  useEffect(() => {
    if (meData?.me?.addresses && meData?.me?.addresses?.length > 0) {
      const defaultAddress =
        meData.me.addresses.find((a: any) => a.isDefault) ||
        meData.me.addresses[0];

      if (defaultAddress) {
        form.reset({
          name: defaultAddress.fullName,
          phone: defaultAddress.phoneNumber,
          address: defaultAddress.addressLine1,
          city: defaultAddress.city,
          postalCode: defaultAddress.postalCode,
          saveAddress: true,
        });
      }
    }
  }, [meData, form]);

  useEffect(() => {
    if (!productId || !selectedVariantId) {
      toast.error("No product selected.");
      router.push("/");
    }
  }, [productId, selectedVariantId, router]);

  const selectedShippingMethodId = form.watch("shippingMethod");
  const selectedShippingOption = shippingOptions.find(
    (opt) => opt.id === selectedShippingMethodId
  );
  // const shippingFee = selectedShippingOption ? selectedShippingOption.price : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  // Find the product from the query result
  const product = data?.getProductById;

  if (error || !product) {
    toast.error("Could not find the product details.");
    router.push("/");
    return null; // Render nothing while redirecting
  }

  // NEW: Find the specific variant from the product's variants array
  const selectedVariant = product.variants?.find(
    (v) => v?.id === selectedVariantId
  );

  // Handle case where the variant ID is invalid for the given product
  if (!selectedVariant) {
    toast.error("Selected product variation not found.");
    router.push(`/product/${product.id}`); // Redirect to the main product page
    return null;
  }

  const subtotal = selectedVariant.price * quantity;
  const total = subtotal;
  const primaryImage = selectedVariant?.images?.find((img) => img.isPrimary);

  async function onSubmit(formData: z.infer<typeof checkoutSchema>) {
    try {
      if (!uploadedScreenshotUrl) {
        toast.error("Please upload payment screenshot before submitting.");
        return;
      }

      const orderInput = {
        items: [{ productVariantId: selectedVariantId!, quantity }],
        shippingAddress: {
          fullName: formData.name,
          phoneNumber: formData.phone,
          addressLine1: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },
        shippingMethod: formData.shippingMethod,
        paymentMethod: formData.paymentMethod,
        paymentScreenshotUrl: uploadedScreenshotUrl,
        saveAddress: formData.saveAddress,
      };

      toast.info("Placing your order...");
      await createOrder({ variables: { input: orderInput } });
    } catch (err: any) {
      console.error("Order submission failed:", err);
      if (!err.graphQLErrors) {
        toast.error(err.message || "An unexpected error occurred.");
      }
    }
  }

  async function handleImageUpload(file: File) {
    try {
      toast.info("Uploading screenshot...");
      const uploadResult = await uploadScreenshot({
        variables: { file },
      });

      const screenshotUrl = uploadResult.data?.uploadImage?.url;
      if (!screenshotUrl) {
        throw new Error("No URL returned from upload.");
      }

      setUploadedScreenshotUrl(screenshotUrl);
      setImagePreview(screenshotUrl); // show uploaded image directly
      toast.success("Screenshot uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Image upload failed");
    }
  }

  // 5. Render as a page, not a dialog
  return (
    <main className="w-full h-screen bg-background text-foreground">
      <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
        <div className="lg:col-span-3 h-full">
          <ScrollArea className="h-full p-6 md:p-8 lg:p-12">
            <div className="max-w-2xl mx-auto">
              <header>
                <Button
                  variant="ghost"
                  onClick={() => router.back()}
                  className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Go back
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
                <p className="text-muted-foreground mt-2">
                  Please fill in your details to complete the purchase.
                </p>
              </header>

              <Form {...form}>
                {/* The form structure remains exactly the same */}
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
                              <Input
                                placeholder="Please enter full name"
                                {...field}
                              />
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
                              <Input
                                placeholder="Please enter phone number"
                                {...field}
                              />
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
                                  placeholder="Please enter detail address"
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
                                  className="flex items-center space-x-3 space-y-0 rounded-md border px-4  hover:bg-muted/50 transition-colors"
                                >
                                  <FormControl>
                                    <RadioGroupItem value={option.id} />
                                  </FormControl>
                                  <FormLabel className="font-normal w-full flex justify-between py-4">
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
                                        "border-primary ring-1 ring-primary"
                                    )}
                                  >
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
                  <section>
                    <h3 className="text-lg font-semibold mb-4">
                      4. Upload Payment Screenshot
                    </h3>
                    <FormField
                      control={form.control}
                      name="paymentScreenshot"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <label
                                htmlFor="paymentScreenshot"
                                className={cn(
                                  "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/75 transition-colors",
                                  {
                                    "border-destructive":
                                      form.formState.errors.paymentScreenshot,
                                  }
                                )}
                              >
                                {imagePreview ? (
                                  <>
                                    <Image
                                      src={imagePreview}
                                      alt="Screenshot preview"
                                      className="w-full h-full object-contain rounded-lg p-2"
                                      width={200}
                                      height={200}
                                    />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="icon"
                                      className="absolute top-2 right-2 h-7 w-7 rounded-full"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setImagePreview(null);
                                        setUploadedScreenshotUrl(null);
                                        field.onChange(null);
                                      }}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </>
                                ) : (
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground">
                                    <Upload className="w-8 h-8 mb-4" />
                                    <p className="mb-2 text-sm">
                                      <span className="font-semibold">
                                        Click to upload
                                      </span>{" "}
                                      or drag and drop
                                    </p>
                                    <p className="text-xs">
                                      PNG, JPG, or WEBP (MAX. 5MB)
                                    </p>
                                  </div>
                                )}
                              </label>
                              <Input
                                id="paymentScreenshot"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    field.onChange(file); // keep validation happy
                                    handleImageUpload(file); // immediate upload
                                  }
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg font-semibold py-2"
                    disabled={isUploading || isCreatingOrder}
                  >
                    {(isUploading || isCreatingOrder) && (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    )}
                    {isUploading
                      ? "Uploading Proof..."
                      : isCreatingOrder
                      ? "Placing Order..."
                      : "Complete Order"}
                  </Button>
                </form>
              </Form>
            </div>
          </ScrollArea>
        </div>

        {/* Right Side: Order Summary */}
        <div className="hidden lg:block lg:col-span-2 bg-muted/30 h-full">
          <ScrollArea className="h-full p-6 md:p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-6">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="relative w-24 h-24 rounded-md overflow-hidden border">
                    <Image
                      src={primaryImage?.imageUrl || "/placeholder.svg"}
                      alt={primaryImage?.altText || product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    {/* CHANGED: Use product.name */}
                    <p className="font-semibold">{product.name}</p>
                    {/* CHANGED: Use selectedVariant for details */}
                    <p className="text-sm text-muted-foreground">
                      {selectedVariant.color.name} /{" "}
                      {selectedVariant.size.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {formatPrice(selectedVariant.price * quantity)}
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
                {/* <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="text-foreground font-medium">
                    {formatPrice(shippingFee)}
                  </span>
                </div> */}
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </main>
  );
}
