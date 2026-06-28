import { 
  Droplets, 
  Leaf, 
  Wine, 
  Wheat, 
  Sparkles, 
  Fish, 
  Rabbit,
  ChevronRight 
} from "lucide-react";
import { RSPOCertificationBadge } from "./RSPOCertificationBadge";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  category: string;
  categoryIcon: React.ElementType;
  origin: string;
  stock: number;
  unit: string;
  price: number;
  currency: string;
  rspo?: boolean;
  cholesterolFree?: boolean;
}

const products: Product[] = [
  {
    id: "PALM-001",
    name: "Huile de Palme RSPO",
    category: "Huile de Palme",
    categoryIcon: Droplets,
    origin: "Bandundu",
    stock: 5000,
    unit: "L",
    price: 2.50,
    currency: "USD",
    rspo: true,
  },
  {
    id: "OIL-002",
    name: "Huile de Tournesol",
    category: "Huiles Santé",
    categoryIcon: Leaf,
    origin: "Kinshasa",
    stock: 3200,
    unit: "L",
    price: 3.20,
    currency: "USD",
    cholesterolFree: true,
  },
  {
    id: "BEV-003",
    name: "Jus de Mangue",
    category: "Boissons",
    categoryIcon: Wine,
    origin: "Équateur",
    stock: 1500,
    unit: "unités",
    price: 1.50,
    currency: "USD",
  },
  {
    id: "AGR-004",
    name: "Pommes de Terre",
    category: "Agriculture",
    categoryIcon: Wheat,
    origin: "Nord-Kivu",
    stock: 8000,
    unit: "kg",
    price: 0.80,
    currency: "USD",
  },
  {
    id: "SOAP-005",
    name: "Savon Kifebe",
    category: "Soins Personnels",
    categoryIcon: Sparkles,
    origin: "Lubumbashi",
    stock: 2400,
    unit: "unités",
    price: 0.50,
    currency: "USD",
  },
  {
    id: "FISH-006",
    name: "Tilapia Frais",
    category: "Aquaculture",
    categoryIcon: Fish,
    origin: "Lac Tanganyika",
    stock: 450,
    unit: "kg",
    price: 5.00,
    currency: "USD",
  },
  {
    id: "LIVE-007",
    name: "Lapin d'Élevage",
    category: "Élevage",
    categoryIcon: Rabbit,
    origin: "Goma",
    stock: 120,
    unit: "têtes",
    price: 15.00,
    currency: "USD",
  },
];

export function ProductList() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-card animate-slide-up overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-card-foreground">Inventaire des Produits</h3>
        <p className="text-sm text-muted-foreground">Aperçu des stocks disponibles</p>
      </div>
      
      <div className="divide-y divide-border">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <product.categoryIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-card-foreground truncate">{product.name}</h4>
                {product.rspo && <RSPOCertificationBadge certified className="scale-75 origin-left" />}
                {product.cholesterolFree && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-healthy-oil/20 text-card-foreground">
                    Sans cholestérol
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {product.category} • {product.origin}
              </p>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-card-foreground">
                {product.stock.toLocaleString()} {product.unit}
              </p>
              <p className="text-sm text-muted-foreground">
                {product.price.toFixed(2)} {product.currency}/{product.unit === "unités" || product.unit === "têtes" ? "u" : product.unit.charAt(0)}
              </p>
            </div>
            
            <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
}
