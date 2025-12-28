import React, { useState, useEffect } from 'react';
import {
    Container,
    Header,
    Title,
    SubmitButton,
    TestimonialsList,
    LoadingContainer,
    ErrorContainer,
    EmptyContainer
} from './Testimonials.styles';
import TestimonialItem from './TestimonialItem';
import { testimonialService } from '../../services/testimonial/testimonial.service';
import type { Testimonial } from '../../services/testimonial/testimonial.service';
import { BsChatDots } from 'react-icons/bs';
import SubmitTestimonialModal from './SubmitTestimonialModal';

const Testimonials: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchTestimonials = async () => {
        setLoading(true);
        setError(null);

        const response = await testimonialService.getAllTestimonials(10, 0);

        if (response.success) {
            setTestimonials(response.data);
        } else {
            setError(response.message || 'Failed to load testimonials');
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleTestimonialCreated = () => {
        fetchTestimonials();
        setIsModalOpen(false);
    };

    if (loading) {
        return (
            <Container>
                <Header>
                    <Title>Testimonials</Title>
                    <SubmitButton onClick={() => setIsModalOpen(true)}>
                        <BsChatDots />
                        Submit Testimonial
                    </SubmitButton>
                </Header>
                <LoadingContainer>Loading testimonials...</LoadingContainer>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Header>
                    <Title>Testimonials</Title>
                    <SubmitButton onClick={() => setIsModalOpen(true)}>
                        <BsChatDots />
                        Submit Testimonial
                    </SubmitButton>
                </Header>
                <ErrorContainer>{error}</ErrorContainer>
            </Container>
        );
    }

    if (testimonials.length === 0) {
        return (
            <Container>
                <Header>
                    <Title>Testimonials</Title>
                    <SubmitButton onClick={() => setIsModalOpen(true)}>
                        <BsChatDots />
                        Submit Testimonial
                    </SubmitButton>
                </Header>
                <EmptyContainer>No testimonials available</EmptyContainer>
                <SubmitTestimonialModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onTestimonialCreated={handleTestimonialCreated}
                />
            </Container>
        );
    }

    return (
        <>
            <Container>
                <Header>
                    <Title>Testimonials</Title>
                    <SubmitButton onClick={() => setIsModalOpen(true)}>
                        <BsChatDots />
                        Submit Testimonial
                    </SubmitButton>
                </Header>
                <TestimonialsList>
                    {testimonials.map((testimonial) => (
                        <TestimonialItem key={testimonial.testimonial_id} testimonial={testimonial} />
                    ))}
                </TestimonialsList>
            </Container>
            <SubmitTestimonialModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onTestimonialCreated={handleTestimonialCreated}
            />
        </>
    );
};

export default Testimonials;

