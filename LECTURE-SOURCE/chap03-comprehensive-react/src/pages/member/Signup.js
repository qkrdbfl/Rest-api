import SignupFrom from "../../components/form/SignupFrom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Signup() {

    const navigate = useNavigate();

    const {singnupSuccess} = useSelector(state => state.memberReducer); //singnupSuccess 이거 키값 일치 안하면 못가져옴 주의

    useEffect(() => {
        if (singnupSuccess === true) { //if문이 useEffect 밖에 있으면 에러남
            navigate('/member/login');
        }
    }, [singnupSuccess]);


    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <div className="background-div">
                <div className="signup-div">
                    <SignupFrom/>
                </div>
            </div>
        </>
    );

}

export default Signup;