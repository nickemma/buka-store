import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function CartCheckout() {
  const cartItems = [
    {
      id: 1,
      name: "Cozy Blanket",
      price: 29.99,
      quantity: 2,
    },
    {
      id: 2,
      name: "Autumn Mug",
      price: 12.99,
      quantity: 1,
    },
    {
      id: 3,
      name: "Fall Fragrance Candle",
      price: 16.99,
      quantity: 3,
    },
  ]
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  return (
    (<div className="container mx-auto py-12 px-4 md:px-6">
      
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src="/placeholder.svg"
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                    style={{ aspectRatio: "64/64", objectFit: "cover" }} />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-muted-foreground">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium">Total</p>
            <p className="text-2xl font-bold">${total.toFixed(2)}</p>
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <form className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Enter your address" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="payment">Payment</Label>
              <Select id="payment">
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="apple-pay">Apple Pay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button size="lg" className="w-full">
              Proceed to Payment
            </Button>
          </form>
        </div>
      </div>
    </div>)
  );
}
