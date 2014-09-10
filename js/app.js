var sort = [0];

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
	// var print = "#" + data.name + " " + numberWithCommas(data.media_count);
	var print = "#" + data.name + " " + data.media_count.toLocaleString();
	result.text(print);
	totalSort(data);
	return result;
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var totalSort = function(num) {
	if (sort[0] == 0) {
		sort[0] = num;
	}
	else if (sort.length == 30) {
		console.log("no more tags");
	}
	else if (num.media_count > sort[0].media_count) {
		sort.unshift(num);
	}
	else if (num.media_count < sort[sort.length - 1].media_count) {
		sort.push(num);
	}
	else {
		for (x = 0; x < sort.length; x++) {
			if (num.media_count > sort[x].media_count) {
				sort.splice(x, 0, num);
				break;
			}
		}
	}


	for (x = 0; x < sort.length; x++) {
		console.log(sort[x].media_count);
	}
	console.log("new click");
}

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
		var errorElem = showError(error);
		$('.target').append(errorElem);
	});
};