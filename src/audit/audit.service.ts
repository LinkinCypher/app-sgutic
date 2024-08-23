import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Audit } from './audit.schema';

@Injectable()
export class AuditService {
  constructor(@InjectModel(Audit.name) private auditModel: Model<Audit>) {}

  async logAction(action: string, performedBy: string, details: any) {
    const audit = new this.auditModel({ action, performedBy, timestamp: new Date(), details });
    return audit.save(); // Guarda el registro de auditoría en la base de datos
  }
}
