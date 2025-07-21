import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import farmHero from "@/assets/farm-hero.jpg";
import chick1Day from "@/assets/chick-1day.jpg";
import chick3Day from "@/assets/chick-3day.jpg";
import chick7Day from "@/assets/chick-7day.jpg";
import chick14Day from "@/assets/chick-14day.jpg";

const Index = () => {
  const chickProducts = [
    {
      id: 1,
      name: "Day-Old Chicks",
      age: "1 day old",
      price: 3.50,
      description: "Freshly hatched, soft and fluffy baby chicks perfect for raising from the very beginning.",
      image: chick1Day,
      features: ["Newly hatched", "Soft downy feathers", "Requires brooder"],
      popular: false
    },
    {
      id: 2,
      name: "3-Day Chicks",
      age: "3 days old",
      price: 4.25,
      description: "Young chicks with slightly more developed feathers and increased activity levels.",
      image: chick3Day,
      features: ["More active", "Stronger", "Easy to handle"],
      popular: true
    },
    {
      id: 3,
      name: "Week-Old Chicks",
      age: "7 days old",
      price: 5.75,
      description: "Well-established chicks with developed downy feathers and robust health.",
      image: chick7Day,
      features: ["Well-developed", "Hardy", "Great for beginners"],
      popular: false
    },
    {
      id: 4,
      name: "Two-Week Chicks",
      age: "14 days old",
      price: 7.50,
      description: "Mature chicks with wing feathers beginning to develop, very hardy and active.",
      image: chick14Day,
      features: ["Wing feathers developing", "Very hardy", "Independent"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${farmHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            Fresh Farm
            <span className="text-primary"> Chicks</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Premium quality baby chicks raised with care. Choose by age and get the perfect start for your flock.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="barn" size="lg" className="text-lg px-8 py-6">
              Shop Chicks Now
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Learn About Care
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your Perfect Chicks
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our chicks are priced by age, giving you options from day-old babies to more mature, hardy chicks ready to thrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {chickProducts.map((chick) => (
            <Card key={chick.id} className="relative hover:shadow-warm transition-all duration-300 border-2 hover:border-accent/50">
              {chick.popular && (
                <Badge className="absolute -top-3 left-4 bg-gradient-golden z-10 shadow-soft">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="pb-4">
                <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-secondary/20">
                  <img 
                    src={chick.image} 
                    alt={chick.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="text-xl text-foreground">{chick.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {chick.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="text-sm font-medium">
                    {chick.age}
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      ${chick.price.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">per chick</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {chick.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button 
                  className="w-full" 
                  variant={chick.popular ? "barn" : "default"}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-foreground mb-6">
            Why Choose Age-Based Pricing?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-barn rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-primary-foreground">🐣</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Fresh Start</h4>
              <p className="text-muted-foreground">Day-old chicks give you complete control from the very beginning of their lives.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-golden rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-foreground">🌟</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Hardy Choice</h4>
              <p className="text-muted-foreground">Older chicks are more resilient and easier for beginners to care for.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-barn rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-primary-foreground">💰</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Fair Value</h4>
              <p className="text-muted-foreground">Pay for the care and development time invested in each chick.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-barn text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Start Your Flock?</h3>
          <p className="text-xl mb-8 opacity-90">
            Get premium quality chicks delivered right to your door. All chicks are healthy, vaccinated, and ready to thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="golden" size="lg" className="text-lg px-8 py-6">
              Order Now
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
