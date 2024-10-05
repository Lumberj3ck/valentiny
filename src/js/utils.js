import { get_user_balance } from "./api"

async function is_user_balance_enough() {
    const balance = await get_user_balance()
    return balance.website_upload_amount >= 1
}

function isAuthenticated() {
    const authorization_token = localStorage.getItem('access-token');
    return authorization_token !== null
}

export { is_user_balance_enough, isAuthenticated }



