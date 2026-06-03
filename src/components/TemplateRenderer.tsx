import React from 'react';
import { ResumeData, ResumeConfig } from '../types';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';

interface Props {
  data: ResumeData;
  config: ResumeConfig;
}

export const TemplateRenderer: React.FC<Props> = ({ data, config }) => {
  switch (config.templateId) {
    case 'modern':
      return <ModernTemplate data={data} config={config} sidebarLeft={true} />;
    case 'executive':
      return <ModernTemplate data={data} config={config} sidebarLeft={false} />;
    case 'classic':
    default:
      return <ClassicTemplate data={data} config={config} />;
  }
};
