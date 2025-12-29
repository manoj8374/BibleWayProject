import React from 'react';
import {
  CardContainer,
  CardContent,
  CardTitle,
  CardDescription,
  CardIcon,
  GradientOverlay
} from './LanguagesVersionsCard.styles';
import { useI18n } from '../../i18n/hooks';
import { FaGlobe, FaBook } from 'react-icons/fa';

const LanguagesVersionsCard: React.FC = () => {
  const { t } = useI18n();

  return (
    <CardContainer>
      <GradientOverlay />
      <CardContent>
        <CardIcon>
          <FaGlobe size={32} />
          <FaBook size={24} style={{ marginLeft: '8px' }} />
        </CardIcon>
        <CardTitle>
          {t('pages.homePage.languagesVersions.title') || 'Languages & Versions'}
        </CardTitle>
        <CardDescription>
          {t('pages.homePage.languagesVersions.description') || 'Coming Soon'}
        </CardDescription>
      </CardContent>
    </CardContainer>
  );
};

export default LanguagesVersionsCard;

