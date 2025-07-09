"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bookmark, Lightbulb, Search, User } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Lightbulb className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">SideProject Community</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              홈
            </Link>
            <Link href="/explore" className="text-gray-700 hover:text-blue-600 transition-colors">
              탐색
            </Link>
            <Link href="/bookmarks" className="text-gray-700 hover:text-blue-600 transition-colors">
              북마크
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              로그인
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
