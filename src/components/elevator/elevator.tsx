import React, {FunctionComponent} from 'react';
import {ReactComponent as ElevatorIcon} from '../../icons/elevator.svg'
import {Status} from "../../types/types";
import classNames from "classnames";
import {useElevatorsData} from "../../hooks/use-elevators";

interface Props {
    floor: number;
    position: number;
    status: Status;
}

const Elevator: FunctionComponent<Props> = ({floor, position, status}) => {
    const {setElevatorAvailable} = useElevatorsData();
    const leftX = 62 + (position * 100);
    const bottomY = floor * 70;

    const onArrival = () => {
        setElevatorAvailable(floor);
    };

    const isBusy = status === Status.Unavailable;
    const isArrived = status === Status.Arrived;

    return (
        <div onTransitionEnd={onArrival} className='elevator' style={{left: leftX, bottom: bottomY}}>
            <ElevatorIcon width={50} height={50} className={classNames({arrived: isArrived, busy: isBusy})}/>
        </div>
    );
};

export default Elevator;
