import { useGoogleLogin } from "@react-oauth/google";
import HomeIcon from "./HomeIcon.png";
import HomeIconDark from "./HomeIconDark.png";
import { useAuth } from "~/utils/auth-context";

export default function AppBar() {
    const { login, userToken, logout } = useAuth();
    
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            login(tokenResponse.access_token);
        },
        onError: errorResponse => console.log(errorResponse),
        scope: 'https://www.googleapis.com/auth/drive',
    });
  

    return (
        <header className="flex p-2 px-4 items-center justify-between dark:bg-slate-900">
            <a href="/">
                <img src={HomeIcon}
                    alt="Home"
                    width={80}
                    className="block dark:hidden"
                />
                <img src={HomeIconDark}
                    alt="Home"
                    width={80}
                    className="hidden dark:block"
                />
            </a>
            <a href="#" className="mr-4">
                {userToken ? (
                    <p onClick={logout}>Logout</p>
                ) : (
                    <p onClick={() => googleLogin()}>Login</p>
                )}
            </a>
        </header>
    );
}