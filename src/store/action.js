import { hrinfo } from '@/api/api'
const actions = {
    commitEmp(context) {
        return new Promise((resolve, reject) => {
            hrinfo().then(res => {
                context.commit("setEmp", res.data)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
        //
    }
}
export default actions