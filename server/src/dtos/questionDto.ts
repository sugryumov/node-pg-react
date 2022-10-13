export class QuestionDto {
  id;
  body;
  answersVariant;

  constructor(model: any) {
    this.id = model.id;
    this.body = model.body;
    this.answersVariant = model.answersVariant;
  }
}
