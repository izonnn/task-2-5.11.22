import React from 'react';
import './App.scss';
import SetupPage from "./features/setup-page/setup-page";
import Building from "./features/building/building";
import {ElevatorsDataProvider, useElevators} from "./hooks/use-elevators";
import 'antd/dist/antd.min.css';
import "./App.scss";

function App() {
    const {setUserPreference, floorsNumber, elevators, elevatorsQueue, findElevator, setElevatorAvailable, appIsReady} = useElevators();

    return (
        <div className='App'>
            <ElevatorsDataProvider value={{
                setUserPreference,
                floorsNumber,
                elevators,
                elevatorsQueue,
                findElevator,
                setElevatorAvailable,
            }}>
                <div className='main'>
                    {!appIsReady && <SetupPage/>}
                </div>
                {appIsReady && <Building/>}
            </ElevatorsDataProvider>
        </div>
    );
}

export default App;
