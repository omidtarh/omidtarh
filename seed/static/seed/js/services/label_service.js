 
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

        

        Returns an array of labels.
    
        @param {object} search  -   Optional search object. If provided, server should
                                    mark each label in the response with a boolean 
                                    property 'exists-in-set'

        @return {object}            Returns a promise object that will resolve an
                                    array of label objects on success.

        Label objects have the following properties, with 'text' and 'color' props assigned locally.
        
            id {integer}        the id of the label
            name {string}       the text that appears in the label
            text {string}       same as name, needed for ngTagsInput control
            color {string}      the text description of the label's color (e.g. 'blue')
            label {string}      the css class (usually in bootstrap) used to generate the color style
                                (poorly named, we should refactor to 'css-class' or something more accurate
                                or change how color is applied)
            in-query {boolean}  if a search object was passing in, this boolean indicates
                                if label was present in set of buildings.

        For example
            {                
                id: 8                
                name: "test9"
                color: "blue"
                label: "primary"
                exists-in-set : true
            }
    */
    
    function get_labels(search) {
        var defer = $q.defer();

         var args =  {
                        organization_id: user_service.get_organization().id
                    };

        if (search){
            //Let's not send the entire search object as it's got quite a lot of data.
            //Only send the props that the BE needs
            var searchArgs = {
                'selected_buildings' : search.selected_buildings,
                'select_all_checkbox' : search.select_all_checkbox,
                'filter_params' : search.filter_params
            }
            args.search = searchArgs;
        }
       
        $http({
            method: 'POST',
            url: window.BE.urls.get_labels,
            params: args
        }).success(function(data, status, headers, config) {
            
            //update label properties
            var len = data.labels.length;
            for (var i = 0; i < len; i++) {
                var lbl = data.labels[i];
                // add bootstrap label class names
                lbl.label = label_helper_service.lookup_label(lbl.color);
                // create 'text' propety needed for ngTagsInput control
                lbl.text = lbl.name;
            }

            defer.resolve(data);

        }).error(function(data, status, headers, config) {
            defer.reject(data, status);
        });
        return defer.promise;
    };

    /* CRUD FUNCTIONS FOR LABELS */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /* Add a label to an organizations list of labels */
    function create_label(){
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


    /* Update an existing a label in an organization */
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

    /* Delete a label from the set of labels for an organization */
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


    /* FUNCTIONS FOR LABELS WITHIN BUIDINGS  */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    /*  

    This method updates selected buildings with a group of "add" labels
    and a group of "remove" labels. 

    @param {array} buildings                an array of building ids. This may be empty
                                            if the 'select_all_checkbox' is true.
    @param {array} add_label_ids            an array of label ids to apply to selected buildings
    @param {array} remove_label_ids         an array of label ids to remove from selected buildings
    @param {boolean} select_all_checkbox    has user selected the 'Select All' checkbox on the building list
    @param {array} search_params            a search object that has properties that define
                                            what filters were used in search. 

    @return {object}                        a promise object that resolves server response (success or error)

    */
    function update_building_labels(buildings, add_label_ids, remove_label_ids, search_params, org_id) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            'url': urls.seed.update_building_label,
            'data': {
                'buildings' : buildings,
                'add_label_ids': add_labels,
                'remove_label_ids': remove_labels,
                'select_all_checkbox': select_all_checkbox,
                'org_id': org_id,
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
