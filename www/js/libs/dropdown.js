$(document).ready(function() {
    createDropDown();
    
    $(".dropdown dt a").click(function() {
        $(".dropdown dd ul").toggle();
    });

    $(document).bind('click', function(e) {
        var $clicked = $(e.target);
        if (! $clicked.parents().hasClass("drop down"))
            $(".dropdown dd ul").hide();
    });
                
    $(".dropdown dd ul li a").click(function() {
        var text = $(this).html();
        $(".dropdown dt a").html(text);
        $(".dropdown dd ul").hide();
        
        var source = $("#source");
        source.val($(this).find("span.value").html())
    });
});

function onDropDownChange() {


}

function createDropDown(){
    var source = $("#source");
    var selected = source.find("option[selected]");
    var options = $("option", source);
    
    $("body").append('<dl id="target" class="drop down"></dl>')
    $("#target").append('<dt><a href="#">' + selected.text() + 
        '<span class="value">' + selected.val() + 
        '</span></a></dt>')
    $("#target").append('<dd><ul></ul></dd>')

    options.each(function(){
        $("#target dd ul").append('<li><a href="#">' + 
            $(this).text() + '<span class="value">' + 
            $(this).val() + '</span></a></li>');
    });
}
