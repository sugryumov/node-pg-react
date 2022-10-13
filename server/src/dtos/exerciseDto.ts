export class ExerciseDto {
  rules;
  example;

  constructor(model: any) {
    this.rules = model.rules;
    this.example = model.example;
  }
}
