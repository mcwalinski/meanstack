angular.module('notesFilter', []).filter('creationDate', [function () {
  return function (value) {
    var dateFromObjectId = parseInt(value.substring(0, 8), 16) * 1000;
    var createdDate = new Date(dateFromObjectId)
    return createdDate;
  };
}])


angular.module('nameFilter', []).filter('nameClean', [function () {
  return function (value) {
        return (!value) ? '' : value.replace(/[^a-zA-Z 0-9]+/g,' ');

    };
}])