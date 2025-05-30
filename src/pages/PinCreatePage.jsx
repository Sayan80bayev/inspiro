import { useForm } from 'react-hook-form'
import { useCreatePin } from '../hooks/usePinHooks'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/ui/Loading'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useTheme } from '@/app/providers/ThemeProvider'
import { useToast } from '@/hooks/useToast'

export default function PinCreatePage() {
  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      image: null,
    },
  })

  const navigate = useNavigate()
  const createPinMutation = useCreatePin()
  const { theme } = useTheme()
  const { showErrorToast } = useToast()
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      showErrorToast('You must be signed in to create a pin!')
      navigate('/auth/login')
    }
  }, [navigate, showErrorToast])

  useEffect(() => {
    if (createPinMutation.isSuccess) {
      navigate('/home')
    }
  }, [createPinMutation.isSuccess, navigate])

  const onSubmit = (data) => {
    if (!data.image) {
      showErrorToast('Image is required.')
      return
    }

    // Pass raw object, not FormData
    createPinMutation.mutate({
      title: data.title,
      description: data.description,
      image: data.image,
    })
  }

  if (createPinMutation.isLoading) return <Loading />

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card
        className={`w-full max-w-4xl flex flex-col md:flex-row ${
          theme === 'dark'
            ? 'bg-transparent border border-gray-700'
            : 'bg-white'
        }`}
      >
        <div className="md:w-1/2 w-full border-b md:border-b-0 md:border-r border-gray-300 dark:border-gray-600 p-4 flex items-center justify-center">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-80 rounded-lg object-contain"
            />
          ) : (
            <p className="text-sm text-gray-500">
              Image preview will appear here
            </p>
          )}
        </div>

        <div className="md:w-1/2 w-full p-4">
          <CardHeader>
            <CardTitle className="text-lg">Create New Pin</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <Label>Title</Label>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter pin title"
                          required
                          className={
                            theme === 'dark'
                              ? 'bg-transparent border border-gray-600'
                              : ''
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Description</Label>
                      <FormControl>
                        <Textarea
                          placeholder="Tell everyone what your Pin is about"
                          className={`resize-none ${
                            theme === 'dark'
                              ? 'bg-transparent border border-gray-600'
                              : ''
                          }`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <Label>Upload Image</Label>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/jpeg, image/png, image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (!file) return

                        const validTypes = [
                          'image/jpeg',
                          'image/png',
                          'image/webp',
                        ]
                        if (!validTypes.includes(file.type)) {
                          showErrorToast(
                            'Only JPG, PNG, and WEBP files are allowed.'
                          )
                          return
                        }

                        setImagePreview(URL.createObjectURL(file))
                        form.setValue('image', file)
                      }}
                      className={
                        theme === 'dark'
                          ? 'bg-transparent border border-gray-600'
                          : ''
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                {createPinMutation.isError && (
                  <p className="text-red-500 text-sm">
                    {createPinMutation.error?.response?.data?.message ||
                      'Failed to create pin'}
                  </p>
                )}

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className={`w-full ${
                      theme === 'dark'
                        ? 'border-white text-white hover:bg-gray-800'
                        : 'border-black hover:bg-gray-100'
                    }`}
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className={`w-full ${
                      theme === 'dark'
                        ? 'bg-transparent border border-white text-white hover:bg-gray-800'
                        : 'bg-black text-white hover:bg-gray-900'
                    }`}
                  >
                    Create Pin
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
