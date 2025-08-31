import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/UserMenu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Home, Info, Mail, ShoppingCart, Package, History, Facebook, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
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
import chick1Day from "@/assets/chick-1day.jpg";
import chick3Day from "@/assets/chick-3day.jpg";
import chick7Day from "@/assets/chick-7day.jpg";
import chick14Day from "@/assets/chick-14day.jpg";

const Index = () => {
  const [medicines, setMedicines] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const { data, error } = await supabase
        .from('medicines')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setMedicines(data || []);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  const poultryProducts = [
    {
      id: 1,
      name: "Sonali",
      tamilName: "சோனாலி",
      prices: { oneDay: 40, oneMonth: 100, oneAndHalfMonth: 150, twoMonth: 180 },
      description: "High-quality Sonali breed known for excellent egg production and meat quality.",
      image: chick1Day,
      features: ["Excellent egg layers", "Good meat quality", "Hardy breed"],
      popular: false,
      gradientClass: "bg-gradient-sunset",
      buttonClass: "bg-gradient-sunset hover:opacity-90"
    },
    {
      id: 2,
      name: "Peruvidai Cross",
      tamilName: "பெருவெடை கிராஸ்",
      prices: { oneDay: 50, oneMonth: 100, oneAndHalfMonth: 160, twoMonth: 190 },
      description: "Premium crossbreed with superior growth rate and meat production.",
      image: chick3Day,
      features: ["Fast growth", "Superior meat", "Disease resistant"],
      popular: true,
      gradientClass: "bg-gradient-golden",
      buttonClass: "bg-gradient-golden hover:opacity-90"
    },
    {
      id: 3,
      name: "Kadaknath",
      tamilName: "கடக்நாத்",
      prices: { oneDay: 45, oneMonth: 100, oneAndHalfMonth: 150, twoMonth: 180 },
      description: "Famous black chicken breed with high protein content and medicinal properties.",
      image: chick7Day,
      features: ["High protein", "Medicinal properties", "Unique black meat"],
      popular: false,
      gradientClass: "bg-gradient-forest",
      buttonClass: "bg-gradient-forest hover:opacity-90"
    },
    {
      id: 4,
      name: "Guineafowl",
      tamilName: "கினி கோழி",
      prices: { oneDay: 80, oneMonth: 150, oneAndHalfMonth: 230, twoMonth: 260 },
      description: "Premium Guinea fowl known for pest control and lean meat.",
      image: chick14Day,
      features: ["Natural pest control", "Lean meat", "Low maintenance"],
      popular: false,
      gradientClass: "bg-gradient-rainbow",
      buttonClass: "bg-gradient-rainbow hover:opacity-90"
    },
    {
      id: 5,
      name: "Aseel Cross",
      tamilName: "அசல் கிராஸ் நாட்டுக்கோழி",
      prices: { oneDay: 40, oneMonth: 90, oneAndHalfMonth: 150, twoMonth: 180 },
      description: "Traditional country chicken crossbreed with excellent taste and nutrition.",
      image: fancyChick,
      features: ["Traditional taste", "High nutrition", "Free range suitable"],
      popular: false,
      gradientClass: "bg-gradient-barn",
      buttonClass: "bg-gradient-barn hover:opacity-90"
    },
    {
      id: 6,
      name: "Fancy",
      tamilName: "பேன்சி",
      prices: { oneDay: 60, oneMonth: 130, oneAndHalfMonth: 200, twoMonth: 230 },
      description: "Ornamental breed perfect for backyard farming and show purposes.",
      image: girirajaChick,
      features: ["Beautiful appearance", "Good for shows", "Backyard friendly"],
      popular: false,
      gradientClass: "bg-gradient-rainbow",
      buttonClass: "bg-gradient-rainbow hover:opacity-90"
    },
    {
      id: 7,
      name: "Giriraja",
      tamilName: "கிரிராஜா",
      prices: { oneDay: 30, oneMonth: 90, oneAndHalfMonth: 150, twoMonth: 180 },
      description: "Multi-colored chicken breed developed for rural farming conditions.",
      image: kadaknathChick,
      features: ["Rural suitable", "Multi-colored", "Good for beginners"],
      popular: false,
      gradientClass: "bg-gradient-sunset",
      buttonClass: "bg-gradient-sunset hover:opacity-90"
    },
    {
      id: 8,
      name: "Turkey",
      tamilName: "வான்கோழி",
      prices: { oneDay: 100, oneMonth: 230, oneAndHalfMonth: 300, twoMonth: 330 },
      description: "Large birds perfect for festive occasions and commercial farming.",
      image: guineafowlChick,
      features: ["Large size", "Festive occasions", "High demand"],
      popular: false,
      gradientClass: "bg-gradient-forest",
      buttonClass: "bg-gradient-forest hover:opacity-90"
    },
    {
      id: 9,
      name: "Duck",
      tamilName: "வாத்து",
      prices: { oneDay: 60, oneMonth: 120, oneAndHalfMonth: 180, twoMonth: 210 },
      description: "Water birds excellent for egg and meat production in suitable environments.",
      image: aseelChick,
      features: ["Water birds", "Good egg layers", "Dual purpose"],
      popular: false,
      gradientClass: "bg-gradient-golden",
      buttonClass: "bg-gradient-golden hover:opacity-90"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-primary hover:text-primary-glow transition-colors">
              RP POULTRY FARM & TRADERS
            </Link>
            
            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <Home className="w-4 h-4 mr-2" />
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Menu className="w-4 h-4 mr-2" />
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium leading-none">By Age</h4>
                          <p className="text-sm text-muted-foreground">Choose by age category</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium leading-none">Popular Breeds</h4>
                          <p className="text-sm text-muted-foreground">Best selling varieties</p>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <Info className="w-4 h-4 mr-2" />
                      About Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/contact">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/auth">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <Menu className="w-4 h-4 mr-2" />
                      Account
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/payment">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Order Now
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* User Menu - Desktop */}
            <div className="hidden md:block">
              <UserMenu />
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <Link to="/" className="text-xl font-bold text-primary">
                      RP POULTRY FARM
                    </Link>
                  </SheetTitle>
                  <SheetDescription className="text-left">
                    Premium quality poultry breeds
                  </SheetDescription>
                </SheetHeader>
                
                <nav className="flex flex-col gap-4 mt-8">
                  <Link 
                    to="/" 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Home className="w-5 h-5 text-primary" />
                    <span className="font-medium">Home</span>
                  </Link>
                  
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-3 mb-3">
                      <Package className="w-5 h-5 text-primary" />
                      <span className="font-medium">Products</span>
                    </div>
                    <div className="ml-8 space-y-2">
                      <a href="#1day-section" className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>
                        1-Day Old Chicks
                      </a>
                      <a href="#1month-section" className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>
                        1-Month Old Chicks
                      </a>
                      <a href="#1.5month-section" className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>
                        1.5-Month Old Chicks
                      </a>
                      <a href="#2month-section" className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>
                        2-Month Old Chicks
                      </a>
                      <a href="#medicines-section" className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>
                        Medicines & Supplements
                      </a>
                    </div>
                  </div>
                  
                  <Link 
                    to="/about" 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Info className="w-5 h-5 text-primary" />
                    <span className="font-medium">About Us</span>
                  </Link>
                  
                  <Link 
                    to="/contact" 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="font-medium">Contact</span>
                  </Link>
                  
                  <Link 
                    to="/orders" 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <History className="w-5 h-5 text-primary" />
                    <span className="font-medium">My Orders</span>
                  </Link>
                  
                  <Link 
                    to="/auth" 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Menu className="w-5 h-5 text-primary" />
                    <span className="font-medium">Account</span>
                  </Link>
                  
                  <Link 
                    to="/payment" 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="font-medium">Order Now</span>
                  </Link>
                  
          <div className="border-t pt-4 mt-4">
            <div className="space-y-4">
              <p className="text-sm font-medium text-foreground">Contact Info</p>
              <div className="space-y-3">
                <a href="tel:9500790276" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                  9500790276
                </a>
                <a href="tel:9994931708" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                  9994931708
                </a>
                <a href="https://wa.me/919500790276" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  WhatsApp Chat
                </a>
                <a href="https://facebook.com/rppoultrytraders" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Facebook className="w-4 h-4 text-blue-600" />
                  Follow on Facebook
                </a>
              </div>
            </div>
          </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${farmHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 to-background/50 gradient-animated"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-primary via-accent-bright to-primary-glow bg-clip-text text-transparent animate-fade-in">
              RP POULTRY FARM
            </h1>
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-accent-bright bg-clip-text text-transparent mb-4 animate-slide-in-right" style={{animationDelay: '0.3s'}}>
              Errabaiyanahalli, Tamil Nadu
            </p>
            <div className="text-4xl mb-6 animate-scale-in" style={{animationDelay: '0.6s'}}>🐣🐤🐥🐓🐔🦆🪿🦃</div>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.9s'}}>
            Premium quality poultry breeds with Tamil Nadu-wide delivery. Choose from our diverse selection of chickens, ducks, and turkeys.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="barn" size="lg" className="text-lg px-8 py-6 shadow-glow hover:shadow-colorful transition-all duration-500 animate-slide-in-right hover-scale" style={{animationDelay: '1.2s'}}>
              📞 Call: 9500790276
            </Button>
            <Button variant="golden" size="lg" className="text-lg px-8 py-6 shadow-warm hover:shadow-colorful transition-all duration-500 animate-slide-in-right hover-scale" style={{animationDelay: '1.4s'}}>
              📞 Call: 9994931708
            </Button>
          </div>
        </div>
      </section>

      {/* Farm Photos Gallery */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent mb-4">
              🏡 Our Farm Gallery
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Take a virtual tour of RP Poultry Farm - See our quality breeds and farming facilities
            </p>
          </div>

          <div className="relative">
            {/* Main sliding gallery */}
            <div className="overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-r from-accent/10 to-primary/10 p-6">
              <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4" style={{scrollBehavior: 'smooth'}}>
                {[
                  { image: farmHero, title: "RP Poultry Farm", description: "Our beautiful farm facility in Errabaiyanahalli" },
                  { image: chick1Day, title: "Day-Old Chicks", description: "Fresh 1-day old chicks ready for new homes" },
                  { image: chick3Day, title: "3-Day Growth", description: "Healthy development in our controlled environment" },
                  { image: chick7Day, title: "Week-Old Chicks", description: "Strong and active chicks after one week" },
                  { image: chick14Day, title: "Two-Week Growth", description: "Remarkable growth and development" },
                  { image: sonaliChick, title: "Sonali Breed", description: "Premium Sonali chickens in our farm" },
                  { image: peruvidaiChick, title: "Peruvidai Cross", description: "High-quality crossbred chickens" },
                  { image: kadaknathChick, title: "Kadaknath Special", description: "Famous black chicken breed" },
                  { image: turkeyChick, title: "Turkey Section", description: "Our turkey breeding area" },
                  { image: duckChick, title: "Duck Facility", description: "Duck breeding and care facility" }
                ].map((photo, index) => (
                  <div 
                    key={`farm-photo-${index}`}
                    className={`flex-none w-80 bg-card rounded-xl shadow-warm hover:shadow-colorful transition-all duration-700 hover-scale border-2 border-accent/20 animate-fade-in`}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="relative overflow-hidden rounded-t-xl">
                      <img 
                        src={photo.image} 
                        alt={photo.title}
                        className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-bold text-lg mb-1">{photo.title}</h3>
                          <p className="text-white/90 text-sm">{photo.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent mb-2">
                        {photo.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {photo.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-2 bg-card px-6 py-3 rounded-full shadow-warm border border-accent/20">
                <span className="text-sm text-muted-foreground">Slide to explore our farm</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-accent/50 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-accent/30 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Breeds Carousel */}
      <section className="py-16 px-6 bg-accent/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent mb-4">
              Featured Breeds
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our premium poultry breeds - slide through to see our quality birds
            </p>
          </div>
          
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-accent/10 to-primary/10 p-8">
            <div className="flex animate-slide-in-right gap-8 overflow-x-auto scrollbar-hide pb-4" style={{scrollBehavior: 'smooth'}}>
              {poultryProducts.slice(0, 6).map((breed, index) => (
                <div 
                  key={`featured-${breed.id}`} 
                  className={`flex-none w-72 bg-card rounded-lg shadow-warm hover:shadow-colorful transition-all duration-500 hover-scale animate-fade-in border-2 border-accent/20`}
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={breed.image} 
                      alt={breed.name}
                      className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                    />
                    {breed.popular && (
                      <Badge className="absolute top-2 right-2 bg-gradient-rainbow text-white font-bold animate-pulse">
                        ⭐ Popular
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent mb-2">
                      {breed.name}
                    </h3>
                    <p className="text-sm text-accent font-semibold mb-3">{breed.tamilName}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                      <div className="bg-accent/10 p-2 rounded text-center">
                        <span className="font-bold text-primary">1 Day: ₹{breed.prices.oneDay}</span>
                      </div>
                      <div className="bg-primary/10 p-2 rounded text-center">
                        <span className="font-bold text-accent">1 Month: ₹{breed.prices.oneMonth}</span>
                      </div>
                    </div>
                    <Link 
                      to="/payment" 
                      state={{ 
                        breed: breed.name, 
                        ageCategory: "1-day",
                        price: breed.prices.oneDay 
                      }}
                    >
                      <Button 
                        className={`w-full text-sm ${breed.buttonClass} hover:opacity-90 transition-all duration-300 text-white shadow-warm hover:shadow-glow`}
                        size="sm"
                      >
                        Order Now
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">← Slide to explore more breeds →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Age-Based Categories Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Shop By Age Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our age-based categories. Each age offers different benefits for your farming needs.
          </p>
        </div>

        {/* 1-Day Old Chicks */}
        <div className="mb-20" id="1day-section">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent mb-4">
              🐣 1-Day Old Chicks (ஒரு நாள்)
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Perfect for raising from the beginning. Most affordable option with full control over feeding and care.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {poultryProducts.map((breed, index) => (
              <Card key={`1day-${breed.id}`} className={`hover:shadow-colorful transition-all duration-500 border-2 hover:border-accent-bright/70 float-animation bg-gradient-to-br from-card via-card/95 to-accent/5 ${index % 2 === 0 ? 'animate-slide-in-right' : 'animate-fade-in'}`} style={{animationDelay: `${index * 0.2}s`}}>
                {breed.popular && (
                  <Badge className="absolute -top-2 left-2 bg-gradient-rainbow z-10 shadow-glow text-xs text-white font-bold animate-scale-in" style={{animationDelay: `${index * 0.2 + 0.3}s`}}>
                    ⭐ Popular
                  </Badge>
                )}
                
                <CardHeader className="pb-3 p-4">
                  <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-accent/10 ring-2 ring-accent-bright/30 shadow-warm">
                    <img 
                      src={breed.image} 
                      alt={breed.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 hover-scale"
                    />
                  </div>
                  <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent text-center">
                    {breed.name}
                  </CardTitle>
                  <CardDescription className="text-sm font-semibold bg-gradient-to-r from-accent to-accent-bright bg-clip-text text-transparent mb-2 text-center">
                    {breed.tamilName}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-3 px-4">
                  <div className="text-center p-3 rounded-lg bg-accent/5 border border-accent/20 mb-3">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">₹{breed.prices.oneDay}</span>
                    <p className="text-xs text-muted-foreground mt-1">per chick</p>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 px-4">
                  <Link 
                    to="/payment" 
                    state={{ 
                      breed: breed.name, 
                      ageCategory: "1-day",
                      price: breed.prices.oneDay 
                    }}
                  >
                    <Button 
                      className={`w-full font-semibold text-sm shadow-warm hover:shadow-glow transition-all duration-300 text-white ${breed.popular ? 'bg-gradient-rainbow hover:opacity-90' : breed.buttonClass}`}
                      size="sm"
                    >
                      Order Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* 1-Month Old Chicks */}
        <div className="mb-20" id="1month-section">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent mb-4">
              🐤 1-Month Old Chicks (ஒரு மாதம்)
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hardy and established birds with higher survival rate. Perfect for intermediate farmers.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {poultryProducts.map((breed, index) => (
              <Card key={`1month-${breed.id}`} className={`hover:shadow-colorful transition-all duration-500 border-2 hover:border-accent-bright/70 float-animation bg-gradient-to-br from-card via-card/95 to-accent/5 ${index % 3 === 0 ? 'animate-slide-in-right' : index % 3 === 1 ? 'animate-fade-in' : 'animate-scale-in'}`} style={{animationDelay: `${index * 0.15}s`}}>
                {breed.popular && (
                  <Badge className="absolute -top-2 left-2 bg-gradient-rainbow z-10 shadow-glow text-xs text-white font-bold animate-fade-in" style={{animationDelay: `${index * 0.15 + 0.4}s`}}>
                    ⭐ Popular
                  </Badge>
                )}
                
                <CardHeader className="pb-3 p-4">
                  <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-accent/10 ring-2 ring-accent-bright/30 shadow-warm">
                    <img 
                      src={chick1Day} 
                      alt={`${breed.name} - 1 month old`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 hover-scale"
                    />
                  </div>
                  <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent text-center">
                    {breed.name}
                  </CardTitle>
                  <CardDescription className="text-sm font-semibold bg-gradient-to-r from-accent to-accent-bright bg-clip-text text-transparent mb-2 text-center">
                    {breed.tamilName}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-3 px-4">
                  <div className="text-center p-3 rounded-lg bg-accent/5 border border-accent/20 mb-3">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">₹{breed.prices.oneMonth}</span>
                    <p className="text-xs text-muted-foreground mt-1">per chick</p>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 px-4">
                  <Link 
                    to="/payment" 
                    state={{ 
                      breed: breed.name, 
                      ageCategory: "1-month",
                      price: breed.prices.oneMonth 
                    }}
                  >
                    <Button 
                      className={`w-full font-semibold text-sm shadow-warm hover:shadow-glow transition-all duration-300 text-white ${breed.popular ? 'bg-gradient-rainbow hover:opacity-90' : breed.buttonClass}`}
                      size="sm"
                    >
                      Order Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* 1.5-Month Old Chicks */}
        <div className="mb-20" id="1.5month-section">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent mb-4">
              🐥 1.5-Month Old Chicks (ஒன்றை மாதம்)
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mature and robust birds ready for production. Highest survival rate and immediate results.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {poultryProducts.map((breed, index) => (
              <Card key={`1.5month-${breed.id}`} className={`hover:shadow-colorful transition-all duration-500 border-2 hover:border-accent-bright/70 float-animation bg-gradient-to-br from-card via-card/95 to-accent/5 ${index % 4 === 0 ? 'animate-slide-in-right' : index % 4 === 1 ? 'animate-fade-in' : index % 4 === 2 ? 'animate-scale-in' : 'animate-slide-in-right'}`} style={{animationDelay: `${index * 0.12}s`}}>
                {breed.popular && (
                  <Badge className="absolute -top-2 left-2 bg-gradient-rainbow z-10 shadow-glow text-xs text-white font-bold animate-scale-in pulse" style={{animationDelay: `${index * 0.12 + 0.5}s`}}>
                    ⭐ Popular
                  </Badge>
                )}
                
                <CardHeader className="pb-3 p-4">
                  <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-accent/10 ring-2 ring-accent-bright/30 shadow-warm">
                    <img 
                      src={chick7Day} 
                      alt={`${breed.name} - 1.5 month old`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 hover-scale"
                    />
                  </div>
                  <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent text-center">
                    {breed.name}
                  </CardTitle>
                  <CardDescription className="text-sm font-semibold bg-gradient-to-r from-accent to-accent-bright bg-clip-text text-transparent mb-2 text-center">
                    {breed.tamilName}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-3 px-4">
                  <div className="text-center p-3 rounded-lg bg-accent/5 border border-accent/20 mb-3">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">₹{breed.prices.oneAndHalfMonth}</span>
                    <p className="text-xs text-muted-foreground mt-1">per chick</p>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 px-4">
                  <Link 
                    to="/payment" 
                    state={{ 
                      breed: breed.name, 
                      ageCategory: "1.5-month",
                      price: breed.prices.oneAndHalfMonth 
                    }}
                  >
                    <Button 
                      className={`w-full font-semibold text-sm shadow-warm hover:shadow-glow transition-all duration-300 text-white ${breed.popular ? 'bg-gradient-rainbow hover:opacity-90' : breed.buttonClass}`}
                      size="sm"
                    >
                      Order Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* 2-Month Old Chicks */}
        <div className="mb-20" id="2month-section">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent mb-4">
              🐓 2-Month Old Chicks (இரண்டு மாதம்)
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fully grown and production-ready birds. Perfect for immediate egg laying and meat production.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {poultryProducts.map((breed, index) => (
              <Card key={`2month-${breed.id}`} className={`hover:shadow-colorful transition-all duration-500 border-2 hover:border-accent-bright/70 float-animation bg-gradient-to-br from-card via-card/95 to-accent/5 ${index % 5 === 0 ? 'animate-slide-in-right' : index % 5 === 1 ? 'animate-fade-in' : index % 5 === 2 ? 'animate-scale-in' : index % 5 === 3 ? 'animate-slide-in-right' : 'animate-fade-in'}`} style={{animationDelay: `${index * 0.1}s`}}>
                {breed.popular && (
                  <Badge className="absolute -top-2 left-2 bg-gradient-rainbow z-10 shadow-glow text-xs text-white font-bold animate-scale-in pulse" style={{animationDelay: `${index * 0.1 + 0.6}s`}}>
                    ⭐ Popular
                  </Badge>
                )}
                
                <CardHeader className="pb-3 p-4">
                  <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-accent/10 ring-2 ring-accent-bright/30 shadow-warm">
                    <img 
                      src={chick14Day} 
                      alt={`${breed.name} - 2 month old`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 hover-scale"
                    />
                  </div>
                  <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent text-center">
                    {breed.name}
                  </CardTitle>
                  <CardDescription className="text-sm font-semibold bg-gradient-to-r from-accent to-accent-bright bg-clip-text text-transparent mb-2 text-center">
                    {breed.tamilName}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-3 px-4">
                  <div className="text-center p-3 rounded-lg bg-accent/5 border border-accent/20 mb-3">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">₹{breed.prices.twoMonth}</span>
                    <p className="text-xs text-muted-foreground mt-1">per chick</p>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 px-4">
                  <Link 
                    to="/payment" 
                    state={{ 
                      breed: breed.name, 
                      ageCategory: "2-month",
                      price: breed.prices.twoMonth 
                    }}
                  >
                    <Button 
                      className={`w-full font-semibold text-sm shadow-warm hover:shadow-glow transition-all duration-300 text-white ${breed.popular ? 'bg-gradient-rainbow hover:opacity-90' : breed.buttonClass}`}
                      size="sm"
                    >
                      Order Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Medicines Section */}
        <div className="mb-20" id="medicines-section">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent mb-4">
              💊 Poultry Medicines & Supplements
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Essential medicines and supplements for healthy poultry farming and disease prevention.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {medicines.map((medicine, index) => (
              <Card key={medicine.id} className="hover:shadow-colorful transition-all duration-500 border-2 hover:border-accent-bright/70 bounce-in float-animation bg-gradient-to-br from-card via-card/95 to-accent/5" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader className="pb-3 p-4">
                  <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-gradient-to-br from-green-50 to-blue-50 ring-2 ring-accent-bright/30 shadow-warm flex items-center justify-center">
                    <Package className="h-16 w-16 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent text-center">
                    {medicine.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground text-center">
                    {medicine.category} • {medicine.manufacturer}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-3 px-4">
                  <p className="text-xs text-muted-foreground mb-3 text-center line-clamp-2">
                    {medicine.description}
                  </p>
                  <div className="text-center p-3 rounded-lg bg-accent/5 border border-accent/20 mb-3">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">₹{medicine.price}</span>
                    <p className="text-xs text-muted-foreground mt-1">Stock: {medicine.stock_quantity}</p>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 px-4">
                  <Link 
                    to="/payment" 
                    state={{ 
                      breed: medicine.name, 
                      ageCategory: "medicine",
                      price: medicine.price 
                    }}
                  >
                    <Button 
                      className="w-full font-semibold text-sm shadow-warm hover:shadow-glow transition-all duration-300 text-white bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90"
                      size="sm"
                    >
                      Order Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Options Section */}
        <div className="bg-gradient-to-r from-secondary/20 to-accent/10 rounded-3xl p-8 shadow-colorful">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent mb-4">
              💳 Payment Options
            </h3>
            <p className="text-lg text-muted-foreground">
              We accept multiple payment methods for your convenience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-card/50 rounded-xl shadow-warm hover:shadow-glow transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-barn rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💵</span>
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Cash on Delivery</h4>
              <p className="text-sm text-muted-foreground">Pay when you receive your chicks</p>
            </div>

            <div className="text-center p-6 bg-card/50 rounded-xl shadow-warm hover:shadow-glow transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-golden rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">UPI Payment</h4>
              <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
            </div>

            <div className="text-center p-6 bg-card/50 rounded-xl shadow-warm hover:shadow-glow transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-barn rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🏦</span>
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Bank Transfer</h4>
              <p className="text-sm text-muted-foreground">Direct bank account transfer</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3 text-xs"
                onClick={() => document.getElementById('bank-details')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Bank Details
              </Button>
            </div>

            <div className="text-center p-6 bg-card/50 rounded-xl shadow-warm hover:shadow-glow transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-golden rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💳</span>
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Card Payment</h4>
              <p className="text-sm text-muted-foreground">Debit & Credit cards accepted</p>
            </div>
          </div>

          <div className="text-center mt-8 space-y-4">
            <div className="inline-flex items-center space-x-4 p-4 bg-card/70 rounded-xl shadow-warm">
              <span className="text-success text-2xl">✅</span>
              <span className="text-foreground font-semibold">Secure Payments</span>
              <span className="text-success text-2xl">✅</span>
              <span className="text-foreground font-semibold">Fast Processing</span>
              <span className="text-success text-2xl">✅</span>
              <span className="text-foreground font-semibold">Money Back Guarantee</span>
            </div>
            
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-xl border border-accent/30">
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">🏢</span>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">GST Number</p>
                  <p className="text-lg font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent">
                    33AARFR3498G1ZR
                  </p>
                </div>
              </div>
            </div>
          </div>
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
              <p 
                className="text-muted-foreground text-sm cursor-pointer hover:text-primary transition-colors" 
                onClick={() => window.open('https://maps.app.goo.gl/FzpHr4c7qQi66rTX7', '_blank')}
              >
                Errabaiyanahalli, Tamil Nadu 636813
              </p>
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

      {/* Bank Details Section */}
      <section id="bank-details" className="py-20 px-6 bg-gradient-to-r from-secondary/40 to-accent/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent mb-6">
              🏦 Bank Account Details
            </h3>
            <p className="text-xl text-muted-foreground mb-8">
              For direct bank transfer payments, use the following account details:
            </p>
          </div>

          <div className="bg-card/70 rounded-2xl p-8 shadow-colorful border-2 border-accent/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gradient-barn/10 p-4 rounded-xl border border-accent/30">
                  <h4 className="text-lg font-bold text-foreground mb-2 flex items-center">
                    <span className="text-2xl mr-3">🏦</span>
                    Bank Name
                  </h4>
                  <p className="text-xl font-semibold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent">
                    IDBI Bank
                  </p>
                </div>

                <div className="bg-gradient-golden/10 p-4 rounded-xl border border-accent/30">
                  <h4 className="text-lg font-bold text-foreground mb-2 flex items-center">
                    <span className="text-2xl mr-3">👤</span>
                    Account Holder Name
                  </h4>
                  <p className="text-xl font-semibold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent">
                    RP POULTRY FARM AND TRADERS
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-barn/10 p-4 rounded-xl border border-accent/30">
                  <h4 className="text-lg font-bold text-foreground mb-2 flex items-center">
                    <span className="text-2xl mr-3">💳</span>
                    Account Number
                  </h4>
                  <p className="text-xl font-semibold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent font-mono">
                    0368102000016621
                  </p>
                </div>

                <div className="bg-gradient-golden/10 p-4 rounded-xl border border-accent/30">
                  <h4 className="text-lg font-bold text-foreground mb-2 flex items-center">
                    <span className="text-2xl mr-3">🔢</span>
                    IFSC Code
                  </h4>
                  <p className="text-xl font-semibold bg-gradient-to-r from-primary to-accent-bright bg-clip-text text-transparent font-mono">
                    IBKL0000368
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-accent/20 to-primary/20 p-6 rounded-xl border-2 border-accent/30">
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center justify-center">
                  <span className="text-2xl mr-3">⚠️</span>
                  Important Payment Instructions
                </h4>
                <div className="text-left space-y-3 text-muted-foreground">
                  <p className="flex items-start">
                    <span className="text-success mr-2 mt-1">✓</span>
                    Please mention your order details in the transfer reference
                  </p>
                  <p className="flex items-start">
                    <span className="text-success mr-2 mt-1">✓</span>
                    Send payment confirmation screenshot to our WhatsApp/Phone
                  </p>
                  <p className="flex items-start">
                    <span className="text-success mr-2 mt-1">✓</span>
                    Delivery will be processed after payment confirmation
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-accent/20">
                    <a href="tel:9500790276" className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 px-3 py-2 rounded-lg transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">Call Now</span>
                    </a>
                    <a href="https://wa.me/919500790276" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-600/10 hover:bg-green-600/20 px-3 py-2 rounded-lg transition-colors">
                      <MessageCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">WhatsApp</span>
                    </a>
                    <a href="https://facebook.com/rppoultrytraders" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 px-3 py-2 rounded-lg transition-colors">
                      <Facebook className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Developer Attribution */}
      <footer className="bg-muted/50 py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Developed by <span className="font-semibold text-primary">TECHFOX</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
