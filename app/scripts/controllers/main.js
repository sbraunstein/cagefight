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
  	$scope.moviePoster = {};
  	$scope.points = 0;

  	$scope.getCageMovie = function () {
	var URL = 'http://api.themoviedb.org/3/person/2963/movie_credits?api_key=a83e28dc44baf347eb09a87d44ee2885';
	var id = $scope.randomInt(0, 85);
		return $http.get(URL)
			.success(function(response) {
				console.log('getCageMovie function', response);
				$scope.movie.title = response.cast[id].title;
				$scope.moviePoster = 'https://image.tmdb.org/t/p/w185' + response.cast[id].poster_path;
				console.log('movie poster',$scope.moviePoster);
			})
  	};
  	// $scope.quote = {};
  	$scope.randomInt = function(min, max) {
  		return Math.floor(Math.random() * (max - min)) + min;
  	};
  	$scope.yesMovieInfo = function (obj) {
  		for(var i = 0; i < obj.cast.length; i++){
  			if(obj.cast[i].title === $scope.movie.title){
	  				$scope.points++;
	  				alert('Correct Answer. Your cage sense is tingling')
	  				return $scope.getMovie();
  			}
  		}
  	};
  	$scope.noMovieInfo = function (obj) {
  		for(var i = 0; i < obj.cast.length; i++){
  			if(obj.cast[i].title === $scope.movie.title){
  				alert('Wrong Answer. You arent caging hard enough')
  				return $scope.getMovie();
  			}
  		}
  		$scope.points++;
  		return $scope.getMovie();
  	};
  	$scope.yes = function () {
  		var URL = 'http://api.themoviedb.org/3/person/2963/movie_credits?api_key=a83e28dc44baf347eb09a87d44ee2885';
		return $http.get(URL)
			.success(function(response) {
					console.log('yes function', response)
				return $scope.yesMovieInfo(response);
			});
  	};
  	$scope.no = function () {
  		var URL = 'http://api.themoviedb.org/3/person/2963/movie_credits?api_key=a83e28dc44baf347eb09a87d44ee2885';
		console.log(' MovieService.js, Making request');
		return $http.get(URL)
			.success(function(response) {
				console.log('no function', response.cast[0].title)
				return $scope.noMovieInfo(response);
			})
  	};
  	$scope.getMovie = function () {
  		var baseURL = 'http://api.themoviedb.org/3/movie/';
		console.log(' MovieService.js, Making request');
		var apiKey = 'a83e28dc44baf347eb09a87d44ee2885';
		var id = $scope.randomInt(100, 10000);
		return $http.get(baseURL + id + '?api_key=' + apiKey)
  			.success(function(response){
		// console.log("Response:", response)
				if((Number(response.release_date.split("").splice(0,4).join("")) > 1981) && (response.spoken_languages[0].name === 'English') && (response.adult === false)){
					// console.log("response: ", response)
					console.log("success")
					$scope.movie = response;
					$scope.moviePoster = response.poster_path;
					console.log('$scope.movie', $scope.movie);
					return response;
				}
				else if(id % 5 === 0 || id % 9 === 0){
					return $scope.getCageMovie();
				}
				else {
					return $scope.getMovie();
					console.log("before 1981")
				}
			})
		    .error(function(e){
				console.log("error")
				return $scope.getMovie();
			})
		};
	$scope.win = function () {
		if($scope.points === 15) {
			$scope.points = "Winner";
			return;
		}
	}
  }]);
