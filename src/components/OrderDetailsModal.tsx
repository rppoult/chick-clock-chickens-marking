import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { CreditCard, MapPin, Phone, Mail, Calendar, Package } from 'lucide-react';

interface Order {
  id: string;
  user_id: string | null;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  delivery_address: string;
  breed: string;
  age_category: string;
  quantity: number;
  price_per_piece: number;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  status: string;
  created_at: string;
  updated_at: string;
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
}

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailsModal = ({ order, isOpen, onClose }: OrderDetailsModalProps) => {
  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      case 'confirmed': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'delivered': return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-700 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      case 'paid': return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'failed': return 'bg-red-500/10 text-red-700 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Details - #{order.id.slice(-8)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={getPaymentStatusColor(order.payment_status)}>
                  Payment: {order.payment_status}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-sm">{order.customer_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-sm flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {order.customer_phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-sm flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {order.customer_email || 'Not provided'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Customer Type</label>
                  <p className="text-sm">
                    {order.user_id ? 'Registered User' : 'Guest Order'}
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Delivery Address
                </label>
                <p className="text-sm mt-1 p-2 bg-muted/50 rounded">{order.delivery_address}</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Product</label>
                  <p className="text-sm font-medium">{order.breed}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Age Category</label>
                  <p className="text-sm">{order.age_category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Quantity</label>
                  <p className="text-sm">{order.quantity} pieces</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Price per piece:</span>
                  <span className="text-sm">₹{order.price_per_piece}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Quantity:</span>
                  <span className="text-sm">{order.quantity}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total Amount:</span>
                  <span className="text-primary">₹{order.total_amount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Payment Method</label>
                  <p className="text-sm">{order.payment_method}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Payment Status</label>
                  <Badge className={getPaymentStatusColor(order.payment_status)}>
                    {order.payment_status}
                  </Badge>
                </div>
                {order.razorpay_payment_id && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Payment ID</label>
                    <p className="text-sm font-mono">{order.razorpay_payment_id}</p>
                  </div>
                )}
                {order.razorpay_order_id && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Razorpay Order ID</label>
                    <p className="text-sm font-mono">{order.razorpay_order_id}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Order Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Order Created</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleString()}
                  </span>
                </div>
                {order.updated_at !== order.created_at && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Last Updated</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(order.updated_at).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};