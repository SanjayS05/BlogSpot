import { Outlet } from "react-router-dom";
import Header from "./header";

function layout()
{
    return(
        <main>
            <Header />
            <Outlet />
        </main>
    );
}