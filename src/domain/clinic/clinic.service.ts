import { Injectable } from '@nestjs/common';
import { Service } from './interfaces/service.interface';
import { Category } from './interfaces/category.interface';

Injectable();
export class ClinicService {
  private categories: Category[] = [
    {
      id: 1,
      name: 'Face',
    },
    {
      id: 2,
      name: 'Body',
    },
    {
      id: 3,
      name: 'Breast',
    },
  ];

  private services: Service[] = [
    {
      id: 1,
      name: 'Breast Augmentation',
      category: this.categories[2],
    },
    {
      id: 2,
      name: 'Facelift',
      category: this.categories[0],
    },
    {
      id: 3,
      name: 'Coolsculpting',
      category: this.categories[1],
    },
    {
      id: 4,
      name: 'Liposuction',
      category: this.categories[1],
    },
    {
      id: 5,
      name: 'Breast Reduction',
      category: this.categories[2],
    },
    {
      id: 6,
      name: 'Brow Lift',
      category: this.categories[0],
    },
  ];

  findAll() {
    return this.services;
  }

  findOne(id: number) {
    return this.services.find((service) => service.id === +id);
  }

  create(service: Service) {
    const newService = {
      id: this.services.length + 1,
      name: service.name,
      category: service.category,
    };

    if (!service.name) {
      throw new Error('Service name is required');
    }

    this.services.push(newService);

    return this.services;
  }

  update(service: Service) {
    const newServiceName = service.name;

    if (!newServiceName) {
      throw new Error('Service name is required');
    }
    const serviceToUpdate = this.findOne(service.id);
    serviceToUpdate.name = newServiceName;

    return this.services;
  }

  delete(id: number) {
    this.services.splice(id, 1);

    return this.services;
  }
}
