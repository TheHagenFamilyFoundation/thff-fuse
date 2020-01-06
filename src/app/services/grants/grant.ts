export class Grant {
    id: number;

    Year: number;

    Amount: number;

    Description: string;

    City: string;

    State: string;

    constructor(values: Record<string, any> = {}) {
      Object.assign(this, values);
    }
}
