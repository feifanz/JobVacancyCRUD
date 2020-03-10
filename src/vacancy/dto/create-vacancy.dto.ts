export class CreateVacancyDto {
    readonly title: String;
    readonly description: String;
    readonly expiredAt: Date;
    readonly companyId: String;
}