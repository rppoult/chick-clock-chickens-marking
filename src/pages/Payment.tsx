import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Building2, Truck } from "lucide-react";

const Payment = () => {
  const location = useLocation();
  const orderData = location.state || {};
  const [selectedPayment, setSelectedPayment] = useState("");
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: 1,
    breed: orderData.breed || "",
    ageCategory: orderData.ageCategory || "1-day",
    price: orderData.price || 0
  });

  const calculateTotal = () => {
    return orderDetails.quantity * orderDetails.price;
  };

  const handleSubmitOrder = () => {
    if (!selectedPayment || !orderDetails.name || !orderDetails.phone || !orderDetails.address) {
      alert("Please fill all required fields and select a payment method");
      return;
    }
    
    // Here you would typically send the order to your backend
    alert(`Order placed successfully! Total: ₹${calculateTotal()}. We will contact you for confirmation.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-orange-800">Complete Your Order</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-orange-800">Order Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    value={orderDetails.name}
                    onChange={(e) => setOrderDetails({...orderDetails, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    value={orderDetails.phone}
                    onChange={(e) => setOrderDetails({...orderDetails, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                  <textarea 
                    value={orderDetails.address}
                    onChange={(e) => setOrderDetails({...orderDetails, address: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your complete delivery address"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Breed</label>
                    <input 
                      type="text" 
                      value={orderDetails.breed}
                      onChange={(e) => setOrderDetails({...orderDetails, breed: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Select breed"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Age Category</label>
                    <select 
                      value={orderDetails.ageCategory}
                      onChange={(e) => setOrderDetails({...orderDetails, ageCategory: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="1-day">1 Day Old</option>
                      <option value="1-month">1 Month Old</option>
                      <option value="1.5-month">1.5 Month Old</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Quantity</label>
                    <input 
                      type="number" 
                      min="1"
                      value={orderDetails.quantity}
                      onChange={(e) => setOrderDetails({...orderDetails, quantity: parseInt(e.target.value) || 1})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Price per piece</label>
                    <input 
                      type="number" 
                      value={orderDetails.price}
                      onChange={(e) => setOrderDetails({...orderDetails, price: parseInt(e.target.value) || 0})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="₹ Price"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Options */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-orange-800">Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPayment === 'cod' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedPayment('cod')}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-orange-600" />
                    <div>
                      <h3 className="font-semibold">Cash on Delivery</h3>
                      <p className="text-sm text-gray-600">Pay when you receive your order</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPayment === 'upi' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedPayment('upi')}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-orange-600" />
                    <div>
                      <h3 className="font-semibold">UPI Payment</h3>
                      <p className="text-sm text-gray-600">Pay using UPI apps like PhonePe, Google Pay</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPayment === 'bank' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedPayment('bank')}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-orange-600" />
                    <div>
                      <h3 className="font-semibold">Bank Transfer</h3>
                      <p className="text-sm text-gray-600">Direct bank transfer to our account</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPayment === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedPayment('card')}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-orange-600" />
                    <div>
                      <h3 className="font-semibold">Card Payment</h3>
                      <p className="text-sm text-gray-600">Pay using Credit/Debit card</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-orange-800">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Breed:</span>
                    <span className="font-medium">{orderDetails.breed || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Age Category:</span>
                    <span className="font-medium">{orderDetails.ageCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="font-medium">{orderDetails.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per piece:</span>
                    <span className="font-medium">₹{orderDetails.price}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-orange-600">₹{calculateTotal()}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleSubmitOrder}
                  className="w-full mt-6 bg-orange-600 hover:bg-orange-700"
                  disabled={!selectedPayment}
                >
                  Place Order
                </Button>
              </CardContent>
            </Card>

            {/* Bank Details for Bank Transfer */}
            {selectedPayment === 'bank' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-orange-800">Bank Transfer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-orange-50 p-4 rounded-lg space-y-2">
                    <div><strong>Account Number:</strong> 0368102000016621</div>
                    <div><strong>Bank Name:</strong> IDBI Bank</div>
                    <div><strong>Account Holder:</strong> RP POULTRY FARM AND TRADERS</div>
                    <div><strong>IFSC Code:</strong> IBKL0000368</div>
                  </div>
                  <p className="text-sm text-gray-600">
                    After making the payment, please share the transaction details with us via WhatsApp or call.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;