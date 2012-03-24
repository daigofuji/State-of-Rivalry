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
  "population": {aggregator: Data.Aggregators.SUM, name: "Total Population"}
});


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


var rivalry = {};


rivalry.Matchup = Backbone.Model.extend({ 
	
	defaults: {
	
	
	}, 
	
	initialize: function() {
	
	
	
	}
	
})

rivalry.MatchupExplorer = Backbone.View.extend({ 
	
	
	events: {
		"change input": "update"
	},

	initialize: function() {
		
		_.bindAll(this);
		this.model.on("change", this.render)
		
		// $.get("", this.onData);
		
	},
	
	onData: function(data) {
		
		var game_data = {
			properties: {
				"": { "type": "", "unique": true },
				"": { "type": "", "unique": true },
				"": { "type": "", "unique": true },
				"": { "type": "", "unique": true },
				"": { "type": "", "unique": true }, 
				"": { "type": "", "unique": true },
				"": { "type": "", "unique": true }			
			},
			items: []
		};
		
		this.model.set("games", new Data.Collection(game_data));
		
	},
	
	render: function() {
		
		_.fill(this.summarize());
		
	},
	
	update: function() {
		
		this.model.set("conditions", _.reduce($("form").serializeArray(), function(memo, value, key) {
			memo[key] = value;
			return memo;
		}, {}));
		
	},
	
	summarize: function(conditions) {
		
		
		
	},
	
	fill: function(elements) {
	
		_.each(elements, function(html, target) {
			$(target).html(html);
		});
	
	},
	
	rekey: function() {
	
	}

});

_.mixin({
  	fill : function(elements) {
		_.each(elements, function(html, target) {
			$(target).html(html);
		});
	},
	rekey: function(data, keys) {
		
		return _.reduce(data, function(memo, value, key) {
			var newkey = keys[key];
			memo[newkey] = value;
			return memo;
		}, {});
		
		
	}
});

(function($) {

	$(function() {
		
		rivalry.explorer = new rivalry.MatchupExplorer({ 
			model: new rivalry.Matchup()	
		});
	
	});

})(jQuery);





