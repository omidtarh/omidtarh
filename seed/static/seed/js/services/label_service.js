
angular.module('BE.seed.service.label', 
    []).factory('label_service', [ '$http',
                                    '$q',
                                    '$timeout',
                                    '$log',
                                    'user_service',
                                    'label_helper_service',
                                    'urls',
                        function (  $http, 
                                    $q, 
                                    $timeout,
                                    $log,
                                    user_service,
                                    label_helper_service,
                                    urls
                                    ) {


    /**    
        Returns an array of labels, with the following properties:
        
        id : the id of the label
        name : the text that appears in the label
        color : the text description of the color
        label : the css class (usually in bootstrap) used to generate the color style

        For example
            {                
                id: 8                
                name: "test9"
                color: "blue"
                label: "primary"
            }
    */
    
    function get_labels() {
        var defer = $q.defer();
        var args =  {
                        organization_id: user_service.get_organization().id
                    };
        $http({
            method: 'GET',
            url: window.BE.urls.get_labels,
            params: args
        }).success(function(data, status, headers, config) {
            // add bootstrap label and button class names
            for (var i = 0; i < data.labels.length; i++) {
                data.labels[i].label = label_helper_service.lookup_label(data.labels[i].color);
            }
            defer.resolve(data);
        }).error(function(data, status, headers, config) {
            defer.reject(data, status);
        });
        return defer.promise;
    };


    function add_label(){
        var defer = $q.defer();
        $http({
            method: 'POST',
            'url': urls.seed.add_label,
            'data': {
                'label': label
            }
        }).success(function(data, status, headers, config) {
            defer.resolve(data);
        }).error(function(data, status, headers, config) {
            defer.reject(data, status);
        });
        return defer.promise;
    }

    function update_label(){
        var defer = $q.defer();
        $http({
            method: 'POST',
            'url': urls.seed.update_label,
            'data': {
                'label': label
            }
        }).success(function(data, status, headers, config) {
            defer.resolve(data);
        }).error(function(data, status, headers, config) {
            defer.reject(data, status);
        });
        return defer.promise;
    }

    function delete_label(){
        var defer = $q.defer();
        $http({
            method: 'POST',
            'url': urls.seed.delete_label,
            'data': {
                'label': label
            }
        }).success(function(data, status, headers, config) {
            defer.resolve(data);
        }).error(function(data, status, headers, config) {
            defer.reject(data, status);
        });
        return defer.promise;
    }

    /*  This method updates selected buildings with supplied labels. 
        For the selected buildings, add labels from add_labels argument and 
        remove labels from the remove_labels object.
    */

    function update_building_labels(buildings, select_all_checkbox, add_label_ids, remove_label_ids, search_params, org_id) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            'url': urls.seed.apply_label,
            'data': {
                'add_label_ids': add_labels,
                'remove_label_ids': remove_labels,
                'org_id': org_id,
                'buildings': buildings,
                'select_all_checkbox': select_all_checkbox,
                'search_params': search_params
            }
        }).success(function(data, status, headers, config) {
            defer.resolve(data);
        }).error(function(data, status, headers, config) {
            defer.reject(data, status);
        });
        return defer.promise;
    };

    /*  Get the list of supported colors for labels, based on default bootstrap styles for labels.
        At some point this should be defined on the server and not directly related to bootstrap colors. 
    */
    function get_available_colors() {
        return [
            {
                'label': 'success',
                'color': 'green'
            },
            {
                'label': 'danger',
                'color': 'red'
            },
            {
                'label': 'default',
                'color': 'gray'
            },
            {
                'label': 'warning',
                'color': 'orange'
            },
            {
                'label': 'info',
                'color': 'light blue'
            },
            {
                'label': 'primary',
                'color': 'blue'
            }
        ];
    };

    /* Public API */

    var label_factory = { 
        
        //properties
       
        //functions
        get_labels : get_labels ,
        add_label : get_labels,
        update_label : update_label,
        delete_label : delete_label,
        update_building_labels : update_building_labels,
        get_available_colors : get_available_colors
    
    };

    return label_factory;

}]);
