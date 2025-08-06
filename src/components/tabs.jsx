"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

const Tabs = React.forwardRef(({ className, value, onValueChange, ...props }, ref) => (
  <div ref={ref} className={cn("w-full", className)} {...props} />
));
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-wrap border-b border-zinc-300", className)}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(
  ({ className, value, activeTab, onClick, children, ...props }, ref) => (
    <button
      type="button"
      ref={ref}
      onClick={onClick}
      className={cn(
        "px-2 pb-2 pt-3 text-base transition-all focus:outline-none font-medium text-center border-b-2 whitespace-nowrap cursor-pointer",
        "sm:min-w-32 md:min-w-40 lg:min-w-44",
        activeTab === value
          ? "text-black font-bold border-black"
          : "text-gray-400 font-normal border-transparent hover:text-black hover:border-black",
        className
      )}
      {...props}
    >
      <span className="inline-block hover:scale-105 transition-transform">
        {children}
      </span>
    </button>
  )
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ className, value, activeTab, ...props }, ref) => {
  // Renderiza todos os conteúdos, mas esconde os inativos para evitar tremulação
  return (
    <div 
      ref={ref} 
      className={cn(
        className,
        activeTab === value ? "block" : "hidden"
      )} 
      {...props} 
    />
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
