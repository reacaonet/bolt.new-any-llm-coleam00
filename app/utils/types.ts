
interface OllamaModelDetails {
  parent_model: string;
  format: string;
  family: string;
  families: string[];
  parameter_size: string;
  quantization_level: string;
}

export interface OllamaModel {
  name: string;
  model: string;
  modified_at: string;
  size: number;
  digest: string;
  details: OllamaModelDetails;
}

export interface OllamaApiResponse {
  models: OllamaModel[];
}

export interface ModelInfo {
  name: string;
  label: string;
  provider: string;
}


export interface TemplateInfo {
  name: string;
  label: string;
  githubRepo: string;
}

export interface IToolsConfig {
  enabled: boolean;
  //this section will be usefull for future features
  config: Record<string, {
    name: string;
    id: string;
    enabled: boolean;
  }>
}