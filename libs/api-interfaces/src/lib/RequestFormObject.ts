import { Circle, Commune, Province, Region } from "./Region";

export interface RequestFormObject {
  id: string,
  familyStatus: string, //  valus "single" or married
  childs: string,
  hasRamed: boolean,
  state: number,
  fullName: string,
  address: string,
  phone: string,
  cin: string,
  cinRecto: string,
  cinVerso: string,
  jobType: string,
  ramed: string,
  jobAddress: string,
  authority_id: string,
  region: string,
  province: string,
  city: string,
  commune: Commune,
  rejectReason: string,
  status: RequestStatus,
  assignedAuthorityId: string,
  processedByAuthorityId: string,
  processedByChiefAuthorityId: string,
  verificationCode: number,
}



export enum RequestStatus {
  RECEIVED,
  VALIDATED,
  CONFIRMED,
  REJECTED
}
