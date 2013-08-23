$(document).ready(function() {
    /*
    $("select").each(function() {
    	
    	var menu = createDropDown($(this))
    	
    	menu.find(".dropdown dt a").click(function() {
	        menu.find(".dropdown dd ul").toggle();
	    });
	
	    $(document).bind('click', function(e) {
	        var $clicked = $(e.target);
	        if (! $clicked.parents().hasClass("drop down"))
	            $(".dropdown dd ul").hide();
	    });
	                
	    menu.find(".dropdown dd ul li a").click(function() {
	        var text = $(this).html();
	        menu.find(".dropdown dt a").html(text);
	        menu.find(".dropdown dd ul").hide();
	        
	        var source = $("#source");
	        // source.val($(this).find("span.value").html())
	    });
    
    });*/
    
    
});

function createDropDown(source){

    var selected = source.find("option:selected");
    var options = $("option", source);
    
    var menu = $('<dl class="drop down"></dl>');
    
    menu.append('<dt><a href="#">' + selected.text() + 
        '<span class="value">' + selected.val() + 
        '</span></a></dt>')
    menu.append('<dd><ul></ul></dd>')

    options.each(function(){
        menu.find("dd ul").append('<li><a href="#">' + 
            $(this).text() + '<span class="value">' + 
            $(this).val() + '</span></a></li>');
    });
    
    console.log(menu);
    
    source.replaceWith(menu);
    
    return menu;
    
}
