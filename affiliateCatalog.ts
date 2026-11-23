export const AMAZON_TAG = 'pantrypivot09-20';
export const DISCLOSURE = 'As an Amazon Associate I earn from qualifying purchases.';

function tagged(path: string) {
  const url = new URL(path, 'https://www.amazon.com');
  url.searchParams.set('tag', AMAZON_TAG);
  return url.href;
}

export const catalog = {
  cookware: { name: "Cookware", kind: "Category", url: tagged("/b?node=289814"), eventLabel: "cookware" },
  instant_read_thermometers: { name: "Instant-read thermometers", kind: "Search", url: tagged("/s?k=ThermoPro+instant+read+meat+thermometer"), eventLabel: "instant_read_thermometers" },
  roasting_pans_with_racks: { name: "Roasting pans with racks", kind: "Search", url: tagged("/s?k=roasting+pan+with+rack"), eventLabel: "roasting_pans_with_racks" },
  sheet_pans: { name: "Sheet pans", kind: "Search", url: tagged("/s?k=rimmed+baking+sheet+pans"), eventLabel: "sheet_pans" },
  immersion_blenders: { name: "Immersion blenders", kind: "Search", url: tagged("/s?k=immersion+blender"), eventLabel: "immersion_blenders" },
  potato_mashers: { name: "Potato mashers", kind: "Search", url: tagged("/s?k=potato+masher"), eventLabel: "potato_mashers" },
  pie_dishes: { name: "Pie dishes", kind: "Search", url: tagged("/s?k=pie+baking+dish"), eventLabel: "pie_dishes" },
  food_storage_containers: { name: "Food-storage containers", kind: "Search", url: tagged("/s?k=glass+food+storage+containers+with+lids"), eventLabel: "food_storage_containers" },
  freezer_bags: { name: "Freezer bags", kind: "Search", url: tagged("/s?k=freezer+bags+gallon"), eventLabel: "freezer_bags" },
  nordic_ware_sheet_pan: { name: "Nordic Ware Naturals Half Sheet 2-Pack", kind: "Product", url: tagged("/dp/B0049C2S32"), eventLabel: "nordic_ware_sheet_pan" },
  oxo_measuring_cups_cr: { name: "OXO Good Grips Stainless Measuring Cups", kind: "Product", url: tagged("/dp/B00ZYB8D2M"), eventLabel: "oxo_measuring_cups_cr" },
  henckels_chefs_knife: { name: "Henckels Forged Accent 8-inch Chef’s Knife", kind: "Product", url: tagged("/dp/B0B1JPQWKP"), eventLabel: "henckels_chefs_knife" },
  victorinox_chefs_knife: { name: "Victorinox Fibrox Pro 8\" Chef's Knife", kind: "Product", url: tagged("/dp/B000638D32"), eventLabel: "victorinox_chefs_knife" },
  oxo_measuring_cups_atk: { name: "OXO Good Grips Measuring Cups & Spoons Set", kind: "Product", url: tagged("/dp/B01DI9KGWQ"), eventLabel: "oxo_measuring_cups_atk" },
  lodge_cast_iron_skillet: { name: "Lodge 12\" Cast Iron Skillet", kind: "Product", url: tagged("/dp/B00006JSUB"), eventLabel: "lodge_cast_iron_skillet" },
  cuisinart_dutch_oven: { name: "Cuisinart Chef's Classic Enameled Dutch Oven", kind: "Product", url: tagged("/dp/B0017HRG7K"), eventLabel: "cuisinart_dutch_oven" },
  lodge_dutch_oven: { name: "Lodge Essential Enamel 6 Qt Dutch Oven", kind: "Product", url: tagged("/dp/B000N4WN08"), eventLabel: "lodge_dutch_oven" },
  vollrath_mixing_bowls: { name: "Vollrath 5-quart Stainless Steel Mixing Bowl", kind: "Product", url: tagged("/dp/B003A3YZF0"), eventLabel: "vollrath_mixing_bowls" },
  cuisinart_mixing_bowls: { name: "Cuisinart Stainless Steel Mixing Bowls Set", kind: "Product", url: tagged("/dp/B004YZEO9K"), eventLabel: "cuisinart_mixing_bowls" },
  kitchenaid_stand_mixer: { name: "KitchenAid Artisan 5 Qt Stand Mixer", kind: "Product", url: tagged("/dp/B004GUVD6K"), eventLabel: "kitchenaid_stand_mixer" },
  breville_immersion_blender: { name: "Breville Control Grip Immersion Blender", kind: "Product", url: tagged("/dp/B004RF7QJW"), eventLabel: "breville_immersion_blender" },
  allclad_immersion_blender: { name: "All-Clad Corded 600W Immersion Blender", kind: "Product", url: tagged("/dp/B007R2E47Y"), eventLabel: "allclad_immersion_blender" },
  cuisinart_food_processor: { name: "Cuisinart Custom 14-Cup Food Processor", kind: "Product", url: tagged("/dp/B01AXM4WV2"), eventLabel: "cuisinart_food_processor" },
  breville_food_processor: { name: "Breville Sous Chef 16-Cup Food Processor", kind: "Product", url: tagged("/dp/B0CDM1FZBX"), eventLabel: "breville_food_processor" },
  ninja_air_fryer: { name: "Ninja Foodi 6-in-1 2-Basket Air Fryer", kind: "Product", url: tagged("/dp/B089TQWJKK"), eventLabel: "ninja_air_fryer" },
  instant_vortex_air_fryer: { name: "Instant Vortex Plus 6 Qt Air Fryer", kind: "Product", url: tagged("/dp/B096N3FTZP"), eventLabel: "instant_vortex_air_fryer" },
  instant_pot_multicooker: { name: "Instant Pot Pro 8 Qt Multicooker", kind: "Product", url: tagged("/dp/B08PPZWNCV"), eventLabel: "instant_pot_multicooker" },
  zojirushi_multicooker: { name: "Zojirushi Multicooker", kind: "Product", url: tagged("/dp/B07H9VJJQF"), eventLabel: "zojirushi_multicooker" },
  amazon_same_day_delivery: { name: "Amazon grocery delivery", kind: "Grocery/Pantry", url: tagged("/fmc/ssd-grocery?node=23596629011&speed=SSD"), eventLabel: "amazon_same_day_delivery" },
  amazon_staples: { name: "Amazon pantry staples", kind: "Grocery/Pantry", url: tagged("/b?node=18787303011"), eventLabel: "amazon_staples" },
} as const;
export type PickId = keyof typeof catalog;
export const KITCHEN_TOOLS_CATALOG = Object.values(catalog).filter(item => item.kind === 'Product');
