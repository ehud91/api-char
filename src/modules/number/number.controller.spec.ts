
import { Test } from '@nestjs/testing';
import { NumberController } from './number.controller';
import { NumberService } from './number.service';
import { Constants } from '../main/const/constants.model';
import { uuid as uuidv4 } from 'uuidv4';
import { LoggerService } from '../main/logs/logger.service';
import { NumberRequestDto } from './dto/number.model';
import { NumberStoreDto } from './dto/numberstore.model';

describe('NumberController', () => {
  let numberController: NumberController;
  let numberService: NumberService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [NumberController],
        providers: [NumberService, LoggerService, { provide: Constants.CACHE_MANAGER, useValue: {} }],
      }).compile();

    numberService = moduleRef.get<NumberService>(NumberService);
    numberController = moduleRef.get<NumberController>(NumberController);
  });

  describe('NumberController', () => {
    it('Method should be defined', async () => {

        const generatedUserId = uuidv4();

        const input: NumberRequestDto = {
            userId: generatedUserId,
            number: -1
        };

        const serviceResult: Promise<NumberStoreDto> = null;

        jest.spyOn(numberService, 'insertNewNumber').mockImplementation(() => serviceResult);

        console.log('NumberController: ', 'insertNumber() method should be defined');

        expect(await numberController.insertNumber(input)).toBeDefined();
    });
  });
});
