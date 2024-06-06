"use client"
import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "../ui/input"
import { TransFormationInputs, transformSchema } from "@/types/schema.forms"
import { zodResolver } from '@hookform/resolvers/zod';
import MediaUploader from "./MediaUploader"
import { useState } from "react"
import { aspectRatioOptions } from "@/constants"

export type Image = {
  secureUrl: string; 
  width: number;
  height: number;
  publicId: string;
}
function AddTranFormationForm({type}:{type:string}) {
  const [image,setImage] = useState<Image>({} as Image)

  const form = useForm<TransFormationInputs>({resolver:zodResolver(transformSchema)})
  const onSubmit : SubmitHandler<TransFormationInputs> = (data) => {
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-5">
      <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel/>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      { type === 'fill' &&
      <FormField
          control={form.control}
          name="aspectRatio"
          render={({ field }) => (
            <FormItem>
              <FormLabel/>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue defaultValue={field.value} placeholder="aspect ratio" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    Object.keys(aspectRatioOptions).map(key =>(
                      <SelectItem key={key} value={key} >{aspectRatioOptions[key as keyof typeof aspectRatioOptions].label}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      }
      { type === 'recolor' && 
      <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel/>
              <FormControl>
                <Input placeholder="color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      }
      { (type === 'remove' || type === 'recolor')&& 
      <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel/>
              <FormControl>
                <Input placeholder="prompt" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      }
      <FormField
          control={form.control}
          name="publicId"
          render={({ field }) => (
            <FormItem>
              <FormLabel/>
              <FormControl>
                <MediaUploader
                image={image}
                onValueChange={field.onChange}
                publicId={field.value}
                setImage={setImage}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">Transform</Button>
      </form>
    </Form>
  )
}

export default AddTranFormationForm