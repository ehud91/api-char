import { Test, TestingModule } from '@nestjs/testing';
import { NumberService } from './number.service';
import { Constants } from '../main/const/constants.model';
import { uuid as uuidv4 } from 'uuidv4';
import { ConstantsNumber } from './const/constants.model';
import { NumberStoreDto } from './dto/numberstore.model';
import { LoggerService } from '../main/logs/logger.service';
import config from '../main/config/config';

describe('NumberService', () => {

    let numberService: NumberService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [NumberService, LoggerService, { provide: Constants.CACHE_MANAGER, useValue: {} }]
        }).compile();

        numberService = module.get<NumberService>(NumberService);
    });

    describe('NumberService', () => {
        it('Service should be defined', () => {
            console.log('CharacterService ', 'Service should be defined... ');
            expect(numberService).toBeDefined();
        });

        it('Should insert new number', async () => {

            const generatedUserId = uuidv4();

            const input = {
                userId: generatedUserId,
                number: 2
            }
            const result: NumberStoreDto = { 
                userId: generatedUserId, 
                character: 'a', 
                number: -1 
            };
    
            jest.spyOn(numberService, 'insertNewNumber').mockResolvedValue(result); // Use mockResolvedValue for async methods

            console.log('NumberService: ', 'Should insert new number');
            console.log('Input: ', input);
            console.log('Result: ', result);
            await expect(numberService.insertNewNumber(input.number, input.userId)).resolves.toEqual(result);
            
        });

        it('Should get the requested number by user id (key)', async () => {
            
            const generatedUserId = uuidv4();

            const input = {
                key: ConstantsNumber.REDIS_KEY_NUMBER + generatedUserId
            }

            const result: NumberStoreDto = { 
                userId: generatedUserId, 
                character: 'a', 
                number: -1 
            };

            jest.spyOn(numberService, 'getNumber').mockResolvedValue(result); // Use mockResolvedValue for async methods

            console.log('NumberService: ', 'Should get the requested number');
            console.log('Input: ', input);
            console.log('Result: ', result);

            await expect(numberService.getNumber(input.key)).resolves.toEqual(result);
            
        });


        it('Should update the given number by user id (key)', async () => {

            const generatedUserId = uuidv4();

            const inputData: NumberStoreDto = {
                userId: generatedUserId,
                character: 'a',
                number: -1
            }

            const input = {
                key: ConstantsNumber.REDIS_KEY_NUMBER+ generatedUserId,
                data: inputData,
                ttl: config().redis.cache_ttl
            }

            const result: void = null;

            jest.spyOn(numberService, 'updateNumber').mockResolvedValue(result); // Use mockResolvedValue for async methods

            console.log('NumberService: ', 'Should update the given number by user id (key)');
            console.log('Input: ', input);
            console.log('Result: ', result);

            await expect(numberService.updateNumber(input.key, input.data, input.ttl)).resolves.toEqual(result);
        });

        it('Should insert a new number with a given user id (key)', async () => {

            const generatedUserId = uuidv4();

            const inputData: NumberStoreDto = {
                userId: generatedUserId,
                character: 'a',
                number: -1
            }

            const input = {
                key: ConstantsNumber.REDIS_KEY_NUMBER + generatedUserId,
                data: inputData,
                ttl: config().redis.cache_ttl
            }

            const result: void = null;

            jest.spyOn(numberService, 'insertNumber').mockResolvedValue(result); // Use mockResolvedValue for async methods

            console.log('NumberService: ', 'Should insert a new number with a given user id (key)');
            console.log('Input: ', input);
            console.log('Result: ', result);

            await expect(numberService.insertNumber(input.key, input.data, input.ttl)).resolves.toEqual(result);
            
        });
    });
});
