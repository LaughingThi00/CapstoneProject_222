import {
  Configuration,
  ConfigurationKeys,
} from './entities/configuration.entity';
import { Injectable } from '@nestjs/common';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { ObjectID, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

interface GetConfigurationsParams {
  chainId: number;
  key: ConfigurationKeys;
  defaultValue?: any;
}

@Injectable()
export class ConfigurationsService {
  constructor(
    @InjectRepository(Configuration)
    private configurationRep: Repository<Configuration>,
  ) {}

  async init() {
    const config = new Configuration();
    await this.configurationRep.save(config);
    return config;
  }

  async findOne(key: ConfigurationKeys, chainId: number, defaultValue?: any) {
    let config = await this.configurationRep.findOne({
      where: { key, chainId },
    });

    if (!config) {
      config = new Configuration();
      config.key = key;
      config.chainId = chainId;
      config.value = defaultValue != undefined ? defaultValue : null;
      await this.configurationRep.save(config);
    }

    return config;
  }

  async getConfig({ key, chainId, defaultValue }: GetConfigurationsParams) {
    const config = await this.findOne(key, chainId, defaultValue);

    return config.value;
  }

  async updateConfig(params: {
    key: ConfigurationKeys;
    value: any;
    chainId: number;
  }) {
    const { key, chainId, value } = params;

    const config = await this.findOne(key, chainId);
    config.value = value;
    await this.configurationRep.save(config);
  }
}
