'use strict';

/**
 * @ngdoc function
 * @name cagefightApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cagefightApp
 */
angular.module('cagefightApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  	$scope.movie = {};
  	$scope.randomInt = function(min, max) {
  		return Math.floor(Math.random() * (max - min)) + min;
  	};
  	$scope.getMovie = function () {
  		var baseURL = 'http://api.themoviedb.org/3/movie/';
		console.log(' MovieService.js, Making request');
		var apiKey = 'a83e28dc44baf347eb09a87d44ee2885';
		var id = $scope.randomInt(100, 10000);
		return $http.get(baseURL + id + '?api_key=' + apiKey)
  			.success(function(response){
		// console.log("Response:", response)
				console.log(response);
				if((Number(response.release_date.split("").splice(0,4).join("")) > 1981) && (response.spoken_languages[0].name == 'English') && response.adult === false){
					// console.log("response: ", response)
					console.log("success")
					$scope.movie = response;
					console.log('$scope.movie', $scope.movie);
					return response;
				} else {
					return $scope.getMovie();
					console.log("before 1981")
				}
				})
			  .error(function(e){
				console.log("error")
				return $scope.getMovie();
			})
		};




  // 	function getRandomMovie(item) {
  // 		console.log('main.js, getRandomMovie', GrabMovie);
  // 		GrabMovie.getRandomMovie()
  // 			.success(function(response){
		// // console.log("Response:", response)
		// 		console.log(response)
		// 		if(Number(response.data.release_date.split("").splice(0,4).join("")) > 1981){
		// 			// console.log("response: ", response)
		// 			console.log("success")
		// 			return response;
		// 		} else {
		// 			return exports.getRandomMovie();
		// 			console.log("before 1981")
		// 		}
		// 	})
  // 		.error(function(e){
		// 	console.log("error")
		// 	return exports.getRandomMovie();
		// })
  // 	};
  }]);
