import { useForm } from 'react-hook-form'
import { useLogin } from '../hooks/useAuth'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Loading from '../components/ui/Loading'
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
import AuthLayout from '../shared/ui/layout/AuthLayout'
import { useTheme } from '@/app/providers/ThemeProvider'

export default function LoginPage() {
  const form = useForm()
  const navigate = useNavigate()
  const loginMutation = useLogin()
  const { theme } = useTheme() // Получаем текущую тему

  useEffect(() => {
    if (loginMutation.isSuccess) {
      navigate('/dashboard') // Redirect to dashboard after login
    }
  }, [loginMutation.isSuccess, navigate])

  const onSubmit = (data) => {
    loginMutation.mutate(data)
  }

  if (loginMutation.isLoading) return <Loading />

  return (
    <AuthLayout>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-lg">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label>Password</Label>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {loginMutation.isError && (
                <p className="text-red-500 text-sm">
                  {loginMutation.error.response?.data?.message ||
                    'Login failed'}
                </p>
              )}
              <Button
                type="submit"
                className={`w-full  text-white hover:bg-gray-900 
                  ${theme === 'dark' ? 'bg-transparent border border-white' : 'bg-black'}`}
              >
                Log in
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-sm text-center text-muted-foreground">
            <>Don't have an account? </>
            <Link to="/auth/register" className="hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
