"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("credit_card")
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
  })
  const router = useRouter()

  const handleShippingInfoChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // In a real app, you'd process the payment here
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert(`Order placed successfully using ${paymentMethod}`)
      router.push("/order-confirmation")
    } catch (error) {
      alert("Error processing payment. Please try again.")
    }
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <Input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={shippingInfo.fullName}
          onChange={handleShippingInfoChange}
          className="mb-4"
          required
        />
        <Input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={handleShippingInfoChange}
          className="mb-4"
          required
        />
        <Input
          type="text"
          name="city"
          placeholder="City"
          value={shippingInfo.city}
          onChange={handleShippingInfoChange}
          className="mb-4"
          required
        />
        <Input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={shippingInfo.postalCode}
          onChange={handleShippingInfoChange}
          className="mb-4"
          required
        />

        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="credit_card" id="credit_card" />
            <Label htmlFor="credit_card">Credit Card</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal">PayPal</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mpesa" id="mpesa" />
            <Label htmlFor="mpesa">M-Pesa</Label>
          </div>
        </RadioGroup>

        {paymentMethod === "credit_card" && (
          <>
            <Input type="text" placeholder="Card Number" className="mb-4" required />
            <Input type="text" placeholder="Expiry Date" className="mb-4" required />
            <Input type="text" placeholder="CVV" className="mb-4" required />
          </>
        )}

        {paymentMethod === "mpesa" && <Input type="text" placeholder="M-Pesa Phone Number" className="mb-4" required />}

        <Button type="submit" className="w-full">
          Place Order
        </Button>
      </form>
    </div>
  )
}

