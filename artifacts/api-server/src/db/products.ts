export interface Product {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  brand: string;
  category: string;
  categoryId: string;
  description: string;
  weight: string;
  unit: string;
  mrp: number;
  price: number;
  discount: number;
  stock: number;
  images: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  tags: string[];
  isFeatured: boolean;
  isFlashSale: boolean;
  isLocal: boolean;
  isOrganic: boolean;
}

const img = {
  veg: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop&auto=format",
  tomato: "https://images.unsplash.com/photo-1546094096-0df4bcaad337?w=400&h=400&fit=crop&auto=format",
  potato: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop&auto=format",
  onion: "https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=400&fit=crop&auto=format",
  cauliflower: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop&auto=format",
  spinach: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop&auto=format",
  pumpkin: "https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=400&h=400&fit=crop&auto=format",
  okra: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop&auto=format",
  cabbage: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop&auto=format",
  brinjal: "https://images.unsplash.com/photo-1598349059065-07bbc9eb7f55?w=400&h=400&fit=crop&auto=format",
  fruit: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop&auto=format",
  apple: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop&auto=format",
  banana: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop&auto=format",
  mango: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop&auto=format",
  orange: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop&auto=format",
  papaya: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400&h=400&fit=crop&auto=format",
  guava: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=400&h=400&fit=crop&auto=format",
  watermelon: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400&h=400&fit=crop&auto=format",
  milk: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop&auto=format",
  butter: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop&auto=format",
  paneer: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=400&fit=crop&auto=format",
  curd: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop&auto=format",
  egg: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop&auto=format",
  fish: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&h=400&fit=crop&auto=format",
  hilsa: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop&auto=format",
  chicken: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=400&fit=crop&auto=format",
  mutton: "https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=400&h=400&fit=crop&auto=format",
  rice: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=400&fit=crop&auto=format",
  dal: "https://images.unsplash.com/photo-1613844237701-8f3664fc2eff?w=400&h=400&fit=crop&auto=format",
  oil: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&auto=format",
  mustardoil: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&auto=format",
  spice: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&auto=format",
  turmeric: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=400&fit=crop&auto=format",
  biscuit: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop&auto=format",
  drink: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&h=400&fit=crop&auto=format",
  cola: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=400&fit=crop&auto=format",
  juice: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop&auto=format",
  snack: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop&auto=format",
  chips: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop&auto=format",
  babycare: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop&auto=format",
  petfood: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=400&fit=crop&auto=format",
  frozen: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&h=400&fit=crop&auto=format",
  soap: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&auto=format",
  shampoo: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=400&fit=crop&auto=format",
  cleaning: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&auto=format",
  medicine: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&auto=format",
  bread: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop&auto=format",
  atta: "https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=400&h=400&fit=crop&auto=format",
  sweet: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop&auto=format",
  rasgulla: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop&auto=format",
  tea: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop&auto=format",
  coffee: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop&auto=format",
  salt: "https://images.unsplash.com/photo-1558817904-af53dfda0f41?w=400&h=400&fit=crop&auto=format",
  sugar: "https://images.unsplash.com/photo-1581441363689-1f3c3532dedd?w=400&h=400&fit=crop&auto=format",
  stationery: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=400&fit=crop&auto=format",
};

function p(
  id: string, name: string, nameBn: string, brand: string, category: string, catId: string,
  desc: string, weight: string, unit: string, mrp: number, price: number,
  stock: number, images: string[], rating: number, reviews: number,
  delivery: string, tags: string[], featured = false, flashSale = false, isLocal = false, isOrganic = false
): Product {
  const discount = Math.round(((mrp - price) / mrp) * 100);
  return {
    id, name, nameBn, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + id,
    brand, category, categoryId: catId, description: desc, weight, unit,
    mrp, price, discount, stock, images, rating, reviewCount: reviews,
    deliveryTime: delivery, tags, isFeatured: featured, isFlashSale: flashSale,
    isLocal, isOrganic,
  };
}

