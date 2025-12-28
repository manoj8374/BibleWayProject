import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, type UserLoginData } from '../../../services/auth/auth.service';
import { userService } from '../../../services/user/user.service';
import {
    AuthContainer,
    AuthCard,
    Title,
    Form,
    InputGroup,
    Label,
    Input,
    Button,
    FooterText,
    StyledLink,
    Divider
} from '../../Auth/Auth.styles'; // Reusing styles from main Auth
import { showError, showSuccess } from '../../../utils/toast';

const AdminLoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<UserLoginData>({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Login
            const loginResponse = await authService.login(credentials);

            if (loginResponse.success) {
                // 2. Check if Admin
                const profileResponse = await userService.getUserProfile();

                if (profileResponse.success && profileResponse.data?.is_admin) {
                    showSuccess('Welcome Admin');
                    navigate('/admin/dashboard');
                } else {
                    showError('Access Denied. You are not an administrator.');
                    await authService.logout(); // Logout if not admin
                }

            } else {
                showError(loginResponse.message);
            }
        } catch (error) {
            showError('An unexpected error occurred during login.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContainer>
            <AuthCard>
                <Title>Admin Portal</Title>
                <div style={{ textAlign: 'center', marginBottom: '20px', color: '#aaa', fontSize: '0.9rem' }}>
                    Authorized Personnel Only
                </div>

                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                            placeholder="admin@bibleway.com"
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                        />
                    </InputGroup>

                    <Button type="submit" disabled={loading}>
                        {loading ? 'Verifying Credentials...' : 'Access Dashboard'}
                    </Button>
                </Form>

                <Divider style={{ marginTop: '20px' }} />

                <FooterText>
                    <StyledLink to="/login">Return to Main Site</StyledLink>
                </FooterText>
            </AuthCard>
        </AuthContainer>
    );
};

export default AdminLoginPage;
