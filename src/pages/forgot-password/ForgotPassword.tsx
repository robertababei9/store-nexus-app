import { useState, useEffect } from 'react';
import { Button, Card, Layout } from "src/components/_shared"
import { TextField } from "@mui/material";
import { Controller, useForm } from 'react-hook-form';
import { AppLogo } from 'src/components/_shared/Icons/Icons';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/utils/Constants';
import { openNotification } from 'src/utils/Notification';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const methods = useForm();

    const handleSubmit = async () => {
        console.log("Email sent");
        openNotification("success", "Bravo!!!", "Ai primit un email, bravo :)", 10);
    };

    return (
        <Layout className="flex justify-center items-center h-screen">
            <div>
                <Card className="text-left"> {/* Adăugați clasa "text-left" pentru a alinia textul la stânga */}
                    <div className="mb-6">
                        <AppLogo width={50} height={50} />
                    </div>
                    <h1 className="text-3xl font-semibold mb-2">Forgot Password?</h1>
                    <p className="text-lg text-gray-600 mb-6">Please enter your email address to receive a verification code</p>
                    <Controller
                        name="Email"
                        control={methods.control}
                        rules={{
                            required: "Please enter your email!",
                            validate: {
                                maxLength: (v) =>
                                    v.length <= 50 || "The email should have at most 50 characters",
                                matchPattern: (v) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                                    "Please enter a valid email address!",
                            },
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                className="w-full"
                                style={{ marginBottom: 20 }}
                                label="Email"
                                variant="outlined"
                                value={value}
                                onChange={(value) => {
                                    onChange(value);
                                }}
                                size="medium"
                                error={error !== undefined}
                                helperText={error?.message}
                                required
                            />
                        )}
                    />
                    <Button
                        className="h-10 mt-2 w-full"
                        type="secondary"
                        onClick={handleSubmit}
                    >
                        Send Email
                    </Button>
                    <div className="flex justify-center mt-4"> {/* Utilizați clasele CSS de aliniere pentru a centra butonul */}
                        <span
                            className="flex items-center text-secondary text-sm hover:text-indigo-500 hover:underline"
                            onClick={() => navigate(ROUTES.SignIn)}
                            style={{ cursor: 'pointer' }}
                        >
                            <AiOutlineArrowLeft className="mr-1" size={16} />
                            Back to Log In
                        </span>
                    </div>
                </Card>
            </div>
        </Layout>
    );
}
