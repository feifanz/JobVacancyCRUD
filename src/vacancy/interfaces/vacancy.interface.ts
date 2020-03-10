import { Document } from 'mongoose';

export interface Vacancy extends Document {
  readonly title: String;
  readonly description: String;
  readonly expiredAt: Date;
  readonly companyId: String;
}
