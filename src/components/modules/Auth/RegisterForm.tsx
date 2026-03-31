/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { registerAction } from "@/app/(commonLayout)/(authRouteGroup)/register/_action";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { registerZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const RegisterForm = () => {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: registerAction,
    });

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const result = await mutateAsync(value) as any;
                if (!result?.success) {
                    setServerError(result?.message || "Registration failed");
                    return;
                }
                toast.success("Registered successfully!");
                router.push(result.redirectTo);
            } catch (error: any) {
                setServerError(error?.message || "An error occurred");
            }
        }
    });

    return (
        <Card className="w-full max-w-md mx-auto shadow-md">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
                <CardDescription>Join us today! Please fill in the details.</CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                    className="space-y-4"
                >
                    <form.Field name="name" validators={{ onChange: registerZodSchema.shape.name }}>
                        {(field) => (
                            <AppField field={field} label="Full Name" placeholder="John Doe" />
                        )}
                    </form.Field>

                    <form.Field name="email" validators={{ onChange: registerZodSchema.shape.email }}>
                        {(field) => (
                            <AppField field={field} label="Email" type="email" placeholder="example@mail.com" />
                        )}
                    </form.Field>

                    <form.Field name="password" validators={{ onChange: registerZodSchema.shape.password }}>
                        {(field) => (
                            <AppField field={field} label="Password" type="password" placeholder="******" />
                        )}
                    </form.Field>

                    {serverError && (
                        <Alert variant="destructive">
                            <AlertDescription>{serverError}</AlertDescription>
                        </Alert>
                    )}

                    <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
                        {([canSubmit, isSubmitting]) => (
                            <AppSubmitButton isPending={isSubmitting || isPending} pendingLabel="Registering..." disabled={!canSubmit}>
                                Register
                            </AppSubmitButton>
                        )}
                    </form.Subscribe>
                </form>
            </CardContent>
            <CardFooter className="justify-center border-t pt-4">
                <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-medium hover:underline">
                        Log In
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
};

export default RegisterForm;