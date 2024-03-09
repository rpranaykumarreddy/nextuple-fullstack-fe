import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Card, CardContent} from "@mui/material";

import LoginForm from "../component/LoginForm";
import RegisterationForm from "../component/RegisterationForm";
import {getUser} from "../data/store";
import {useNavigate} from "react-router-dom";

export default function AccountPage() {
    const [isLogin, setIsLogin] = useState(true);
    const user = useSelector(getUser);
    const navigate = useNavigate();
    const flipLogin = () => {
        setIsLogin((prev) => !prev);
    }

    let contents = null;

    if(user?.sub !==null && user?.sub !== undefined && user?.sub !== "") {
        navigate("/");
    }else{
        if(isLogin) {
            contents = <LoginForm flipLogin={flipLogin} />;
        }
        if (!isLogin) {
            contents = <RegisterationForm flipLogin={flipLogin} />;
        }
    }
    return (
        <div>
            <Card sx={{ minWidth: 200, marginTop: '50px', maxWidth: 400, margin: '10px', padding: '5px' }}>
                <CardContent>
                    {contents}
                </CardContent>
            </Card>
        </div>
    );
}