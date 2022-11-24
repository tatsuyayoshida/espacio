$(function() {
  //cookie
if($.cookie("disappear") != "ok"){
    $(".popup").removeClass("ok");
} else {
    $(".popup").addClass("ok");
}
$('#btn').click(function(){
    $.cookie("disappear", "ok", { expires: 1, path: "/" });
    $(".popup").addClass("ok");
});


});
