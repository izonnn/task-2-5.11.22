import React from 'react';
import Floors from "../floors/floors";
import Elevators from "../elevators/elevators";

const Building = () => {
    return (
        <div className='building-ctr'>
            <div className="building column-reverse">
                <Floors/>
                <Elevators/>
            </div>
        </div>
    );
};

export default Building;