export const products: Product[] = [
  // VEGETABLES (cat-1)
  p("v001","Fresh Tomato","তাজা টমেটো","Fresh Farm","Vegetables","cat-1","Sun-ripened, juicy tomatoes from local Midnapore farms. Perfect for curries, salads and chutneys.","500g","kg",45,38,280,[img.tomato, img.veg],4.3,312,"20 min",["tomato","vegetable","sabji"],true,false,true,true),
  p("v002","Red Potato","দেশি আলু","Fresh Farm","Vegetables","cat-1","Farm-fresh potatoes with thin skin. Excellent for all Bengali dishes including aloo dum and tarkari.","1kg","kg",35,28,400,[img.potato, img.veg],4.5,524,"20 min",["potato","aloo","vegetable"],true,true,true),
  p("v003","Onion","পেঁয়াজ","Local Farm","Vegetables","cat-1","Crisp, pungent onions essential in every Bengali kitchen. Medium-sized with a sharp flavour.","500g","kg",40,32,350,[img.onion, img.veg],4.2,228,"20 min",["onion","piyaj","vegetable"],false,false,true),
  p("v004","Cauliflower","ফুলকপি","Fresh Farm","Vegetables","cat-1","White, firm cauliflower heads with tight florets. Great for aloo gobi and pakora.","1 piece","piece",55,42,120,[img.cauliflower, img.veg],4.4,186,"20 min",["cauliflower","phoolkopi","vegetable"],false,false,true),
  p("v005","Palak Spinach","পালং শাক","Fresh Farm","Vegetables","cat-1","Tender, fresh spinach leaves. Rich in iron and vitamins. Harvested daily from local farms.","250g","bundle",30,22,200,[img.spinach, img.veg],4.6,145,"20 min",["spinach","palak","greens"],true,false,true,true),
  p("v006","Pumpkin","কুমড়ো","Local Farm","Vegetables","cat-1","Sweet orange pumpkin. Ideal for Bengali mishti kumro and dal.","500g","kg",28,20,180,[img.pumpkin, img.veg],4.2,98,"20 min",["pumpkin","kumro","vegetable"],false,false,true),
  p("v007","Okra/Bhindi","ভেন্ডি","Fresh Farm","Vegetables","cat-1","Tender young okra pods. Crispy when fried. Popular in Bengali cooking.","500g","kg",48,38,150,[img.okra, img.veg],4.1,112,"20 min",["okra","bhindi","vendi","vegetable"],false,false,true),
  p("v008","Cabbage","বাঁধাকপি","Local Farm","Vegetables","cat-1","Crisp green cabbage. Rich in Vitamin C. Great for stir-fry and salads.","1 piece","piece",38,28,160,[img.cabbage, img.veg],4.0,89,"20 min",["cabbage","bandha kopi","vegetable"],false,false,true),
  p("v009","Brinjal/Eggplant","বেগুন","Local Farm","Vegetables","cat-1","Deep purple, glossy brinjal. Essential in Bengali baingan bhaja and begun bhorta.","500g","kg",40,30,200,[img.brinjal, img.veg],4.3,167,"20 min",["brinjal","begun","eggplant"],false,false,true),
  p("v010","Bitter Gourd","করলা","Local Farm","Vegetables","cat-1","Fresh bitter gourd with health benefits. Traditional Bengali remedy and delicacy.","500g","kg",60,48,120,[img.okra, img.veg],4.0,76,"20 min",["bitter gourd","karela","korola"],false,false,true),
  p("v011","Green Chilli","কাঁচা মরিচ","Fresh Farm","Vegetables","cat-1","Fiery fresh green chillies. Adds the quintessential Bengali heat to every dish.","100g","bundle",25,18,300,[img.spice, img.veg],4.5,213,"20 min",["chilli","kacha morich","vegetable"],true,false,true),
  p("v012","Drumstick/Sajina","সজনে","Local Farm","Vegetables","cat-1","Long, fibrous drumsticks with a unique flavour. Great in dal and curries.","250g","bundle",40,30,100,[img.veg, img.veg],4.2,54,"25 min",["drumstick","sajina","vegetable"],false,false,true),
  p("v013","Coriander Leaves","ধনে পাতা","Fresh Farm","Vegetables","cat-1","Fresh coriander leaves with intense aroma. Used as garnish in all Bengali dishes.","50g","bundle",20,14,400,[img.spinach, img.veg],4.7,189,"20 min",["coriander","dhaniya","herbs"],false,false,true),
  p("v014","Ginger","আদা","Local Farm","Vegetables","cat-1","Fresh, aromatic ginger root. Essential in Bengali cooking for its sharp, warming flavour.","100g","gm",35,25,250,[img.turmeric, img.veg],4.4,142,"20 min",["ginger","ada","spice"],false,false,true),
  p("v015","Garlic","রসুন","Local Farm","Vegetables","cat-1","Fat, pungent garlic bulbs from Midnapore farms. Used daily in Bengali kitchens.","100g","gm",45,35,300,[img.onion, img.veg],4.3,97,"20 min",["garlic","rasun","vegetable"],false,false,true),
  p("v016","Green Beans","বরবটি","Fresh Farm","Vegetables","cat-1","Crisp green beans for stir-fries and curries. Fresh harvest from local farms.","500g","kg",55,42,140,[img.veg, img.veg],4.1,63,"25 min",["beans","barbati","vegetable"],false,false,true),
  p("v017","Ridge Gourd","ঝিঙে","Local Farm","Vegetables","cat-1","Tender ridge gourd. Light, easily digestible and beloved in Bengali cuisine.","500g","kg",35,26,130,[img.okra, img.veg],4.0,51,"25 min",["ridge gourd","jhinge","vegetable"],false,false,true),
  p("v018","Sweet Potato","মিষ্টি আলু","Fresh Farm","Vegetables","cat-1","Naturally sweet, orange-fleshed sweet potato. Nutritious and delicious.","500g","kg",50,38,120,[img.potato, img.veg],4.2,78,"25 min",["sweet potato","misty alu","vegetable"],false,false,true),
  p("v019","Radish","মূলো","Local Farm","Vegetables","cat-1","Crisp white radish with a peppery bite. Great in winter dishes and chutneys.","500g","kg",30,22,160,[img.veg, img.veg],4.0,44,"25 min",["radish","moolo","vegetable"],false,false,true),
  p("v020","Curry Leaves","কারি পাতা","Fresh Farm","Vegetables","cat-1","Fragrant fresh curry leaves. A key aromatic in south Indian and Bengali cooking.","25g","bundle",20,15,200,[img.spinach, img.veg],4.4,67,"20 min",["curry leaves","kari pata","herbs"],false,false,true),

  // FRUITS (cat-2)
  p("f001","Kashmiri Apple","কাশ্মীরি আপেল","Himachal Farm","Fruits","cat-2","Premium red Kashmiri apples with sweet-tart flavour and crispy texture.","1kg","kg",180,149,60,[img.apple, img.fruit],4.6,428,"30 min",["apple","fruit","kashmiri"],true,false,false),
  p("f002","Robusta Banana","রোবাস্টা কলা","Local Farm","Fruits","cat-2","Sweet, ripe bananas from local Midnapore gardens. Rich in potassium and natural sugars.","12 pieces","dozen",60,48,250,[img.banana, img.fruit],4.5,312,"20 min",["banana","kela","fruit"],true,true,true),
  p("f003","Alphonso Mango","আলফানসো আম","Ratnagiri Farm","Fruits","cat-2","The king of mangoes. Premium Alphonso mangoes with intense aroma and rich, fiberless pulp.","1kg","kg",380,299,80,[img.mango, img.fruit],4.8,534,"30 min",["mango","aam","alphonso","fruit"],true,true,false),
  p("f004","Nagpur Orange","নাগপুরী কমলা","Nagpur Farm","Fruits","cat-2","Juicy, seedless Nagpur oranges bursting with Vitamin C. Tangy-sweet flavour.","1kg","kg",120,89,80,[img.orange, img.fruit],4.4,267,"30 min",["orange","kamla","citrus","fruit"],true,false,false),
  p("f005","Ripe Papaya","পেঁপে","Local Farm","Fruits","cat-2","Fresh, ripe yellow papaya. Sweet, soft and great for digestion.","1kg","kg",60,45,180,[img.papaya, img.fruit],4.2,134,"25 min",["papaya","pape","fruit"],false,false,true),
  p("f006","Allahabad Guava","আলাহাবাদ পেয়ারা","UP Farm","Fruits","cat-2","Large, white-fleshed guavas with a distinct sweet taste. Rich in Vitamin C.","500g","kg",80,62,120,[img.guava, img.fruit],4.3,98,"30 min",["guava","peyara","fruit"],false,false,false),
  p("f007","Watermelon","তরমুজ","Local Farm","Fruits","cat-2","Sweet, juicy watermelon from Midnapore fields. Perfect summer refreshment.","1 piece","piece",120,89,80,[img.watermelon, img.fruit],4.5,213,"30 min",["watermelon","tarmuj","fruit"],false,true,true),
  p("f008","Pomegranate","ডালিম","Rajasthan Farm","Fruits","cat-2","Rich ruby pomegranate with sweet-tart arils. Packed with antioxidants.","1 piece","piece",120,99,80,[img.fruit, img.fruit],4.4,156,"30 min",["pomegranate","dalim","fruit"],false,false,false),
  p("f009","Green Grapes","আঙুর","Nashik Farm","Fruits","cat-2","Crisp, seedless green grapes from Nashik. Perfect for snacking and desserts.","500g","kg",160,129,80,[img.fruit, img.fruit],4.3,189,"30 min",["grapes","angur","fruit"],false,false,false),
  p("f010","Chikoo/Sapodilla","চিকু","Gujarat Farm","Fruits","cat-2","Sweet, caramel-flavoured chikoo. Rich in iron and Vitamin C.","500g","kg",80,65,120,[img.fruit, img.fruit],4.2,87,"30 min",["chikoo","sapota","fruit"],false,false,false),
  p("f011","Lychee","লিচু","Muzaffarpur Farm","Fruits","cat-2","Fresh, fragrant lychee. Sweet floral flavour, seasonal delight from Bengal.","500g","kg",150,119,100,[img.fruit, img.fruit],4.7,245,"30 min",["lychee","litchi","fruit"],true,false,false),
  p("f012","Coconut","নারিকেল","Kerala Farm","Fruits","cat-2","Fresh whole coconut for cooking, worship and refreshment. Rich in natural water.","1 piece","piece",55,42,150,[img.fruit, img.fruit],4.4,134,"30 min",["coconut","narikel","fruit"],false,false,false),

  // DAIRY & MILK (cat-3)
  p("d001","Amul Gold Full Cream Milk","অমুল গোল্ড মিল্ক","Amul","Dairy & Milk","cat-3","Rich, pasteurised full cream milk with 6% fat. Perfect for tea, coffee and direct consumption.","500ml","ml",34,30,400,[img.milk, img.milk],4.7,867,"20 min",["milk","amul","dairy","doodh"],true,false,false),
  p("d002","Amul Gold Full Cream Milk 1L","অমুল গোল্ড ১ লিটার","Amul","Dairy & Milk","cat-3","Amul Gold full cream toned milk, 1L pack. Rich taste, daily freshness guaranteed.","1L","L",68,60,350,[img.milk, img.milk],4.8,1024,"20 min",["milk","amul","dairy","full cream"],true,false,false),
  p("d003","Mother Dairy Full Cream Milk","মাদার ডেইরি মিল্ক","Mother Dairy","Dairy & Milk","cat-3","Mother Dairy toned milk. Fresh and hygienically processed. Ideal for everyday use.","500ml","ml",32,28,300,[img.milk, img.milk],4.5,534,"20 min",["milk","mother dairy","dairy"],true,false,false),
  p("d004","Amul Butter Salted","অমুল বাটার","Amul","Dairy & Milk","cat-3","Amul salted butter. Creamy, rich taste. Made from fresh pasteurised cream.","100g","gm",56,52,200,[img.butter, img.butter],4.6,423,"25 min",["butter","amul","dairy"],true,false,false),
  p("d005","Amul Fresh Paneer","অমুল পনির","Amul","Dairy & Milk","cat-3","Soft, fresh cottage cheese made from full cream milk. Packed with protein.","200g","gm",80,72,250,[img.paneer, img.paneer],4.5,356,"25 min",["paneer","cottage cheese","dairy","protein"],true,true,false),
  p("d006","Amul Dahi Curd","অমুল দই","Amul","Dairy & Milk","cat-3","Thick, creamy set curd made from pasteurised milk. Fresh every day.","400g","gm",45,40,300,[img.curd, img.curd],4.4,289,"25 min",["curd","dahi","yogurt","dairy"],false,false,false),
  p("d007","Mother Dairy Mishti Doi","মাদার ডেইরি মিষ্টি দই","Mother Dairy","Dairy & Milk","cat-3","Sweetened Bengali mishti doi with the authentic clay pot flavour. A beloved tradition.","400g","gm",50,44,180,[img.curd, img.curd],4.6,312,"25 min",["mishti doi","sweet curd","bengali","dairy"],true,false,false),
  p("d008","Amul Shrikhand Mango","অমুল শ্রীখণ্ড","Amul","Dairy & Milk","cat-3","Thick, sweetened strained yoghurt with mango flavour. Traditional Gujarat dessert.","200g","gm",75,65,150,[img.curd, img.curd],4.3,145,"25 min",["shrikhand","amul","dessert","dairy"],false,false,false),
  p("d009","Amul Cheese Slices","অমুল চিজ স্লাইস","Amul","Dairy & Milk","cat-3","Processed cheese slices. Melts perfectly. Great for sandwiches and burgers.","200g","gm",130,115,100,[img.butter, img.butter],4.2,189,"25 min",["cheese","amul","dairy","slices"],false,false,false),
  p("d010","Nestle Munch Lassi","নেসলে লাচ্ছি","Nestle","Dairy & Milk","cat-3","Refreshing chilled lassi in a convenient bottle. Sweet and creamy.","180ml","ml",30,26,200,[img.milk, img.milk],4.1,98,"20 min",["lassi","nestle","dairy","drink"],false,false,false),

  // EGGS (cat-4)
  p("e001","Country Egg (Desi)","দেশি মুরগির ডিম","Local Farm","Eggs","cat-4","Free-range country chicken eggs. Smaller but richer yolk. Preferred in Bengali households.","6 pieces","dozen",90,78,300,[img.egg, img.egg],4.7,534,"20 min",["egg","desi egg","country egg"],true,false,true),
  p("e002","Farm Egg (White)","ফার্মের ডিম","Suguna","Eggs","cat-4","Farm-fresh white eggs from hygienically maintained farms. Large size, protein-rich.","6 pieces","dozen",72,60,500,[img.egg, img.egg],4.4,342,"20 min",["egg","farm egg","white egg"],true,true,false),
  p("e003","Country Egg (Desi) - 12 pcs","দেশি মুরগির ডিম - ১২টি","Local Farm","Eggs","cat-4","One dozen free-range country chicken eggs. Rich, flavourful yolks for all cooking.","12 pieces","dozen",175,148,200,[img.egg, img.egg],4.6,267,"20 min",["egg","desi egg","dozen"],false,false,true),
  p("e004","Farm Egg - 12 pcs","ফার্মের ডিম - ১২টি","Suguna","Eggs","cat-4","One dozen farm-fresh white eggs. Consistent size and quality. Great value.","12 pieces","dozen",140,118,450,[img.egg, img.egg],4.3,189,"20 min",["egg","farm egg","dozen"],false,true,false),

  // FISH (cat-5)
  p("fi001","Fresh Hilsa Fish","তাজা ইলিশ মাছ","Midnapore Fish Market","Fish","cat-5","The queen of Bengali fish. Fresh Hilsa from nearby rivers. Rich in omega-3 fatty acids. Weight per piece.","500g","kg",750,620,40,[img.hilsa, img.fish],4.9,534,"30 min",["hilsa","ilish","bengali fish","river fish"],true,false,true),
  p("fi002","Fresh Rohu","তাজা রুই মাছ","Midnapore Fish Market","Fish","cat-5","Fresh Rohu carp from local ponds. Firm white flesh. Classic Bengali fish curry ingredient.","500g","kg",280,240,80,[img.fish, img.hilsa],4.7,412,"30 min",["rohu","rui","bengali fish","carp"],true,true,true),
  p("fi003","Fresh Katla","তাজা কাতলা মাছ","Midnapore Fish Market","Fish","cat-5","Katla carp fish with delicate, sweet flesh. Beloved in Bengali murighonto and jhol.","500g","kg",260,220,80,[img.fish, img.fish],4.6,298,"30 min",["katla","carp","bengali fish"],true,false,true),
  p("fi004","Tilapia Fish","তেলাপিয়া","Midnapore Fish Market","Fish","cat-5","Farm-raised tilapia. Mild flavour, fewer bones. Perfect for everyday cooking.","500g","kg",180,149,120,[img.fish, img.fish],4.3,167,"30 min",["tilapia","tilapia fish","fish"],false,false,true),
  p("fi005","Tiger Prawn","বাগদা চিংড়ি","Coastal Farm","Fish","cat-5","Plump, juicy tiger prawns. Premium quality. Excellent for malai curry and bhuna.","250g","gm",380,320,60,[img.fish, img.fish],4.8,289,"30 min",["prawn","chingri","tiger prawn","seafood"],true,false,false),
  p("fi006","Freshwater Prawn (Golda)","গলদা চিংড়ি","Midnapore Farm","Fish","cat-5","Large freshwater Golda prawns from local farms. A Bengali delicacy for special occasions.","250g","gm",480,399,40,[img.fish, img.fish],4.9,198,"35 min",["golda prawn","chingri","prawns","bengali"],true,false,true),
  p("fi007","Pomfret Fish","পমফ্রেট","Coastal Market","Fish","cat-5","Flat, silver pomfret fish. Mild and delicate flavour. Great for fry and curry.","500g","kg",420,349,40,[img.fish, img.fish],4.5,145,"35 min",["pomfret","papda","fish","sea fish"],false,false,false),
  p("fi008","Pabda Fish","পাবদা মাছ","Midnapore Fish Market","Fish","cat-5","Small, tender Pabda catfish. A Bengali favourite known for its velvety texture.","500g","kg",350,299,60,[img.fish, img.fish],4.7,213,"30 min",["pabda","catfish","bengali fish"],false,false,true),
  p("fi009","Tangra Fish","ট্যাংরা মাছ","Midnapore Fish Market","Fish","cat-5","Spiny Tangra catfish. Perfect for the classic Bengali tangra jhal recipe.","500g","kg",320,269,60,[img.fish, img.fish],4.5,167,"30 min",["tangra","catfish","bengali fish"],false,false,true),
  p("fi010","Dried Shrimp (Churi)","শুঁটকি চিংড়ি","Coastal Market","Fish","cat-5","Sun-dried small shrimp. Intensely flavourful. Used in Bengali dal and chutneys.","100g","gm",160,130,100,[img.fish, img.fish],4.2,89,"30 min",["dried shrimp","shutki","churi","bengali"],false,false,false),

  // CHICKEN (cat-6)
  p("ch001","Broiler Chicken (Full)","ব্রয়লার মুরগি","Local Farm","Chicken","cat-6","Fresh dressed broiler chicken. Cleaned and ready to cook. Mild flavour, tender meat.","1kg","kg",220,189,40,[img.chicken, img.chicken],4.4,423,"30 min",["broiler chicken","murgi","poultry"],true,true,false),
  p("ch002","Country Chicken (Desi)","দেশি মুরগি","Local Farm","Chicken","cat-6","Free-range country chicken. Firm, flavourful meat preferred for all traditional Bengali recipes.","1kg","kg",450,379,30,[img.chicken, img.chicken],4.8,312,"35 min",["country chicken","desi murgi","poultry"],true,false,true),
  p("ch003","Chicken Breast (Boneless)","চিকেন ব্রেস্ট","Local Farm","Chicken","cat-6","Fresh, boneless chicken breast. Lean protein. Perfect for grilling, biryani and salads.","500g","gm",220,189,60,[img.chicken, img.chicken],4.5,267,"30 min",["chicken breast","boneless","protein","poultry"],true,false,false),
  p("ch004","Chicken Curry Cut","চিকেন কারি কাট","Local Farm","Chicken","cat-6","Pre-cut chicken pieces ready for curry. Cleaned and washed. Convenient and fresh.","1kg","kg",240,199,50,[img.chicken, img.chicken],4.6,198,"30 min",["chicken","curry cut","poultry","meat"],true,true,false),

  // MEAT (cat-7)
  p("m001","Fresh Mutton (Goat)","খাসির মাংস","Local Butcher","Meat","cat-7","Fresh goat mutton, locally sourced. Rich flavour. Perfect for Bengali kosha mangsho.","500g","gm",480,420,40,[img.mutton, img.mutton],4.8,312,"40 min",["mutton","khasir mangsho","meat","goat"],true,false,true),
  p("m002","Mutton Keema (Minced)","খাসির কিমা","Local Butcher","Meat","cat-7","Freshly minced goat meat. Ideal for kofta, keema curry and stuffed paratha.","500g","gm",460,399,40,[img.mutton, img.mutton],4.6,189,"40 min",["mutton keema","minced meat","kofta"],false,false,true),
  p("m003","Beef (Halal)","গরুর মাংস (হালাল)","Halal Butcher","Meat","cat-7","Fresh halal beef. Rich, hearty flavour. For traditional Bengali beef curry.","500g","gm",380,329,40,[img.mutton, img.mutton],4.5,134,"40 min",["beef","halal","mangsho","meat"],false,false,false),

  // RICE (cat-8)
  p("r001","Gobindobhog Rice","গোবিন্দভোগ চাল","Local Mill","Rice","cat-8","Aromatic, short-grain Gobindobhog rice. The sacred rice of Bengal, used in festivals and khichuri. Grown locally in Midnapore.","1kg","kg",130,115,120,[img.rice, img.rice],4.9,534,"> 30 min",["gobindobhog","rice","bengali rice","aromatic"],true,false,true),
  p("r002","Miniket Rice","মিনিকেট চাল","Local Mill","Rice","cat-8","Slender, polished Miniket rice. Most popular everyday rice in Bengali households.","5kg","kg",380,329,80,[img.rice, img.rice],4.6,412,"45 min",["miniket","rice","bengali rice","daily"],true,true,true),
  p("r003","Basmati Rice (India Gate)","বাসমতি চাল","India Gate","Rice","cat-8","Long-grain premium India Gate basmati rice. Aged for superior aroma and non-sticky texture.","1kg","kg",155,135,60,[img.rice, img.rice],4.7,312,"45 min",["basmati","rice","india gate","biryani"],true,false,false),
  p("r004","Sona Masoori Rice","সোনা মাসুরি চাল","Dawat","Rice","cat-8","Medium-grain Sona Masoori rice from Andhra. Light, fluffy and easily digestible.","5kg","kg",320,279,60,[img.rice, img.rice],4.4,198,"45 min",["sona masoori","rice","daily"],false,false,false),
  p("r005","Atap Rice","আতপ চাল","Local Mill","Rice","cat-8","Traditional non-parboiled white atap rice. Used in puja, payesh and special Bengali sweets.","1kg","kg",90,78,200,[img.rice, img.rice],4.5,267,"45 min",["atap rice","bengali rice","puja","local"],false,false,true),
  p("r006","Ponni Raw Rice","পন্নি চাল","Local Mill","Rice","cat-8","South Indian Ponni variety. Cooks light and fluffy. Great for daily meals.","5kg","kg",290,249,80,[img.rice, img.rice],4.3,134,"45 min",["ponni","rice"],false,false,false),

  // DAL (cat-9)
  p("dal001","Toor Dal (Split Pigeon Pea)","তুর ডাল","Patanjali","Dal & Pulses","cat-9","Premium quality toor dal. Clean, machine-sorted. The basis of everyday Bengali dal.","500g","gm",120,105,150,[img.dal, img.dal],4.5,312,"45 min",["toor dal","arhar dal","dal","pulses"],true,false,false),
  p("dal002","Moong Dal (Split Green Gram)","মুগ ডাল","Patanjali","Dal & Pulses","cat-9","Light, easily digestible moong dal. Great for khichuri and Bengali moong dal with ghee.","500g","gm",110,95,180,[img.dal, img.dal],4.6,245,"45 min",["moong dal","mung dal","dal","khichuri"],true,true,false),
  p("dal003","Masoor Dal (Red Lentil)","মসুর ডাল","Patanjali","Dal & Pulses","cat-9","Quick-cooking red lentil dal. Popular in Bengali everyday cooking with mustard tempering.","500g","gm",100,88,200,[img.dal, img.dal],4.5,189,"45 min",["masoor dal","red lentil","dal"],true,false,false),
  p("dal004","Chana Dal (Split Chickpea)","ছোলার ডাল","Haldiram","Dal & Pulses","cat-9","Nutty-flavoured chana dal. Great in Bengali cholar dal with coconut and raisins.","500g","gm",105,92,160,[img.dal, img.dal],4.4,134,"45 min",["chana dal","cholar dal","dal","bengali"],false,false,false),
  p("dal005","Kabuli Chana (White Chickpea)","কাবুলি ছোলা","Patanjali","Dal & Pulses","cat-9","Large, creamy white chickpeas. Perfect for chole and Bengali chholar dal.","500g","gm",95,82,150,[img.dal, img.dal],4.3,98,"45 min",["chickpea","chana","kabuli","chole"],false,false,false),
  p("dal006","Kala Chana (Black Chickpea)","কালো ছোলা","Patanjali","Dal & Pulses","cat-9","Small black chickpeas. High in fibre and protein. Great for Bengali kala chana curry.","500g","gm",85,72,140,[img.dal, img.dal],4.4,87,"45 min",["black chickpea","kala chana","dal"],false,false,false),

  // OIL (cat-10)
  p("o001","Fortune Sunflower Oil","ফর্চুন সানফ্লাওয়ার তেল","Fortune","Oil","cat-10","Refined sunflower oil with light taste and high smoke point. Ideal for daily cooking.","1L","L",180,162,60,[img.oil, img.oil],4.5,423,"45 min",["sunflower oil","fortune","cooking oil"],true,false,false),
  p("o002","Fortune Sunflower Oil 5L","ফর্চুন সানফ্লাওয়ার তেল ৫ লিটার","Fortune","Oil","cat-10","Fortune refined sunflower oil 5L tin. Economy pack for families. Cholesterol-free.","5L","L",820,749,60,[img.oil, img.oil],4.6,312,"45 min",["sunflower oil","fortune","cooking oil","family"],true,false,false),
  p("o003","Saffola Gold Blended Oil","সাফোলা গোল্ড তেল","Saffola","Oil","cat-10","Saffola Gold blended rice bran and safflower oil. Heart-healthy choice.","1L","L",200,178,80,[img.oil, img.oil],4.4,245,"45 min",["saffola","blended oil","heart healthy","cooking oil"],false,false,false),
  p("o004","Mustard Oil (Kachi Ghani)","কাঁচি ঘানি সর্ষের তেল","Patanjali","Oil","cat-10","Cold-pressed Kachi Ghani mustard oil. Strong, pungent flavour essential in Bengali cooking. Local favourite.","1L","L",190,168,80,[img.mustardoil, img.oil],4.8,534,"45 min",["mustard oil","sarshey tel","bengali","kachi ghani"],true,false,true),
  p("o005","Gemini Sunflower Oil","জেমিনি সানফ্লাওয়ার তেল","Gemini","Oil","cat-10","Popular refined sunflower oil. Light and clean taste. Good for frying and sautéing.","1L","L",165,149,80,[img.oil, img.oil],4.3,189,"45 min",["gemini","sunflower oil","cooking oil"],false,false,false),
  p("o006","Coconut Oil (Parachute)","প্যারাশুট নারিকেল তেল","Parachute","Oil","cat-10","Pure coconut oil for cooking and hair. Light, aromatic, versatile.","500ml","ml",180,162,60,[img.oil, img.oil],4.6,312,"45 min",["coconut oil","parachute","narikel tel"],false,false,false),

  // SPICES (cat-11)
  p("sp001","Turmeric Powder (Haldi)","হলুদ গুঁড়া","Everest","Spices","cat-11","Pure, vibrant turmeric powder. Bright golden colour. Essential in every Bengali dish.","100g","gm",65,55,300,[img.turmeric, img.spice],4.5,312,"45 min",["turmeric","haldi","spice","halud"],true,false,false),
  p("sp002","Red Chilli Powder","লাল মরিচ গুঁড়া","Everest","Spices","cat-11","Fiery red chilli powder with vivid colour. Blend of Kashmiri and local chillies.","100g","gm",75,65,280,[img.spice, img.spice],4.4,245,"45 min",["chilli powder","lal morich","spice"],false,false,false),
  p("sp003","Coriander Powder","ধনে গুঁড়া","Everest","Spices","cat-11","Freshly ground coriander powder with warm, citrusy aroma. A Bengali kitchen staple.","100g","gm",60,50,280,[img.spice, img.spice],4.3,189,"45 min",["coriander powder","dhone","spice"],false,false,false),
  p("sp004","Cumin Powder (Jeera)","জিরা গুঁড়া","MDH","Spices","cat-11","Earthy, aromatic cumin powder. Used in tempering and spice blends.","100g","gm",75,62,250,[img.spice, img.spice],4.5,167,"45 min",["cumin","jeera","jira","spice"],false,false,false),
  p("sp005","Garam Masala","গরম মশলা","Everest","Spices","cat-11","Classic north Indian garam masala blend. Adds warmth and depth to curries.","100g","gm",120,99,200,[img.spice, img.spice],4.6,312,"45 min",["garam masala","spice blend","masala"],true,false,false),
  p("sp006","Panch Phoron","পাঁচফোড়ন","Patanjali","Spices","cat-11","Traditional Bengali five-spice mix: cumin, nigella, fenugreek, mustard and fennel. Authentic Bengali tempering spice.","100g","gm",70,58,200,[img.spice, img.spice],4.8,423,"45 min",["panch phoron","bengali spice","five spice","bhaja masala"],true,false,true),
  p("sp007","Bay Leaf (Tej Patta)","তেজপাতা","Patanjali","Spices","cat-11","Sun-dried bay leaves from Midnapore forests. Fragrant, earthy aroma for dal and biriyani.","10g","gm",30,24,300,[img.spice, img.spice],4.5,134,"45 min",["bay leaf","tez pata","tej patta","spice"],false,false,true),
  p("sp008","Mustard Seeds (Rai)","রাই সর্ষে","Patanjali","Spices","cat-11","Small, pungent black mustard seeds. Essential for Bengali tadka, fish curry and pickle.","100g","gm",55,44,280,[img.spice, img.spice],4.4,167,"45 min",["mustard seed","rai","sarshey","bengali"],false,false,true),

  // BISCUITS (cat-12)
  p("bi001","Parle-G Glucose Biscuit","পার্লে-জি বিস্কুট","Parle","Biscuits","cat-12","Iconic glucose biscuit. Classic tea-time companion for generations. Lightly sweet.","800g","gm",90,79,400,[img.biscuit, img.biscuit],4.8,1024,"30 min",["parle g","glucose biscuit","biscuit","snack"],true,true,false),
  p("bi002","Britannia Good Day Cashew","ব্রিটানিয়া গুড ডে","Britannia","Biscuits","cat-12","Rich, buttery shortbread biscuit with real cashew pieces. A premium Indian favourite.","200g","gm",55,48,300,[img.biscuit, img.biscuit],4.5,534,"30 min",["good day","britannia","cashew","biscuit"],true,false,false),
  p("bi003","Oreo Original Cookies","ওরিও বিস্কুট","Cadbury","Biscuits","cat-12","Iconic chocolate sandwich cookies with sweet cream filling. Loved by all ages.","120g","gm",55,48,350,[img.biscuit, img.biscuit],4.7,423,"30 min",["oreo","chocolate cookie","biscuit"],true,true,false),
  p("bi004","Bisk Farm Marigold","বিস্ক ফার্ম মেরিগোল্ড","Bisk Farm","Biscuits","cat-12","Classic glucose biscuit from Bengal's own Bisk Farm brand. Crispy and lightly sweet.","400g","gm",45,38,400,[img.biscuit, img.biscuit],4.5,312,"30 min",["bisk farm","marigold","glucose","bengali biscuit"],true,false,true),
  p("bi005","Britannia NutriChoice","ব্রিটানিয়া নিউট্রিচয়েস","Britannia","Biscuits","cat-12","Multigrain, high-fibre biscuit. A healthy snacking option with oats and digestive wheat.","100g","gm",40,35,250,[img.biscuit, img.biscuit],4.3,189,"30 min",["nutrichoice","britannia","healthy","biscuit"],false,false,false),
  p("bi006","Hide & Seek Chocolate Chip","হাইড এন্ড সিক","Parle","Biscuits","cat-12","Buttery chocolate chip cookies. Rich, indulgent taste with real chocolate chips.","100g","gm",50,44,280,[img.biscuit, img.biscuit],4.4,245,"30 min",["hide and seek","chocolate chip","parle","biscuit"],false,false,false),

  // COLD DRINKS (cat-13)
  p("cd001","Coca-Cola 750ml","কোকা কোলা ৭৫০ml","Coca-Cola","Cold Drinks","cat-13","Classic Coca-Cola carbonated soft drink. The world's favourite cola, ice-cold refreshment.","750ml","ml",50,44,300,[img.cola, img.drink],4.6,534,"25 min",["coca cola","coke","cold drink","soda"],true,true,false),
  p("cd002","Pepsi 750ml","পেপসি ৭৫০ml","PepsiCo","Cold Drinks","cat-13","Pepsi cola carbonated drink. Bold flavour, refreshing taste. Chilled and ready.","750ml","ml",50,44,280,[img.cola, img.drink],4.4,412,"25 min",["pepsi","cola","cold drink","soda"],true,false,false),
  p("cd003","Thums Up 750ml","থামস আপ ৭৫০ml","Coca-Cola","Cold Drinks","cat-13","Bold, fizzy Thums Up. India's favourite cola with a strong, distinct taste.","750ml","ml",50,44,280,[img.cola, img.drink],4.6,312,"25 min",["thums up","cola","cold drink","strong taste"],true,false,false),
  p("cd004","Sprite 750ml","স্প্রাইট ৭৫০ml","Coca-Cola","Cold Drinks","cat-13","Lemon-lime flavoured carbonated drink. Crisp, clean and refreshing. No caffeine.","750ml","ml",50,44,250,[img.drink, img.drink],4.3,245,"25 min",["sprite","lemon lime","cold drink"],false,false,false),
  p("cd005","Real Fruit Juice (Mango)","রিয়েল মিক্সড জুস","Dabur","Cold Drinks","cat-13","Real fruit juice with no added preservatives. Made with real Alphonso mango pulp.","1L","L",120,99,200,[img.juice, img.drink],4.4,312,"25 min",["real juice","mango juice","fruit juice","dabur"],true,false,false),
  p("cd006","Frooti Mango Drink","ফ্রুটি ম্যাঙ্গো","Parle Agro","Cold Drinks","cat-13","Tangy, sweet mango drink. India's favourite mango beverage. Refreshing and tropical.","200ml","ml",20,17,400,[img.juice, img.drink],4.4,423,"25 min",["frooti","mango","drink","parle"],false,true,false),
  p("cd007","Maaza Mango Drink","মাজা ম্যাঙ্গো","Coca-Cola","Cold Drinks","cat-13","Real mango-based drink. Made with Alphonso mango. Thick and tropical.","600ml","ml",60,52,280,[img.juice, img.drink],4.3,267,"25 min",["maaza","mango","drink"],false,false,false),
  p("cd008","Limca Lemon Drink","লিমকা লেমন ড্রিংক","Coca-Cola","Cold Drinks","cat-13","Lemony sparkling soft drink. Light and refreshing. Perfect for hot days.","750ml","ml",50,44,200,[img.drink, img.drink],4.2,189,"25 min",["limca","lemon","cold drink"],false,false,false),

  // SNACKS (cat-14)
  p("sn001","Lay's Classic Salted","লেজ ক্লাসিক সল্টেড","PepsiCo","Snacks","cat-14","Thin, crispy potato chips with classic salted flavour. India's most loved snack.","100g","gm",35,30,400,[img.chips, img.snack],4.5,534,"25 min",["lays","chips","potato chips","snack"],true,true,false),
  p("sn002","Lay's Magic Masala","লেজ ম্যাজিক মশলা","PepsiCo","Snacks","cat-14","Lay's with tangy, spicy masala flavour. A bold Indian twist on the classic chip.","100g","gm",35,30,380,[img.chips, img.snack],4.6,423,"25 min",["lays","magic masala","chips","snack"],true,true,false),
  p("sn003","Bingo Mad Angles","বিঙ্গো ম্যাড অ্যাঙ্গেলস","ITC","Snacks","cat-14","Triangular corn chips with a zingy masala flavour. Crunchy, addictive and bold.","35g","gm",20,17,500,[img.snack, img.chips],4.4,312,"25 min",["bingo","mad angles","chips","snack"],false,true,false),
  p("sn004","Kurkure Masala Munch","কুরকুরে মশলা মাঞ্চ","Frito-Lay","Snacks","cat-14","Classic Kurkure with spicy, tangy masala flavour. Crunchy and irresistibly tasty.","90g","gm",30,25,400,[img.snack, img.snack],4.5,412,"25 min",["kurkure","masala","snack","corn"],false,true,false),
  p("sn005","Haldiram Bhujia Sev","হালদিরাম ভুজিয়া","Haldiram","Snacks","cat-14","Crispy, spiced moth bean sev. A traditional Indian snack enjoyed as is or with chaat.","200g","gm",120,99,300,[img.snack, img.snack],4.6,312,"25 min",["bhujia","haldiram","sev","snack"],true,false,false),
  p("sn006","Haldiram Aloo Bhujia","হালদিরাম আলু ভুজিয়া","Haldiram","Snacks","cat-14","Lightly spiced potato noodle sev. Crunchy, savoury and a popular tea-time snack.","200g","gm",110,92,300,[img.snack, img.snack],4.5,267,"25 min",["haldiram","aloo bhujia","potato sev","snack"],false,false,false),

  // BABY CARE (cat-15)
  p("bb001","Pampers Baby Pants (M)","প্যাম্পার্স বেবি প্যান্ট","Pampers","Baby Care","cat-15","Comfortable, leak-proof baby pants. Soft inner surface. Keeps baby dry for 12 hours.","9 pieces","pack",395,349,50,[img.babycare, img.babycare],4.7,312,"35 min",["pampers","diaper","baby pants","baby care"],true,false,false),
  p("bb002","Huggies Wonder Pants (M)","হাগিস ওয়ান্ডার প্যান্ট","Huggies","Baby Care","cat-15","Double leak protection. Stretchy waistband for active babies. Bubble bed for comfort.","9 pieces","pack",385,339,50,[img.babycare, img.babycare],4.6,245,"35 min",["huggies","diaper","baby pants","baby care"],true,false,false),
  p("bb003","Johnson's Baby Powder","জনসন্স বেবি পাউডার","Johnson's","Baby Care","cat-15","Clinically proven mild, gentle baby powder. Absorbs excess moisture, keeps skin fresh.","200g","gm",215,189,100,[img.babycare, img.babycare],4.8,423,"35 min",["johnson's","baby powder","baby care"],true,false,false),
  p("bb004","Nestle Cerelac Wheat","নেসলে সেরেলাক","Nestle","Baby Care","cat-15","Fortified infant cereal with wheat and milk. Rich in iron, vitamins and minerals.","300g","gm",320,289,100,[img.babycare, img.babycare],4.6,312,"35 min",["cerelac","nestle","baby food","infant"],false,false,false),

  // PET FOOD (cat-16)
  p("pf001","Pedigree Adult Dog Food","পেডিগ্রি ডগ ফুড","Pedigree","Pet Food","cat-16","Complete, balanced nutrition for adult dogs. Chicken and vegetables flavour.","1.2kg","kg",580,519,80,[img.petfood, img.petfood],4.5,189,"35 min",["pedigree","dog food","pet food","adult"],false,false,false),
  p("pf002","Whiskas Adult Cat Food","উইসকাস ক্যাট ফুড","Whiskas","Pet Food","cat-16","Complete cat food with ocean fish flavour. Provides essential vitamins and taurine.","450g","gm",320,289,100,[img.petfood, img.petfood],4.4,134,"35 min",["whiskas","cat food","pet food","fish"],false,false,false),

  // FROZEN FOODS (cat-17)
  p("fr001","McCain Smiles Potato Snack","ম্যাকেইন স্মাইলস","McCain","Frozen Foods","cat-17","Fun-shaped potato snacks. Air-fry or oven-bake. Kids love them. Ready in 15 minutes.","415g","gm",280,249,100,[img.frozen, img.frozen],4.4,189,"35 min",["mccain","potato snack","frozen","kids"],false,false,false),
  p("fr002","Safal Frozen Peas","সাফাল ফ্রোজেন মটরশুঁটি","Safal","Frozen Foods","cat-17","IQF frozen green peas. Retain all nutrients and fresh flavour. Ready to cook.","500g","gm",120,99,150,[img.frozen, img.frozen],4.3,134,"35 min",["safal","frozen peas","vegetables","frozen"],false,false,false),

  // PERSONAL CARE (cat-18)
  p("pc001","Dove Beauty Bar (Original)","ডাভ বিউটি বার","Dove","Personal Care","cat-18","Moisturising cream beauty bar. 1/4 moisturising cream. Leaves skin soft and smooth.","100g","gm",75,65,300,[img.soap, img.soap],4.6,423,"35 min",["dove","soap","beauty bar","moisturising"],true,false,false),
  p("pc002","Lifebuoy Total Soap","লাইফবয় টোটাল","Lifebuoy","Personal Care","cat-18","Antibacterial soap with Active Silver formula. Kills 99.9% germs. Recommended by doctors.","100g","gm",58,50,350,[img.soap, img.soap],4.4,312,"35 min",["lifebuoy","antibacterial","soap","health"],false,false,false),
  p("pc003","Head & Shoulders Shampoo","হেড এন্ড শোলডার্স শ্যাম্পু","Procter & Gamble","Personal Care","cat-18","Anti-dandruff shampoo. 7 benefits in 1. Clinically proven to control dandruff.","340ml","ml",380,329,200,[img.shampoo, img.shampoo],4.5,289,"35 min",["head and shoulders","shampoo","anti-dandruff","hair care"],true,false,false),
  p("pc004","Dove Shampoo (Damage Therapy)","ডাভ হেয়ার শ্যাম্পু","Dove","Personal Care","cat-18","Intense repair shampoo for damaged, dry hair. With Fiber Actives technology.","340ml","ml",389,339,200,[img.shampoo, img.shampoo],4.6,245,"35 min",["dove","shampoo","damage therapy","hair care"],true,false,false),
  p("pc005","Dettol Hand Wash (Original)","ডেটল হ্যান্ড ওয়াশ","Dettol","Personal Care","cat-18","Antiseptic liquid hand wash. Kills 99.9% germs. Protects from cold and flu viruses.","220ml","ml",160,139,200,[img.soap, img.soap],4.5,312,"35 min",["dettol","hand wash","antiseptic","hygiene"],true,false,false),

  // CLEANING (cat-19)
  p("cl001","Surf Excel Easy Wash","সার্ফ এক্সেল ইজি ওয়াশ","HUL","Cleaning","cat-19","Powerful detergent powder. Removes tough stains in just 1 wash. Good for hand and machine wash.","500g","gm",140,122,200,[img.cleaning, img.cleaning],4.6,423,"35 min",["surf excel","detergent","washing powder","cleaning"],true,false,false),
  p("cl002","Ariel Top Load Detergent","এরিয়েল ডিটারজেন্ট","P&G","Cleaning","cat-19","Machine wash detergent powder for top-load washers. Tough on stains, gentle on fabric.","1kg","kg",280,245,200,[img.cleaning, img.cleaning],4.5,312,"35 min",["ariel","detergent","machine wash","cleaning"],false,false,false),
  p("cl003","Vim Dishwash Bar","ভিম ডিশওয়াশ বার","HUL","Cleaning","cat-19","Effective grease-cutting dishwash bar. Removes oil and tough stains from utensils.","250g","gm",55,48,300,[img.cleaning, img.cleaning],4.4,245,"35 min",["vim","dishwash","utensils","cleaning"],false,false,false),
  p("cl004","Harpic Power Plus","হারপিক পাওয়ার প্লাস","Reckitt","Cleaning","cat-19","Toilet cleaner that removes stains and kills 99.9% bacteria and germs. Powerful formula.","500ml","ml",155,135,200,[img.cleaning, img.cleaning],4.5,189,"35 min",["harpic","toilet cleaner","bathroom","cleaning"],false,false,false),
  p("cl005","Lizol Disinfectant Surface Cleaner","লাইজোল ডিসইনফেক্ট্যান্ট","Reckitt","Cleaning","cat-19","Multi-surface disinfectant cleaner. Kills 99.9% germs. Leaves surfaces sparkling clean.","500ml","ml",175,152,200,[img.cleaning, img.cleaning],4.4,167,"35 min",["lizol","disinfectant","surface cleaner","floor cleaner"],false,false,false),

  // MEDICINE OTC (cat-20)
  p("med001","Crocin Advance Tablet","ক্রোসিন অ্যাডভান্স","GSK","Medicine (OTC)","cat-20","Paracetamol 500mg tablet. Fast relief from fever, headache and body pain. 20 tablets.","20 tablets","pack",50,44,300,[img.medicine, img.medicine],4.6,423,"35 min",["crocin","paracetamol","fever","headache","medicine"],true,false,false),
  p("med002","Dettol Antiseptic Liquid","ডেটল অ্যান্টিসেপটিক","Reckitt","Medicine (OTC)","cat-20","Multi-purpose antiseptic liquid. Use for wound care, bathing and surface cleaning.","250ml","ml",215,189,150,[img.medicine, img.medicine],4.7,312,"35 min",["dettol","antiseptic","first aid","medicine"],true,false,false),
  p("med003","Vicks VapoRub","ভিক্স ভেপোরাব","Procter & Gamble","Medicine (OTC)","cat-20","Topical cough suppressant with menthol, camphor and eucalyptus. Relieves cold symptoms.","25g","gm",100,88,200,[img.medicine, img.medicine],4.5,267,"35 min",["vicks","cough","cold","vapour rub"],false,false,false),
  p("med004","Savlon Antiseptic Cream","স্যাভলন অ্যান্টিসেপটিক ক্রিম","ICI","Medicine (OTC)","cat-20","Antiseptic cream for cuts, burns and skin infections. Mild and gentle on skin.","25g","gm",90,78,200,[img.medicine, img.medicine],4.4,189,"35 min",["savlon","antiseptic cream","first aid","medicine"],false,false,false),

  // BAKERY & ATTA (cat-21)
  p("at001","Aashirvaad Atta (Whole Wheat)","আশীর্বাদ আটা","ITC","Bakery & Atta","cat-21","Superior MP wheat atta. Retains natural goodness of wheat. Makes soft, fluffy rotis.","5kg","kg",335,299,100,[img.atta, img.atta],4.7,534,"45 min",["aashirvaad","atta","whole wheat","flour","roti"],true,false,false),
  p("at002","Aashirvaad Atta 10kg","আশীর্বাদ আটা ১০ কেজি","ITC","Bakery & Atta","cat-21","Economy 10kg pack. Same premium MP wheat. Ideal for families. Makes soft, delicious rotis.","10kg","kg",650,589,100,[img.atta, img.atta],4.8,423,"45 min",["aashirvaad","atta","whole wheat","flour"],false,false,false),
  p("at003","Britannia Bread (Sandwich)","ব্রিটানিয়া ব্রেড","Britannia","Bakery & Atta","cat-21","Soft, fresh sandwich bread with a fluffy crumb. Perfect for toast and sandwiches.","400g","gm",55,50,300,[img.bread, img.bread],4.4,312,"25 min",["britannia","bread","sandwich","bakery"],true,false,false),
  p("at004","Modern Atta Bread","মডার্ন আটা ব্রেড","Modern","Bakery & Atta","cat-21","Whole wheat atta bread. Nutritious and fibrous. Great for a healthy breakfast.","400g","gm",60,55,250,[img.bread, img.bread],4.3,189,"25 min",["modern","atta bread","whole wheat","bakery"],false,false,false),
  p("at005","Pillsbury Maida Flour","পিলসবেরি ময়দা","General Mills","Bakery & Atta","cat-21","Fine refined flour for baking, pakoras and soft Bengali luchis.","1kg","kg",65,55,200,[img.atta, img.atta],4.5,267,"45 min",["pillsbury","maida","refined flour","baking"],false,false,false),

  // SWEETS (cat-22)
  p("sw001","Balaram Rasgulla (Can)","বলরাম রসগোল্লা","Balaram Mullick","Sweets","cat-22","Premium Bengali rasgulla in tin can. Soft, spongy cottage cheese balls in sugar syrup.","500g","gm",180,162,80,[img.rasgulla, img.sweet],4.8,412,"35 min",["rasgulla","rosogolla","bengali sweet","mishti"],true,false,true),
  p("sw002","Mihidana","মিহিদানা","Burdwan","Sweets","cat-22","Traditional Burdwan Mihidana — tiny, melt-in-mouth saffron-coloured besan balls in syrup. A Bengal GI product.","250g","gm",180,149,80,[img.sweet, img.sweet],4.9,312,"35 min",["mihidana","bengali sweet","traditional","burdwan"],true,false,true),
  p("sw003","Sitabhog","সিতাভোগ","Burdwan","Sweets","cat-22","Traditional Bengali Sitabhog — white rice-flour vermicelli in sugar syrup. Made in Burdwan.","250g","gm",180,149,60,[img.sweet, img.sweet],4.8,234,"35 min",["sitabhog","bengali sweet","traditional","burdwan"],true,false,true),
  p("sw004","Nolen Gur Sandesh","নলেন গুড় সন্দেশ","Local Sweetshop","Sweets","cat-22","Seasonal winter delicacy. Soft sandesh made with fresh chhena and date palm jaggery.","250g","gm",220,189,80,[img.sweet, img.sweet],4.9,267,"35 min",["sandesh","nolen gur","bengali sweet","date jaggery"],true,false,true),

  // TEA & COFFEE (cat-23)
  p("t001","Tata Tea Gold","টাটা টি গোল্ড","Tata","Tea & Coffee","cat-23","Tata Tea Gold — a fine blend of upper Assam teas. Bold, rich and aromatic. Brews a strong cup.","250g","gm",175,158,100,[img.tea, img.tea],4.6,534,"35 min",["tata tea","tea","gold","assam tea"],true,false,false),
  p("t002","Brooke Bond Red Label Tea","রেড লেবেল টি","HUL","Tea & Coffee","cat-23","Classic Red Label blend. Refreshing taste with natural tea essence. Popular across West Bengal.","250g","gm",155,138,100,[img.tea, img.tea],4.5,412,"35 min",["red label","tea","brooke bond","assam"],true,true,false),
  p("t003","Darjeeling Tea (First Flush)","দার্জিলিং চা","Goodricke","Tea & Coffee","cat-23","Premium first-flush Darjeeling tea. Light, floral, muscatel character. The champagne of teas.","100g","gm",260,225,80,[img.tea, img.tea],4.8,312,"35 min",["darjeeling tea","first flush","premium tea","bengal tea"],true,false,false),
  p("t004","Nescafe Classic Instant Coffee","নেসক্যাফে ক্লাসিক","Nestle","Tea & Coffee","cat-23","Nescafe Classic 100% pure instant coffee. Rich aroma, strong taste. Ready in seconds.","100g","gm",380,329,60,[img.coffee, img.coffee],4.5,267,"35 min",["nescafe","instant coffee","nestle","coffee"],true,false,false),
  p("t005","Bru Instant Coffee","ব্রু ইনস্ট্যান্ট কফি","HUL","Tea & Coffee","cat-23","Bru Instant Coffee — smooth roasted coffee with chicory. Balanced taste. South Indian style.","50g","gm",170,149,40,[img.coffee, img.coffee],4.4,189,"35 min",["bru","coffee","instant coffee","chicory"],false,false,false),

  // SALT & SUGAR (cat-26)
  p("ss001","Tata Salt (Iodized)","টাটা লবণ","Tata","Salt & Sugar","cat-26","India's most trusted iodized salt. Fine grain, consistent quality. Essential kitchen staple.","1kg","kg",28,24,500,[img.salt, img.salt],4.8,867,"35 min",["tata salt","iodized salt","salt"],true,false,false),
  p("ss002","Sugar (Refined)","চিনি","Local Mill","Salt & Sugar","cat-26","Pure refined white sugar. Fine crystals, consistent sweetness. For cooking and tea.","1kg","kg",55,48,400,[img.sugar, img.sugar],4.4,312,"35 min",["sugar","chini","refined sugar"],false,false,true),
  p("ss003","Patanjali Honey","পতঞ্জলি মধু","Patanjali","Salt & Sugar","cat-26","Pure, natural honey with no added sugar. Rich floral aroma. Great for health.","500g","gm",220,189,200,[img.sugar, img.sugar],4.5,245,"35 min",["honey","madhu","patanjali","natural"],false,false,false),

  // ATTA & FLOUR (cat-25)
  p("fl001","Besan (Gram Flour)","বেসন","Patanjali","Atta & Flour","cat-25","Fine-grade gram flour. Essential for pakoras, Bengali batter-fried vegetables and laddoo.","500g","gm",75,65,250,[img.atta, img.atta],4.5,312,"35 min",["besan","gram flour","chickpea flour","pakora"],false,false,false),
  p("fl002","Semolina (Suji)","সুজি","Patanjali","Atta & Flour","cat-25","Fine semolina/rava. For Bengali suji halwa, upma and rava dosa.","500g","gm",55,48,300,[img.atta, img.atta],4.4,189,"35 min",["suji","semolina","rava","halwa"],false,false,false),

  // STATIONERY (cat-24)
  p("st001","Classmate Notebook (200 Pages)","ক্লাসমেট নোটবুক","ITC","Stationery","cat-24","Classmate ruled notebook. 200 pages, good quality ruling and cover. For school students.","1 piece","piece",95,79,150,[img.stationery, img.stationery],4.5,189,"35 min",["notebook","classmate","stationery","school"],false,false,false),
  p("st002","Reynolds Ball Pen","রেনল্ডস বল পেন","Reynolds","Stationery","cat-24","Smooth-writing ball point pen. Comfortable grip, long-lasting ink. Pack of 5.","5 pieces","pack",45,38,300,[img.stationery, img.stationery],4.4,134,"35 min",["ball pen","reynolds","stationery","writing"],false,false,false),
];
