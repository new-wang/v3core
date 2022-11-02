import Layout from "layouts/index.vue";

const attendanceRouter = {
    path:'/attendance',
    component: Layout,
    name:"考勤模块",
    redirect: 'noRedirect',
    meta:{
      title:'考勤模块',
      icon:'Edit',
    },
    children:[
        {
          path:'users',
          name:'attendanceUser',
          meta:{
            title:'人员管理',
            affix:false
          },
          component:() => import('views/wages/user.vue')
        },
        {
          path:'department',
          name:'attendanceDepartment',
          meta:{
            title:'部门管理'
          },
          component:() => import('views/wages/department.vue')
        },
        {
          path:'salary',
          name:'attendanceSalary',
          meta:{
            title:'工资管理'
          },
          component:() => import('views/wages/salary.vue')
        }
      ]
}

export default attendanceRouter