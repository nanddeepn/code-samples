import { INorthwindService } from './NorthwindService/INorthwindService';
import { NorthwindServiceMock } from './NorthwindService/NorthwindServiceMock';
import { NorthwindService } from './NorthwindService/NorthwindService';

export class ServiceFactory {
    public static getNorthwindService(): INorthwindService {
        if (process.env["ENVIRONMENT"] === "mock") {
            return new NorthwindServiceMock();
        } else {
            return new NorthwindService();
        }
    }
}