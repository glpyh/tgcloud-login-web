import Vue from "vue";
import Router from "vue-router";
import { User, Error } from "./views";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['@/views/layout/index.vue'], resolve),
      redirect: { name: 'Login' },
      children: [
        {
          meta: {
            name: '用户登录'
          },
          path: 'login',
          name: 'Login',
          component: User.Login
        },
        {
          meta: {
            name: '用户注册'
          },
          path: 'register',
          name: 'Register',
          component: User.Register
        }, {
          meta: {
            name: '忘记密码'
          },
          path: 'resetPwdEmail',
          name: 'ResetPwdEmail',
          component: User.ResetPwdEmail
        }, {
          meta: {
            name: '忘记密码'
          },
          path: 'resetPwdPhone',
          name: 'ResetPwdPhone',
          component: User.ResetPwdPhone
        }, {
          meta: {
            name: '重置密码'
          },
          path: 'resetPwd',
          name: 'ResetPwd',
          component: User.ResetPwd
        }, {
          meta: {
            name: '激活用户'
          },
          path: 'activeUser',
          name: 'ActiveUser',
          component: User.ActiveUser
        }
      ]
    },
    {
      path: '*',
      component: Error.NotFoundPage
    }
  ]
});
