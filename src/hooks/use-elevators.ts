import {createContext, useContext, useState} from "react";
import {Elevator, Status} from "../types/types";
import {message} from "antd";

export interface ElevatorsData {
    elevatorsNumber: number;
    floorsNumber: number;
    setUserPreference: (floorsNumber: number, elevatorsNumber: number) => void;
    elevatorsQueue: number[];
    findElevator: (requestedFloor: number) => void;
    setElevatorAvailable: (floorNum: number) => void;
    elevators: Elevator[];
    appIsReady: boolean;
}

export const ElevatorsDataContext = createContext<ElevatorsData | {}>({});
export const ElevatorsDataProvider = ElevatorsDataContext.Provider;
export const useElevatorsData = () => useContext(ElevatorsDataContext) as ElevatorsData;

export const useElevators = () => {
    const [floorsNumber, setFloorsNumber] = useState<number>();
    const [elevators, setElevators] = useState<Elevator[]>([]);
    const [elevatorsQueue, setFloorQueue] = useState<number[]>([]);
    const [appIsReady, setAppIsReady] = useState<boolean>(false);

    const setUserPreference = (floorsNumber: number, elevatorsNumber: number) => {
        const generateElevators = () => {
            const elevators = [];

            for (let i = 0; i < elevatorsNumber; i++) {
                elevators.push(new Elevator(0, Status.Available));
            }

            setElevators(elevators);
        }

        generateElevators();
        setFloorsNumber(floorsNumber);
        setAppIsReady(true);
    }

    const getClosestElevator = (requestedFloor: number) => {
        let closestElevator = -1;
        let minDistance = -1;
        const availableElevators = elevators.filter(elevator => elevator.status === Status.Available);


        availableElevators.forEach(elevator => {
            let distance = Math.abs(requestedFloor - elevator.currentFloor);
            if (closestElevator === -1 || distance < minDistance) {
                closestElevator = elevators.indexOf(elevator);
                minDistance = distance;
            }
        });

        return closestElevator;
    }

    const setElevatorBusy = (elevatorIndex: number, requestFloor: number) => {
        elevators[elevatorIndex].status = Status.Unavailable;
        elevators[elevatorIndex].currentFloor = requestFloor;

        setElevators([...elevators]);
    }


    const findElevator = (requestedFloor: number) => {
        const isElevatorExistInReqFloor = elevators.find(e => e.currentFloor === requestedFloor);

        if (isElevatorExistInReqFloor) {
            message.warning('Elevator is already exist in this floor');
            return;
        }

        const availableElevators = elevators.filter(elevator => elevator.status === Status.Available);

        if (availableElevators.length === 0) {
            const isAlreadyExist = elevatorsQueue.includes(requestedFloor);

            if (isAlreadyExist) {
                return;
            }

            setFloorQueue((currentQueue) => [...currentQueue, requestedFloor]);
            return;
        }

        const closestElevator = getClosestElevator(requestedFloor);
        setElevatorBusy(closestElevator, requestedFloor);
    }

    const setElevatorAvailable = (floorNum: number) => {
        const floorElevatorIndex = elevators.findIndex(e => e.currentFloor === floorNum);
        elevatorArrivedSound();
        elevators[floorElevatorIndex].status = Status.Arrived;

        setElevators([...elevators]);

        setTimeout(() => {
            elevators[floorElevatorIndex].status = Status.Available;
            setElevators([...elevators]);

            if (elevatorsQueue.length) {
                setFloorQueue((currentQueue) => {
                    const res = currentQueue.shift();
                    findElevator(res!);
                    return [...currentQueue];
                });
            }
        }, 2000);
    }

    const elevatorArrivedSound = () => {
        const audio = new Audio('/bell.mp3');
        audio.play();
    }

    return {
        appIsReady,
        floorsNumber,
        setUserPreference,
        elevatorsQueue,
        elevators,
        findElevator,
        setElevatorAvailable
    }
};
