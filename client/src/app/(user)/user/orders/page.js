"use client"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Component() {
  const [selectedOrder, setSelectedOrder] = useState(null)

  const completedOrders = [
    { id: '1001', date: '2023-06-01', total: 45.97, status: 'Delivered', items: [
      { name: 'Margherita Pizza', quantity: 2, price: 12.99 },
      { name: 'Caesar Salad', quantity: 1, price: 8.99 },
      { name: 'Soda', quantity: 2, price: 2.50 },
    ]},
    { id: '1002', date: '2023-06-03', total: 32.98, status: 'Delivered', items: [
      { name: 'Vegetarian Burger', quantity: 2, price: 10.99 },
      { name: 'French Fries', quantity: 1, price: 3.99 },
      { name: 'Milkshake', quantity: 2, price: 3.50 },
    ]},
    { id: '1003', date: '2023-06-05', total: 28.97, status: 'Delivered', items: [
      { name: 'Chicken Wings', quantity: 1, price: 9.99 },
      { name: 'Garlic Bread', quantity: 1, price: 4.99 },
      { name: 'Coke', quantity: 1, price: 1.99 },
    ]},
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto my-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Your Completed Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {completedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="" size="sm" onClick={() => setSelectedOrder(order)}>
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Order Details - #{selectedOrder?.id}</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="max-h-[60vh]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Item</TableHead>
                              <TableHead className="text-right">Quantity</TableHead>
                              <TableHead className="text-right">Price</TableHead>
                              <TableHead className="text-right">Subtotal</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedOrder?.items.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell className="text-right">{item.quantity}</TableCell>
                                <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                      <div className="flex justify-between items-center mt-4">
                        <span className="font-bold">Total</span>
                        <span className="text-xl font-bold">${selectedOrder?.total.toFixed(2)}</span>
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
  )
}