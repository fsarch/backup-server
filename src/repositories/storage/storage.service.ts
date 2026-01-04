import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Storage } from '../../database/entities/storage.entity.js';
import { LocalStorage } from "../../database/entities/local-storage.entity.js";
import { EStorageType } from "../../constants/enums/EStorageType.js";

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage)
    private readonly storageRepository: Repository<Storage>,
    @InjectRepository(LocalStorage)
    private readonly localStorageRepository: Repository<LocalStorage>,
  ) {}

  async create(data: Partial<Storage & LocalStorage>) {
    const entity = this.storageRepository.create({
      id: crypto.randomUUID(),
      ...data,
    });
    const savedStorage = await this.storageRepository.save(entity);

    if (data.storageTypeId === EStorageType.LOCAL) {
      const localStorageEntity = this.localStorageRepository.create({
        id: savedStorage.id,
        path: data.path,
      });
      await this.localStorageRepository.save(localStorageEntity);
    }

    return savedStorage;
  }

  async findAll() {
    return this.storageRepository.find();
  }

  async findOne(id: string) {
    return this.storageRepository.findOneBy({ id });
  }

  async update(id: string, data: Partial<Storage>) {
    await this.storageRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    if (!entity) return null;
    await this.storageRepository.softDelete(id);
    return entity;
  }
}

