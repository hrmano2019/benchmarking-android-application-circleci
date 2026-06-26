import { Header } from "@/components/Header";
import { CategoryCard } from "@/components/CategoryCard";
import { LiveTrackingCard } from "@/components/LiveTrackingCard";
import { CommodityStats } from "@/components/CommodityStats";
import { ProductList } from "@/components/ProductList";
import { 
  Droplets, 
  Heart, 
  Wine, 
  Wheat, 
  Sparkles, 
  Fish, 
  Rabbit,
  ArrowRight,
  Radio
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    title: "Huile de Palme RSPO",
    description: "Traçabilité certifiée durable",
    icon: Droplets,
    itemCount: 245,
    activeShipments: 34,
    category: "palm-oil" as const,
  },
  {
    title: "Huiles Sans Cholestérol",
    description: "Huiles santé & bien-être",
    icon: Heart,
    itemCount: 128,
    activeShipments: 18,
    category: "healthy-oil" as const,
  },
  {
    title: "Boissons",
    description: "Chaîne du froid surveillée",
    icon: Wine,
    itemCount: 312,
    activeShipments: 42,
    category: "beverages" as const,
  },
  {
    title: "Agriculture",
    description: "Pommes de terre, plantains",
    icon: Wheat,
    itemCount: 567,
    activeShipments: 28,
    category: "agriculture" as const,
  },
  {
    title: "Soins Personnels",
    description: "Savons, cosmétiques, Kifebe",
    icon: Sparkles,
    itemCount: 423,
    activeShipments: 15,
    category: "personal-care" as const,
  },
  {
    title: "Aquaculture",
    description: "Mikeke, Tilapia, poissons",
    icon: Fish,
    itemCount: 189,
    activeShipments: 22,
    category: "aquaculture" as const,
  },
  {
    title: "Élevage",
    description: "Lapins, dindes",
    icon: Rabbit,
    itemCount: 156,
    activeShipments: 8,
    category: "livestock" as const,
  },
];

const liveShipments = [
  {
    productName: "Huile de Palme RSPO",
    batchId: "RSPO-2024-0847",
    origin: "Bandundu",
    destination: "Kinshasa",
    currentLocation: "Kikwit",
    progress: 65,
    eta: "14h30",
    status: "en-route" as const,
  },
  {
    productName: "Jus de Mangue Premium",
    batchId: "BEV-2024-1234",
    origin: "Équateur",
    destination: "Lubumbashi",
    currentLocation: "Mbuji-Mayi",
    temperature: 4,
    temperatureStatus: "normal" as const,
    progress: 45,
    eta: "Demain 08h00",
    status: "en-route" as const,
  },
  {
    productName: "Tilapia Frais",
    batchId: "FISH-2024-0567",
    origin: "Lac Tanganyika",
    destination: "Goma",
    currentLocation: "Uvira",
    temperature: 2,
    temperatureStatus: "normal" as const,
    progress: 78,
    eta: "16h45",
    status: "en-route" as const,
  },
  {
    productName: "Savon Kifebe Artisanal",
    batchId: "SOAP-2024-0891",
    origin: "Lubumbashi",
    destination: "Kinshasa",
    currentLocation: "Kananga",
    progress: 35,
    eta: "Dans 2 jours",
    status: "delayed" as const,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-10">
          <div className="rounded-2xl gradient-hero border border-border p-8 md:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Radio className="h-3 w-3 animate-pulse-live" />
                Suivi en temps réel
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Plateforme de Traçabilité & Logistique
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Suivez vos commodités en temps réel : huiles RSPO, produits frais avec chaîne du froid, 
                produits agricoles, cosmétiques locaux et produits d'élevage à travers toutes les provinces.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="gradient-primary">
                  Nouveau Suivi
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline">
                  Voir les Rapports
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="mb-10">
          <CommodityStats />
        </section>

        {/* Categories Grid */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">Catégories de Produits</h2>
              <p className="text-sm text-muted-foreground">Gérez vos commodités par secteur</p>
            </div>
            <Button variant="ghost" className="text-primary">
              Voir tout
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category, index) => (
              <CategoryCard key={category.title} {...category} index={index} />
            ))}
          </div>
        </section>

        {/* Live Tracking & Products */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Live Tracking */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-foreground">Suivi en Direct</h2>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-live" />
                    Live
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Expéditions actives</p>
              </div>
            </div>
            <div className="space-y-4">
              {liveShipments.map((shipment, index) => (
                <LiveTrackingCard key={shipment.batchId} {...shipment} index={index} />
              ))}
            </div>
          </section>

          {/* Product List */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground">Produits</h2>
              <p className="text-sm text-muted-foreground">Inventaire et disponibilité</p>
            </div>
            <ProductList />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
