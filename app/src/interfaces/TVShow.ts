import { MotionPicture } from "./MotionPicture";

export interface TVShow extends MotionPicture {

    name: string;
    first_air_date: string;
    origin_country: string[];

}