import styled from 'styled-components';

export const CardContainer = styled.div`
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
  border-radius: 16px;
  padding: 32px 24px;
  margin-bottom: 24px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  }

  @media (max-width: 1024px) {
    padding: 24px 20px;
    min-height: 160px;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    padding: 20px 16px;
    min-height: 140px;
    margin-bottom: 16px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 18px 14px;
    min-height: 130px;
    margin-bottom: 14px;
  }
`;

export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
`;

export const CardContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const CardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 8px;
  opacity: 0.95;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));

  @media (max-width: 768px) {
    margin-bottom: 6px;
    
    svg:first-child {
      width: 28px;
      height: 28px;
    }
    
    svg:last-child {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 4px;
    
    svg:first-child {
      width: 24px;
      height: 24px;
    }
    
    svg:last-child {
      width: 18px;
      height: 18px;
    }
  }
`;

export const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.5px;
  line-height: 1.3;

  @media (max-width: 1024px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    letter-spacing: 0.3px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    letter-spacing: 0.2px;
  }
`;

export const CardDescription = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  letter-spacing: 0.3px;

  @media (max-width: 768px) {
    font-size: 13px;
    letter-spacing: 0.2px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    letter-spacing: 0.1px;
  }
`;

