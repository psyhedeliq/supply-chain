export interface Item {
    id: string;
    name: string;
    color: string;
    price: number;
    events: Event[];
}

export interface Event {
    location: string;
    custodian: string;
    timestamp: Date;
}
