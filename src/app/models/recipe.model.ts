import { User } from './user.model';

export class Recipe {
  id: string;
  title: string;
  description: string;
  photoURL: string;
  instructions: string;
  ingredients: string;
  likes: number;
  published: boolean;
  authorId: string;
  createdAt: Date;
  author: User;
  categories: string[];
}

// {
//   "id": "a60d345c-4e96-48c8-8102-6b175bd92def",
//   "title": "Souvlaki met Pita",
//   "description": "Dit is een recept om Souvlaki te maken met eigen pita's! Je kan er natuurlijk ook voor kiezen om het vlees met iets anders te eten, of de pita's voor iets anders te gebruiken.<br>Dit recept is voor 8 pita's.",
//   "photoURL": "https://firebasestorage.googleapis.com/v0/b/cookboek-45150.appspot.com/o/photos%2F399A535D-9E49-4F00-A16C-27BAD2EA6FBD.jpeg?alt=media&token=4375a216-8028-43f7-853c-d8db19795a7f",
//   "instructions": "Snijd de kip in blokjes van 2 a 3 cm en doe het in een middelgrote kom. doe de rest van de marinade ingrediënten er bij hussel het goed door elkaar en dek het af met folie. laat minimaal 1 uur marineren, maar liefst rond de 10 uur.<br><br>Voor de pita's: doe de gist en het suiker bij het water (niet te heet, moet aangenaam zijn om aan te raken, rond 30C) en laat het 5 minuten staan. Afzonderlijk, in een grote kom meng je de bloem en zout. Giet het gistmengsel bij de bloem en meng met de hand tot een ruw deeg. Kneed vervolgens 2-3 minuten of tot het een gladde massa is.<br>Leg je deeg in een licht ingevette kom (olijfolie), dek af met plasticfolie en laat 1 uur rijzen of tot het in volume verdubbeld is.<br>Kneed het deeg super kort (10 sec) en verdeel in 8 gelijke stukken (~150gr). Rol alle stukken tot bollen en dek ze af met een vochtige theedoek en laat ze rusten voor 15 min.<br>Plaats een van de ballen op een licht met bloem bestrooid werkoppervlak en rol elke bal met een deegroller in een schijf van ongeveer 20 cm breed (of iets kleiner dan de pan waar je ze in gaat bakken).<br><br>Om de pita te bakken: verwarm een pan met deksel op middelhoge stand. Doe een klein beetje olijfolie in de pan en leg het deeg er op. Voeg dan een klein beetje water toe aan de rand van de pan en doe direct de deksel er op. De pita's bakken en stomen gaar. Bak 2 minuten aan elke kant of tot er goud bruine plekken op de pita ontstaan.<br><br>De kruidenmix voor het vlees kan je maken door alle ingrediënten te mixen .<br><br>Laat de houten prikkers 10 minuten weken in water om ze minder snel te laten verbranden tijdens het grillen.<br>Het liefst gaan de spiesen op een BBQ, maar het kan ook goed in een oven.<br>Verdeel het vlees over de prikkers (laat wat ruimte om ze makkelijk vast te pakken). Verwarm de grill voor op middelhoge stand (combinatie met hele lucht oven kan ook). grill de kip tot deze goed gaar is.<br><br>Om het op te dienen pak je 1 pita smeer een een goede lepel Tzatziki op zie recept(https://cookboek.nl/recepten/detail/t3izzL3kmxS8EHVWGhBZ). Voeg hier vervolgens de Souvlaki en wat tomaat en ui aan toe. Optioneel kan je er ook wat versgebakken friet bij doen!<br>",
//   "ingredients": "Algemeen:<br>1 grote ui (fijn gesneden)<br>2 tomaten (in blokjes of parten gesneden)<br>handje verse peterselieblaadjes (optioneel)<br><br>Marinade ingrediënten:<br>1 kilo kippendij of kipfilet<br>sap van 1 citroen<br>30ml olijfolie<br>1 tl honing<br>2 teentjes knoflook (geperst)<br>1 eetlepel gedroogde oregano<br>3/4 tl zout<br>1/2 tl zwarte peper<br><br>Pita ingrediënten:<br>14gr instant yeast(gist)<br>18gr suiker<br>~0.5L warm water (rond de 30C)<br>750gr bloem<br>15gr zout<br>klein handje tijm<br><br>Kruidenmix Ingrediënten:<br>2 eetlepel gedroogde oregano<br>2 tl gedroogde tijm<br>1 tl knoflook poeder<br>1 tl zout<br>1 tl zwarte peper<br><br>Souvlaki ingrediënten:<br>12-16 prikkers/skewers (groot)<br>De gemarineerde kip (zie hierboven)<br>de kruidenmix (zie hierboven)",
//   "likes": 0,
//   "published": false,
//   "authorId": "f5e3a26d-76d4-4480-a6a7-61df3b9e1dd1",
//   "createdAt": "2023-12-22T11:54:13.571Z",
//   "author": {
//       "id": "f5e3a26d-76d4-4480-a6a7-61df3b9e1dd1",
//       "email": "energybartech@gmail.com",
//       "name": "Menno Guldemond",
//       "photoUrl": "https://lh3.googleusercontent.com/a/ACg8ocINNFnyv_LHC2bVlVsjpO9EamHaVq7RCjY_YmFlDK-SWus=s96-c",
//       "provider": "Google",
//       "createdAt": "2023-12-22T09:42:22.183Z"
//   }
// }
