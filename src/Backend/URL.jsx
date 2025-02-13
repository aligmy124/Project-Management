/* password : Ax50@tvn77 */
export const BASE_URL="https://upskilling-egypt.com:3003/api/v1";
export const BASE_IMG_URL="https://upskilling-egypt.com:3003"
//Auth
export const BASE_USERS=`${BASE_URL}/Users`;
export const USERS_URL={
    login:`${BASE_USERS}/Login`,
    register:`${BASE_USERS}/Register`,
    forgetpass:`${BASE_USERS}/Reset/Request`,
    resetpass:`${BASE_USERS}/Reset`,
    manager:`${BASE_USERS}/Manager`,
    toggle:(id)=>`${BASE_USERS}/${id}`,
    verify:`${BASE_USERS}/verify`,
    delete:(id)=>`${BASE_USERS}/${id}`,
    create:`${BASE_USERS}/Create`,
    AllUsers:`${BASE_USERS}`,
}
//Projects
export const BASE_Projects=`${BASE_URL}/Project`;
export const Projects_URL={
    getAll:`${BASE_Projects}/manager`,
    getEmployee:`${BASE_Projects}/employee`,
    create:`${BASE_Projects}`,
    delete:(id)=>`${BASE_Projects}/${id}`,
    update:(id)=>`${BASE_Projects}/${id}`,

}
// Tasks
export const BASE_TASKS=`${BASE_URL}/Task`;
export const TASKS_URL={
    manager:`${BASE_TASKS}/manager`,
    update:(id)=>`${BASE_TASKS}/${id}`,
    delete:(id)=>`${BASE_TASKS}/${id}`,
    getallAssignedTask:`${BASE_TASKS}`,
    change:(id)=>`${BASE_TASKS}/${id}/change-status`,
}