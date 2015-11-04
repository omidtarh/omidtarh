
angular.module('BE.seed.service.label', 
    []).factory('label_service', [ '$http',
                                    '$q',
                                    '$timeout',
                                    '$log',
                                    'user_service',
                                    'label_helper_service',
                        function (  $http, 
                                    $q, 
                                    $timeout,
                                    $log,
                                    user_service,
                                    label_helper_service
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
        //todo
    }

    function update_label(){
        //todo
    }

    function delete_label(){
        //todo 
    }

    function apply_label(){

    }

    function remove_label(){

    }

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
        apply_label : apply_label,
        remove_label : remove_label,
        get_available_colors : get_available_colors
    
    };

    return label_factory;

}]);
