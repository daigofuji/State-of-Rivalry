var countries_data = {
   "properties": {
    "name": {"type": "string", "unique": true },
    "official_language": {"name": "Official Language", "type": "string", "unique": true },
    "population": { "name": "Population", "type": "number", "unique": true }
  }, /**/
  "items": {
    "austria": {
      "name": "Austria",
      "official_language": "German",
      "population": 8356700,
    },
    "ger": {
      "name": "Germany",
      "official_language": "German",
      "population": 82062200,
    },
    "usa": {
      "name": "United States of America",
      "official_language": "English",
      "population": 310955497,
    }
  }
}

var countries = new Data.Collection(countries_data);

console.log(countries.find({ "name": "Austria" }).length);

var population = countries.properties().get('population');
console.log(population.aggregate(Data.Aggregators.COUNT)); 

var languages = countries.group(["official_language"], {
  "population": {aggregator: Data.Aggregators.COUNT }
});

languages.items().at(0).get('name'); // => "German"
languages.items().at(0).get('population') // => 90418900
languages.items().at(1).get('population') // => 310955497 for "English"

var game_data = {
	"properties": {
		"winner": { "type": "string", "unique": true },
		"shutout": { "type": "boolean", "unique": true }
	},
	"items": {
		"1": { 
			"winner": "Yankees",
			"shutout": false
		},
		"2": { 
			"winner": "Red Sox",
			"shutout": true
		},
		"3": { 
			"winner": "Red Sox",
			"shutout": true
		},
		"4": { 
			"winner": "Red Sox",
			"shutout": false
		}
	}
}

var games = new Data.Collection(game_data);

var winners = games.group(["winner"]/* , { winner: {aggregator: Data.Aggregators.COUNT, name: "Number of wins"}}  */);
