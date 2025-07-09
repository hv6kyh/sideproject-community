"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Category } from "@/types/idea"

interface CategoryTabsProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryTabs({ categories, selectedCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <Tabs value={selectedCategory} onValueChange={onCategoryChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto p-1">
        <TabsTrigger value="all" className="text-sm">
          전체
        </TabsTrigger>
        {categories.slice(0, 5).map((category) => (
          <TabsTrigger key={category.id} value={category.id} className="text-sm">
            {category.name}
            <span className="ml-1 text-xs text-gray-500">({category.count})</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
