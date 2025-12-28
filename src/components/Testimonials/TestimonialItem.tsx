import React, { useState } from "react";
import {
  TestimonialItem as StyledTestimonialItem,
  Avatar,
  ContentWrapper,
  UserInfo,
  UserName,
  RatingWrapper,
  Description,
  ExpandIcon,
  MediaSection,
  MediaContainer,
  ImageMedia,
  VideoMedia,
  AudioMedia,
} from "./TestimonialItem.styles";
import StarRating from "./StarRating";
import type {
  Testimonial,
  TestimonialMedia,
} from "../../services/testimonial/testimonial.service";

interface TestimonialItemProps {
  testimonial: Testimonial;
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({
  testimonial,
}: TestimonialItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const displayName = testimonial.user.user_name || "Anonymous";
  const avatarInitial = displayName.charAt(0).toUpperCase();
  const avatarColor = testimonial.user.profile_picture_url
    ? undefined
    : "#E74C3C";

  const renderMedia = () => {
    if (!isExpanded || !testimonial.media || testimonial.media.length === 0) {
      return null;
    }

    return (
      <MediaSection onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        {testimonial.media.map((mediaItem: TestimonialMedia) => {
          if (mediaItem.media_type === "image") {
            return (
              <MediaContainer key={mediaItem.media_id}>
                <ImageMedia src={mediaItem.url} alt="Testimonial media" />
              </MediaContainer>
            );
          }

          if (mediaItem.media_type === "video") {
            return (
              <MediaContainer key={mediaItem.media_id}>
                <VideoMedia
                  src={mediaItem.url}
                  controls
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                />
              </MediaContainer>
            );
          }

          if (mediaItem.media_type === "audio") {
            return (
              <MediaContainer key={mediaItem.media_id}>
                <AudioMedia
                  controls
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <source src={mediaItem.url} />
                </AudioMedia>
              </MediaContainer>
            );
          }

          return null;
        })}
      </MediaSection>
    );
  };

  return (
    <StyledTestimonialItem $isExpanded={isExpanded} onClick={handleToggle}>
      <Avatar
        $bgColor={avatarColor}
        $bgImage={testimonial.user.profile_picture_url || undefined}
      >
        {!testimonial.user.profile_picture_url && avatarInitial}
      </Avatar>
      <ContentWrapper>
        <UserInfo>
          <UserName>{displayName}</UserName>
          <RatingWrapper>
            <StarRating rating={testimonial.rating} size={14} />
          </RatingWrapper>
        </UserInfo>
        <Description $isExpanded={isExpanded}>
          {testimonial.description}
        </Description>
        {renderMedia()}
      </ContentWrapper>
      <ExpandIcon $isExpanded={isExpanded}>▼</ExpandIcon>
    </StyledTestimonialItem>
  );
};

export default TestimonialItem;
