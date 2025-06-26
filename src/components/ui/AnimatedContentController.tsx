"use client";

import { useState } from "react";
import AnimatedContent from "@/components/ui/animated-content";
import { Button } from "@/components/ui/button";
import { Sparkles, Settings, Play } from "lucide-react";

export default function AnimatedContentController() {
  const [direction, setDirection] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const [ease, setEase] = useState("bounce.out");
  const [reverse, setReverse] = useState(false);
  const [animateOpacity, setAnimateOpacity] = useState(true);
  const [distance, setDistance] = useState(140);
  const [duration, setDuration] = useState(1.5);
  const [delay, setDelay] = useState(0);
  const [initialOpacity, setInitialOpacity] = useState(0.6);
  const [scale, setScale] = useState(1);
  const [threshold, setThreshold] = useState(0.1);

  const easingFunctions = [
    // Power functions
    { value: "power0.in", label: "power0.in" },
    { value: "power0.out", label: "power0.out" },
    { value: "power0.inOut", label: "power0.inOut" },
    { value: "power1.in", label: "power1.in" },
    { value: "power1.out", label: "power1.out" },
    { value: "power1.inOut", label: "power1.inOut" },
    { value: "power2.in", label: "power2.in" },
    { value: "power2.out", label: "power2.out" },
    { value: "power2.inOut", label: "power2.inOut" },
    { value: "power3.in", label: "power3.in" },
    { value: "power3.out", label: "power3.out" },
    { value: "power3.inOut", label: "power3.inOut" },
    { value: "power4.in", label: "power4.in" },
    { value: "power4.out", label: "power4.out" },
    { value: "power4.inOut", label: "power4.inOut" },
    
    // Sine functions
    { value: "sine.in", label: "sine.in" },
    { value: "sine.out", label: "sine.out" },
    { value: "sine.inOut", label: "sine.inOut" },
    
    // Expo functions
    { value: "expo.in", label: "expo.in" },
    { value: "expo.out", label: "expo.out" },
    { value: "expo.inOut", label: "expo.inOut" },
    
    // Circ functions
    { value: "circ.in", label: "circ.in" },
    { value: "circ.out", label: "circ.out" },
    { value: "circ.inOut", label: "circ.inOut" },
    
    // Back functions
    { value: "back.in", label: "back.in" },
    { value: "back.out", label: "back.out" },
    { value: "back.inOut", label: "back.inOut" },
    { value: "back.in(1.7)", label: "back.in(1.7)" },
    { value: "back.out(1.7)", label: "back.out(1.7)" },
    { value: "back.inOut(1.7)", label: "back.inOut(1.7)" },
    
    // Elastic functions
    { value: "elastic.in", label: "elastic.in" },
    { value: "elastic.out", label: "elastic.out" },
    { value: "elastic.inOut", label: "elastic.inOut" },
    { value: "elastic.in(1, 0.3)", label: "elastic.in(1, 0.3)" },
    { value: "elastic.out(1, 0.3)", label: "elastic.out(1, 0.3)" },
    { value: "elastic.inOut(1, 0.3)", label: "elastic.inOut(1, 0.3)" },
    
    // Bounce functions
    { value: "bounce.in", label: "bounce.in" },
    { value: "bounce.out", label: "bounce.out" },
    { value: "bounce.inOut", label: "bounce.inOut" },
    
    // Steps functions
    { value: "steps(5)", label: "steps(5)" },
    { value: "steps(10)", label: "steps(10)" },
    { value: "steps(20)", label: "steps(20)" },
  ];

  return (
    <div className=" mx-auto p-6 space-y-8 w-full h-fit">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Animation Controller
        </h1>
        <p className="text-muted-foreground">
          Tùy chỉnh animation parameters và xem kết quả real-time
        </p>
      </div>
    
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        {/* Demo Area */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-green-500" />
            <h2 className="text-xl font-semibold">Live Preview</h2>
          </div>
          
          <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 min-h-[200px] flex items-center justify-center bg-muted/30">
            <AnimatedContent
              distance={distance}
              direction={direction}
              reverse={reverse}
              duration={duration}
              ease={ease}
              initialOpacity={initialOpacity}
              animateOpacity={animateOpacity}
              scale={scale}
              threshold={threshold}
              delay={delay}
            >
              <div className="flex items-center gap-3 p-4 bg-card border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <Sparkles className="w-6 h-6 text-purple-500" />
                <div>
                  <h3 className="font-semibold text-lg">Animated Content</h3>
                  <p className="text-sm text-muted-foreground">
                    Scroll để trigger animation
                  </p>
                </div>
              </div>
            </AnimatedContent>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Controls</h2>
          </div>

          {/* Direction */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Direction</label>
            <div className="flex gap-2">
              <Button
                variant={direction === "horizontal" ? "default" : "outline"}
                size="sm"
                onClick={() => setDirection("horizontal")}
                className="flex-1"
              >
                Horizontal
              </Button>
              <Button
                variant={direction === "vertical" ? "default" : "outline"}
                size="sm"
                onClick={() => setDirection("vertical")}
                className="flex-1"
              >
                Vertical
              </Button>
            </div>
          </div>

          {/* Ease */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Easing Function</label>
            <select
              className="w-full p-2 border border-input rounded-md bg-background text-foreground text-sm"
              value={ease}
              onChange={(e) => setEase(e.target.value)}
            >
              {easingFunctions.map((easing) => (
                <option key={easing.value} value={easing.value}>
                  {easing.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">
              Hiện tại: <code className="bg-muted px-1 rounded">{ease}</code>
            </p>
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="reverse"
                checked={reverse}
                onChange={(e) => setReverse(e.target.checked)}
                className="w-4 h-4 rounded border-input"
              />
              <label htmlFor="reverse" className="text-sm font-medium">
                Reverse Direction
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="animateOpacity"
                checked={animateOpacity}
                onChange={(e) => setAnimateOpacity(e.target.checked)}
                className="w-4 h-4 rounded border-input"
              />
              <label htmlFor="animateOpacity" className="text-sm font-medium">
                Animate Opacity
              </label>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Distance</label>
                <span className="text-sm text-muted-foreground">{distance}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={300}
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Duration</label>
                <span className="text-sm text-muted-foreground">{duration}s</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={3}
                step={0.1}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Delay</label>
                <span className="text-sm text-muted-foreground">{delay}s</span>
              </div>
              <input
                type="range"
                min={0}
                max={3}
                step={0.1}
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Initial Opacity</label>
                <span className="text-sm text-muted-foreground">{initialOpacity}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={initialOpacity}
                onChange={(e) => setInitialOpacity(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Initial Scale</label>
                <span className="text-sm text-muted-foreground">{scale}</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={2}
                step={0.1}
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Threshold</label>
                <span className="text-sm text-muted-foreground">{threshold}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
