
angular.module('BE.seed.controller.label_admin', [])
.controller('label_admin_controller', [
    '$scope',
    '$log',
    'urls',
    'label_service',
function ($scope, $log, urls, label_service) {
   
    $scope.available_colors = label_service.get_available_colors();

    function initialize_new_label() {
        $scope.new_label = {};
        $scope.new_label.color = "gray";
        $scope.new_label.label = "default";
        $scope.new_label.name = "";
    }

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
