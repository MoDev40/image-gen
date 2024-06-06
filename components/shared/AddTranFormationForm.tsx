"use client"
import { aspectRatioOptions, transformationTypes } from "@/constants"
import { TransFormationInputs, transformSchema } from "@/types/schema.forms"
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import MediaUploader from "./MediaUploader"
import TransformedImage from "./TransformedImage"

export type Image = {
  secureUrl: string; 
  width: number;
  height: number;
  publicId: string;
}
function AddTranFormationForm({type}:{type:string}) {
  const [image,setImage] = useState<Image>({} as Image)
  const [config,setConfig] = useState<any>()
  const [isTransforming,setIsTransforming] = useState<boolean>(false)


  const form = useForm<TransFormationInputs>({resolver:zodResolver(transformSchema)})
  const onSubmit : SubmitHandler<TransFormationInputs> = (data) => {
    setIsTransforming(true);
    const config = transformationTypes[type as keyof typeof transformationTypes].config

    if(type === 'fill'){
      const imgSize = aspectRatioOptions[data.aspectRatio as keyof typeof aspectRatioOptions]
      setImage({...image, width: imgSize.width, height: imgSize.height})
    }

    if(type === 'remove' || type === 'recolor'){
      const updatedConfig = {
          to: data?.color,
          prompt: data?.prompt
        }
        setConfig({
          ...config,
          [type]: {
            ...updatedConfig
          }
        });
      }else{
      setConfig(config)
    }
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
      <div className="grid grid-cols-2 items-center gap-3">
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
        <TransformedImage
          image={image}
          transformationConfig={config}
          isTransforming={isTransforming}
          setIsTransforming={setIsTransforming}
        />
        </div>
        <Button disabled={isTransforming} className="w-full" type="submit">Transform</Button>
      </form>
    </Form>
  )
}

export default AddTranFormationForm