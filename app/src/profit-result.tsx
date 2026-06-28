import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Target, AlertCircle } from "lucide-react";
import { ProductData } from "./ProductForm";

interface ProfitabilityResultsProps {
  data: ProductData | null;
}

export const ProfitabilityResults = ({ data }: ProfitabilityResultsProps) => {
  if (!data) {
    return (
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Profitability Analysis</CardTitle>
          <CardDescription>Results will appear here after calculation</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Enter product data and click "Calculate Profitability" to see results</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalVariableCost = data.variableCostPerUnit * data.productionVolume;
  const totalCost = data.fixedCosts + totalVariableCost;
  const totalRevenue = data.sellingPrice * data.productionVolume;
  const totalProfit = totalRevenue - totalCost;
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(2);
  const breakEvenUnits = Math.ceil(
    data.fixedCosts / (data.sellingPrice - data.variableCostPerUnit)
  );
  const contributionMargin = data.sellingPrice - data.variableCostPerUnit;
  const contributionMarginRatio = ((contributionMargin / data.sellingPrice) * 100).toFixed(2);

  const isProfit = totalProfit >= 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              ${totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Total Profit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`text-3xl font-bold ${
                isProfit ? "text-success" : "text-destructive"
              }`}
            >
              ${totalProfit.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Margin: {profitMargin}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Break-Even Point
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {breakEvenUnits.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-1">units</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Contribution Margin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              ${contributionMargin.toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Ratio: {contributionMarginRatio}%
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
          <CardDescription>Detailed analysis of costs and revenue for {data.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Fixed Costs</span>
              <span className="font-semibold">${data.fixedCosts.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Variable Costs (Total)</span>
              <span className="font-semibold">${totalVariableCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Total Costs</span>
              <span className="font-semibold">${totalCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Production Volume</span>
              <span className="font-semibold">{data.productionVolume.toLocaleString()} units</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-muted-foreground">Selling Price per Unit</span>
              <span className="font-semibold">${data.sellingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-semibold text-lg">Net Profit</span>
              <span
                className={`font-bold text-xl ${
                  isProfit ? "text-success" : "text-destructive"
                }`}
              >
                ${totalProfit.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
