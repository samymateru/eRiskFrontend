"use client";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label as UILabel } from "@/components/ui/label";

export const description = "A bar chart with a label";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function SimpleChartBar() {
  return (
    <Card className="min-w-fit h-full bg-neutral-100 border-none py-5">
      <CardHeader>
        <CardTitle>
          <UILabel>Annual Risk Trend</UILabel>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart
            barCategoryGap="10%"
            barGap={10}
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="desktop"
              fill="var(--color-desktop)"
              radius={8}
              maxBarSize={50}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
