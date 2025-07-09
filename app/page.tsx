'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IdeaCard } from '@/components/idea-card';
import { CategoryTabs } from '@/components/category-tabs';
import type { Idea, Category, SortOption } from '@/types/idea';
import { getIdeas, getCategories } from '@/lib/api';
import { TrendingUp, Clock } from 'lucide-react';

export default function HomePage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('latest');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [fetchedIdeas, fetchedCategories] = await Promise.all([
          getIdeas(),
          getCategories(),
        ]);
        setIdeas(fetchedIdeas);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // You could set an error state here to show an error message to the user
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAndSortedIdeas = useMemo(() => {
    let filtered = ideas;

    // 카테고리 필터링
    if (selectedCategory !== 'all') {
      const categoryName = categories.find(
        (cat) => cat.id === selectedCategory
      )?.name;
      if (categoryName) {
        filtered = filtered.filter((idea) =>
          idea.category.includes(categoryName)
        );
      }
    }

    // 정렬
    if (sortOption === 'popular') {
      filtered = [...filtered].sort(
        (a, b) => b.likes - b.dislikes - (a.likes - a.dislikes)
      );
    } else {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return filtered;
  }, [selectedCategory, sortOption, ideas, categories]);

  if (isLoading) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">오늘의 사이드 프로젝트 아이디어</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">창의적인 아이디어를 불러오는 중...</p>
            </div>
            {/* 스켈레톤 로딩 UI를 여기에 추가할 수 있습니다. */}
        </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 헤더 섹션 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          오늘의 사이드 프로젝트 아이디어
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          매일 새롭게 수집되는 창의적인 아이디어들을 탐색하고, 마음에 드는
          프로젝트는 팀을 모집해서 함께 만들어보세요.
        </p>
      </div>

      {/* 필터 및 정렬 */}
      <div className="mb-8 space-y-4">
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            총 {filteredAndSortedIdeas.length}개의 아이디어
          </p>

          <Select
            value={sortOption}
            onValueChange={(value: SortOption) => setSortOption(value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  최신순
                </div>
              </SelectItem>
              <SelectItem value="popular">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  인기순
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 아이디어 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedIdeas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>

      {/* 더 보기 버튼 */}
      <div className="text-center mt-12">
        <Button size="lg" variant="outline">
          더 많은 아이디어 보기
        </Button>
      </div>
    </div>
  );
}
