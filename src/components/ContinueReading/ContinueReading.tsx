import React from 'react';
import {
  Container,
  Title,
  CardContainer,
  Card,
  BookImage,
  BookInfo,
  BookTitle,
  BookDescription,
  ContinueButton
} from './ContinueReading.styles';
import { useI18n } from '../../i18n';

export interface Book {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  progress?: number;
  chapterId?: string | null;
  blockId?: string | null;
}

interface ContinueReadingProps {
  books?: Book[];
  onContinueReading?: (bookId: string, chapterId?: string | null, blockId?: string | null) => void;
}

const ContinueReading: React.FC<ContinueReadingProps> = ({
  books = [],
  onContinueReading
}) => {
  const { t } = useI18n();
  return (
    <Container>
      <Title>{t('continueReading.title')}</Title>
      <CardContainer>
        {books.map((book) => (
          <Card key={book.id}>
            <BookImage src={book.coverImage} alt={book.title} />
            <BookInfo>
              <BookTitle>{book.title}</BookTitle>
              <BookDescription>{book.description}</BookDescription>
              <ContinueButton onClick={() => onContinueReading?.(book.id, book.chapterId, book.blockId)}>
                {t('continueReading.continueButton')}
              </ContinueButton>
            </BookInfo>
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
};

export default ContinueReading;
