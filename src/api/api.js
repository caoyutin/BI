import request from '@/utils/request'
// 获取项目坐标
export const getEarth = () => {
    return request({
        url: '/organizationAPI/community/distribution/list',
        method: 'post'
    })
}
// 获取服务业态
export const getfwyt = () => {
    return request({
        url: '/propertyDataApi/type',
        method: 'post'
    })
}
// 获取服务面积
export const getfwarea = () => {
    return request({
        url: '/propertyDataApi/area',
        method: 'post'
    })
}
// 获取品牌信息
export const getBrandinfo = () => {
    return request({
        url: '/propertyDataApi/info',
        method: 'post'
    })
}
// 获取培训数据
export const train = () => {
    return request({
        url: '/hrDataApi/train',
        method: 'post'
    })
}
// 获取招聘数据
export const recruitment = () => {
    return request({
        url: '/hrDataApi/recruitment',
        method: 'post'
    })
}
// 获取收费管理数据
export const charge = () => {
    return request({
        url: '/financeDataApi/charge',
        method: 'post'
    })
}
// 获取人事数据
export const hrinfo = () => {
    return request({
        url: '/hrDataApi/info',
        method: 'post'
    })
}


// 获取全国服务数据
export const Servicedata = () => {
    return request({
        url: '/propertyDataApi/data',
        method: 'post'
    })
}
//获取eba数据
export const eba = () => {
    return request({
        url: '/propertyDataApi/ebaMonitor',
        method: 'post'
    })
}
//获取供应商管理
export const supplier = () => {
    return request({
        url: '/propertyDataApi/supplier',
        method: 'post'
    })
}

// 获取热销商品
export const bestSellers = () => {
    return request({
        url: '/communityDataApi/bestSellers',
        method: 'post'
    })
}

// 获取外包业务
export const outsourcing = () => {
    return request({
        url: '/propertyDataApi/outsourcing',
        method: 'post'
    })
}
// 获取活跃度
export const activity = () => {
    return request({
        url: '/propertyDataApi/activity',
        method: 'post'
    })
}

// 获取突发事件
export const emergencies = () => {
    return request({
        url: '/propertyDataApi/emergenciesCake',
        method: 'post'
    })
}
export const emergenciesMonth = () => {
    return request({
        url: '/propertyDataApi/emergenciesMonth',
        method: 'post'
    })
}
// 获取项目签约信息
export const projectSigning = () => {
    return request({
        url: '/marketDataApi/projectSigning',
        method: 'post'
    })
}
// 获取app覆盖率
export const coverage = () => {
    return request({
        url: '/propertyDataApi/coverage',
        method: 'post'
    })
}
// 获取近三年满意度
export const year = () => {
    return request({
        url: '/propertyDataApi/year',
        method: 'post'
    })
}
// 获取最近一年评分详情
export const yearDetails = () => {
    return request({
        url: '/propertyDataApi/yearDetails',
        method: 'post'
    })
}

// 获取基础序列人均管理面积
export const businessLines = () => {
    return request({
        url: '/propertyDataApi/businessLines',
        method: 'post'
    })
}

// 获取营业额查询(年度)
export const TurnoverYear = () => {
    return request({
        url: '/communityDataApi/year',
        method: 'post'
    })
}
// （月度）
export const TurnoverMonth = () => {
    return request({
        url: '/communityDataApi/month',
        method: 'post'
    })
}
//获取报事信息（柱状图）
export const complaintMonth = () => {
    return request({
        url: '/propertyDataApi/defMonth',
        method: 'post'
    })
}
// （金字塔）
export const complaint = () => {
    return request({
        url: '/propertyDataApi/defCake',
        method: 'post'
    })
}
// 获取投诉信息（饼图）
export const defCake = () => {
    return request({
        url: '/propertyDataApi/abcCake',
        method: 'post'
    })
}
//柱状图
export const defMonth = () => {
    return request({
        url: '/propertyDataApi/abcMonth',
        method: 'post'
    })
}

//地图数据
export const cityMap = () => {
    return request({
        url: '/propertyDataApi/cityMap',
        method: 'post'
    })
}
// 获取天气
export const weather = () => {
    return request({
        url: '/propertyDataApi/cityMap',
        method: 'post'
    })
}

//获取门禁
export const communityDoor = () => {
    return request({
        url: '/propertyDataApi/communityDoor',
        method: 'post'
    })
}