"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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
import { KeyItem } from "./key-item";
import YearSelect from "../select/year-select";
import { Label as UILabel } from "@/components/ui/label";

export const description = "A radial chart with stacked sections";

const chartData = [{ month: "january", desktop: 1260, mobile: 570 }];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface SimpleRadialStackedProps {
  title: string;
  description?: string;
}

export function SimpleRadialStacked({
  title,
  description,
}: SimpleRadialStackedProps) {
  const totalVisitors = chartData[0].desktop + chartData[0].mobile;

  return (
    <Card className="flex flex-col h-full bg-neutral-100 border-none py-3">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center justify-between">
          <UILabel>{title}</UILabel> <YearSelect />
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex h-full items-center p-1 w-[380px]">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square p-1 w-full max-w-[250px]">
          <RadialBarChart
            data={chartData}
            endAngle={360}
            innerRadius={80}
            outerRadius={130}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold">
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground">
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="desktop"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-desktop)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="mobile"
              fill="var(--color-mobile)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
        <div className="w-[250px] h-full flex justify-between gap-1 flex-col">
          <div></div>
          <div className="flex gap-1.5 flex-col">
            <KeyItem value="10-20%" color="bg-red-700" level="Very High" />
            <KeyItem value="30-40%" color="bg-yellow-700" level="High" />
            <KeyItem value="50-50%" color="bg-amber-700" level="Medium" />
            <KeyItem value="10-20%" color="bg-green-700" level="Low" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
