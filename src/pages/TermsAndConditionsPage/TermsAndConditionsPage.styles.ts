import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  padding: 24px 16px;

  @media (max-width: 768px) {
    padding: 16px 12px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 900px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 24px 20px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 20px 16px;
    border-radius: 8px;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #570000;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 10px 0;
  margin-bottom: 24px;
  transition: color 0.2s ease;
  position: relative;

  &:hover {
    color: #8B1F1F;
  }

  &:active {
    transform: translateX(-2px);
  }

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 20px;
    padding: 8px 0;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 16px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: #181821;
  margin: 0 0 12px 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 8px;
  }
`;

export const LastUpdated = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 32px 0;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 24px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 20px;
  }
`;

export const Section = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 28px;
  }

  @media (max-width: 480px) {
    margin-bottom: 24px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #570000;
  margin: 0 0 16px 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

export const SectionContent = styled.div`
  font-size: 16px;
  color: #333;
  line-height: 1.7;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 1.5;
  }

  strong {
    font-weight: 600;
    color: #181821;
  }
`;

export const List = styled.ul`
  margin: 16px 0;
  padding-left: 24px;
  list-style-type: disc;

  @media (max-width: 768px) {
    margin: 12px 0;
    padding-left: 20px;
  }

  @media (max-width: 480px) {
    margin: 10px 0;
    padding-left: 18px;
  }
`;

export const ListItem = styled.li`
  font-size: 16px;
  color: #333;
  line-height: 1.7;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 6px;
  }
`;

export const CompanyName = styled.strong`
  font-weight: 600;
  color: #570000;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const ContactInfo = styled.div`
  margin-top: 12px;
  padding: 16px;
  background-color: #f9f9f9;
  border-left: 4px solid #570000;
  border-radius: 4px;

  @media (max-width: 768px) {
    padding: 12px;
    margin-top: 10px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    margin-top: 8px;
  }
`;


