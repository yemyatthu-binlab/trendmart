// src/components/features/refund/refund-form-skeleton.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RefundFormSkeleton() {
  return (
    <Card>
      <CardContent className="p-6 md:p-8">
        {/* Skeleton for the Stepper */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex flex-col items-center">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-4 w-16 mt-2" />
          </div>
          <Skeleton className="flex-1 h-1 mx-4" />
          <div className="flex flex-col items-center opacity-50">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-4 w-16 mt-2" />
          </div>
          <Skeleton className="flex-1 h-1 mx-4" />
          <div className="flex flex-col items-center opacity-50">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-4 w-20 mt-2" />
          </div>
        </div>

        {/* Skeleton for the Form */}
        <div>
          <Skeleton className="h-7 w-48 mx-auto mb-1" />
          <Skeleton className="h-4 w-full max-w-md mx-auto mb-6" />
          <div className="space-y-4 max-w-sm mx-auto">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
