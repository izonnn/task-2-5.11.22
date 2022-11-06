import {useElevatorsData} from "../../hooks/use-elevators";
import Floor from "../../components/floor/floor";
import React from "react";

const Floors = () => {
    const {floorsNumber} = useElevatorsData();

    const floors = [];

    for (let i = 0; i < floorsNumber; i++) {
        floors.push(<Floor key={i} floorNum={i}/>);
    }

    return (
        <>
            {floors}
        </>
    )
};

export default Floors;
