//var sort = [0];
$(document).ready(function() {
	$('#input_tag').submit(function(event){
		if (listCount()) {
			$('#error').text('30 tag limit');
		}
		else {
			//get the value of the tags the user submitted
			$('#error').text('');
			var tag = $(this).find("input[name='place']").val();
			getTagTotals(tag);
			$('#input_tag').children('#text').val('');
		}
	});

	$('#button').click(function(event){
		$('#display').empty();
		$('#error').text('');
		$('#text').focus();
	});
});

var showTagTotals = function(data) {
	var result = $('.template ol li:first-child');
	// var print = "#" + data.name + " " + numberWithCommas(data.media_count);
	var print = "#" + data.name + " " + data.media_count //.toLocaleString();
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
		var rank = showTagTotals(result.data);
		$('#target ol').append(rank);
		//console.log($('#target #display > li').text());
		sortDisplay();
	})
	.fail(function(jqXHR, error, errorThrown){
		console.log("your response is bad and you should feel bad");
		var errorElem = showError(error);
		$('#target').append(errorElem);
	});
};

var sortDisplay = function() {
	var liContents = [];
	var contents = [];
	//console.log($('#target ol li').text());
	$('#target #display > li').each (function() {
		liContents.push([removeCommas(removeDigits($(this).text())), parseInt(removeNonDigits($(this).text()),10)]);
		//console.log(parseInt(removeNonDigits($(this).text()),10));
	});

	liContents.sort(numOrdAsc);
	for (var x = 0; x < liContents.length; x++) {
		console.log(liContents[x]);
	}
	$('#target #display > li').each(function() {
		contents.unshift(liContents.pop());
		var tag_name = contents[0][0];
		var tag_count = contents[0][1];
		$(this).text(tag_name + " " + tag_count);
	});

	$('#target #display > li').each(function() {
		console.log($(this).text());
		console.log($(this).text().indexOf(",") == -1);
		if (($(this).text()).indexOf(",") == -1) {
			$(this).text(numberWithCommas($(this).text()));
		}
	});
};

function listCount(){
	var count = 0;
	$('#target #display > li').each(function() {
		count++;
		console.log(count);
	})
	return count >= 30;
}

function numOrdAsc(a, b) {
	return (a[1] - b[1]);
}

function removeNonDigits(str) {
	return(str.replace(/\D/g, ''));
}

function removeDigits(str) {
	return(str.replace(/\d+/g,''));
}

// not using toLocaleString()
function numberWithCommas(str) {
    return (str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}

function removeCommas(str) {
	return(str.replace(/[,]+/g, ''));
}