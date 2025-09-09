"use client";

import { RefundFormSkeleton } from "@/components/organisms/order/RefundFormSkeleton/refundFormSkeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// 👇 Dynamically import the RefundForm
const RefundForm = dynamic(
  () =>
    import("@/components/organisms/order/RefundForm/RefundForm").then(
      (mod) => mod.RefundForm
    ),
  {
    loading: () => <RefundFormSkeleton />, // Show this skeleton while loading
  }
);

export default function RefundPage() {
  const router = useRouter();
  return (
    <main className="container mx-auto max-w-3xl py-12 md:py-16">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Go back
      </Button>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Damage & Return Request
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          We&apos;re sorry to hear something went wrong. Please follow the steps
          below to submit your request.
        </p>
      </div>
      <RefundForm />
    </main>
  );
}
