"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCookie } from "cookies-next";
import { toast } from "sonner";
import axios from "axios";
import { Badge } from "@/components/ui/badge";

export default function Component() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(null);
  const endpoint = "https://buka-store.vercel.app/api/orders";
  const userJson = getCookie("user");
  const userData = userJson ? JSON.parse(userJson) : "";
  console.log(selectedOrder);

  useEffect(() => {
    const fetchOrder = async () => {
      await axios
        .get(endpoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userData?.user?.token,
          },
        })
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          console.log(err, "Catch eeror");
        });
    };
    fetchOrder();
  }, []);

  console.log(orders);

  return (
    <Card className="w-full max-w-4xl mx-auto my-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Your Completed Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paid</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders
              ?.filter((item) => item?.order_buka._id == userData?.user?._id)
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .map((order, index) => (
                <TableRow key={order?._id}>
                  <TableCell>
                    <Badge
                      className={
                        order?.is_paid === "true"
                          ? "bg-green-600 text-[0.6rem]"
                          : "bg-red-600 text-[0.6rem]"
                      }
                    >
                      {" "}
                      {order?.is_paid === "true" ? "Paid" : "Not Paid"}
                    </Badge>
                  </TableCell>
                  <TableCell>{order?.date}</TableCell>
                  <TableCell>${order?.order_total.toFixed(2)}</TableCell>
                  <TableCell>{order?.order_status}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className=""
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <div className=" bg-gray-100">
                          {selectedOrder?.order_items?.map((item) => (
                            <div>
                              {item?.cuisine_id?.cuisine_name} X{" "}
                              {item?.quantity}
                            </div>
                          ))}
                        </div>
                        <div>
                          <p>
                            Name:{" "}
                            <span>
                              {selectedOrder?.order_owner?.first_name}{" "}
                              {selectedOrder?.order_owner?.last_name}
                            </span>
                          </p>
                           <p>
                            Email:{" "}
                            <span>
                              {selectedOrder?.order_owner?.email}
                            </span>
                          </p>
                           <p>
                            Phone:{" "}
                            <span>
                              {selectedOrder?.order_owner?.phone}
                            </span>
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <span className="font-bold">Total</span>
                          <span className="text-xl font-bold">
                            ${selectedOrder?.order_total.toFixed(2)}
                          </span>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
