import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Building2, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const orderData = location.state || {};
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [breeds] = useState([
    "Aseel",
    "Giriraja", 
    "Sonali",
    "Kadaknath",
    "Peruvidai",
    "Duck",
    "Turkey",
    "Guineafowl",
    "Fancy"
  ]);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    quantity: 1,
    breed: orderData.breed || "",
    ageCategory: orderData.ageCategory || "1-day",
    price: orderData.price || 50
  });

  const calculateTotal = () => {
    return orderDetails.quantity * orderDetails.price;
  };

  const handleSubmitOrder = async () => {
    if (!selectedPayment || !orderDetails.name || !orderDetails.phone || !orderDetails.address) {
      toast({
        title: "Error",
        description: "Please fill all required fields and select a payment method",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      if (selectedPayment === 'card' || selectedPayment === 'upi') {
        // Process Razorpay payment
        await processRazorpayPayment();
      } else {
        // Handle other payment methods (COD, Bank Transfer)
        await handleOtherPayments();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const processRazorpayPayment = async () => {
    // No authentication required for guest checkout
    const orderPayload = {
      customer_name: orderDetails.name,
      customer_phone: orderDetails.phone,
      customer_email: orderDetails.email,
      delivery_address: orderDetails.address,
      breed: orderDetails.breed,
      age_category: orderDetails.ageCategory,
      quantity: orderDetails.quantity,
      price_per_piece: orderDetails.price,
      total_amount: calculateTotal(),
    };

    // Create Razorpay order without authentication
    const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
      body: { orderData: orderPayload }
    });

    if (error) {
      throw new Error(error.message);
    }

    // Initialize Razorpay
    const options = {
      key: data.key_id,
      amount: data.amount,
      currency: data.currency,
      name: "RP Poultry Farm",
      description: `${orderDetails.breed} - ${orderDetails.quantity} pieces`,
      order_id: data.razorpay_order_id,
      handler: async (response: any) => {
        try {
          // Verify payment
          const { error: verifyError } = await supabase.functions.invoke('verify-razorpay-payment', {
            body: {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              order_id: data.order_id,
            }
          });

          if (verifyError) {
            throw new Error(verifyError.message);
          }

          toast({
            title: "Payment Successful!",
            description: "Your order has been confirmed. We will contact you soon.",
          });
          navigate("/");
        } catch (error) {
          console.error('Payment verification error:', error);
          toast({
            title: "Payment Verification Failed",
            description: "Please contact support with your payment details.",
            variant: "destructive",
          });
        }
      },
      prefill: {
        name: orderDetails.name,
        email: orderDetails.email,
        contact: orderDetails.phone,
      },
      theme: {
        color: "#10B981"
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const handleOtherPayments = async () => {
    // For COD and Bank Transfer, create order without authentication
    const orderPayload = {
      user_id: null, // Guest checkout
      customer_name: orderDetails.name,
      customer_phone: orderDetails.phone,
      customer_email: orderDetails.email,
      delivery_address: orderDetails.address,
      breed: orderDetails.breed,
      age_category: orderDetails.ageCategory,
      quantity: orderDetails.quantity,
      price_per_piece: orderDetails.price,
      total_amount: calculateTotal(),
      payment_method: selectedPayment,
      payment_status: selectedPayment === 'cod' ? 'pending' : 'pending',
      status: 'pending',
    };

    const { error } = await supabase
      .from('orders')
      .insert(orderPayload);

    if (error) {
      throw new Error(error.message);
    }

    toast({
      title: "Order Placed Successfully!",
      description: `Your order has been placed. ${selectedPayment === 'cod' ? 'Pay on delivery.' : 'Please complete the bank transfer and contact us.'}`,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="bg-card shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Complete Your Order</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Order Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    value={orderDetails.name}
                    onChange={(e) => setOrderDetails({...orderDetails, name: e.target.value})}
                    className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
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
                    className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={orderDetails.email}
                    onChange={(e) => setOrderDetails({...orderDetails, email: e.target.value})}
                    className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                  <textarea 
                    value={orderDetails.address}
                    onChange={(e) => setOrderDetails({...orderDetails, address: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
                    placeholder="Enter your complete delivery address"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Breed *</label>
                  <select 
                    value={orderDetails.breed}
                    onChange={(e) => setOrderDetails({...orderDetails, breed: e.target.value})}
                    className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
                    required
                  >
                    <option value="">Select breed</option>
                    {breeds.map((breed) => (
                      <option key={breed} value={breed}>{breed}</option>
                    ))}
                  </select>
                </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Age Category</label>
                    <select 
                      value={orderDetails.ageCategory}
                      onChange={(e) => setOrderDetails({...orderDetails, ageCategory: e.target.value})}
                      className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
                    >
                      <option value="1-day">1 Day Old</option>
                      <option value="1-month">1 Month Old</option>
                      <option value="1.5-month">1.5 Month Old</option>
                      <option value="2-month">2 Month Old</option>
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
                      className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Price per piece</label>
                    <input 
                      type="number" 
                      value={orderDetails.price}
                      readOnly
                      className="w-full p-3 border border-input rounded-md bg-muted/50 cursor-not-allowed"
                      placeholder="₹ Price"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Price is determined by breed and age category</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Options */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPayment === 'cod' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => setSelectedPayment('cod')}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">Cash on Delivery</h3>
                      <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPayment === 'upi' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => setSelectedPayment('upi')}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">UPI Payment</h3>
                      <p className="text-sm text-muted-foreground">Pay using UPI apps like PhonePe, Google Pay</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPayment === 'bank' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => setSelectedPayment('bank')}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">Bank Transfer</h3>
                      <p className="text-sm text-muted-foreground">Direct bank transfer to our account</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPayment === 'card' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => setSelectedPayment('card')}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">Card Payment</h3>
                      <p className="text-sm text-muted-foreground">Pay using Credit/Debit card</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Order Summary</CardTitle>
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
                    <span className="text-primary">₹{calculateTotal()}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleSubmitOrder}
                  className="w-full mt-6"
                  disabled={!selectedPayment || isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </CardContent>
            </Card>

            {/* Bank Details for Bank Transfer */}
            {selectedPayment === 'bank' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Bank Transfer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-primary/5 p-4 rounded-lg space-y-2">
                    <div><strong>Account Number:</strong> 0368102000016621</div>
                    <div><strong>Bank Name:</strong> IDBI Bank</div>
                    <div><strong>Account Holder:</strong> RP POULTRY FARM AND TRADERS</div>
                    <div><strong>IFSC Code:</strong> IBKL0000368</div>
                  </div>
                  <p className="text-sm text-muted-foreground">
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