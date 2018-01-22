import angular from 'angular';
import AuthModule from './auth/auth.module';
import HeaderModule from './header/header.module';
import HomeModule from './home/home.module';
// import UnauthorizedModule from './unauthorized/unauthorized.module';
// import NotFoundModule from './not-found/not-found.module';
// import NotificationsModule from './notifications/notifications.module';
import SchedulerModule from './scheduler/scheduler.module';

const ComponentsModule = angular
  .module('smartx.components', [
    AuthModule,
    HeaderModule,
    HomeModule,
    // UnauthorizedModule,
    // NotFoundModule,
    // NotificationsModule
    SchedulerModule
  ])
  .name;

export default ComponentsModule;
