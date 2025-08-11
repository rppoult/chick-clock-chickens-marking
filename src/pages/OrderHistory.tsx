import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, Calendar, Phone, MapPin, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  breed: string;
  age_category: string;
  quantity: number;
  price_per_piece: number;
  total_amount: number;
  status: string;
  payment_status: string;
  payment_method: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  created_at: string;
}

const OrderHistory = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  const fetchUserOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to load order history.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Please Sign In</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              You need to be signed in to view your order history.
            </p>
            <Link to="/auth">
              <Button>Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
            <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* User Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              <strong>Email:</strong> {user.email}
            </p>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Order History</h2>
            <Badge variant="outline" className="text-sm">
              {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
            </Badge>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't placed any orders yet. Start shopping for quality poultry!
                </p>
                <Link to="/">
                  <Button>Browse Products</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {orders.map((order) => (
                <Card key={order.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Order #{order.id.slice(-8).toUpperCase()}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(order.created_at).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <Badge className={getPaymentStatusColor(order.payment_status)}>
                          Payment: {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Product Details */}
                    <div className="bg-accent/10 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Product</p>
                          <p className="font-semibold">{order.breed}</p>
                          <p className="text-sm text-muted-foreground">{order.age_category}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Quantity</p>
                          <p className="font-semibold">{order.quantity} pieces</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                          <p className="font-semibold text-lg text-primary">₹{order.total_amount}</p>
                          <p className="text-sm text-muted-foreground">₹{order.price_per_piece} per piece</p>
                        </div>
                      </div>
                    </div>

                    {/* Customer Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <User className="h-4 w-4" />
                          Customer
                        </p>
                        <p className="font-medium">{order.customer_name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          Phone
                        </p>
                        <p className="font-medium">{order.customer_phone}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Delivery Address
                      </p>
                      <p className="text-sm">{order.delivery_address}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                      <p className="capitalize">{order.payment_method.replace('_', ' ')}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;