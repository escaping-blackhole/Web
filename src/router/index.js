import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const Upload = resolve => require.ensure([], () => resolve(require('@/components/Upload')), 'upload');
const FileTable = resolve => require.ensure([], () => resolve(require('@/components/FileTable')), 'admin');
const SimpleSignup = resolve => require.ensure([], () => resolve(require('@/components/SimpleSignup')), 'signup');
// const Signup = resolve => require.ensure([], () => resolve(require('@/components/Signup')), 'signup');
const SimpleLogin = resolve => require.ensure([], () => resolve(require('@/components/SimpleLogin')), 'login');
const ConsoleUserTable = resolve => require.ensure([], () => resolve(require('@/components/ConsoleUserTable')), 'user');
const CourseTable = resolve => require.ensure([], () => resolve(require('@/components/CourseTable')), 'course');
const UserTable = resolve => require.ensure([], () => resolve(require('@/components/UserTable')), 'user');


export default new Router({
  routes: [
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/user',
      name: 'UserTable',
      component: UserTable
    },
    {
      path: '/course',
      name: 'CourseTable',
      component: CourseTable
    },
    {
      path: '/console/file',
      name: 'FileTable',
      component: FileTable
    },
    {
      path: '/signup',
      name: 'SimpleSignup',
      component: SimpleSignup
    },
    {
      path: '/login',
      name: 'SimpleLogin',
      component: SimpleLogin
    },
    {
      path: '/console/user',
      name: 'ConsoleUserTable',
      component: ConsoleUserTable
    },
    {
      path: '/console/course',
      name: 'CourseTable',
      component: CourseTable
    },
  ]
});
