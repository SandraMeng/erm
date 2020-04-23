// 组织结构的子路由们
export default [{
	path: "/org/department",
	name: "department",
	component:()=>import("@/components/depart"),
	meta:{
        type:"department",
        rootTil:"部门管理",
        til:"部门列表",
        icon:"el-icon-s-operation",
        power:'departhandle'
    }
}, {
	path: "/org/adddepartment",
	name: "adddepartment",
	component:()=>import("@/components/depart/add.vue"),
	meta:{
        type:"department",
        rootTil:"部门管理",
        til:"新增部门",
        icon:"el-icon-s-operation",
        power:'departhandle'
    }
}, {
	path: "/org/user",
	name: "user",
	component:()=>import("@/components/user"),
	meta:{
        type:"user",
        rootTil:"员工管理",
        til:"员工列表",
        icon:"el-icon-user",
        power:'userhandle'
    }
}, {
	path: "/org/adduser",
	name: "adduser",
	component:()=>import("@/components/user/add.vue"),
	meta:{
        type:"user",
        rootTil:"员工管理",
        til:"新增员工",
        icon:"el-icon-user",
        power:'userhandle'
    }
}, {
	path: "/org/job",
	name: "job",
	component:()=>import("@/components/job"),
	meta:{
        type:"job",
        rootTil:"职务管理",
        til:"职务列表",
        icon:"el-icon-s-management",
        power:'jobhandle'
    }
}, {
	path: "/org/addjob",
	name: "addjob",
	component:()=>import("@/components/job/add.vue"),
	meta:{
        type:"job",
        rootTil:"职务管理",
        til:"新增职务",
        icon:"el-icon-s-management",
        power:'jobhandle'
    }
}];