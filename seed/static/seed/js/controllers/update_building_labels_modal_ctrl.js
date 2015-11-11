

angular.module('BE.seed.controller.update_building_labels_modal', [])
.controller('update_building_labels_modal_ctrl', [
  '$scope',
  '$modalInstance',
  'label_service',
  'labels',
  'search',
  function ($scope, $modalInstance, label_service, labels, search) {

    if (search.selected_buildings && search.selected_buildings.length > 0){
        $scope.number_matching_search = search.selected_buildings.length;
    } 
    
    $scope.labels = labels;
    $scope.label_modal = {};
    $scope.label_modal.color = "gray";
    $scope.label_modal.label = "default";
    $scope.available_colors = label_service.get_available_colors();
    $scope.modal = {};
    $scope.modal.label = {};
    $scope.modal.label.state = "create";


    $scope.initialize_label_modal = function() {
        $scope.label_modal.color = "gray";
        $scope.label_modal.label = "default";
        $scope.label_modal.name = "";
        $scope.modal.label.state = "create";
    };

    $scope.toggle_add = function(label){
        if (label.is_checked_remove && label.is_checked_add) {
            label.is_checked_remove = false;
        }
    }
    $scope.toggle_remove = function(label){
        if (label.is_checked_remove && label.is_checked_add) {
            label.is_checked_add = false;
        }
    }

    $scope.add_label = function(label) {
        label_service.add_label(label).then(function(data){
            // resolve promise
            get_labels();
            $scope.initialize_label_modal();
        });
    };

    $scope.delete_label = function(label) {
        label_service.delete_label(label).then(function(data){
            // resolve promise
            get_labels();
        });
    };

    $scope.edit_label = function(label) {
        $scope.label_modal = angular.copy(label);
        $scope.modal.label.state = 'edit';
    };

    $scope.update_label = function(label) {
        label_service.update_label(label).then(function(data){
            // resolve promise
            get_labels();
            $scope.initialize_label_modal();
        });
    };
    var get_labels = function(building) {
        // gets all labels for an org user
        label_service.get_labels().then(function(data) {
            // resolve promise
            $scope.labels = data.labels;
        });
    };


    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


    $scope.initialize_label_modal();
}]);
