export interface CatalogProduct {
  name: string;
  category: 'equipment' | 'ingredient' | 'staple';
  reviewer: 'ATK' | 'CR' | null;
  asin?: string;
  shortlink?: string;
}

export const AFFILIATE_CATALOG: CatalogProduct[] = [
  { name: "Henckels Classic 8\" Chef's Knife",      category: 'equipment', reviewer: 'CR',  asin: 'B00004RFMT' },
  { name: "Victorinox Fibrox Pro 8\" Chef's Knife", category: 'equipment', reviewer: 'ATK', asin: 'B000638D32' },
  { name: 'Lodge 12-Inch Cast Iron Skillet',        category: 'equipment', reviewer: 'ATK', asin: 'B00006JSUB' },
  { name: 'Lodge 12-Inch Cast Iron Skillet',        category: 'equipment', reviewer: 'CR',  asin: 'B00006JSUB' },
  { name: "Cuisinart Chef's Classic Dutch Oven",    category: 'equipment', reviewer: 'ATK', asin: 'B0017HRG7K' },
  { name: 'Nordic Ware Natural Aluminum Sheet Pan', category: 'equipment', reviewer: 'ATK', asin: 'B0049C2S32' },
  { name: 'Nordic Ware Natural Aluminum Sheet Pan', category: 'equipment', reviewer: 'CR',  asin: 'B0049C2S32' },
  { name: 'Instant Pot Pro 8 Qt Multicooker',       category: 'equipment', reviewer: 'ATK', asin: 'B08PPZWNCV' },
  { name: 'Amazon Fresh',   category: 'staple', reviewer: null, shortlink: 'https://amzn.to/4dT72Tx' },
  { name: 'Amazon Staples', category: 'staple', reviewer: null, shortlink: 'https://amzn.to/4dT7jpx' },
];

export type ToolReviewer = 'ATK' | 'CR' | 'ATK+CR';

export interface KitchenTool {
  name: string;
  reviewer: ToolReviewer;
  url: string;
  eventLabel: string;
}

export const KITCHEN_TOOLS_CATALOG: KitchenTool[] = [
  { name: "Henckels Classic 8\" Chef's Knife",          reviewer: 'CR',     url: 'https://amzn.to/4ahFG76',                                          eventLabel: 'henckels_chefs_knife' },
  { name: "Victorinox Fibrox Pro 8\" Chef's Knife",     reviewer: 'ATK',    url: 'https://amzn.to/4fis4w0',                                          eventLabel: 'victorinox_chefs_knife' },
  { name: 'OXO Good Grips Stainless Measuring Cups',    reviewer: 'CR',     url: 'https://amzn.to/4fhTzpj',                                          eventLabel: 'oxo_measuring_cups_cr' },
  { name: 'OXO Good Grips Measuring Cups & Spoons Set', reviewer: 'ATK',    url: 'https://amzn.to/3QcizEf',                                          eventLabel: 'oxo_measuring_cups_atk' },
  { name: 'Lodge 12" Cast Iron Skillet',                reviewer: 'ATK+CR', url: 'https://amzn.to/3QciBfl',                                          eventLabel: 'lodge_cast_iron_skillet' },
  { name: "Cuisinart Chef's Classic Enameled Dutch Oven", reviewer: 'ATK',  url: 'https://amzn.to/43Avlj0',                                          eventLabel: 'cuisinart_dutch_oven' },
  { name: 'Lodge Essential Enamel 6 Qt Dutch Oven',     reviewer: 'CR',     url: 'https://amzn.to/3RUtwuH',                                          eventLabel: 'lodge_dutch_oven' },
  { name: 'Nordic Ware Natural Aluminum Half Sheet Pan', reviewer: 'ATK+CR', url: 'https://amzn.to/3RRmXsL',                                         eventLabel: 'nordic_ware_sheet_pan' },
  { name: 'Vollrath Stainless Steel Mixing Bowls',      reviewer: 'ATK',    url: 'https://amzn.to/4vkh3ir',                                          eventLabel: 'vollrath_mixing_bowls' },
  { name: 'Cuisinart Stainless Steel Mixing Bowls Set', reviewer: 'CR',     url: 'https://amzn.to/3RIKrk1',                                          eventLabel: 'cuisinart_mixing_bowls' },
  { name: 'KitchenAid Artisan 5 Qt Stand Mixer',        reviewer: 'ATK+CR', url: 'https://amzn.to/3ROtZ1C',                                          eventLabel: 'kitchenaid_stand_mixer' },
  { name: 'Breville Control Grip Immersion Blender',    reviewer: 'CR',     url: 'https://amzn.to/3PPg3nr',                                          eventLabel: 'breville_immersion_blender' },
  { name: 'All-Clad Corded 600W Immersion Blender',     reviewer: 'ATK',    url: 'https://amzn.to/4oeh4Ce',                                          eventLabel: 'allclad_immersion_blender' },
  { name: 'Cuisinart Custom 14-Cup Food Processor',     reviewer: 'ATK',    url: 'https://amzn.to/4xe6zTw',                                          eventLabel: 'cuisinart_food_processor' },
  { name: 'Breville Sous Chef 16-Cup Food Processor',   reviewer: 'CR',     url: 'https://amzn.to/4oijmAo',                                          eventLabel: 'breville_food_processor' },
  { name: 'Ninja Foodi 6-in-1 2-Basket Air Fryer',      reviewer: 'CR',     url: 'https://amzn.to/4gazgdI',                                          eventLabel: 'ninja_air_fryer' },
  { name: 'Instant Vortex Plus 6 Qt Air Fryer',         reviewer: 'ATK',    url: 'https://amzn.to/4e57Qn4',                                          eventLabel: 'instant_vortex_air_fryer' },
  { name: 'Instant Pot Pro 8 Qt Multicooker',           reviewer: 'ATK',    url: 'https://amzn.to/4e9HKze',                                          eventLabel: 'instant_pot_multicooker' },
  { name: 'Zojirushi Multicooker',                      reviewer: 'CR',     url: 'https://amzn.to/4x8ha29',                                          eventLabel: 'zojirushi_multicooker' },
];
