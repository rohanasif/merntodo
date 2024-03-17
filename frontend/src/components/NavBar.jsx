import { useDispatch, useSelector } from "react-redux";
import { useSignOutMutation } from "../slice/apiSlice";
import { signOut } from "../slice/authSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const NavBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [signout] = useSignOutMutation();
  return (
    <nav className="flex flex-col items-center w-full">
      <h1 className="text-4xl font-bold">TODOS APP</h1>
      <ul className="flex w-full items-center justify-around">
        <li className="uppercase">
          {currentUser && `Hi, ${currentUser.name}!`}
        </li>
        {token && (
          <li className="flex justify-center items-center">
            <button
              className="bg-red-700 py-2 px-4 text-white rounded-xl"
              onClick={() => {
                signout();
                dispatch(signOut());
                Cookies.remove("token");
                navigate("/signin");
              }}
            >
              Signout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default NavBar;
