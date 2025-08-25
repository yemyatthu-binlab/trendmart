// app/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";
import {
  useListPublicProductsQuery,
  useGetMainSubCategoriesQuery,
  GetMainSubCategoriesQuery,
  useGetCategoriesQuery,
} from "@/graphql/generated";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowRight,
  Search,
  ChevronLeft,
  ChevronRight,
  Heart,
  User,
  ShoppingCart,
  Menu,
  ShoppingBag,
  X,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { ProductCard } from "@/components/organisms/products/ProductCard/ProductCard";

// ============================================================================
// TYPES
// ============================================================================
type Category = GetMainSubCategoriesQuery["getMainSubCategories"][number];
type SortOrder = "asc" | "desc";
type SortField = "createdAt" | "price";
type Filters = {
  search: string;
  categoryIds: number[];
  sort: {
    field: SortField;
    order: SortOrder;
  };
};

export const CATEGORY_GRADIENTS = [
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)", // pink → soft peach
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", // blue → light sky
  "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)", // purple-pink → lavender
  "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)", // mint → aqua
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", // peach → orange
  "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)", // gold → violet
  "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)", // lavender → sky
  "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", // yellow → coral
  "linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)", // mint → yellow
];

// ============================================================================
// NEW COMPONENT: AppHeader
// Suggested location: components/layout/AppHeader.tsx
// ============================================================================
const AppHeader = ({
  onCategorySelect,
}: {
  onCategorySelect: (categoryId: number) => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data: categoriesData, loading: categoriesLoading } =
    useGetCategoriesQuery();

  const handleCategoryClick = (categoryId: number) => {
    onCategorySelect(categoryId);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-8 flex items-center">
            <a href="/" className="flex items-center gap-2 font-bold text-lg">
              <ShoppingBag className="h-6 w-6" />
              <span>TrendMart</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {categoriesData?.getCategories?.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setIsMenuOpen(true)}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {cat.name}
              </button>
            ))}
          </nav>

          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <MegaMenu
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        categories={categoriesData?.getCategories ?? []}
        loading={categoriesLoading}
        onCategorySelect={handleCategoryClick}
      />
      <SearchDialog
        isOpen={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        // These would be wired up to the main page state
        onSearchChange={() => {}}
        onSortChange={() => {}}
      />
    </>
  );
};

