import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Award, Heart, Shield, Users } from "lucide-react";

const AboutUs = () => {
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
            <h1 className="text-2xl font-bold text-orange-800">RP POULTRY FARM</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-800 mb-4">About RP Poultry Farm & Traders</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Your trusted partner in quality poultry farming for over a decade. We are committed to providing 
            healthy, high-quality chicks and exceptional farming solutions.
          </p>
        </div>

        {/* Story Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-800">Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded with a passion for sustainable poultry farming, RP Poultry Farm & Traders has been serving 
              farmers and poultry enthusiasts across the region. What started as a small family farm has grown 
              into a trusted name in the poultry industry.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We specialize in breeding and supplying premium quality chicks of various breeds including Aseel, 
              Kadaknath, Sonali, Giriraja, and many more. Our commitment to quality and customer satisfaction 
              has made us a preferred choice for farmers looking to start or expand their poultry operations.
            </p>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <Heart className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Passion</h3>
              <p className="text-gray-600">We are passionate about poultry farming and committed to excellence in everything we do.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">Our chicks are healthy, vaccinated, and come from carefully selected breeding stock.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Service</h3>
              <p className="text-gray-600">We provide exceptional customer service and ongoing support to all our clients.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Award className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Experience</h3>
              <p className="text-gray-600">With years of experience, we understand the needs of modern poultry farmers.</p>
            </CardContent>
          </Card>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-orange-800">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                To provide high-quality, healthy chicks and comprehensive poultry solutions that empower farmers 
                to succeed in their agricultural endeavors while promoting sustainable farming practices.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-orange-800">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                To be the leading poultry farm and trading company, known for innovation, quality, and customer 
                satisfaction, contributing to the growth of the agricultural sector in our region.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-orange-800 mb-4">Ready to Start Your Poultry Journey?</h2>
          <p className="text-gray-700 mb-6">Contact us today to learn more about our chicks and services.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-orange-600 hover:bg-orange-700">Contact Us</Button>
            </Link>
            <Link to="/">
              <Button variant="outline">View Our Chicks</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;