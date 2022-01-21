import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import ListController from './controllers/ListController';
import WineController from './controllers/WineController';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ListController />} />
                    <Route path="wine/add" element={<WineController />} />
                    <Route path="wine/edit/:wineId" element={<WineController />} />
                    <Route
                        path="*"
                        element={
                            <div>404</div>
                        }
                    />
                </Routes>
            </BrowserRouter>);
    }
};

export default App;