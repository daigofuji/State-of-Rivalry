

var rivalry = {};


rivalry.Matchup = Backbone.Model.extend({ 
	
	defaults: {
	
	
	}, 
	
	initialize: function() {
		
		_.bindAll(this);
	
	
	},
	
	count: function(conditions) {
		
		
		return this.get("games").filter(conditions).items().length;
		
	} 
	
})

rivalry.MatchupExplorer = Backbone.View.extend({ 
	
	
	events: {
		"change select": "render"
	},

	initialize: function() {
		
		_.bindAll(this);
		// this.model.on("change", this.render)
		
		// $.get("", this.onData);
		
		this.onData([{"id":10361,"name":"Tampa Bay Rays-Baltimore Orioles","started_at":"2012-03-05T13:05:00-05:00","home_team":{"id":451,"name":"Tampa Bay Rays","abbrev":"TAM","nickname":"Rays","location":"Tampa Bay","hashtag":"Rays","sports_ml_key":"l.mlb.com-t.4","league":{"id":5,"name":"Major League Baseball","abbrev":"MLB","sports_ml_key":"l.mlb.com"}},"home_team_score":1,"home_team_outcome":"loss","away_team":{"id":448,"name":"Baltimore Orioles","abbrev":"BAL","nickname":"Orioles","location":"Baltimore","hashtag":"Orioles","sports_ml_key":"l.mlb.com-t.1","league":{"id":5,"name":"Major League Baseball","abbrev":"MLB","sports_ml_key":"l.mlb.com"}},"away_team_score":3,"away_team_outcome":"win","description":null,"upcoming":false,"in_progress":false,"ended":true,"scored":false,"sports_ml_key":"l.mlb.com-2012-e.35727","game_stat":{"id":134,"winning_pitcher":{"id":8818,"name":"Brad Bergesen","position":"U","sports_ml_key":"l.mlb.com-p.18028","team":{"id":448,"name":"Baltimore Orioles","abbrev":"BAL","nickname":"Orioles","location":"Baltimore","hashtag":"Orioles","sports_ml_key":"l.mlb.com-t.1","league":{"id":5,"name":"Major League Baseball","abbrev":"MLB","sports_ml_key":"l.mlb.com"}}},"losing_pitcher":{"id":8830,"name":"Alex Cobb","position":"U","sports_ml_key":"l.mlb.com-p.21254","team":{"id":451,"name":"Tampa Bay Rays","abbrev":"TAM","nickname":"Rays","location":"Tampa Bay","hashtag":"Rays","sports_ml_key":"l.mlb.com-t.4","league":{"id":5,"name":"Major League Baseball","abbrev":"MLB","sports_ml_key":"l.mlb.com"}}},"saving_pitcher":{"id":8821,"name":"Pedro Strop","position":"U","sports_ml_key":"l.mlb.com-p.15147","team":{"id":448,"name":"Baltimore Orioles","abbrev":"BAL","nickname":"Orioles","location":"Baltimore","hashtag":"Orioles","sports_ml_key":"l.mlb.com-t.1","league":{"id":5,"name":"Major League Baseball","abbrev":"MLB","sports_ml_key":"l.mlb.com"}}},"attendance":"3720","duration":"163"}},{"id":10444,"name":"St. Louis Cardinals-Miami Marlins","started_at":"2012-03-05T13:05:00-05:00","home_team":{"id":463,"name":"St. Louis Cardinals","abbrev":"STL","nickname":"Cardinals","location":"St. Louis","hashtag":"Cardinals","sports_ml_key":"l.mlb.com-t.25","league":{"id":5,"name":"Major League Baseball","abbrev":"MLB","sports_ml_key":"l.mlb.com"}},"home_team_score":3,"home_team_outcome":"loss","away_team":{"id":465,"name":"Miami Marlins","abbrev":"MIA","nickname":"Marlins","location":"Miami","hashtag":"Marlins","sports_ml_key":"l.mlb.com-t.16","league":{"id":5,"name":"Major League Baseball","abbrev":"MLB","sports_ml_key":"l.mlb.com"}},"away_team_score":4,"away_team_outcome":"win","description":null,"upcoming":false,"in_progress":false,"ended":true,"scored":false,"sports_ml_key":"l.mlb.com-2012-e.35836","game_stat":{"id":133,"winning_pitcher":{"id":8846,"name":"Josh Johnson","position":"U","sports_ml_key":"l.mlb.com-p.11066","team":{"id":465,"name":"Miami Marlins","abbrev":"MIA","nickname":"Marlins","location":"Miami","hashtag":"Marlins","sports_ml_key":"l.mlb.com-t.16","league":{"id":5,"name":"Major League Baseball","abbrev":"MLB","sports_ml_key":"l.mlb.com"}}},"losing_pitcher":{"id":8861,"name":"Kyle Lohse","position":"U","sports_ml_key":"l.mlb.com-p.5900","team":{"id":463,"name":"St. Louis Cardinals","abbrev":"STL","nickname":"Cardinals","location":"St. Louis","hashtag":"Cardinals","sports_ml_key":"l.mlb.com-t.25","league":{"id":5,"name":"Major League Baseball","abbrev":"MLB","sports_ml_key":"l.mlb.com"}}},"saving_pitcher":{"id":8852,"name":"Dan Jennings","position":"U","sports_ml_key":"l.mlb.com-p.20722","team":{"id":465,"name":"Miami Marlins","abbrev":"MIA","nickname":"Marlins","location":"Miami","hashtag":"Marlins","sports_ml_key":"l.mlb.com-t.16","league":{"id":5,"name":"Major League Baseball","abbrev":"MLB","sports_ml_key":"l.mlb.com"}}},"attendance":"6235","duration":"158"}}]
)
		
		
		this.render();
	},
	
	onData: function(data) {
		
		data = _.reduce(data, function(memo, item, index) {
			item.home_team_abbrev = item.home_team.abbrev;
			item.score_margin = Math.abs(item.home_team_score - item.away_team_score);
			
			var home_outcomes = {
				"loss": item.away_team,
				"win": item.home_team,
				"tie": {
					abbrev: "TIE"
				}
			}
			
			item.winner = home_outcomes[item.home_team_outcome];
			item.winner_abbrev = item.winner.abbrev;
			memo[index] = item;
			return memo;
		}, {});
		
		var game_data = {
			properties: {
				"home_team_abbrev": { "type": "string", unique: true },
				"winner_abbrev": { "type": "string", unique: true },
				"day_or_night": { "type": "string", unique: true },
				"score_margin": { "type": "number", unique: true },
			},
			items: data
		};
		
		console.log("data", data);
		
		this.model.set("games", new Data.Collection(game_data));
		
	},
	
	render: function() {
		
		this.update();
		
		var conditions = this.model.get("conditions");
		
		console.log("!", conditions);
	
		console.log(this.summarize(conditions));
		
		_.fill(this.summarize(conditions));
		
	},
	
	update: function() {
		
		var conditions = _.reduce($("form").serializeArray(), function(memo, record) {
			value = record.value;
			key = record.name;
			if (value == "-") return memo;
			if (key == "score_margin" && value > 1) key = "score_margin>=";
			memo[key] = value;
			return memo;
		}, {});
		
		this.model.set("conditions", conditions);
		
		return conditions;
		
	},
	
	summarize: function(conditions) {
		
		return {
			".num.ny": this.model.count(_.safe_extend(conditions, { "winner_abbrev": "BAL" })),
			".num.bos": this.model.count(_.safe_extend(conditions, { "winner_abbrev": "TAM" })),
			".total": this.model.count(_.safe_extend(conditions))
		};
		
	},

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
		
		
	},
	safe_extend: function(original, values) {
		
		return _.extend(_.clone(original), values)
	
	}
});

(function($) {

	$(function() {
		
		rivalry.explorer = new rivalry.MatchupExplorer({ 
			model: new rivalry.Matchup(),
			el: $("form")	
		});
	
	});

})(jQuery);





