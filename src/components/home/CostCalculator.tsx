import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { HelpCircle, Home, Layers, Car, Bath, Bed, DoorOpen, Clock, Shield } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import {Link} from "react-router-dom";


const houseCategories = [
  { id: "brick", name: "Кирпичные дома", basePrice: 30000},
  { id: "carcas", name: "Каркасные дома", basePrice: 25000},
]

const constructionTechnologies = [
  { id: "brick", name: "Кирпичные дома", priceMultiplier: 1.2 },
  { id: "carcas", name: "Каркасные дома", priceMultiplier: 0.8 },
]


const finishingOptions = [
  { id: "standard", name: "Стандартная отделка", priceMultiplier: 2 },
  { id: "premium", name: "Премиум отделка", priceMultiplier: 4 },
]

const HouseCalculator = () => {
  const [category, setCategory] = useState(houseCategories[0])
  const [purpose, setPurpose] = useState("Частный дом")
  const [constructionTechnology, setConstructionTechnology] = useState(constructionTechnologies[0])
  const [finishingOption, setFinishingOption] = useState(finishingOptions[0])

  const [totalArea, setTotalArea] = useState(100)
  const [livingArea, setLivingArea] = useState(70)
  const [kitchenArea, setKitchenArea] = useState(15)
  const [floors, setFloors] = useState(1)
  const [rooms, setRooms] = useState(3)
  const [bedrooms, setBedrooms] = useState(2)
  const [bathrooms, setBathrooms] = useState(1)

  const [garage, setGarage] = useState(0)
  const [warranty, setWarranty] = useState(5)
  const [constructionTime, setConstructionTime] = useState(120)
  const [hasDiscount, setHasDiscount] = useState(false)
  const [discountPercentage, setDiscountPercentage] = useState(5)


  useEffect(() => {
    if (livingArea + kitchenArea > totalArea * 0.95) {
      setLivingArea(Math.floor(totalArea * 0.7))
      setKitchenArea(Math.floor(totalArea * 0.2))
    }
  }, [totalArea, livingArea, kitchenArea])

  const calculateCost = () => {

    const basePrice = category.basePrice * constructionTechnology.priceMultiplier

    const areaCost = basePrice * totalArea

    const floorMultiplier = floors === 1 ? 1 : floors === 2 ? 1.7 : 2.2

    const finishMultiplier = finishingOption.priceMultiplier

    let totalCost = areaCost * floorMultiplier * finishMultiplier

    totalCost += rooms * 50000 + bathrooms * 150000

    if (garage > 0) {
      totalCost += garage * 500000
    }


    if (purpose === "Коммерческая недвижимость") {
      totalCost *= 1.3
    }

    if (hasDiscount) {
      totalCost = totalCost * (1 - discountPercentage / 100)
    }

    return Math.round(totalCost)
  }

  const calculateConstructionTime = () => {
    let time = constructionTime

    if (totalArea > 150) time += 30
    if (totalArea > 250) time += 30

    if (floors > 1) time += (floors - 1) * 45

    if (finishingOption.id !== "shell") {
      const finishTimeMultiplier = {
        basic: 30,
        standard: 60,
        premium: 90,
      }
      time += finishTimeMultiplier[finishingOption.id as keyof typeof finishTimeMultiplier] || 0
    }

    return time
  }

  return (
      <section className="py-12 bg-gradient-to-b from-muted/50 to-background">
        <div className="container max-w-5xl">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
          >
            <h2 className="font-heading text-4xl md:text-5xl mb-4">Калькулятор стоимости дома</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Создайте детальную смету для вашего будущего дома с учетом всех параметров и опций
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <span>Параметры дома</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Accordion type="single" collapsible defaultValue="category" className="w-full">
                    <AccordionItem value="category">
                      <AccordionTrigger>Основные параметры</AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-4">
                        <div>
                          <Label className="mb-2 inline-block">Категория дома</Label>
                          <Tabs
                              defaultValue={category.id}
                              onValueChange={(value) =>
                                  setCategory(houseCategories.find((t) => t.id === value) || houseCategories[0])
                              }
                          >
                            <TabsList className="grid w-full grid-cols-3 mb-2">
                              {houseCategories.map((type) => (
                                  <TabsTrigger key={type.id} value={type.id} className="text-center">
                                    {type.name}
                                  </TabsTrigger>
                              ))}
                            </TabsList>
                            {houseCategories.map((type) => (
                                <TabsContent key={type.id} value={type.id} className="mt-2 text-sm text-muted-foreground">
                                  Базовая стоимость: {type.basePrice.toLocaleString()} ₽/м²
                                </TabsContent>
                            ))}
                          </Tabs>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="purpose" className="mb-2 inline-block">
                              Назначение
                            </Label>
                            <Select value={purpose} onValueChange={setPurpose}>
                              <SelectTrigger id="purpose">
                                <SelectValue placeholder="Выберите назначение" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Частный дом">Частный дом</SelectItem>
                                <SelectItem value="Коммерческая недвижимость">Коммерческая недвижимость</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="technology" className="mb-2 inline-block">
                              Технология строительства
                            </Label>
                            <Select
                                value={constructionTechnology.id}
                                onValueChange={(value) =>
                                    setConstructionTechnology(
                                        constructionTechnologies.find((t) => t.id === value) || constructionTechnologies[0],
                                    )
                                }
                            >
                              <SelectTrigger id="technology">
                                <SelectValue placeholder="Выберите технологию" />
                              </SelectTrigger>
                              <SelectContent>
                                {constructionTechnologies.map((tech) => (
                                    <SelectItem key={tech.id} value={tech.id}>
                                      {tech.name}
                                    </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="finishing" className="mb-2 inline-block">
                            Вариант отделки
                          </Label>
                          <Select
                              value={finishingOption.id}
                              onValueChange={(value) =>
                                  setFinishingOption(finishingOptions.find((f) => f.id === value) || finishingOptions[0])
                              }
                          >
                            <SelectTrigger id="finishing">
                              <SelectValue placeholder="Выберите вариант отделки" />
                            </SelectTrigger>
                            <SelectContent>
                              {finishingOptions.map((finish) => (
                                  <SelectItem key={finish.id} value={finish.id}>
                                    {finish.name}
                                  </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="dimensions">
                      <AccordionTrigger>Размеры и планировка</AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-4">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Label htmlFor="total-area">Общая площадь</Label>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Общая площадь дома, включая все помещения</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <div className="flex items-center">
                              <Input
                                  id="total-area"
                                  type="number"
                                  min="50"
                                  max="500"
                                  value={totalArea}
                                  onChange={(e) => setTotalArea(Number(e.target.value))}
                                  className="w-20 mr-2"
                              />
                              <span className="text-sm text-muted-foreground">м²</span>
                            </div>
                          </div>
                          <Slider
                              min={50}
                              max={500}
                              step={10}
                              value={[totalArea]}
                              onValueChange={(value) => setTotalArea(value[0])}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label htmlFor="living-area">Жилая площадь</Label>
                              <div className="flex items-center">
                                <Input
                                    id="living-area"
                                    type="number"
                                    min="30"
                                    max={totalArea * 0.8}
                                    value={livingArea}
                                    onChange={(e) => setLivingArea(Number(e.target.value))}
                                    className="w-20 mr-2"
                                />
                                <span className="text-sm text-muted-foreground">м²</span>
                              </div>
                            </div>
                            <Slider
                                min={30}
                                max={totalArea * 0.8}
                                step={5}
                                value={[livingArea]}
                                onValueChange={(value) => setLivingArea(value[0])}
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label htmlFor="kitchen-area">Площадь кухни</Label>
                              <div className="flex items-center">
                                <Input
                                    id="kitchen-area"
                                    type="number"
                                    min="6"
                                    max={totalArea * 0.3}
                                    value={kitchenArea}
                                    onChange={(e) => setKitchenArea(Number(e.target.value))}
                                    className="w-20 mr-2"
                                />
                                <span className="text-sm text-muted-foreground">м²</span>
                              </div>
                            </div>
                            <Slider
                                min={6}
                                max={totalArea * 0.3}
                                step={1}
                                value={[kitchenArea]}
                                onValueChange={(value) => setKitchenArea(value[0])}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="mb-2 inline-block">Количество этажей</Label>
                            <div className="grid grid-cols-3 gap-2">
                              <Button
                                  variant={floors === 1 ? "default" : "outline"}
                                  onClick={() => setFloors(1)}
                                  className="w-full"
                              >
                                <Home className="mr-2 h-4 w-4" /> 1
                              </Button>
                              <Button
                                  variant={floors === 2 ? "default" : "outline"}
                                  onClick={() => setFloors(2)}
                                  className="w-full"
                              >
                                <Layers className="mr-2 h-4 w-4" /> 2
                              </Button>
                              <Button
                                  variant={floors === 3 ? "default" : "outline"}
                                  onClick={() => setFloors(3)}
                                  className="w-full"
                              >
                                <Layers className="mr-2 h-4 w-4" /> 3
                              </Button>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="garage" className="mb-2 inline-block">
                              Гараж (кол-во машин)
                            </Label>
                            <div className="grid grid-cols-4 gap-2">
                              <Button
                                  variant={garage === 0 ? "default" : "outline"}
                                  onClick={() => setGarage(0)}
                                  className="w-full"
                              >
                                Нет
                              </Button>
                              <Button
                                  variant={garage === 1 ? "default" : "outline"}
                                  onClick={() => setGarage(1)}
                                  className="w-full"
                              >
                                <Car className="mr-1 h-4 w-4" /> 1
                              </Button>
                              <Button
                                  variant={garage === 2 ? "default" : "outline"}
                                  onClick={() => setGarage(2)}
                                  className="w-full"
                              >
                                <Car className="mr-1 h-4 w-4" /> 2
                              </Button>
                              <Button
                                  variant={garage === 3 ? "default" : "outline"}
                                  onClick={() => setGarage(3)}
                                  className="w-full"
                              >
                                <Car className="mr-1 h-4 w-4" /> 3
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="rooms" className="mb-2 inline-block">
                              Комнаты
                            </Label>
                            <div className="flex items-center">
                              <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setRooms(Math.max(1, rooms - 1))}
                                  disabled={rooms <= 1}
                              >
                                -
                              </Button>
                              <div className="flex items-center justify-center w-12">
                                <DoorOpen className="h-4 w-4 mr-1" />
                                {rooms}
                              </div>
                              <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setRooms(Math.min(10, rooms + 1))}
                                  disabled={rooms >= 10}
                              >
                                +
                              </Button>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="bedrooms" className="mb-2 inline-block">
                              Спальни
                            </Label>
                            <div className="flex items-center">
                              <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                                  disabled={bedrooms <= 1}
                              >
                                -
                              </Button>
                              <div className="flex items-center justify-center w-12">
                                <Bed className="h-4 w-4 mr-1" />
                                {bedrooms}
                              </div>
                              <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setBedrooms(Math.min(8, bedrooms + 1))}
                                  disabled={bedrooms >= 8}
                              >
                                +
                              </Button>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="bathrooms" className="mb-2 inline-block">
                              Санузлы
                            </Label>
                            <div className="flex items-center">
                              <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                                  disabled={bathrooms <= 1}
                              >
                                -
                              </Button>
                              <div className="flex items-center justify-center w-12">
                                <Bath className="h-4 w-4 mr-1" />
                                {bathrooms}
                              </div>
                              <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setBathrooms(Math.min(5, bathrooms + 1))}
                                  disabled={bathrooms >= 5}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="additional">
                      <AccordionTrigger>Дополнительные опции</AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label htmlFor="warranty" className="flex items-center">
                                <Shield className="h-4 w-4 mr-2" />
                                Гарантия
                              </Label>
                              <div className="flex items-center">
                                <Input
                                    id="warranty"
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={warranty}
                                    onChange={(e) => setWarranty(Number(e.target.value))}
                                    className="w-20 mr-2"
                                />
                                <span className="text-sm text-muted-foreground">лет</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label htmlFor="construction-time" className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                Срок строительства
                              </Label>
                              <div className="flex items-center">
                                <span className="text-sm text-muted-foreground mr-2">{calculateConstructionTime()}</span>
                                <span className="text-sm text-muted-foreground">дней</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label className="mb-2 inline-block">Дополнительные функции</Label>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Switch id="has-discount" checked={hasDiscount} onCheckedChange={setHasDiscount}/>
                              <Label htmlFor="has-discount">Применить скидку</Label>
                            </div>

                            {hasDiscount && (
                                <div className="flex items-center">
                                  <Input
                                      id="discount"
                                      type="number"
                                      min="1"
                                      max="30"
                                      value={discountPercentage}
                                      onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                                      className="w-20 mr-2"
                                  />
                                  <span className="text-sm text-muted-foreground">%</span>
                                </div>
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-xl">Итоговая стоимость</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary">{calculateCost().toLocaleString()} ₽</p>
                    {hasDiscount && (
                        <p className="text-sm text-muted-foreground mt-1">Включая скидку {discountPercentage}%</p>
                    )}
                  </div>

                  <Separator/>

                  <div className="space-y-3">
                    <h3 className="font-medium">Основные характеристики:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Категория:</span>
                        <span className="font-medium">{category.name}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Технология:</span>
                        <span className="font-medium">{constructionTechnology.name}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Отделка:</span>
                        <span className="font-medium">{finishingOption.name}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Общая площадь:</span>
                        <span className="font-medium">{totalArea} м²</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Жилая площадь:</span>
                        <span className="font-medium">{livingArea} м²</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Этажей:</span>
                        <span className="font-medium">{floors}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Комнат / Спален:</span>
                        <span className="font-medium">
                        {rooms} / {bedrooms}
                      </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Санузлов:</span>
                        <span className="font-medium">{bathrooms}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Гараж:</span>
                        <span className="font-medium">{garage > 0 ? `На ${garage} машин` : "Нет"}</span>
                      </li>
                    </ul>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="font-medium">Сроки и гарантии:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Срок строительства:</span>
                        <span className="font-medium">{calculateConstructionTime()} дней</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Гарантия:</span>
                        <span className="font-medium">{warranty} лет</span>
                      </li>
                    </ul>
                  </div>

                  <Button className="w-full">
                    <Link to="/projects">
                      Оформить заказ
                    </Link>=
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
  )
}

export default HouseCalculator
