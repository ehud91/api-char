import { IsString, IsAlpha, IsUUID, MaxLength } from 'class-validator';


export class CharacterRequestDto {


    @IsUUID()
    @IsString()
    public userId: string;
    @IsAlpha()
    @IsString()
    @MaxLength(1)
    public character: string;

}