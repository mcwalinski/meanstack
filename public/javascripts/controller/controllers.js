var userNotes = angular.module('notesApp', ['angular.filter', 'notesFilter']);

userNotes.controller('notesCtrl', function ($scope, $http) {

	$scope.sortType     = 'note.title'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.search   	= '';     // set the default search/filter term
	
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})

// Search
$scope.filterFunction = function(element) {
	return element.name.match(/^Ma/) ? true : false;
};

// Get Notes
$scope.getNotes = function(value) {
	$scope.uid = value;
    config ={};

    $http.get("/api/notes/" + $scope.uid, config, {}).
  		success(function(data) {
    	$scope.userNotes = data.notes;
    	console.log($scope.userNotes);
    });
}

// Add Note
$scope.addNote = function() {
	var url = '/api/removeFavorite/';
	$http.post(url)
    .success(function(data){
      window.console.log(data);
    })
    .error(function(data,status){
      window.console.log(data + status);
    });
}

// Remove Note
$scope.removeNote = function(value) {
	var url = '/api/removeFavorite/'+ value;
	$http.delete(url)
    .success(function(data){
      window.console.log(data);
    })
    .error(function(data,status){
      window.console.log(data + status);
    });
}

});