// ============================================================================
// NEW COMPONENT: MegaMenu
// Suggested location: components/organisms/MegaMenu.tsx
// ============================================================================
const MegaMenu = ({
  isOpen,
  onOpenChange,
  categories,
  loading,
  onCategorySelect,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  categories: Category[];
  loading: boolean;
  onCategorySelect: (categoryId: number) => void;
}) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">Categories</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="p-6 space-y-4">
            <Skeleton className="w-1/4 h-8" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="w-full h-24" />
              <Skeleton className="w-full h-24" />
              <Skeleton className="w-full h-24" />
            </div>
          </div>
        ) : (
          <Tabs
            defaultValue={categories[0]?.name.toLowerCase() ?? ""}
            className="flex-grow flex flex-col"
          >
            <TabsList className="mx-6">
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.name.toLowerCase()}>
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex-grow overflow-y-auto p-6">
              {categories.map((cat) => (
                <TabsContent
                  key={cat.id}
                  value={cat.name.toLowerCase()}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                  {cat.children?.map((subCat) => (
                    <div
                      key={subCat.id}
                      onClick={() => onCategorySelect(parseInt(subCat.id, 10))}
                      className="group cursor-pointer space-y-2"
                    >
                      <div
                        className={`
                          flex items-center justify-center mb-2
                          rounded-lg aspect-square text-white font-bold text-lg 
                          transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg
                        `}
                        style={{
                          background:
                            CATEGORY_GRADIENTS[
                              parseInt(subCat.id, 10) %
                                CATEGORY_GRADIENTS.length
                            ],
                        }}
                      >
                        <p className="text-center text-xs italic p-2">
                          {subCat.name}
                        </p>
                      </div>
                      <p className="font-semibold text-center text-xs group-hover:text-primary">
                        {subCat.name}
                      </p>
                    </div>
                  ))}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

// ============================================================================
// NEW COMPONENT: SearchDialog
// Suggested location: components/organisms/SearchDialog.tsx
// ============================================================================
const SearchDialog = ({
  isOpen,
  onOpenChange,
  onSearchChange,
  onSortChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSearchChange: (searchTerm: string) => void;
  onSortChange: (field: SortField, order: SortOrder) => void;
}) => {
  const handleSearch = useDebouncedCallback((e) => {
    onSearchChange(e.target.value);
  }, 300);

  const handleSort = (value: string) => {
    const [field, order] = value.split("-") as [SortField, SortOrder];
    onSortChange(field, order);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Search & Filter</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              onChange={handleSearch}
              className="pl-10 text-base"
            />
          </div>
          <div>
            <Label className="text-base font-semibold">Sort by</Label>
            <RadioGroup
              onValueChange={handleSort}
              defaultValue="createdAt-desc"
              className="mt-2 space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="createdAt-desc" id="sort-newest" />
                <Label htmlFor="sort-newest">Newest Arrivals</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-asc" id="sort-price-asc" />
                <Label htmlFor="sort-price-asc">Price: Low to High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-desc" id="sort-price-desc" />
                <Label htmlFor="sort-price-desc">Price: High to Low</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ============================================================================
// EXISTING COMPONENT: HeroSlider (Unchanged)
// ============================================================================
const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    alt: "Woman shopping with bags",
    title: "Summer Collection is Here",
    subtitle: "Discover the latest trends and refresh your wardrobe.",
  },
  {
    src: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2070&auto=format&fit:crop",
    alt: "White t-shirt on a hanger",
    title: "Premium Quality Basics",
    subtitle: "Elevate your everyday look with our essential pieces.",
  },
  {
    src: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
    alt: "Stylish clothing and accessories organized",
    title: "Accessorize Your Style",
    subtitle: "Find the perfect finishing touches for any outfit.",
  },
  {
    src: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2070&auto=format&fit=crop",
    alt: "Man in a jacket looking out over a city",
    title: "Urban Explorer Collection",
    subtitle: "Gear up for your city adventures with our functional fits.",
  },
];

const HeroSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg mb-8">
      <div ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((slide, index) => (
            <div className="relative flex-[0_0_100%] aspect-[16/7]" key={index}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-8">
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                  {slide.title}
                </h2>
                <p className="mt-4 max-w-xl text-lg">{slide.subtitle}</p>
                <Button size="lg" className="mt-8 rounded-full">
                  Start shopping <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10 bg-white/80 hover:bg-white"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10 bg-white/80 hover:bg-white"
          onClick={scrollNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

// ============================================================================
// UPDATED COMPONENT: ProductGrid
// ============================================================================
const ProductGrid = ({ filters }: { filters: Filters }) => {
  const { data, loading, error } = useListPublicProductsQuery({
    variables: {
      skip: 0,
      take: 20,
      filter: {
        search: filters.search,
        categoryIds: filters.categoryIds,
      },
      sort: filters.sort,
    },
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    return <p>Error loading products: {error.message}</p>;
  }

  // Always render the grid container to maintain layout stability
  return (
    <main className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {loading ? (
          // Skeletons are rendered inside the grid
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-[3/4] w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          ))
        ) : data?.listPublicProducts?.products?.length === 0 ? (
          // "No products" message now spans the full grid width
          <div className="col-span-full text-center py-20">
            <h2 className="text-2xl font-semibold">No Products Found</h2>
            <p className="text-muted-foreground mt-2">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        ) : (
          // Products are rendered inside the grid
          data?.listPublicProducts?.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </main>
  );
};

// ============================================================================
// REFACTORED: Main Page Component
// ============================================================================
export default function HomePage() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    categoryIds: [],
    sort: { field: "createdAt", order: "desc" },
  });

  const handleCategorySelect = (categoryId: number) => {
    setFilters((prev) => ({
      ...prev,
      // Reset search and set the new category
      search: "",
      categoryIds: [categoryId],
    }));
  };

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search, categoryIds: [] })); // Clear category filter on new search
  };

  const handleSortChange = (field: SortField, order: SortOrder) => {
    setFilters((prev) => ({ ...prev, sort: { field, order } }));
  };

  return (
    // Establish a full-height flex column layout for the entire page
    <div className="flex min-h-screen flex-col bg-background mx-auto">
      <AppHeader onCategorySelect={handleCategorySelect} />
      {/* The <main> tag grows to fill remaining space, preventing shrinking */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 space-y-8">
          <HeroSlider />
          <ProductGrid filters={filters} />
        </div>
      </main>
    </div>
  );
}
