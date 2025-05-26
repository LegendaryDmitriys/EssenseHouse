import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ChevronDown, ChevronUp, Filter, Home, Map, Box, Building2, Scale, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { House } from "@/types/house"
import type { FilterOption } from "@/types/filter"
import config from "@/api/api.ts"
import {useQuery} from "@tanstack/react-query";

const Projects = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [compareHouses, setCompareHouses] = useState<House[]>([])
  const [isCompareMode, setIsCompareMode] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})
  const [page, setPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    setPage(1)
  }, [activeFilters])


  const { data: filterOptions = [], isLoading: isFilterLoading,  error: filterError } = useQuery<FilterOption[], Error>({
    queryKey: ['filterOptions'],
    queryFn: async () => {
      const response = await fetch(`${config.API_URL}filter-options/`)
      if (!response.ok){
        throw new Error(`Ошибка загрузки фильтров: ${response.status}`)
      }
      return await response.json()
    },
    staleTime: 1000 * 60 * 5
  })

  const { data: houseData = { results: [], count: 0, next: null, previous: null }, isLoading: isHouseLoading, error: houseError, refetch: refetchHouses } = useQuery({
    queryKey: ['houses', activeFilters, page],
    queryFn: async () => {
      const queryParams = new URLSearchParams()

      Object.entries(activeFilters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(key, v.toString()))
          } else {
            queryParams.append(key, value.toString())
          }
        }
      })

      queryParams.append('page', page.toString())

      const url = `${config.API_URL}houses/?${queryParams.toString()}`
      const response = await fetch(url)

      if (!response.ok) throw new Error(`Ошибка загрузки домов: ${response.status}`)

      return await response.json()
    },
    initialData: { results: [], count: 0, next: null, previous: null },
  })

  const loading = isFilterLoading || isHouseLoading
  const houses = houseData.results

  const handleFilterChange = (fieldName: string, value: any) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev }
      if (value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
        delete newFilters[fieldName]
      } else {
        newFilters[fieldName] = value
      }
      return newFilters
    })
  }

  const handleRangeChange = (fieldName: string, minValue: number | null, maxValue: number | null) => {
    const updates: Record<string, any> = {}
    if (minValue !== null) {
      updates[`${fieldName}__gte`] = minValue
    } else {
      updates[`${fieldName}__gte`] = null
    }
    if (maxValue !== null) {
      updates[`${fieldName}__lte`] = maxValue
    } else {
      updates[`${fieldName}__lte`] = null
    }
    setActiveFilters((prev) => {
      const newFilters = { ...prev }
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          delete newFilters[key]
        } else {
          newFilters[key] = value
        }
      })
      return newFilters
    })
  }

  const handleCheckboxChange = (fieldName: string, value: string) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev }
      const currentValues = Array.isArray(newFilters[fieldName]) ? newFilters[fieldName] : []
      if (currentValues.includes(value)) {
        const updatedValues = currentValues.filter((v) => v !== value)
        if (updatedValues.length === 0) {
          delete newFilters[fieldName]
        } else {
          newFilters[fieldName] = updatedValues
        }
      } else {
        newFilters[fieldName] = [...currentValues, value]
      }
      return newFilters
    })
  }

  const resetFilters = () => {
    setActiveFilters({})
    refetchHouses()
  }

  const toggleCompare = (house: House) => {
    if (compareHouses.find((h) => h.id === house.id)) {
      setCompareHouses(compareHouses.filter((h) => h.id !== house.id))
    } else {
      if (compareHouses.length < 3) {
        setCompareHouses([...compareHouses, house])
      } else {
        toast({
          title: "Ограничение сравнения",
          description: "Можно сравнивать не более 3 домов одновременно",
        })
      }
    }
  }

  const calculateDiscount = (house) => {
    if (house.discount && house.discount > 0) {
      return house.discount
    }
    return null
  }

  const getFilterValue = (fieldName: string) => {
    return activeFilters[fieldName] || ""
  }

  const getRangeFilterValue = (fieldName: string, isMin: boolean) => {
    const key = isMin ? `${fieldName}__gte` : `${fieldName}__lte`
    return activeFilters[key] || ""
  }

  return (
      <div className="min-h-screen bg-zinc-50">
        <div className="relative h-[400px] overflow-hidden bg-black">
          <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
              style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
              }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="container mx-auto px-4 py-16 relative h-full flex flex-col justify-center">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-heading font-bold text-white"
                >
                  Наши проекты
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-zinc-200 max-w-lg"
                >
                  Выберите идеальный проект дома, который отвечает всем вашим требованиям
                </motion.p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                    variant={isCompareMode ? "default" : "outline"}
                    className={cn(
                        "transition-all duration-300 bg-white/90 hover:bg-white text-zinc-900",
                        isCompareMode && "bg-primary text-white hover:bg-primary/90",
                    )}
                    onClick={() => {
                      if (compareHouses.length < 2) {
                        toast({
                          title: "Выберите дома",
                          description: "Для сравнения выберите минимум 2 дома",
                        })
                      } else {
                        setIsCompareMode(!isCompareMode)
                      }
                    }}
                >
                  <Scale className="w-4 h-4 mr-2" />
                  Сравнить ({compareHouses.length})
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="group bg-white/90 hover:bg-white text-zinc-900"
                >
                  <Filter className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                  Фильтры
                  {isFilterOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <AnimatePresence initial={false}>
            {isFilterOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mb-8"
                >
                  <div className="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Фильтры</h3>
                      {Object.keys(activeFilters).length > 0 && (
                          <Button variant="outline" size="sm" onClick={resetFilters}>
                            Сбросить все
                          </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {filterOptions.map((option) => {
                        if (option.filter_type === "exact" && option.field_name !== "best_seller") {
                          return (
                              <div key={option.id} className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">{option.name}</label>
                                <Select
                                    value={getFilterValue(option.field_name)}
                                    onValueChange={(value) => handleFilterChange(option.field_name, value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder={`Все ${option.name.toLowerCase()}`} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="all">Все {option.name.toLowerCase()}</SelectItem>
                                    {option.options.values.map((value) => (
                                        <SelectItem key={value} value={value.toString()}>
                                          {value.toString()}
                                        </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                          )
                        }
                        if (option.filter_type === "range") {
                          return (
                              <div key={option.id} className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">{option.name} (м²)</label>
                                <div className="flex gap-2">
                                  <input
                                      type="number"
                                      placeholder="от"
                                      value={getRangeFilterValue(option.field_name, true)}
                                      onChange={(e) => {
                                        const value = e.target.value === "" ? null : Number(e.target.value)
                                        handleRangeChange(
                                            option.field_name,
                                            value,
                                            getRangeFilterValue(option.field_name, false) || null,
                                        )
                                      }}
                                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  />
                                  <input
                                      type="number"
                                      placeholder="до"
                                      value={getRangeFilterValue(option.field_name, false)}
                                      onChange={(e) => {
                                        const value = e.target.value === "" ? null : Number(e.target.value)
                                        handleRangeChange(
                                            option.field_name,
                                            getRangeFilterValue(option.field_name, true) || null,
                                            value,
                                        )
                                      }}
                                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  />
                                </div>
                              </div>
                          )
                        }
                        if (option.filter_type === "exact" && option.field_name === "best_seller") {
                          return (
                              <div key={option.id} className="space-y-2">
                                <div className="flex items-center space-x-2 h-10 mt-6">
                                  <Checkbox
                                      id={`checkbox-${option.field_name}`}
                                      checked={!!activeFilters[option.field_name]}
                                      onCheckedChange={(checked) => {
                                        handleFilterChange(option.field_name, checked ? true : null)
                                      }}
                                  />
                                  <Label htmlFor={`checkbox-${option.field_name}`}>Только хиты продаж</Label>
                                </div>
                              </div>
                          )
                        }
                        return null
                      })}
                    </div>
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
          {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
          )}
          {(filterError || houseError) && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md my-6">
                <p>Ошибка загрузки данных: {(filterError || houseError)?.message}</p>
                <Button variant="outline" className="mt-2" onClick={() => refetchHouses()}>
                  Попробовать снова
                </Button>
              </div>
          )}
          {!loading && !(filterError || houseError) && houses.length === 0 && (
              <div className="text-center py-20">
                <Building2 className="w-12 h-12 mx-auto text-zinc-300 mb-4" />
                <h3 className="text-xl font-medium text-zinc-700 mb-2">Проекты не найдены</h3>
                <p className="text-zinc-500 mb-6">Попробуйте изменить параметры фильтрации</p>
                <Button onClick={resetFilters}>Сбросить фильтры</Button>
              </div>
          )}
          {!loading && !(filterError || houseError) && (
              <>
                {isCompareMode ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {compareHouses.map((house) => (
                          <Card
                              key={house.id}
                              className="relative overflow-hidden group hover:shadow-lg transition-all duration-300"
                          >
                            <div className="absolute top-4 right-4 z-10">
                              <Button
                                  variant="destructive"
                                  size="sm"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  onClick={() => toggleCompare(house)}
                              >
                                Убрать
                              </Button>
                            </div>
                            <div className="aspect-[4/3] relative overflow-hidden">
                              <img
                                  src={
                                    house.images && house.images.length > 0
                                        ? `${config.API_URL}${house.images[0].image}`
                                        : "/placeholder.svg?height=400&width=600"
                                  }
                                  alt={house.title}
                                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                              />
                              {house.new && <Badge className="absolute top-4 left-4 bg-primary text-white">Новинка</Badge>}
                              {calculateDiscount(house) && (
                                  <Badge className="absolute top-4 left-24 bg-red-500 text-white">
                                    -{calculateDiscount(house)}%
                                  </Badge>
                              )}
                            </div>
                            <CardContent className="p-6">
                              <CardTitle className="mb-4 text-xl font-heading">{house.title}</CardTitle>
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <div className="text-sm font-medium text-zinc-500">Общая площадь</div>
                                    <div className="text-base font-medium">{house.area} м²</div>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="text-sm font-medium text-zinc-500">Жилая площадь</div>
                                    <div className="text-base font-medium">{house.living_area} м²</div>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="text-sm font-medium text-zinc-500">Площадь кухни</div>
                                    <div className="text-base font-medium">{house.kitchen_area} м²</div>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="text-sm font-medium text-zinc-500">Комнат</div>
                                    <div className="text-base font-medium">{house.rooms}</div>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="text-sm font-medium text-zinc-500">Этажей</div>
                                    <div className="text-base font-medium">{house.floors}</div>
                                  </div>
                                </div>
                                <div className="pt-4 border-t border-zinc-100">
                                  <div className="text-sm font-medium text-zinc-500 mb-2">Цена</div>
                                  {house.discount && house.discount > 0 ? (
                                      <div className="space-y-1">
                              <span className="text-sm line-through text-zinc-400">
                                {new Intl.NumberFormat("ru-RU").format(Number.parseFloat(house.price))} ₽
                              </span>
                                        <div className="text-lg font-semibold text-primary">
                                          {new Intl.NumberFormat("ru-RU").format(house.new_price)} ₽
                                        </div>
                                      </div>
                                  ) : (
                                      <div className="text-lg font-semibold text-primary">
                                        {new Intl.NumberFormat("ru-RU").format(Number.parseFloat(house.price))} ₽
                                      </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                      ))}
                    </div>
                ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {houses.map((house) => (
                            <motion.div
                                key={house.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                              <Card
                                  className={cn(
                                      "cursor-pointer group hover:shadow-lg transition-all duration-300 relative overflow-hidden",
                                      compareHouses.find((h) => h.id === house.id) && "ring-2 ring-primary",
                                  )}
                                  onClick={() => navigate(`/projects/${house.id}`)}
                              >
                                <div className="absolute top-4 right-4 z-10">
                                  <Button
                                      variant={compareHouses.find((h) => h.id === house.id) ? "default" : "outline"}
                                      size="sm"
                                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        toggleCompare(house)
                                      }}
                                  >
                                    <Scale className="w-4 h-4 mr-1" />
                                    {compareHouses.find((h) => h.id === house.id) ? "В сравнении" : "Сравнить"}
                                  </Button>
                                </div>
                                <div className="aspect-[4/3] relative overflow-hidden">
                                  <img
                                      src={
                                        house.images && house.images.length > 0
                                            ? `${config.API_URL}${house.images[0].image}`
                                            : "/placeholder.svg?height=400&width=600"
                                      }
                                      alt={house.title}
                                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                  />
                                  {house.new && <Badge className="absolute top-4 left-4 bg-primary text-white">Новинка</Badge>}
                                  {house.best_seller && (
                                      <Badge className="absolute top-4 left-24 bg-red-500 text-white">Акция</Badge>
                                  )}
                                </div>
                                <CardContent className="p-6">
                                  <div className="mb-4">
                                    <CardTitle className="text-xl font-heading mb-2">{house.title}</CardTitle>
                                    <CardDescription className="text-zinc-600 line-clamp-2">
                                      {house.description}
                                    </CardDescription>
                                  </div>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="flex items-center gap-2 text-zinc-600">
                                        <Home className="w-4 h-4" />
                                        <span className="text-sm">{house.floors} этажа</span>
                                      </div>
                                      <div className="flex items-center gap-2 text-zinc-600">
                                        <Box className="w-4 h-4" />
                                        <span className="text-sm">{house.rooms} комнаты</span>
                                      </div>
                                      <div className="flex items-center gap-2 text-zinc-600">
                                        <Map className="w-4 h-4" />
                                        <span className="text-sm">{house.area} м²</span>
                                      </div>
                                    </div>
                                    <div className="pt-4 border-t border-zinc-100 flex justify-between items-center">
                                      <div>
                                        {house.discount && house.discount > 0 ? (
                                            <div className="space-y-1">
                                    <span className="text-sm line-through text-zinc-400">
                                      {new Intl.NumberFormat("ru-RU").format(Number.parseFloat(house.price))} ₽
                                    </span>
                                              <div className="text-lg font-semibold text-primary">
                                                {new Intl.NumberFormat("ru-RU").format(house.new_price)} ₽
                                              </div>
                                            </div>
                                        ) : (
                                            <div className="text-lg font-semibold text-primary">
                                              {new Intl.NumberFormat("ru-RU").format(Number.parseFloat(house.price))} ₽
                                            </div>
                                        )}
                                      </div>
                                      <Button
                                          variant="ghost"
                                          className="text-primary hover:text-primary/80 hover:bg-primary/10"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            navigate(`/projects/${house.id}`)
                                          }}
                                      >
                                        <span>Подробнее</span>
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                        ))}
                      </div>
                      {(houseData.count > 0 && Math.ceil(houseData.count / itemsPerPage) > 1) && (
                          <div className="mt-12">
                            <Pagination>
                              <PaginationContent>
                                <PaginationItem>
                                  <PaginationPrevious
                                      onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                      className={cn(page === 1 && "pointer-events-none opacity-50")}
                                  />
                                </PaginationItem>

                                <PaginationItem>
                                  <PaginationLink isActive>{page}</PaginationLink>
                                </PaginationItem>

                                <PaginationItem>
                                  <PaginationNext
                                      onClick={() => {
                                        const totalPages = Math.ceil(houseData.count / itemsPerPage)
                                        setPage(prev => Math.min(prev + 1, totalPages))
                                      }}
                                      className={cn(
                                          page >= Math.ceil(houseData.count / itemsPerPage) && "pointer-events-none opacity-50"
                                      )}
                                  />
                                </PaginationItem>
                              </PaginationContent>
                            </Pagination>
                          </div>
                      )}
                    </>
                )}
              </>
          )}
        </div>
      </div>
  )
}

export default Projects