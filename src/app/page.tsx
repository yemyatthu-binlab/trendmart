// src/page.tsx
"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
// 🗑️ REMOVED: useDebouncedCallback is no longer needed in this component
// import { useDebouncedCallback } from "use-debounce";
import {
  useListPublicProductsQuery,
  GetMainSubCategoriesQuery,
  useGetCategoriesQuery,
  SortOrder,
} from "@/graphql/generated";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { ProductCard } from "@/components/organisms/products/ProductCard/ProductCard";
import { useAuthStore } from "@/store/auth";
import { AuthDialog } from "@/components/organisms/auth/AuthDialog/AuthDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
// ✨ NEW: Import the Zustand store
import { useProductFilterStore, Filters } from "@/store/productFilterStore";
import { usePathname, useRouter } from "next/navigation";
import { CartIcon } from "@/components/molecules/orders/CartIcon/CartIcon";

type Category = GetMainSubCategoriesQuery["getMainSubCategories"][number];
type SortField = "createdAt" | "price";

// 🗑️ REMOVED: Filters type is now imported from the store

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

const AppHeader = ({
  onCategorySelect,
  onSearchChange,
  onSortChange,
  onClearFilters,
  selectedCategoryName,
  filters,
}: {
  onCategorySelect: (categoryId: number, categoryName: string) => void;
  onSearchChange: (searchTerm: string) => void;
  onSortChange: (field: SortField, order: SortOrder) => void;
  onClearFilters: () => void;
  selectedCategoryName: string | null;
  filters: Filters;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // ✨ NEW: State to track which category was clicked to open the Mega Menu
  const [activeCategoryForMenu, setActiveCategoryForMenu] = useState<
    string | null
  >(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data: categoriesData, loading: categoriesLoading } =
    useGetCategoriesQuery();
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const pathname = usePathname();
  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    onCategorySelect(categoryId, categoryName);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2 sm:px-15 lg:px-30">
        <div className="container flex h-16 items-center">
          <div className="mr-8 flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg"
            >
              <ShoppingBag className="h-6 w-6" />
              <span>TrendMart</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {selectedCategoryName ? (
              <div className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-full">
                <span className="font-semibold">{selectedCategoryName}</span>
                <button
                  onClick={onClearFilters}
                  className="rounded-full hover:bg-primary-foreground/20 p-0.5"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              categoriesData?.getCategories?.map((cat) => (
                <button
                  key={cat.id}
                  // 🔄 CHANGED: Set the active category for the menu before opening it
                  onClick={() => {
                    setActiveCategoryForMenu(cat.name);
                    setIsMenuOpen(true);
                  }}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {cat.name}
                </button>
              ))
            )}
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
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="h-5 w-5 rounded-full bg-black flex items-center justify-center">
                      <p className="text-white text-xs font-bold">
                        {user?.fullName.charAt(0).toUpperCase()}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    Hi, {user?.fullName.split(" ")[0]}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/account/orders?from=${encodeURIComponent(
                        pathname
                      )}`}
                    >
                      My Orders
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setAuthDialogOpen(true)}
              >
                <User className="h-5 w-5" />
              </Button>
            )}
            <CartIcon />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              // 🔄 CHANGED: Reset active category when using the generic menu button
              onClick={() => {
                setActiveCategoryForMenu(null);
                setIsMenuOpen(true);
              }}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <AuthDialog isOpen={isAuthDialogOpen} onOpenChange={setAuthDialogOpen} />
      <MegaMenu
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        categories={categoriesData?.getCategories ?? []}
        loading={categoriesLoading}
        onCategorySelect={handleCategoryClick}
        // ✨ NEW: Pass the active category name to the Mega Menu
        activeCategoryName={activeCategoryForMenu}
      />
      <SearchDialog
        isOpen={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        onSearchChange={onSearchChange}
        onSortChange={onSortChange}
        currentSearch={filters.search}
        // ✨ NEW: Pass the current sort state to the dialog
        currentSort={filters.sort}
      />
    </>
  );
};

const MegaMenu = ({
  isOpen,
  onOpenChange,
  categories,
  loading,
  onCategorySelect,
  activeCategoryName, // ✨ NEW Prop
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  categories: Category[];
  loading: boolean;
  onCategorySelect: (categoryId: number, categoryName: string) => void;
  activeCategoryName?: string | null; // ✨ NEW Prop
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
            // 🔄 CHANGED: Set the default value based on the passed prop, with a fallback
            defaultValue={
              activeCategoryName?.toLowerCase() ??
              categories[0]?.name.toLowerCase() ??
              ""
            }
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
                      onClick={() =>
                        onCategorySelect(parseInt(subCat.id, 10), subCat.name)
                      }
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

const SearchDialog = ({
  isOpen,
  onOpenChange,
  onSearchChange,
  onSortChange,
  currentSearch,
  currentSort, // ✨ NEW Prop
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSearchChange: (searchTerm: string) => void;
  onSortChange: (field: SortField, order: SortOrder) => void;
  currentSearch: string;
  currentSort: { field: SortField; order: SortOrder }; // ✨ NEW Prop
}) => {
  const [searchInput, setSearchInput] = useState(currentSearch);

  const handleSort = (value: string) => {
    const [field, order] = value.split("-") as [SortField, SortOrder];
    onSortChange(field, order);
  };

  // 🔄 CHANGED: Calculate the correct default value for the radio group
  const defaultSortValue = `${currentSort.field}-${currentSort.order}`;

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
              value={searchInput || ""}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              className="pl-10 text-base"
            />
          </div>
          <div>
            <Label className="text-base font-semibold">Sort by</Label>
            <RadioGroup
              onValueChange={handleSort}
              // 🔄 CHANGED: Use the calculated default value
              defaultValue={defaultSortValue}
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
          <div className="flex justify-end">
            <Button
              onClick={() => {
                onSearchChange(searchInput);
                onOpenChange(false);
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ... (HeroSlider component remains unchanged) ...

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

// ... (ProductGrid component remains unchanged) ...
const ProductGrid = ({ filters }: { filters: Filters }) => {
  const { data, loading, error, fetchMore } = useListPublicProductsQuery({
    variables: {
      skip: 0,
      take: 20, // Initial number of products to load
      filter: {
        search: filters.search,
        categoryIds: filters.categoryIds,
      },
      sort: filters.sort,
    },
    fetchPolicy: "cache-and-network",
  });

  const handleLoadMore = () => {
    if (!data) return;

    fetchMore({
      variables: {
        // We calculate the new 'skip' value based on how many products are already loaded
        skip: data?.listPublicProducts?.products.length,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          listPublicProducts: {
            ...prevResult.listPublicProducts,
            products: [
              ...(prevResult?.listPublicProducts?.products || []),
              ...(fetchMoreResult?.listPublicProducts?.products || []),
            ],
          },
        };
      },
    });
  };

  if (error) {
    return <p>Error loading products: {error.message}</p>;
  }

  const products = data?.listPublicProducts?.products ?? [];
  const totalCount = data?.listPublicProducts?.totalCount ?? 0;
  const hasMore = products.length < totalCount;

  return (
    <main className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 w-full">
        {loading && products.length === 0 ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-[3/4] w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          ))
        ) : products.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <h2 className="text-2xl font-semibold">No Products Found</h2>
            <p className="text-muted-foreground mt-2">
              Try adjusting your filters to find what you&apos;re looking for.
            </p>
          </div>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {/* ✨ NEW: "Load More" Button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={handleLoadMore}
            disabled={loading}
            size="lg"
            variant="outline"
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </main>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Social */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl"
            >
              <ShoppingBag className="h-7 w-7" />
              <span>TrendMart</span>
            </Link>
            <p className="text-muted-foreground">
              Your one-stop shop for the latest fashion trends.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Sale
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-muted-foreground space-y-2">
              <p>Kan Ne Ward, Pathein</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:support@trendmart.com"
                  className="hover:text-primary"
                >
                  support.trendmart@gmail.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+959123456789" className="hover:text-primary">
                  +959 958 453 693
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-6 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} TrendMart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function HomePage() {
  // 🔄 CHANGED: State is now managed by the Zustand store
  const {
    filters,
    selectedCategoryName,
    setCategory,
    setSearch,
    setSort,
    clearFilters,
  } = useProductFilterStore();

  return (
    <div className="flex min-h-screen flex-col bg-background mx-auto">
      <AppHeader
        // 🔄 CHANGED: Pass the actions from the store to the header
        onCategorySelect={setCategory}
        onSearchChange={setSearch}
        onSortChange={setSort}
        onClearFilters={clearFilters}
        selectedCategoryName={selectedCategoryName}
        filters={filters}
      />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 space-y-8">
          <HeroSlider />
          {(filters.categoryIds.length > 0 || filters.search) && (
            <div className="flex items-center justify-between bg-secondary/50 p-3 rounded-lg">
              <div>
                <span className="font-semibold">Filtered by: </span>
                <span className="italic">
                  {filters.categoryIds.length > 0 &&
                    `Category: "${selectedCategoryName}"`}
                  {filters.categoryIds.length > 0 && filters.search && " & "}
                  {filters.search && `Search: "${filters.search}"`}
                </span>
              </div>
              <Button
                variant="ghost"
                onClick={clearFilters} // Use the clear action from the store
                className="flex items-center gap-2"
              >
                <X size={16} />
                Clear Filter
              </Button>
            </div>
          )}
          <ProductGrid filters={filters} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
