import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactUs = () => {
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
            <h1 className="text-2xl font-bold text-foreground">RP POULTRY FARM</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Get in touch with us for orders, inquiries, or any questions about our poultry products and services.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Phone Numbers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-lg font-medium">+91 9500790276</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-lg font-medium">+91 9994931708</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Available for orders and inquiries</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">rppoultry@gmail.com</p>
                <p className="text-sm text-gray-600 mt-2">Send us your requirements and we'll get back to you</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Farm Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium mb-2">RP Poultry Farm & Traders</p>
                <p className="text-gray-700">
                  Errabaiyanahalli<br />
                  Tamil Nadu - 636813<br />
                  India
                </p>
                <Button variant="outline" className="mt-3">
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Sunday:</span>
                    <span className="font-medium">Open 24 hours</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Available round the clock for orders and emergencies</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    rows={5}
                    className="w-full p-3 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>
                
                <Button className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Bank Details Reference */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              For orders and payments, please refer to our bank details available on the main page. 
              We accept various payment methods including bank transfer, UPI, and cash on delivery.
            </p>
            <Link to="/">
              <Button variant="outline">View Payment Options</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactUs;