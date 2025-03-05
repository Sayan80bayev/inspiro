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
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const form = useForm()

  return (
    <div className="flex justify-center items-center h-screen bg-muted">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-lg">Вход в систему</CardTitle>
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
                        placeholder="Введите email"
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
                    <Label>Пароль</Label>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Введите пароль"
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
                className="w-full bg-black text-white hover:bg-gray-900"
              >
                Войти
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-sm text-center text-muted-foreground">
            <a href="/forgot-password" className="hover:underline">
              Забыли пароль?
            </a>
            <span className="mx-2">|</span>
            <a href="/register" className="hover:underline">
              Регистрация
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
