import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import farmHero from "@/assets/farm-hero.jpg";
import sonaliChick from "@/assets/sonali-chick.jpg";
import peruvidaiChick from "@/assets/peruvidai-chick.jpg";
import kadaknathChick from "@/assets/kadaknath-chick.jpg";
import guineafowlChick from "@/assets/guineafowl-chick.jpg";
import aseelChick from "@/assets/aseel-chick.jpg";
import fancyChick from "@/assets/fancy-chick.jpg";
import girirajaChick from "@/assets/giriraja-chick.jpg";
import turkeyChick from "@/assets/turkey-chick.jpg";
import duckChick from "@/assets/duck-chick.jpg";

const Index = () => {
  const poultryProducts = [
    {
      id: 1,
      name: "Sonali",
      tamilName: "சோனாலி",
      prices: { oneDay: 40, oneMonth: 100, oneAndHalfMonth: 120 },
      description: "High-quality Sonali breed known for excellent egg production and meat quality.",
      image: sonaliChick,
      features: ["Excellent egg layers", "Good meat quality", "Hardy breed"],
      popular: false,
      gradient: "gradient-sunset"
    },
    {
      id: 2,
      name: "Peruvidai Cross",
      tamilName: "பெருவெடை கிராஸ்",
      prices: { oneDay: 50, oneMonth: 100, oneAndHalfMonth: 130 },
      description: "Premium crossbreed with superior growth rate and meat production.",
      image: peruvidaiChick,
      features: ["Fast growth", "Superior meat", "Disease resistant"],
      popular: true,
      gradient: "gradient-golden"
    },
    {
      id: 3,
      name: "Kadaknath",
      tamilName: "கடக்நாத்",
      prices: { oneDay: 45, oneMonth: 100, oneAndHalfMonth: 120 },
      description: "Famous black chicken breed with high protein content and medicinal properties.",
      image: kadaknathChick,
      features: ["High protein", "Medicinal properties", "Unique black meat"],
      popular: false,
      gradient: "gradient-forest"
    },
    {
      id: 4,
      name: "Guineafowl",
      tamilName: "கினி கோழி",
      prices: { oneDay: 80, oneMonth: 150, oneAndHalfMonth: 200 },
      description: "Premium Guinea fowl known for pest control and lean meat.",
      image: guineafowlChick,
      features: ["Natural pest control", "Lean meat", "Low maintenance"],
      popular: false,
      gradient: "gradient-rainbow"
    },
    {
      id: 5,
      name: "Aseel Cross",
      tamilName: "அசல் கிராஸ் நாட்டுக்கோழி",
      prices: { oneDay: 40, oneMonth: 90, oneAndHalfMonth: 120 },
      description: "Traditional country chicken crossbreed with excellent taste and nutrition.",
      image: aseelChick,
      features: ["Traditional taste", "High nutrition", "Free range suitable"],
      popular: false,
      gradient: "gradient-barn"
    },
    {
      id: 6,
      name: "Fancy",
      tamilName: "பேன்சி",
      prices: { oneDay: 60, oneMonth: 130, oneAndHalfMonth: 170 },
      description: "Ornamental breed perfect for backyard farming and show purposes.",
      image: fancyChick,
      features: ["Beautiful appearance", "Good for shows", "Backyard friendly"],
      popular: false,
      gradient: "gradient-rainbow"
    },
    {
      id: 7,
      name: "Giriraja",
      tamilName: "கிரிராஜா",
      prices: { oneDay: 30, oneMonth: 90, oneAndHalfMonth: 120 },
      description: "Multi-colored chicken breed developed for rural farming conditions.",
      image: girirajaChick,
      features: ["Rural suitable", "Multi-colored", "Good for beginners"],
      popular: false,
      gradient: "gradient-sunset"
    },
    {
      id: 8,
      name: "Turkey",
      tamilName: "வான்கோழி",
      prices: { oneDay: 100, oneMonth: 230, oneAndHalfMonth: 270 },
      description: "Large birds perfect for festive occasions and commercial farming.",
      image: turkeyChick,
      features: ["Large size", "Festive occasions", "High demand"],
      popular: false,
      gradient: "gradient-forest"
    },
    {
      id: 9,
      name: "Duck",
      tamilName: "வாத்து",
      prices: { oneDay: 60, oneMonth: 120, oneAndHalfMonth: 150 },
      description: "Water birds excellent for egg and meat production in suitable environments.",
      image: duckChick,
      features: ["Water birds", "Good egg layers", "Dual purpose"],
      popular: false,
      gradient: "gradient-golden"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${farmHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 to-background/50 gradient-animated"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 bounce-in">
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-primary via-accent-bright to-primary-glow bg-clip-text text-transparent animate-pulse">
              RP POULTRY FARM
            </h1>
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-accent-bright bg-clip-text text-transparent mb-4 pulse-glow">
              Dharmapuri
            </p>
            <div className="text-4xl mb-6 animate-bounce">🐣🐤🐥🐓🐔🦆🪿🦃</div>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Premium quality poultry breeds with Tamil Nadu-wide delivery. Choose from our diverse selection of chickens, ducks, and turkeys.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="barn" size="lg" className="text-lg px-8 py-6 shadow-glow hover:shadow-colorful transition-all duration-500 pulse-glow">
              📞 Call: 9500790276
            </Button>
            <Button variant="golden" size="lg" className="text-lg px-8 py-6 shadow-warm hover:shadow-colorful transition-all duration-500 pulse-glow">
              📞 Call: 9994931708
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Premium Poultry Breeds
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our diverse selection of poultry breeds. All prices are age-based from day-old to 1.5 months.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {poultryProducts.map((breed, index) => (
            <Card key={breed.id} className={`relative hover:shadow-colorful transition-all duration-500 border-2 hover:border-accent-bright/70 bounce-in float-animation bg-gradient-to-br from-card via-card/95 to-${breed.gradient}/10`} style={{animationDelay: `${index * 0.1}s`}}>
              {breed.popular && (
                <Badge className="absolute -top-3 left-4 bg-gradient-rainbow z-10 shadow-glow pulse-glow text-white font-bold">
                  ⭐ Most Popular ⭐
                </Badge>
              )}
              
              <CardHeader className="pb-4">
                <div className={`aspect-square rounded-xl overflow-hidden mb-4 bg-${breed.gradient}/20 ring-2 ring-accent-bright/30 shadow-warm`}>
                  <img 
                    src={breed.image} 
                    alt={breed.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardTitle className={`text-xl font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent`}>
                  {breed.name}
                </CardTitle>
                <CardDescription className={`text-lg font-semibold bg-gradient-to-r from-accent to-accent-bright bg-clip-text text-transparent mb-2`}>
                  {breed.tamilName}
                </CardDescription>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {breed.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-4">
                <div className={`space-y-3 mb-4 p-4 rounded-lg bg-${breed.gradient}/5 border border-accent/20`}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">ஒரு நாள் (1 Day)</span>
                    <span className={`text-lg font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent`}>₹{breed.prices.oneDay}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">ஒரு மாதம் (1 Month)</span>
                    <span className={`text-lg font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent`}>₹{breed.prices.oneMonth}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">ஒன்றை மாதம் (1.5 Months)</span>
                    <span className={`text-lg font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent`}>₹{breed.prices.oneAndHalfMonth}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {breed.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                      <div className={`w-3 h-3 bg-gradient-to-r from-accent to-accent-bright rounded-full mr-3 animate-pulse`}></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button 
                  className={`w-full font-semibold text-base shadow-warm hover:shadow-glow transition-all duration-300 ${breed.popular ? 'bg-gradient-rainbow hover:opacity-90' : `bg-${breed.gradient} hover:opacity-90`}`}
                  variant={breed.popular ? "default" : "default"}
                >
                  {breed.popular ? "🌟 Contact for Order 🌟" : "Contact for Order"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              🚚 Tamil Nadu Wide Delivery Available
            </h3>
            <p className="text-xl text-accent font-semibold mb-6">
              தமிழ்நாடு முழுவதும் டெலிவரி வசதி உள்ளது 🚚✔
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-barn rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-primary-foreground">📞</span>
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Call Us</h4>
              <p className="text-muted-foreground text-sm">9500790276</p>
              <p className="text-muted-foreground text-sm">9994931708</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-golden rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-foreground">🌐</span>
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Website</h4>
              <p className="text-muted-foreground text-sm">rppoultry.com</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-barn rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-primary-foreground">📍</span>
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Location</h4>
              <p className="text-muted-foreground text-sm">Dharmapuri, Tamil Nadu</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-golden rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-foreground">📱</span>
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Social Media</h4>
              <p className="text-muted-foreground text-sm">Instagram & Facebook</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-barn rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-primary-foreground">🐣</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Quality Breeds</h4>
              <p className="text-muted-foreground">Premium poultry breeds from day-old to mature birds for all your farming needs.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-golden rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-foreground">🚚</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Delivery Service</h4>
              <p className="text-muted-foreground">Safe and reliable delivery across Tamil Nadu with proper care during transport.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-barn rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-primary-foreground">💰</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Fair Pricing</h4>
              <p className="text-muted-foreground">Competitive age-based pricing with transparent costs for different breeds and ages.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-barn text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Order Your Poultry?</h3>
          <p className="text-xl mb-8 opacity-90">
            Contact RP Poultry Farm for premium quality birds delivered across Tamil Nadu. All birds are healthy, vaccinated, and ready to thrive.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center mb-8">
            <Button variant="golden" size="lg" className="text-lg px-6 py-4">
              📞 9500790276
            </Button>
            <Button variant="golden" size="lg" className="text-lg px-6 py-4">
              📞 9994931708
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-6 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              🌐 Website
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-6 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              📍 Location
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              📱 Instagram: @rp_poultry_tn_29
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              📘 Facebook Page
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
