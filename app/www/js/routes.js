angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.startPage'
      2) Using $state.go programatically:
        $state.go('tabsController.startPage');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page2
      /page1/tab4/page2
      /page1/tab8/page2
      /page1/tab5/page2
      /page1/tab6/page2
  */
  .state('tabsController.startPage', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/startPage.html',
        controller: 'startPageCtrl'
      },
      'tab4': {
        templateUrl: 'templates/startPage.html',
        controller: 'startPageCtrl'
      },
      'tab8': {
        templateUrl: 'templates/startPage.html',
        controller: 'startPageCtrl'
      },
      'tab5': {
        templateUrl: 'templates/startPage.html',
        controller: 'startPageCtrl'
      },
      'tab6': {
        templateUrl: 'templates/startPage.html',
        controller: 'startPageCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.scanner'
      2) Using $state.go programatically:
        $state.go('tabsController.scanner');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/pageScanner
      /page1/tab4/pageScanner
      /page1/tab8/pageScanner
      /page1/tab5/pageScanner
      /page1/tab6/pageScanner
  */
  .state('tabsController.scanner', {
    url: '/pageScanner',
    views: {
      'tab1': {
        templateUrl: 'templates/scanner.html',
        controller: 'scannerCtrl'
      },
      'tab4': {
        templateUrl: 'templates/scanner.html',
        controller: 'scannerCtrl'
      },
      'tab8': {
        templateUrl: 'templates/scanner.html',
        controller: 'scannerCtrl'
      },
      'tab5': {
        templateUrl: 'templates/scanner.html',
        controller: 'scannerCtrl'
      },
      'tab6': {
        templateUrl: 'templates/scanner.html',
        controller: 'scannerCtrl'
      }
    }
  })

  .state('tabsController.meals', {
    url: '/pageMeals',
    views: {
      'tab4': {
        templateUrl: 'templates/meals.html',
        controller: 'mealsCtrl'
      }
    }
  })

  .state('failedScan', {
    url: '/pageFail',
    templateUrl: 'templates/failedScan.html',
    controller: 'failedScanCtrl'
  })

  .state('successfulScan', {
    url: '/pageSuccess',
    templateUrl: 'templates/successfulScan.html',
    controller: 'successfulScanCtrl'
  })

  .state('tabsController.settings', {
    url: '/pageSettings',
    views: {
      'tab6': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('info', {
    url: '/pageInfo',
    templateUrl: 'templates/info.html',
    controller: 'infoCtrl'
  })

  .state('tabsController.mealScanner', {
    url: '/pageMealScan',
    views: {
      'tab4': {
        templateUrl: 'templates/mealScanner.html',
        controller: 'mealScannerCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/tab5/pageScanner')

  

});