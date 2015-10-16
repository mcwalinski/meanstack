var userNotes = angular.module('notesApp', ['angular.filter', 'notesFilter', 'nameFilter'])
.config(function($locationProvider){
    //uncomment below to use Angular for page routing
    // $locationProvider.html5Mode(true);
  });

userNotes.controller('notesCtrl', function ($scope, $http) {

	$scope.sortType     = 'formData.first_and_last_name_1'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.search   	= '';     // set the default search/filter term
  $scope.newNote = {}; // create object to contain new note
  $scope.messages = {}; // create object to contain messages to the user
	
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})

  // $scope.init = function(firstChoice)
  // {
  //   $scope.query.formData.first_choice_4 = firstChoice; 
  //   console.log(firstChoice);
  //   // console.log($scope.query.formData.first_choice_4);
  //   //Based on passed argument you can make a call to resource
  //   //and initialize more objects
  // };

  // Search
  $scope.filterFunction = function(element) {
  	return element.name.match(/^Ma/) ? true : false;
  };

  // Get Notes
  $scope.getNotes = function(firstChoice) {
      config ={};
      $scope.stuff = {};
      var url = "https://sub.washingtonpost.com/external/55db882e53590b18611b7f66/viewSubs.jsonp?&callback=JSON_CALLBACK";
      $http.jsonp(url)
        .success(function(data){
          $scope.userNotes = data.Submissions;
          var tempArr = [];
          angular.forEach($scope.userNotes, function(value){
           tempArr.push( { test :  value } );
          });
          $scope.stuff=tempArr;
          $scope.query = {
            formData:{
              first_choice_4: firstChoice
            }
          }
      });

  }


});