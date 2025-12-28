import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
`;

export const DialogContainer = styled.div`
  background: #1e1e1e;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

export const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #333;
`;

export const DialogTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  
  svg {
    color: #ffffff;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  transition: color 0.2s;
  
  &:hover {
    color: #ffffff;
  }
`;

export const LinkSection = styled.div`
  padding: 20px;
  border-bottom: 1px solid #333;
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #2a2a2a;
  border-radius: 8px;
  padding: 12px;
`;

export const LinkIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  flex-shrink: 0;
`;

export const LinkContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const LinkTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const LinkUrl = styled.div`
  font-size: 12px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const LinkActions = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`;

export const QRCodeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  border-radius: 4px;
  transition: all 0.2s;
  
  &:hover {
    background: #333;
    color: #ffffff;
  }
`;

export const CopyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  border-radius: 4px;
  transition: all 0.2s;
  
  &:hover {
    background: #333;
    color: #ffffff;
  }
`;

export const ShareToSection = styled.div`
  padding: 20px;
  border-bottom: 1px solid #333;
`;

export const ShareToTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #999;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ShareToGrid = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ShareToItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.2s;
  min-width: 80px;
  
  &:hover {
    background: #2a2a2a;
  }
`;

export const ShareToIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border: 2px solid #333;
`;

export const ShareToName = styled.span`
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ShareUsingSection = styled.div`
  padding: 20px;
`;

export const ShareUsingTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #999;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ShareUsingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ShareAppItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.2s;
  
  &:hover {
    background: #2a2a2a;
  }
`;

export const ShareAppIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const ShareAppName = styled.span`
  font-size: 12px;
  color: #ffffff;
  text-align: center;
`;

export const QRCodeModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  padding: 20px;
`;

export const QRCodeContent = styled.div`
  background: #1e1e1e;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  max-width: 300px;
  width: 100%;
`;

export const QRCodeCloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  transition: color 0.2s;
  
  &:hover {
    color: #ffffff;
  }
`;

