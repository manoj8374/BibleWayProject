import styled from "styled-components";
import { HEADER_HEIGHT, MOBILE_NAVBAR_HEIGHT } from "../../constants/UI";
import { breakpoints } from "../../components/Layout/Layout.styles";

export const MarkDownWrapper = styled.div`
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: ${breakpoints.tablet}) {
    height: calc(100vh - ${HEADER_HEIGHT + MOBILE_NAVBAR_HEIGHT}px);
  }
`;

export const BlockWrapper = styled.div<{ $isChapterStart?: boolean }>`
  /* Block-level snap removed - using page-level snap instead */
`;