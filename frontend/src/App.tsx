import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Favorites from "./pages/Favorites.tsx";
import Layout from "./pages/Layout.tsx";
import Error from "./pages/Error.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home/>}/>
                    <Route path="favorites" element={<Favorites/>}/>
                    <Route path="*" element={<Error />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
