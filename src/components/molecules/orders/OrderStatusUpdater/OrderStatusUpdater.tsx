"use client";

import { useState } from "react";
import { OrderStatus } from "@/graphql/generated";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UPDATE_ORDER_STATUS, GetOrderById } from "@/graphql/queries/order";

// Get all possible enum values for the dropdown
const orderStatusOptions = Object.values(OrderStatus);

interface OrderStatusUpdaterProps {
  orderId: string;
  currentStatus: OrderStatus;
}

export function OrderStatusUpdater({
  orderId,
  currentStatus,
}: OrderStatusUpdaterProps) {
  const [selectedStatus, setSelectedStatus] =
    useState<OrderStatus>(currentStatus);

  const [updateOrderStatus, { loading }] = useMutation(UPDATE_ORDER_STATUS, {
    onCompleted: () => {
      toast.success("Order status updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update status: ${error.message}`);
    },
    // This refetches the order data to update the UI automatically
    refetchQueries: [{ query: GetOrderById, variables: { id: orderId } }],
  });

  const handleUpdate = () => {
    updateOrderStatus({
      variables: {
        orderId,
        status: selectedStatus,
      },
    });
  };

  return (
    <div>
      {/* <p className="text-sm font-medium mb-2">Update Order Status</p> */}
      <div className="flex items-center gap-2">
        <Select
          value={selectedStatus}
          disabled={currentStatus == "CANCELLED"}
          onValueChange={(value) => setSelectedStatus(value as OrderStatus)}
        >
          <SelectTrigger className="md:w-[220px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {orderStatusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleUpdate}
          disabled={loading || selectedStatus === currentStatus}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
