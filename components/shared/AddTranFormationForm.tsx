"use client"
import { aspectRatioOptions, transformationTypes } from "@/constants"
import { API } from "@/lib/config"
import { TransFormationInputs, transformSchema } from "@/types/schema.forms"
import { zodResolver } from '@hookform/resolvers/zod'
import axios from "axios"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { toast } from "../ui/use-toast"
import CreditAlert from "./CreditAlert"
import MediaUploader from "./MediaUploader"
import SaveImage from "./SaveImage"
import TransformImage from "./TransformImage"

export type Image = {
  secureUrl: string; 
  width: number;
  height: number;
  publicId: string;
}

interface TransformationProps {
  type: string;
  user: DBUser | null;
  updateImage:ImageInterface | null;
  action: string;
}

function AddTranFormationForm({type,user,updateImage,action}:TransformationProps) {
  const [image,setImage] = useState<Image>({} as Image)
  const [imageData,setImageData] = useState<DBImage | null >(null)
  const [config,setConfig] = useState<any>()
  const [isTransforming,setIsTransforming] = useState<boolean>(false)

  const initialValues = updateImage && action === 'Update' ? {
    title: updateImage?.title,
    aspectRatio: updateImage?.aspectRatio,
    color: updateImage?.color,
    prompt: updateImage?.prompt,
    publicId: updateImage?.publicId,
  } : {
    title: '',
    aspectRatio: '',
    color: '',
    prompt: '',
    publicId: '',
  }

  useEffect(()=>{
    setImage({...image,width:updateImage?.width!,height:updateImage?.height!,publicId:updateImage?.publicId!,secureUrl:updateImage?.secureUrl!})
  },[])

  const form = useForm<TransFormationInputs>({resolver:zodResolver(transformSchema),defaultValues:initialValues})
  const onSubmit : SubmitHandler<TransFormationInputs> = async (data) => {
    const {color,prompt,title,aspectRatio} = data
    setIsTransforming(true);
    const config = transformationTypes[type as keyof typeof transformationTypes].config

    if(type === 'fill'){
      const imgSize = aspectRatioOptions[data.aspectRatio as keyof typeof aspectRatioOptions]
      setImage({...image, width: imgSize.width, height: imgSize.height})
    }

    if(action === "Update"){
      await axios.put(`${API}/users/${user?._id || updateImage?.author}/decrease`)
      toast({
        title: "Image Uploaded",
        description: "Image uploaded successfully 5 credit has been used", 
        duration: 5000,
        className:"bg-green-400 text-white"
      })
    }

    if(type === 'remove' || type === 'recolor'){
      const updatedConfig = {
          to:color,
          prompt:prompt
        }
        setConfig({
          ...config,
          [type]: {
            ...updatedConfig
          }
        });
      }else{
      setConfig(config)
      setImageData({...imageData,...image,title,prompt,aspectRatio,transformationType:type,author:user?._id! || updateImage?.author! ,config})
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-5">
      { user?.creditBalance === 0 && <CreditAlert/> }
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
                <Input type="text" placeholder="color" {...field} />
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
                <Input type="text" placeholder="prompt" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      }
      <div className="flex flex-row justify-between gap-4">
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
                  user_id={user?._id!}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <TransformImage
          image={image}
          transformationConfig={config}
          isTransforming={isTransforming}
          setIsTransforming={setIsTransforming}
        />
        </div>
        <Button disabled={isTransforming} className="w-full" type="submit">Transform</Button>
        {
          !isTransforming && imageData &&
          <SaveImage
            imageData={imageData!}
            setImageData={setImageData}
            action={action}
            id={updateImage?._id!}
          />
        }
      </form>
    </Form>
  )
}

export default AddTranFormationForm