//why is sortDisplay() ahead of .ajax

//var sort = [0];

$(document).ready(function() {
	$('#input_tag').submit(function(event){
		if (listCount()) {
			console.log('30 tags max');
		}
		// zero out results if previous search has run
		//$('#target').html('');

		//get the value of the tags the user submitted
		var tag = $(this).find("input[name='place']").val();
		getTagTotals(tag);
		$('#input_tag').children('#text').val('');
	});
});

var showTagTotals = function(data) {
	var result = $('.template ol li:first-child');
	// var print = "#" + data.name + " " + numberWithCommas(data.media_count);
	var print = "#" + data.name + " " + data.media_count //.toLocaleString();
	result.text(print);
	//totalSort(data);
	return result;
};

// var totalSort = function(num) {
// 	if (sort[0] == 0) {
// 		sort[0] = num;
// 		console.log('brand new');
// 	}
// 	else if (num.media_count > sort[sort.length - 1].media_count) {
// 		for (x = 0; x < sort.length; x++) {
// 			if (num.media_count > sort[x].media_count) {
// 				sort.splice(x, 0, num);
// 				x = sort.length;
// 			}
// 		}
// 	}
// 	else {
// 		sort.push(num);
// 	}
// 	// sort should not contain more than 30 values
// 	if (sort.length == 31) {
// 		sort.pop();
// 	}

// 	//debug
// 	for (x = 0; x < sort.length; x++) {
// 		console.log(sort[x]);
// 	}
// 	console.log("Index of: " + sort.indexOf(num));
// 	console.log("Array size: " + sort.length);
// 	console.log('end of totalSort');
// 	//end debug

// 	return sort.indexOf(num);
// }

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
		//var location = totalSort(result.data);
		//$('#target ol:nth-child('+ (location + 1) +')').prepend(rank);
		// $('#target ol:nth-child(1)').append(rank);
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
		liContents.push([removeDigits($(this).text()), parseInt(removeNonDigits($(this).text()),10)]);
		console.log(parseInt(removeNonDigits($(this).text()),10));
	});

	liContents.sort(numOrdAsc);
	$('#target #display > li').each(function() {
		//console.log('call');
		//var tag_name = removeDigits($(this).text());
		//console.log(tag_name);
		contents.unshift(liContents.pop());
		$(this).text(contents[0][0] + " " + contents[0][1]);
	})
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

// using toLocalString()
// function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }