import auth from "../HelperClasses/Auth";


function Logout({isAuth,setIsAuth})
{
    const token=auth.token
    auth.logout()

}
export default Logout;