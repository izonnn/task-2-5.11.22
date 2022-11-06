import React, {FunctionComponent} from 'react';
import {Button} from "antd";
import {useElevatorsData} from "../../hooks/use-elevators";
import classNames from "classnames";
import {Status} from "../../types/types";

interface Props {
    floorNum: number;
}

const Floor: FunctionComponent<Props> = ({floorNum}) => {
    const {findElevator, elevators, elevatorsQueue} = useElevatorsData();

    const getFloorNumberEnding = (floorNum: number) => {
        switch (floorNum) {
            case 0:
                return 'Ground floor';
            case 1:
                return `${floorNum}st`;
            case 2:
                return `${floorNum}rd`;
            default:
                return `${floorNum}th`;
        }
    }

    const myElevators = elevators.filter(e => e.currentFloor === floorNum);
    const isWaiting = myElevators.some(e => e.status === Status.Unavailable) || elevatorsQueue.includes(floorNum);
    const isArrived = myElevators.some(e => e.status === Status.Arrived);

    const getText = () => {
        if (isWaiting) {
            return 'Waiting';
        }
        if (isArrived) {
            return 'Arrived';
        }

        return 'Call';
    };

    const floorWidth = elevators.length * 100;

    return (
        <div className='floor-ctr'>
            <h3 className='floor-number'>{getFloorNumberEnding(floorNum)}</h3>
            <div className='floor' style={{width: floorWidth}}/>
            <Button className={classNames('elevator-btn', {busy: isWaiting, arrived: isArrived})}
                    onClick={() => findElevator(floorNum)}>{getText()}</Button>
        </div>
    );
};

export default Floor;
