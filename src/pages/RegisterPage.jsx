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
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import AuthLayout from '../shared/ui/layout/AuthLayout'
import { useTheme } from '@/app/providers/ThemeProvider'

export default function RegisterPage() {
  const form = useForm()
  const { theme } = useTheme() // Получаем текущую тему

  return (
    <AuthLayout>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-lg">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4">
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
                        placeholder="Enter a password"
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
              <Button
                type="submit"
                className={`w-full  text-white hover:bg-gray-900 
                  ${theme === 'dark' ? 'bg-transparent border border-white' : 'bg-black'}`}
              >
                Sign up
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
