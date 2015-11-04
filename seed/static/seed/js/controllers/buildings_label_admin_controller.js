
angular.module('BE.seed.controller.label_admin', [])
.controller('label_admin_controller', [
    '$scope',
    '$log',
    'urls',
    'label_service',
function ($scope, $log, urls, label_service) {

    
   
    $scope.available_colors = label_service.get_available_colors();
    $scope.labels = [];

    function initialize_new_label() {
        $scope.new_label = {};
        $scope.new_label.color = "gray";
        $scope.new_label.label = "default";
        $scope.new_label.name = "";
    }


    $scope.showColor = function(label) {
        var selected = [];
        if(label.color) {
          selected = $filter('filter')($scope.available_colors, {value: label.color});
        }
        return selected.length ? selected[0].text : 'Not set';
    };



    $scope.saveLabel = function(data, id) {
        //$scope.label not updated yet
        angular.extend(data, {id: id});        
        //do call to service
    };

    // remove user
    $scope.removeLabel = function(index) {
        //do call to service to delete, if promise returns then splice...
        $scope.labels.splice(index, 1);
    };

    // add user
    $scope.addUser = function() {
        //do call to service to add, if promise returns, then add to list
        $scope.insertedLabel = {
            id: $scope.labels.length+1,
            name: '',
            color: null,
            label: null 
        };
        $scope.labels.push($scope.inserted);
      };



    var get_labels = function(building) {
        // gets all labels for an org user
        label_service.get_labels().then(function(data) {
            // resolve promise
            $scope.labels = data.labels;
        });
    };
    
    var init = function(){
       get_labels();
       initialize_new_label();
    };
    init();

}
]);
