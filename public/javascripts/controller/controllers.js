var userNotes = angular.module('notesApp', ['angular.filter', 'notesFilter'])
.config(function($locationProvider){
    //uncomment below to use Angular for page routing
    // $locationProvider.html5Mode(true);
  });

userNotes.controller('notesCtrl', function ($scope, $http) {

	$scope.sortType     = 'note.title'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.search   	= '';     // set the default search/filter term
  $scope.newNote = {}; // create object to contain new note
  $scope.messages = {}; // create object to contain messages to the user
	
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})

// Search
$scope.filterFunction = function(element) {
	return element.name.match(/^Ma/) ? true : false;
};

// Get Notes
$scope.getNotes = function() {
    config ={};
    $http.get("/api/notes", config, {}).
  		success(function(data) {
    	$scope.userNotes = data.all;
    	console.log($scope.userNotes);
    });
}

// Single Note
$scope.singleNote = function(value) {
    $scope.id = value;
    config ={};
    $http.get("/api/notes/single/" + $scope.id, config, {}).
      success(function(data) {
      $scope.userNote = data.userNote;
      console.log($scope.userNote);
    });
}


// Add Note
$scope.addNote = function() {
  $scope.messages.addNote = {};
  	var url = '/api/addNote/';
  	$http.post(url, $scope.newNote)
      .success(function(data){
        window.console.log(data);
        $scope.newNote = {};
        $scope.messages.addNote.success = "Great job! Add another one!"
      })
      .error(function(data,status){
        window.console.log(data + status);
        $scope.messages.addNote.error = "Error encountered while adding note.";
      });
}

// Remove Note
$scope.removeNote = function(value) {
  // value is the note id
	var url = '/api/removeNote/'+ value;
	$http.delete(url)
    .success(function(data){
      window.console.log(data);
      $scope.getNotes();
    })
    .error(function(data,status){
      window.console.log(data + status);
    });
}


});