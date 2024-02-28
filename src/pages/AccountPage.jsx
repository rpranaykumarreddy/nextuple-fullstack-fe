import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Card, CardContent} from "@mui/material";

import LoginForm from "../component/LoginForm";
import RegisterationForm from "../component/RegisterationForm";
import WelcomeForm from "../component/WelcomeForm";

export default function AccountPage() {
    const [isLogin, setIsLogin] = useState(true);
    const user = useSelector((state) => state.user);
    const flipLogin = () => {
        setIsLogin((prev) => !prev);
    }

    let contents = null;

    if(user?.sub !==null && user?.sub !== undefined && user?.sub !== "") {
        contents = <WelcomeForm user={user} />;
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
            <Card sx={{ minWidth: 275, marginTop: '50px', maxWidth: 400, margin: 'auto', padding: '5px' }}>
                <CardContent>
                    {contents}
                </CardContent>
            </Card>
        </div>
    );
}