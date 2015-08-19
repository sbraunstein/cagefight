angular.module('cagefightApp')
.factory('GrabMovie', ['http', function ($http, $location, $rootScope, $q) {
	var baseURL = 'http://api.themoviedb.org/3/movie/';
	var GrabMovie = {};

	GrabMovie.callMovie = function () {
		return $http.get('https://api.themoviedb.org/3/movie900/person/900?api_key=a83e28dc44baf347eb09a87d44ee2885')
	}

	GrabMovie.getRandomMovie = function () {
		console.log(' MovieService.js, Making request');
		var apiKey = 'a83e28dc44baf347eb09a87d44ee2885';
		var id = exports.randomInt(100, 10000);
		return $http.get(baseURL + id + '?api_key=' + apiKey)
	}
	return GrabMovie;
}])