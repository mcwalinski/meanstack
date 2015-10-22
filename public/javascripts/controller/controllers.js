var userNotes = angular.module('notesApp', ['angular.filter', 'notesFilter', 'nameFilter', 'xeditable'])
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
  $scope.loading = false;
	
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})


  $scope.features = [
      {value:'Reporters: Business/Financial', text:'Reporters: Business/Financial'},
      {value:'Reporters: Features', text:'Reporters: Features'},
      {value:'Reporters: Foreign (assignments would be in the Washington newsroom)', text:'Reporters: Foreign (assignments would be in the Washington newsroom)'},
      {value:'Reporters: Local', text:'Reporters: Local'},
      {value:'Reporters: National (includes health/science)', text:'Reporters: National (includes health/science)'},
      {value:'Reporters: Sports', text:'Reporters: Sports'},
      {value:'Editorial Writers', text:'Editorial Writers'},
      {value:'Visual Journalists: Photography', text:'Visual Journalists: Photography'},
      {value:'Visual Journalists: Video', text:'Visual Journalists: Video'},
      {value:'Copy Editors', text:'Copy Editors'},
      {value:'Multiplatform Producers', text:'Multiplatform Producers'},
      {value:'News Designers', text:'News Designers'},
      {value:'Digital Designers', text:'Digital Designers'},
      {value:'Graphic Reporters', text:'Graphic Reporters'},
      {value:'Graphic Developers', text:'Graphic Developers'},
      {value:'Social Media Producers', text:'Social Media Producers'}
  ];

  $scope.finalists = {
    finalist: true
  }; 


  $scope.updateUserNote = function(data, note) {
    $scope.Sub = note;
      return $http.post('https://sub.washingtonpost.com/updateSub', $scope.Sub);
  };

  $scope.updateUserFeature = function(data, note) {
    console.log(data, note);
    $scope.Sub = note;
    console.log ($scope.Sub);
      return $http.post('https://sub.washingtonpost.com/updateSub', $scope.Sub);
  };

  $scope.updateUserFeature2 = function(data, note) {
    console.log(data, note);
    $scope.Sub = note;
    console.log ($scope.Sub);
      return $http.post('https://sub.washingtonpost.com/updateSub', $scope.Sub);
  };

  $scope.updateUserFinalist = function(data, note) {
    console.log(data, note);
    $scope.Sub = note;
    console.log ($scope.Sub);
      return $http.post('https://sub.washingtonpost.com/updateSub', $scope.Sub);
  };

  // Search
  $scope.filterFunction = function(element) {
  	return element.name.match(/^Ma/) ? true : false;
  };

  // Get Notes
  $scope.getNotes = function(firstChoice) {
      config ={};
      $scope.stuff = {};
      var url = "https://sub.washingtonpost.com/external/55db882e53590b18611b7f66/viewSubs.jsonp?&callback=JSON_CALLBACK";
      if (firstChoice === 'null' ) {
        // window.console.log('tis null');
      }else if (firstChoice === 'all' ){
        $scope.loading = true;
        $http.jsonp(url)
          .success(function(data){
            $scope.loading = false;
            $scope.userNotes = data.Submissions;
            var tempArr = [];
            angular.forEach($scope.userNotes, function(value){
             tempArr.push( { test :  value } );
            });
            $scope.stuff=tempArr;
            $scope.query = {
              formData:{
                first_choice_4: ''
              }
            }
        });
      }else{
        $scope.loading = true;
        $http.jsonp(url)
          .success(function(data){
            $scope.loading = false;
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

  }


});