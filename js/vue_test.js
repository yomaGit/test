$("#input input").keyup(function(){
    $("#input .html").html($(this).val());
})