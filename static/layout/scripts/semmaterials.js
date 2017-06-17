$(document).ready(function(){
	
	$(".semmaterials").click(function(){
		$(".hide").hide();
		$(".materialselect").show();
	});

/*	$(".level1 button").click(function(){
		$(".level1 button").css({"backgroundColor":"#562351", "borderStyle":"none", "color":"white"});
		$(this).css({"backgroundColor":"white", "border":"1px solid rgb(71,71,71)", "color":"rgb(71,71,71)"});
		$(".materialselect .level2").show();
		$(".materialselect .level3").hide();
	});*/

/*	$(".level2 button").click(function(){
		$(".level2 button").css({"backgroundColor":"#562351", "borderStyle":"none", "color":"white"});
		$(this).css({"backgroundColor":"white", "border":"1px solid rgb(71,71,71)", "color":"rgb(71,71,71)"});
		$(".materialselect .level3").show();
	});*/

	$("#closematerialselect").click(function(){
		$(".level1 button").css({"backgroundColor":"#562351", "borderStyle":"none", "color":"white"});
		$(".level2 button").css({"backgroundColor":"#562351", "borderStyle":"none", "color":"white"});
		$(".materialselect .level3").hide();
		$(".materialselect .level2").hide();
		$(".hide").show();
		$(".materialselect").hide();
	});

	var buttoncontent;
	var commandarr = ["null", "null", "null", "false"]; //An array whose JSON instance will be sent to backend to decide what specific action to be taken
	var commandarrjson = JSON.stringify(commandarr);

	$(".materialselect button").hover(function(){
		buttoncontent = $(this).html();
		$(this).html("<button class=\"tempbuttons\">Download</button><button class=\"tempbuttons\">Open</button>");
		$(".tempbuttons").css({"width":"50%", "backgroundColor":"white", "border":"1px solid rgb(71,71,71)", "color":"rgb(71,71,71)", "margin":"0px 0px 0px 0px"});
		$(".tempbuttons").click(function(){
			if($(this).text()=="Download"){
			/*A download request would be sent here*/
				alert("Downloading");
				if(0 < buttoncontent[0] && buttoncontent[0] < 10){
					$(".level3 button").css({"backgroundColor":"#562351", "borderStyle":"none", "color":"white"});
					$(".level2 button").css({"backgroundColor":"#562351", "borderStyle":"none", "color":"white"});
					$(".level1 button").css({"backgroundColor":"#562351", "borderStyle":"none", "color":"white"});
					$(".materialselect .level3").hide();
					$(".materialselect .level2").hide();
					$(this).parent().css({"backgroundColor":"white", "border":"1px solid rgb(71,71,71)", "color":"rgb(71,71,71)"});
					commandarr = ["null", "null", "null", "false"]; 	
					commandarr[0] = buttoncontent;
					commandarrjson = JSON.stringify(commandarr);
					//send a download request
				}
				else if (buttoncontent=="Assignments"||buttoncontent=="Books"||buttoncontent=="Notes"||buttoncontent=="Question Papers"){
						$(".level3 button").css({"backgroundColor":"#562351", "borderStyle":"none", "color":"white"});
						$(this).parent().css({"backgroundColor":"white", "border":"1px solid rgb(71,71,71)", "color":"rgb(71,71,71)"});
						commandarr[2] = buttoncontent; commandarr[3] = "false";
						commandarrjson = JSON.stringify(commandarr);
						//send a download request
					}
					else{
						$(".level3 button").css({"backgroundColor":"#562351", "borderStyle":"none", "color":"white"});
						$(".level2 button").css({"backgroundColor":"#562351", "borderStyle":"none", "color":"white"});
						$(this).parent().css({"backgroundColor":"white", "border":"1px solid rgb(71,71,71)", "color":"rgb(71,71,71)"});
						$(".materialselect .level3").hide();
						commandarr[2] = "null"; commandarr[3] = "false"; 
						commandarr[1] = buttoncontent;
						commandarrjson = JSON.stringify(commandarr);
						//send a download request
					}
			}
			else{
				if(0 < buttoncontent[0] && buttoncontent[0] < 10){
					$(".level1 button").css({"backgroundColor":"#562351", "borderStyle":"none", "color":"white"});
					$(".level2 button").css({"backgroundColor":"#562351", "borderStyle":"none", "color":"white"});
					$(".level3 button").css({"backgroundColor":"#562351", "borderStyle":"none", "color":"white"});
					$(this).parent().css({"backgroundColor":"white", "border":"1px solid rgb(71,71,71)", "color":"rgb(71,71,71)"});
					
					var sublistno = buttoncontent[0];
					if(buttoncontent[0]==1){			//Different cases for first and tenth semester, both have 1 as buttoncontent[0]
						if(buttoncontent[1]==0){
							sublistno = "10";
						}
						else{
							sublistno = "1";
						}
					}

					$.ajax({
						type:"GET",
						url:"static/subjectlist/sem"+sublistno+".json",
						success: function(data){
							var sublist = JSON.parse(data);
							var	buttonlist = document.getElementsByClassName("level2")[0].childNodes;
							var i=0, k=sublist.length, m=buttonlist.length;
							for (i=0; i<k; i++){
								buttonlist[i].innerHTML = sublist[i];
								buttonlist[i].style.display = "inline-block"
							}
							for (i=k; i<m; i++){
								buttonlist[i].style.display = "none";
							}
					}});
					
					$(".materialselect .level2").show();
					$(".materialselect .level3").hide();
					commandarr = ["null", "null", "null", "false"]; 	
					commandarr[0] = buttoncontent;
					}
				else{
					if(buttoncontent=="Assignments"||buttoncontent=="Books"||buttoncontent=="Notes"||buttoncontent=="Question Papers"){
						$(".level3 button").css({"backgroundColor":"#562351", "borderStyle":"none", "color":"white"});
						$(this).parent().css({"backgroundColor":"white", "border":"1px solid rgb(71,71,71)", "color":"rgb(71,71,71)"});
						commandarr[2] = buttoncontent;
						commandarr[3] = "true";
						commandarrjson = JSON.stringify(commandarr);
						$.ajax({
						type:"POST",
						data:{'commandarr':commandarrjson},
						url:"/listdrivefiles",
						success: function(data){
						alert(data);
						}});
					}
					else{
						$(".level2 button").css({"backgroundColor":"#562351", "borderStyle":"none", "color":"white"});
						$(".level3 button").css({"backgroundColor":"#562351", "borderStyle":"none", "color":"white"});
						$(this).parent().css({"backgroundColor":"white", "border":"1px solid rgb(71,71,71)", "color":"rgb(71,71,71)"});
						$(".materialselect .level3").show();
						commandarr[2] = "null";
						commandarr[1] = buttoncontent;
					}
				}
			}
	});
	}, function(){
		$(this).html(buttoncontent);
	});
});