$(document).ready(function(){
	$("#announcebutton").click(function(){
		$(".makeannouncement").show();
		$(".showannouncement").hide();
	});
	$.ajax({
		type:"GET",
		url:"static/announcements.html",
		success: function(data){
			$(".showannouncement").prepend(data);
		},
		cache: false
	});
});