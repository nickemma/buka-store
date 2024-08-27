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
import axios from "axios";
import { Badge } from "@/components/ui/badge";

export default function Component() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(null);
  const endpoint = "https://buka-store.vercel.app/api/orders";
  const userJson = getCookie("user");
  const userData = userJson ? JSON.parse(userJson) : "";
  const completedOrders = [
    {
      id: "1001",
      date: "2023-06-01",
      total: 45.97,
      status: "Delivered",
      items: [
        { name: "Margherita Pizza", quantity: 2, price: 12.99 },
        { name: "Caesar Salad", quantity: 1, price: 8.99 },
        { name: "Soda", quantity: 2, price: 2.5 },
      ],
    },
    {
      id: "1002",
      date: "2023-06-03",
      total: 32.98,
      status: "Delivered",
      items: [
        { name: "Vegetarian Burger", quantity: 2, price: 10.99 },
        { name: "French Fries", quantity: 1, price: 3.99 },
        { name: "Milkshake", quantity: 2, price: 3.5 },
      ],
    },
    {
      id: "1003",
      date: "2023-06-05",
      total: 28.97,
      status: "Delivered",
      items: [
        { name: "Chicken Wings", quantity: 1, price: 9.99 },
        { name: "Garlic Bread", quantity: 1, price: 4.99 },
        { name: "Coke", quantity: 1, price: 1.99 },
      ],
    },
  ];

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
          setOrders(
            res.data
              
              .filter((item) => item?.order_owner._id === userData?.user._id)
          );

          router.refresh();
        })
        .catch((err) => {
          console.log(err, "Catch error");
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
            {orders?.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((order, index) => (
              <TableRow key={order?._id}>
                <TableCell>
                  <Badge
                    className={
                      order?.is_paid === "true"
                        ? "bg-green-600 text-[0.7rem]"
                        : "bg-red-600 text-[0.7rem]"
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
                        onClick={() => setSelectedOrder(order?.order_items)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>
                          Order Details 
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="max-h-[60vh]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Item</TableHead>
                              <TableHead className="text-right">
                                Quantity
                              </TableHead>
                              <TableHead className="text-right">
                                Price
                              </TableHead>
                              <TableHead className="text-right">
                                Subtotal
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedOrder?.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  {item?.cuisine_id.cuisine_name}
                                </TableCell>
                                <TableCell className="text-right">
                                  {item?.quantity}
                                </TableCell>
                                <TableCell className="text-right">
                                  ${item?.price.toFixed(2)}
                                </TableCell>
                                <TableCell className="text-right">
                                  ${(item?.quantity * item?.price).toFixed(2)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                      <div className="flex justify-between items-center mt-4">
                        <span className="font-bold">Total</span>
                        <span className="text-xl font-bold">
                          {/* ${orders?.order_total.toFixed(2)} */}
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
