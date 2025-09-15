const BASE_URL = 'http://localhost:3001/'

const API = {
    GET_COUNTS: BASE_URL + 'api/admin/get_counts',
    LOGIN: BASE_URL + 'api/admin/admin_login',
    LOGOUT: BASE_URL + 'api/admin/admin_logout',
    ADMIN_PROFILE: BASE_URL + 'api/admin/get_admin',
    UPDATE_ADMIN: BASE_URL + 'api/admin/edit_admin',
    CHANGE_PASSWORD: BASE_URL + 'api/admin/change_password',

    //user section
    GET_ALL_USERS: BASE_URL + 'api/admin/get_all_users',
    DELETE_USER: BASE_URL + 'api/admin/delete_user',
    BLOCK_UNBLOCK_USER: BASE_URL + 'api/admin/block_unblock_user',
    GET_USER_DETAILS: BASE_URL + 'api/admin/get_user_details',

    //provider section


}

export default API
export { BASE_URL }
