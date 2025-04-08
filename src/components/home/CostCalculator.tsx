import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HelpCircle, Home, Layers } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const houseTypes = [
  { id: "economy", name: "Эконом", basePrice: 30000, icon: "🏠" },
  { id: "standard", name: "Стандарт", basePrice: 45000, icon: "🏡" },
  { id: "premium", name: "Премиум", basePrice: 60000, icon: "🏘️" },
]

const CostCalculator = () => {
  const [area, setArea] = useState<number>(100)
  const [selectedType, setSelectedType] = useState(houseTypes[0])
  const [floors, setFloors] = useState<number>(1)
  const [extras, setExtras] = useState({
    garage: false,
    pool: false,
    smartHome: false,
  })

  const calculateCost = () => {
    const basePrice = selectedType.basePrice
    const floorMultiplier = floors === 1 ? 1 : 1.7
    let totalCost = basePrice * area * floorMultiplier

    if (extras.garage) totalCost += 500000
    if (extras.pool) totalCost += 1000000
    if (extras.smartHome) totalCost += 300000

    return Math.round(totalCost)
  }

  return (
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container max-w-4xl">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl md:text-5xl mb-4">Рассчитать стоимость дома</h2>
            <p className="text-lg text-muted-foreground">Создайте предварительную смету для вашего будущего дома</p>
          </motion.div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Параметры дома</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <Label className="mb-2 inline-block">Тип дома</Label>
                <Tabs
                    defaultValue={selectedType.id}
                    onValueChange={(value) => setSelectedType(houseTypes.find((t) => t.id === value) || houseTypes[0])}
                >
                  <TabsList className="grid w-full grid-cols-3 mb-2">
                    {houseTypes.map((type) => (
                        <TabsTrigger key={type.id} value={type.id} className="text-center">
                          <span className="mr-2">{type.icon}</span>
                          {type.name}
                        </TabsTrigger>
                    ))}
                  </TabsList>
                  {houseTypes.map((type) => (
                      <TabsContent key={type.id} value={type.id} className="mt-2 text-sm text-muted-foreground">
                        Базовая стоимость: {type.basePrice.toLocaleString()} ₽/м²
                      </TabsContent>
                  ))}
                </Tabs>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="area-input">Площадь дома</Label>
                  <div className="flex items-center">
                    <Input
                        id="area-input"
                        type="number"
                        min="50"
                        max="500"
                        value={area}
                        onChange={(e) => setArea(Number(e.target.value))}
                        className="w-20 mr-2"
                    />
                    <span className="text-sm text-muted-foreground">м²</span>
                  </div>
                </div>
                <Slider min={50} max={500} step={10} value={[area]} onValueChange={(value) => setArea(value[0])} />
              </div>

              <div>
                <Label className="mb-2 inline-block">Количество этажей</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant={floors === 1 ? "default" : "outline"} onClick={() => setFloors(1)} className="w-full">
                    <Home className="mr-2 h-4 w-4" /> 1 этаж
                  </Button>
                  <Button variant={floors === 2 ? "default" : "outline"} onClick={() => setFloors(2)} className="w-full">
                    <Layers className="mr-2 h-4 w-4" /> 2 этажа
                  </Button>
                </div>
              </div>

              <div>
                <Label className="mb-2 inline-block">Дополнительные опции</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                      variant={extras.garage ? "default" : "outline"}
                      onClick={() => setExtras({ ...extras, garage: !extras.garage })}
                      className="w-full"
                  >
                    {extras.garage ? "✓ " : ""}Гараж
                  </Button>
                  <Button
                      variant={extras.pool ? "default" : "outline"}
                      onClick={() => setExtras({ ...extras, pool: !extras.pool })}
                      className="w-full"
                  >
                    {extras.pool ? "✓ " : ""}Бассейн
                  </Button>
                  <Button
                      variant={extras.smartHome ? "default" : "outline"}
                      onClick={() => setExtras({ ...extras, smartHome: !extras.smartHome })}
                      className="w-full"
                  >
                    {extras.smartHome ? "✓ " : ""}Умный дом
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-2">Предварительная стоимость</p>
                <p className="text-5xl font-bold text-primary">{calculateCost().toLocaleString()} ₽</p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <HelpCircle className="h-4 w-4" />
                      Подробнее о расчете
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>
                      Стоимость рассчитывается на основе базовой цены за квадратный метр, площади дома, количества этажей
                      и выбранных дополнительных опций. Точная стоимость определяется после составления детального
                      проекта.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        </div>
      </section>
  )
}

export default CostCalculator

