// public/js/controllers/NerdCtrl.js

angular.module('PhotoCtrl', []).controller('PhotoController', function($scope) {
	$(document).on('click', '.dropdown-menu', function(e) {
  		e.stopPropagation();
	});
	$scope.errors = 0;
	$scope.user_id = "";
	$scope.tagline = 'Nothing beats a pocket protector!';
	$scope.getImagePath = function(imageName) {
		return "images/" + imageName;
	};
	$('#frm').submit(function() {
	    // Coding
	    $('#myModal').modal('toggle');
	    return false;
	});
	$scope.myImages = ["ic1.jpg", "ic3.jpg",
					   //"ic4.jpg", "ic5.jpg","ib2.jpg","ib3.jpg","image4.jpg",
					   //"image5.jpg", "image7.jpg",
					   "image8.jpg",
					   ];
	$scope.categories = ["a", "b", "c", "d"];


	// target elements with the "draggable" class
	interact('.draggable')
	  .draggable({
	    // enable inertial throwing
	    inertia: true,
	    
	    // keep the element within the area of it's parent
	    // restrict: {
	    // 	restriction: { 
	    // 		x: 0, 
	    // 		y: 0, 
	    // 		width: document.getElementById("graph").offsetWidth + document.getElementById("menu").offsetWidth, 
	    // 		height: document.getElementById("graph").offsetHeight
	    // 	}
	    // },

	    // enable autoScroll
	    autoScroll: true,

	    // call this function on every dragmove event
	    onmove: dragMoveListener,
	    // call this function on every dragend event
	    onend: function (event) {
	      var textEl = event.target.querySelector('p');

	      textEl && (textEl.textContent =
	        'moved a distance of '
	        + (Math.sqrt(event.dx * event.dx +
	                     event.dy * event.dy)|0) + 'px');
	    }
	  });

	function dragMoveListener (event) {
		var target = event.target,
		    // keep the dragged position in the data-x/data-y attributes
		    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
		    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

		// translate the element
		target.style.webkitTransform =
		target.style.transform =
		  'translate(' + x + 'px, ' + y + 'px)';

		// update the posiion attributes
		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
		// (target.children[0]).classList.remove('unmoved'); // remove the unmoved class
	}

	$scope.setTag = function(type, id, checkbox_id) {
		var check_status = document.getElementById(checkbox_id).checked;
		var image = document.getElementById(id);
		var comment_arr= image.getAttribute('comment');
		var split_arr = [];

		if (comment_arr === null || comment_arr === undefined || comment_arr.length === 0) {
			comment_arr = [];
			comment_arr.push(type);
		} else {
			split_arr = comment_arr.split(',');
			if (split_arr.length === 0) {
				comment_arr = null;
			} else if (check_status === true) {
				if (split_arr.indexOf(type) === -1) {
					split_arr.push(type);
					comment_arr = split_arr;
				}
			} else {
				split_arr.splice(split_arr.indexOf(type), 1);
				comment_arr = split_arr;
			}
		}
		image.setAttribute('comment', comment_arr);
		// if (comment_arr.length > 0) {
		// 	(image.children[0]).classList.remove('unchanged'); // remove the unchecked class	
		// } else {
		// 	(image.children[0]).className += ' unchanged'; // remove the unchecked class	
		// }
	}
	var getXGroup = function(x_location, total_width) {
		console.log("total-width: ", total_width);
		var groupSize = total_width / 7;
		if (0 <= x_location && x_location <= groupSize) {
			return -3;
		} else if (groupSize < x_location && x_location <= groupSize*2) {
			return -2;
		} else if (groupSize*2 < x_location && x_location <= groupSize*3) {
			return -1;
		} else if (groupSize*3 < x_location && x_location <= groupSize*4) {
			return 0;
		} else if (groupSize*4 < x_location && x_location <= groupSize*5) {
			return 1;
		} else if (groupSize*5 < x_location && x_location <= groupSize*6) {
			return 2;
		} else if (groupSize*6 < x_location && x_location <= total_width) {
			return 3;
		} else {
			return "error";
		}
	}
	var getYGroup = function(y_location, total_height) {
		console.log("total-height: ", total_height);
		var groupSize = total_height / 7;
		if (0 <= y_location && y_location <= groupSize) {
			return 3;
		} else if (groupSize < y_location && y_location <= groupSize*2) {
			return 2;
		} else if (groupSize*2 < y_location && y_location <= groupSize*3) {
			return 1;
		} else if (groupSize*3 < y_location && y_location <= groupSize*4) {
			return 0;
		} else if (groupSize*4 < y_location && y_location <= groupSize*5) {
			return -1;
		} else if (groupSize*5 < y_location && y_location <= groupSize*6) {
			return -2;
		} else if (groupSize*6 < y_location && y_location <= total_height) {
			return -3;
		} else {
			return "error";
		}
	}

	$scope.validate = function() {

		var list = document.getElementsByClassName('dropdown');
		var errors = document.getElementsByClassName('dropdown').length;
		
		console.log("errors: " + errors + " list: " + list);

		for (var i = 0; i < list.length; i++) {
			if (list[i].getAttribute('data-x') === null || list[i].getAttribute('data-x') === undefined || list[i].getAttribute('data-x') === ""
				|| list[i].getAttribute('data-y') === null || list[i].getAttribute('data-y') === undefined || list[i].getAttribute('data-y') === ""
				|| list[i].getAttribute('comment') === null || list[i].getAttribute('comment') === undefined || list[i].getAttribute('comment') === "" 
				|| getYGroup(list[i].getBoundingClientRect().top, document.getElementById('graph').offsetHeight) === "error" 
				|| getXGroup(list[i].getBoundingClientRect().left, document.getElementById('graph').offsetWidth) === "error") {
				list[i].children[0].classList.remove('validate_image');
				if (!list[i].children[0].classList.contains('error_image')) {
					list[i].children[0].className += ' error_image'	;
				}
			} else {
				list[i].children[0].classList.remove('error_image');
				if (!list[i].children[0].classList.contains('validate_image')) {
					list[i].children[0].className += ' validate_image';
				}
				errors--;
			}
		}

		if (errors === 0) {
			$scope.gather();
		} else {
			alert("You have " + errors + " errors to fix. Fix them, and then resubmit!");
		}
	}

	$scope.gather = function() {
		var list = document.getElementsByClassName('dropdown');
		var streamList = [];
		for (var i = 0; i < list.length; i++) {
			if (list[i].getAttribute('comment') !== null || list[i].getAttribute('comment') !== undefined) {
				var comment_arr = list[i].getAttribute('comment').split(',');
			} else {
				var comment_arr = list[i].getAttribute('comment');
			}
			var stream_photo = {user_id: $scope.user_id,
								image: list[i].getAttribute('id'), 
								x_location: list[i].getBoundingClientRect().left,
								y_location: list[i].getBoundingClientRect().top,
								x_category: getXGroup(list[i].getBoundingClientRect().left, document.getElementById('graph').offsetWidth),
								y_category: getYGroup(list[i].getBoundingClientRect().top, document.getElementById('graph').offsetHeight),
								graph_width: document.getElementById('graph').offsetWidth,
								graph_height: document.getElementById('graph').offsetHeight,
								comment: comment_arr};
			streamList.push(stream_photo);
		}
		var JsonList = JSON.stringify(streamList);
		console.log(JsonList);
		for (var i = 0; i < streamList.length; i++) {
			$.post('/submit', streamList[i]);
		}
		alert("You've successfully completed the form!!!");



		// added starts 
		alert(JsonList);
		JSON.stringify(JsonList)		

		// added ends 

		location.reload();
	}

	$scope.generateCommentArray = function(image_id) {
		var curr = document.getElementById(image_id).getAttribute('comment');
		if (curr !== null) {
			return curr.split(',');
		}
	}
});