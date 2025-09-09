// const BASE_URL = 'http://localhost:3007/'
const BASE_URL = 'http://208.68.37.50:3007/'

const API = {
    GET_COUNTS: BASE_URL + 'app/v1/admin/get_counts',
    LOGIN: BASE_URL + 'app/v1/admin/admin_login',
    LOGOUT: BASE_URL + 'app/v1/admin/admin_logout',
    ADMIN_PROFILE: BASE_URL + 'app/v1/admin/get_admin',
    UPDATE_ADMIN: BASE_URL + 'app/v1/admin/edit_admin',
    CHANGE_PASSWORD: BASE_URL + 'app/v1/admin/change_password',

    //user section
    GET_ALL_USERS: BASE_URL + 'app/v1/admin/get_all_users',
    DELETE_USER: BASE_URL + 'app/v1/admin/delete_user',
    BLOCK_UNBLOCK_USER: BASE_URL + 'app/v1/admin/block_unblock_user',
    GET_USER_DETAILS: BASE_URL + 'app/v1/admin/get_user_details',

    //provider section
    GET_ALL_PROVIDER: BASE_URL + 'app/v1/admin/get_all_providers',
    GET_ALL_NEW_PROVIDER: BASE_URL + 'app/v1/admin/get_all_new_providers',
    DELETE_PROVIDER: BASE_URL + 'app/v1/admin/delete_provider',
    BLOCK_UNBLOCK_PROVIDER: BASE_URL + 'app/v1/admin/block_unblock_provider',
    GET_PROVIDER_DETAILS: BASE_URL + 'app/v1/admin/get_provider_details',
    VERIFY_PROVIDER: BASE_URL + 'app/v1/admin/verify_certificate',

    //content section
    EDIT_CONTENT: BASE_URL + 'app/v1/admin/edit_content',
    GET_ABOUT: BASE_URL + 'app/v1/admin/get_about',
    GET_PRIVACY: BASE_URL + 'app/v1/admin/get_privacy',
    GET_TERMS: BASE_URL + 'app/v1/admin/get_terms',
    CREATE_FAQ: BASE_URL + 'app/v1/admin/create_faq',
    EDIT_FAQ: BASE_URL + 'app/v1/admin/edit_faq',
    GET_FAQ: BASE_URL + 'app/v1/admin/get_faq',

    //appointment section
    GET_BOOKING: BASE_URL + 'app/v1/admin/all_bookings',
    BOOKING_DETAILS: BASE_URL + 'app/v1/admin/booking_details',
    DELETE_REQUEST: BASE_URL + 'app/v1/admin/delete_request',
    //support section
    GET_ALL_SUPPORT: BASE_URL + 'app/v1/admin/get_all_supports',
    DELETE_SUPPORT: BASE_URL + 'app/v1/admin/delete_support',

    //category section
    GET_ALL_CATEGORY: BASE_URL + 'app/v1/admin/get_all_category',
    ADD_CATEGORY: BASE_URL + 'app/v1/admin/add_category_services',
    EDIT_CATEGORY: BASE_URL + 'app/v1/admin/edit_category_services',
    GET_ALL_SERVICE: BASE_URL + 'app/v1/admin/get_all_services',
    DELETE_SERVICE: BASE_URL + 'app/v1/admin/delete_service',

    //rating section
    GET_ALL_RATING: BASE_URL + 'app/v1/admin/all_ratings',
    DELETE_RATING: BASE_URL + 'app/v1/admin/delete_ratings',





    SEND_FIRST_MESSAGE: BASE_URL + 'app/v1/user/send_first_message',
    GET_ALL_USER_THREAD: BASE_URL + 'app/v1/user/get_all_user_chat_thread',
    SEND_MESSAGE: BASE_URL + 'app/v1/user/send_message',
    
    GET_ALL_CHATS_USERS: BASE_URL + 'app/v1/user/get_chats_by_thread_id',

    GET_ALL_CHATS_BUSINESS: BASE_URL + 'app/v1/business/get_chats_by_thread_id',

    SEND_USER_MESSAGE: BASE_URL + 'app/v1/user/send_user_message',
    GET_USER_CHATS: BASE_URL + 'app/v1/user/get_user_chats',

    SEND_FIRST_BUSINESS_MESSAGE: BASE_URL + 'app/v1/business/send_first_message',
    SEND_BUSINESS_MESSAGE: BASE_URL + 'app/v1/business/send_user_message',
    GET_BUSINESS_CHATS: BASE_URL + 'app/v1/business/get_business_chats'

}

export default API
export { BASE_URL }
