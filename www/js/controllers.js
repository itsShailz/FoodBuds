angular.module('starter.controllers', [])

// .controller('DashCtrl', function($scope) {})
.controller('AccountCtrl', function($scope, fireBaseData) {
    $scope.showLoginForm = false; //Checking if user is logged in
    $scope.user = fireBaseData.ref().getAuth();
    if (!$scope.user) {
        $scope.showLoginForm = true;
    }
    //Login method
    $scope.login = function (em, pwd) {
        fireBaseData.ref().authWithPassword({
            email    : em,
            password : pwd
        },function(error, authData) {
            if (error === null) {
                console.log("User ID: " + authData.uid +
                            ", Provider: " + authData.provider);
                $scope.user = fireBaseData.ref().getAuth();
                $scope.showLoginForm = false;
                $scope.$apply();
            } else {
                console.log("Error authenticating user:", error);
            }
        });
    };

    // Logout method
    $scope.logout = function () {
        fireBaseData.ref().unauth();
        $scope.showLoginForm = true;
    };
});
