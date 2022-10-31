import Layout from "layouts/index.vue";

const attendanceRouter = {
    path:'/attendance',
    component: Layout,
    name:"考勤模块",
    meta:{
      title:'考勤模块'
    },
    children:[
        {
          path:'users',
          name:'人员管理',
          meta:{
            title:'人员管理'
          },
          component:() => import('views/wages/user.vue')
        },
        {
          path:'department',
          name:'部门管理',
          meta:{
            title:'部门管理'
          },
          component:() => import('views/wages/department.vue')
        },
        {
          path:'salary',
          name:'工资管理',
          meta:{
            title:'工资管理'
          },
          component:() => import('views/wages/salary.vue')
        }
      ]
}

export default attendanceRouter