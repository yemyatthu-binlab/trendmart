"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sidebar } from "@/components/organisms/common/Sidebar/Sidebar";
import { RecentOrders } from "@/components/organisms/dashboard/RecentOrder/RecentOrder";
import { TopSellingProducts } from "@/components/organisms/dashboard/TopSellingProduct/TopSellingProduct";
import { Overview } from "@/components/organisms/dashboard/Overview/Overview";
import { DollarSign, Loader2, ShoppingCart, Users } from "lucide-react";
import { useGetDashboardDataQuery } from "@/graphql/generated";

export default function DashboardPage() {
  const { loading, error, data } = useGetDashboardDataQuery();

  if (loading || !data)
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-muted/40">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground animate-pulse">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  const orderPercentageChange =
    data?.stats.ordersLastMonth > 0
      ? ((data.stats.ordersThisMonth - data.stats.ordersLastMonth) /
          data.stats.ordersLastMonth) *
        100
      : data?.stats?.ordersThisMonth > 0
      ? 100
      : 0;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(data.stats.totalRevenue * 100)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    MMK
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on all-time data
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders
                  </CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.stats.totalOrders}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {orderPercentageChange >= 0 ? "+" : ""}
                    {orderPercentageChange.toFixed(1)}% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.stats.totalUsers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +{data.stats.newUsersThisMonth} within this month
                  </p>
                </CardContent>
              </Card>
            </div>

            <Overview />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="lg:col-span-4">
                <RecentOrders />
              </div>
              <div className="lg:col-span-3">
                <TopSellingProducts />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
