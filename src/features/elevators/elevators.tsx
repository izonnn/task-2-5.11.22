import Elevator from "../../components/elevator/elevator";
import React from "react";
import {useElevatorsData} from "../../hooks/use-elevators";

const Elevators = () => {
    const {elevators} = useElevatorsData();

    return (
        <>
            {elevators.map((elevator, i) => {
                return (
                    <Elevator status={elevator.status} position={elevator.id} floor={elevator.currentFloor} key={i}/>
                )
            })}
        </>

    )
};

export default Elevators;
