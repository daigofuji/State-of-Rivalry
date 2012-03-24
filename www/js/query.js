

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
		"change input": "update"
	},

	initialize: function() {
		
		_.bindAll(this);
		this.model.on("change", this.render)
		
		// $.get("", this.onData);
		
		this.onData({
			1: { "winner": "Yankees", shutout: true, time: "day" },
			2: { "winner": "Yankees", shutout: true, time: "night" },
			3: { "winner": "Yankees", shutout: false, time: "day" },
			4: { "winner": "Red Sox", shutout: false, time: "day" },
			5: { "winner": "Red Sox", shutout: false, time: "night" },
			6: { "winner": "Red Sox", shutout: true, time: "night" }
		})
		
	},
	
	onData: function(data) {
		
		
		var game_data = {
			properties: {
				"winner": { "type": "string", "unique": true },
				"shutout": { "type": "string", "unique": true },
				"time": { "type": "string", "unique": true }		
			},
			items: data
		};
		
		this.model.set("games", new Data.Collection(game_data));
		
	},
	
	render: function() {
	
		console.log(this.summarize({}));
		
		_.fill(this.summarize({}));
		
	},
	
	update: function() {
		
		this.model.set("conditions", _.reduce($("form").serializeArray(), function(memo, value, key) {
			memo[key] = value;
			return memo;
		}, {}));
		
	},
	
	summarize: function(conditions) {
		
		/* this.model.get("").filter().group(["official_language"], {
		  "population": {aggregator: Data.Aggregators.COUNT }
		}); */
		
		return {
			".yankees": this.model.count(_.safe_extend(conditions, { "winner": "Yankees" })),
			".redsox": this.model.count(_.safe_extend(conditions, { "winner": "Red Sox" })),
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
			model: new rivalry.Matchup()	
		});
	
	});

})(jQuery);





