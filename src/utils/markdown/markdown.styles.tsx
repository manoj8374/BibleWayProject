import styled from "styled-components";
import { HEADER_HEIGHT, MOBILE_NAVBAR_HEIGHT } from "../../constants/UI";
import { breakpoints } from "../../components/Layout/Layout.styles";

export const MarkdownContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  @media (max-width: ${breakpoints.tablet}) {
    height: calc(100vh - ${HEADER_HEIGHT + MOBILE_NAVBAR_HEIGHT}px);
    min-height: calc(100vh - ${HEADER_HEIGHT + MOBILE_NAVBAR_HEIGHT}px);
  }
  &.markdown-body {
    font-family: "Times New Roman", Times, serif;
    font-size: 16px;
    line-height: 1.7;
  }

  &.markdwon-body p {
    font-size: 20px;
  }

  &.markdown-body h1 {
    font-size: 24px;
  }

  &.markdown-body h2 {
    font-size: 20px;
  }

  &.markdown-body h3 {
    font-size: 18px;
  }

  &.markdown-body h4 {
    font-size: 16px;
  }

  &.markdown-body h5 {
    font-size: 14px;
  }

  &.markdown-body h6 {
    font-size: 12px;
  }

  &.markdown-body li,
  &.markdown-body blockquote,
  &.markdown-body table {
    font-size: 16px;
  }
`;

