import { IsNumber, IsString, IsNumberString, IsUUID } from 'class-validator';


export class NumberRequestDto {

    @IsUUID()
    @IsString()
    public userId: string;
    
    @IsNumber()
    public number: number;
}