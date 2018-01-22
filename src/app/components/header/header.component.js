const constants = require('../../../../constants.json').dev.constants;

const HeaderComponent = {
  template: require('./header.html'),
  controller: class HeaderComponentCtrl {
    /* @ngInject */
    constructor($location, $interval, authService, permService, $scope, $window, $uibModal, $timeout, $state) {
      this.authService = authService;
      this.permService = permService;
      this.location = $location;
      this.$state = $state;
      this.$uibModal = $uibModal;
      this.$timeout = $timeout;
      this.$window = $window;
      this.$scope = $scope;
      this.$location = $location;

      this.user = {};
      this.clinicImageUrl = undefined;
      this.canEditWorkshift = false;
    }

    $onInit() {
      this.updateUser();

      this.$timeout(this.redirect, 15000);
      this.$scope.$on('loggedIn', () => {
        this.updateUser();
      });
    }

    $onDestroy() {
      this.$interval.cancel(this.permissionsRetry);
      this.$interval.cancel(this.sessionTimeoutCheck);
    }

    updateUser() {
      this.user = this.authService.getUser();
      if (this.authService.isLoggedIn()) {
        this.clinicImageUrl = `${constants.clinicLogoUrlPrefix}/${this.authService.getClinicId()}/logo.png`;
      } else {
        this.clinicImageUrl = undefined;
      }
    }

    exit() {
      this.authService.logOut();
      this.updateUser();
      this.$state.go('unauthorized');
    }

    openShiftsModal() {
      this.$uibModal.open({
        component: 'workShift',
        resolve: {},
        // Stop modal from closing when the user clicks outside the modal
        backdrop: 'static',
        keyboard: false
      });
    }

    redirect() {
      // if the user is on the scheduler and does not have permission to use the scheduler
      // redirect them to the "unauthorized" page
      this.permissionsRetry = this.$interval(() => {
        try {
          const updated = this.permService.getStatus();
          // if the user is on the scheduler and does not have permission to use the scheduler
          // redirect them to the "unauthorized" page
          if (updated) {
            this.permissions = this.permService.getPermissions();
          } else {
            throw new Error();
          }
          if (!this.permissions.can_access_scheduler_flag && this.$state.includes('scheduler') && !this.permissions.administrator_flag) {
            this.$state.go('unauthorized');
          }
          this.$interval.cancel(this.permissionsRetry);
          this.canEditWorkshift = this.permissions.can_modify_all_work_shifts || this.permissions.can_modify_own_work_shift || this.permissions.administrator_flag;
        } catch (e) {
          // permissions not set, retry
        }
      }, 500);

      this.sessionTimeoutCheck = this.$interval(() => {
        if (this.authService.isTokenExpired()) {
          this.$interval.cancel(this.sessionTimeoutCheck);
          this.$uibModal.open({
            component: 'errorModal',
            // Stop modal from closing when the user clicks outside the modal
            backdrop: 'static',
            keyboard: false,
            resolve: {
              message: () => {
                return 'Your user session has timed out. To resume, close this window, return to the SMART application and click the Calendar icon again.';
              }
            }
          }).result.then(() => {
            this.exit();
          });
        }
      }, 500);
    }
  }
};

export default HeaderComponent;

