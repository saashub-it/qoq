export interface IModuleSkillslintConfig {
  path: string;
  threshold?: number;
  ignored?: string[];
  overall?: number;
  structure?: number;
  clarity?: number;
  specificity?: number;
  advanced?: number;
}
