import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useEffect } from 'react'
import { useRegister } from '@/hooks/useAuth'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import AuthLayout from '../shared/ui/layout/AuthLayout'
import { useTheme } from '@/app/providers/ThemeProvider'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/useToast'

export default function RegisterPage() {
  const form = useForm({
    mode: 'onBlur',
  })
  const { theme } = useTheme()
  const navigate = useNavigate()
  const registerMutation = useRegister()
  const { showSuccessToast } = useToast()

  useEffect(() => {
    if (registerMutation.isSuccess) {
      console.log(
        'Registration successful, token:',
        registerMutation.data.token
      ) // Log token
      localStorage.setItem('token', registerMutation.data.token)
      showSuccessToast('Successfully registered!') // Show success toast
      navigate('/home') // Redirect to home/dashboard after successful registration
    }
  }, [
    registerMutation.isSuccess,
    navigate,
    registerMutation.data,
    showSuccessToast,
  ])

  const onSubmit = (data) => {
    console.log('Form submitted with data:', data) // Log form data
    if (data.password !== data.confirmPassword) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      })
      return
    }
    console.log('Calling registerMutation.mutate with data:', data) // Log before mutation
    registerMutation.mutate(data)
  }

  return (
    <AuthLayout>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-lg">Register</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Update Form component to use the onSubmit from react-hook-form */}
          <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label>Email</Label>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label>Password</Label>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter a password"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label>Confirm password</Label>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <Button
                type="submit"
                className={`w-full text-white hover:bg-gray-900 
                  ${theme === 'dark' ? 'bg-transparent border border-white' : 'bg-black'}`}
                disabled={registerMutation.isLoading}
              >
                {registerMutation.isLoading ? 'Signing up...' : 'Sign up'}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-sm text-center text-muted-foreground">
            <>Already signed up? </>
            <Link to="/auth/login" className="hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
