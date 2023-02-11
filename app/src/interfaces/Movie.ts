import { MotionPicture } from "./MotionPicture";

export interface Movie extends MotionPicture {
    
    title: string;
    release_date: string;
    video: boolean;
    
}