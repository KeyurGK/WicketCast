import { useGoogleLogin } from "@react-oauth/google";

const AuthNavbar = () => {

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            console.log("login succ",response)
        },
        onError: () => {
            console.log('error')
        }
    })
    return (
        <div className=" w-full flex justify-between items-center p-1 lg:p-2">
            <h1>Wicket<span className="text text-blue-600">Cast</span></h1>
            <button onClick={()=> googleLogin()} className="bg-blue-600 text-white text-xs p-2 rounded hover:text-blue-600 hover:bg-white hover:border border-blue-600">Get Started</button>
       </div>
    )
}


export default AuthNavbar;