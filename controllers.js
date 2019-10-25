// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
    $scope.city = cityService.city;
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    })
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService){
    $scope.city = cityService.city;
    $scope.weatherAPI = $resource("https://api.openweathermap.org/data/2.5/weather", {
        callback: "JSON_CALLBACK"
    }, {
        get: {method: "JSONP"}
    });
    $scope.weatherResult = $scope.weatherAPI.get({q:$scope.city, cnt: 2, appid:'04043bac328a990ca1ab93bbd210d9e6'});
    
    $scope.convertToFahrenheit = function(degK) {
        return Math.round(degK - 273);
    }
    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    }
}]);