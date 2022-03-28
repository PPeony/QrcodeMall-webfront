
export function checkLogin(){
    var user = sessionStorage.getItem('user');
    if (user == null) {

        return false;
    }
    return true;
}