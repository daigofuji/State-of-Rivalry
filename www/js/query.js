var countries_data = {
  "properties": {
    "name": {"name": "Country Name", "type": "string", "unique": true },
    "official_language": {"name": "Official Language", "type": "string", "unique": true },
    "population": { "name": "Population", "type": "number", "unique": true }
  },
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

var population = countries.properties().get('population');
console.log(population.aggregate(Data.Aggregators.COUNT)); 