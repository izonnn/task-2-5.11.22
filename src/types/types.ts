export enum Status {
    Available = 'available',
    Unavailable = 'unavailable',
    Arrived = 'arrived'
}

let runningIndex = 0;

export class Elevator {
    id: number;
    constructor(public currentFloor: number, public status: Status) {
        this.id = runningIndex++;
    }
}
