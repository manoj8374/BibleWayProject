import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageContainer,
  ContentWrapper,
  BackButton,
  Title,
  LastUpdated,
  Section,
  SectionTitle,
  SectionContent,
  List,
  ListItem,
  CompanyName,
  ContactInfo,
} from './TermsAndConditionsPage.styles';

const TermsAndConditionsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // If there's a previous page in history, go back, otherwise go to login
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/login');
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <BackButton onClick={handleBack}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </BackButton>

        <Title>Terms and Conditions</Title>
        <LastUpdated>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</LastUpdated>

        <Section>
          <SectionTitle>1. User Conduct</SectionTitle>
          <SectionContent>
            By using BibleWay, you agree to:
            <List>
              <ListItem>Provide true and accurate information</ListItem>
              <ListItem>Use the application lawfully and responsibly</ListItem>
              <ListItem>Refrain from transmitting spam, viruses, or malicious content</ListItem>
              <ListItem>Respect intellectual property rights and privacy of others</ListItem>
              <ListItem>Not infringe upon any intellectual property or privacy rights</ListItem>
            </List>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>2. Account Responsibility</SectionTitle>
          <SectionContent>
            Users are solely responsible for maintaining the confidentiality of their login credentials 
            and for all activities occurring under their account. You agree to:
            <List>
              <ListItem>Keep your login credentials secure and confidential</ListItem>
              <ListItem>Notify us immediately of any unauthorized access to your account</ListItem>
              <ListItem>Be responsible for all activities that occur under your account</ListItem>
            </List>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>3. Acceptable Use Policy</SectionTitle>
          <SectionContent>
            You explicitly agree NOT to transmit, post, or share content that is:
            <List>
              <ListItem>Defamatory or libelous</ListItem>
              <ListItem>Obscene, pornographic, or offensive</ListItem>
              <ListItem>Invasive of another's privacy</ListItem>
              <ListItem>Hateful, discriminatory, or promotes violence</ListItem>
              <ListItem>Harmful to minors</ListItem>
              <ListItem>Violates any applicable laws or regulations</ListItem>
            </List>
            Violation of this policy may result in immediate termination of your account.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>4. Termination</SectionTitle>
          <SectionContent>
            We reserve the right to suspend or terminate accounts that:
            <List>
              <ListItem>Violate these Terms and Conditions</ListItem>
              <ListItem>Engage in cyber-stalking or harassment</ListItem>
              <ListItem>Send unsolicited bulk messages (spam)</ListItem>
              <ListItem>Engage in any illegal activities</ListItem>
              <ListItem>Breach security measures or attempt unauthorized access</ListItem>
            </List>
            Termination may occur without prior notice, and you will lose access to all services immediately.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>5. App Ownership</SectionTitle>
          <SectionContent>
            All trademarks, copyrights, and intellectual property rights in BibleWay belong to 
            <CompanyName>M/s. Linchpin Soft Solutions Pvt. Ltd.</CompanyName>
            <br /><br />
            The application, including its design, logos, graphics, text, and software, is protected 
            by copyright and trademark laws. Unauthorized use, reproduction, or distribution of any 
            content from BibleWay is strictly prohibited.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>6. Service Limitations</SectionTitle>
          <SectionContent>
            BibleWay is provided "as is" without warranties of any kind, either express or implied. 
            We do not guarantee that:
            <List>
              <ListItem>The service will be error-free or uninterrupted</ListItem>
              <ListItem>All defects will be corrected</ListItem>
              <ListItem>The service will meet your specific requirements</ListItem>
            </List>
            We reserve the right to modify, suspend, or discontinue any aspect of the service at any time 
            without prior notice. We may also update these Terms and Conditions from time to time, and 
            continued use of the service constitutes acceptance of any changes.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>7. Payments and Fees</SectionTitle>
          <SectionContent>
            Some services within BibleWay may require payment. By using paid services, you agree to:
            <List>
              <ListItem>Pay all charges associated with your use of paid features</ListItem>
              <ListItem>Provide accurate billing information</ListItem>
              <ListItem>Understand that fees may vary and are subject to change with notice</ListItem>
              <ListItem>Accept responsibility for all charges incurred under your account</ListItem>
            </List>
            All fees are non-refundable unless otherwise stated. We reserve the right to change our 
            pricing structure at any time with reasonable notice.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>8. Data and Privacy</SectionTitle>
          <SectionContent>
            By using BibleWay, you acknowledge and agree that:
            <List>
              <ListItem>You are responsible for the security of your device</ListItem>
              <ListItem>We process your personal data to provide and improve our services</ListItem>
              <ListItem>Your data may be stored and processed in accordance with our Privacy Policy</ListItem>
              <ListItem>We implement reasonable security measures but cannot guarantee absolute security</ListItem>
            </List>
            Please review our Privacy Policy for detailed information about how we collect, use, and protect your data.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>9. Intellectual Property</SectionTitle>
          <SectionContent>
            You agree NOT to:
            <List>
              <ListItem>Copy, reproduce, or duplicate any content from BibleWay</ListItem>
              <ListItem>Modify, adapt, or create derivative works based on the application</ListItem>
              <ListItem>Extract, scrape, or harvest source code, content, or data</ListItem>
              <ListItem>Reverse engineer, decompile, or disassemble the application</ListItem>
              <ListItem>Use any automated systems to access the service without authorization</ListItem>
            </List>
            Any unauthorized use of BibleWay's intellectual property may result in legal action.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>10. Contact Information</SectionTitle>
          <SectionContent>
            If you have any questions or concerns regarding these Terms and Conditions, please contact us:
            <ContactInfo>
              <CompanyName>M/s. Linchpin Soft Solutions Pvt. Ltd.</CompanyName>
            </ContactInfo>
          </SectionContent>
        </Section>

        <Section>
          <SectionContent>
            <strong>
              By using BibleWay, you acknowledge that you have read, understood, and agree to be bound 
              by these Terms and Conditions. If you do not agree to these terms, please do not use our service.
            </strong>
          </SectionContent>
        </Section>
      </ContentWrapper>
    </PageContainer>
  );
};

export default TermsAndConditionsPage;


