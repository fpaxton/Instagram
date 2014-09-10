$(document).ready(function() {
	$('#input_tag').submit(function(event){
		// zero out results if previous search has run
		//$('#target').html('');

		//get the value of the tags the user submitted
		var tag = $(this).find("input[name='place']").val();
		getTagTotals(tag);
		$('#input_tag').children('#text').val('');
	});
});

var showTagTotals = function(data) {
	var result = $('.template ol li:first-child').clone();
	// attempting indentions
	// var obj = data;
	// console.log(obj);
	// var str = JSON.stringify(obj,null, 2); // indentation level = 2
	// console.log(str);
	// result.text(str);
	//previous ugly print out
	var print = "#" + data.name + " " + data.media_count;
	//result.text("#"+ data.name + " " + data.media_count);
	result.text(print);
	return result;
};

var getTagTotals = function(tag) {
	// the parameters we need to pass in our request to StackOverflow's API
	var request = {	tag_name : tag,
					client_id : '4368195e3c034a8489f50f4f9012797a',
				};

	var result = $.ajax({
		url: "https://api.instagram.com/v1/tags/"+ request.tag_name,
		data: request,
		dataType: "jsonp",
		type: "GET",
	})
	.done(function(result){
		rank = showTagTotals(result.data);
		$('#target ol').prepend(rank);
	})
	.fail(function(jqXHR, error, errorThrown){
		console.log("your response is bad and you should feel bad");
		//var errorElem = showError(error);
		//$('.search-results').append(errorElem);
	});
};