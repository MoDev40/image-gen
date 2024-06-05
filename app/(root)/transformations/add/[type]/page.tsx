import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'
import AddTranFormationForm from '@/components/shared/AddTranFormationForm';

interface Params {
  type:string
}

interface TransformationType {
  type: string;
  title: string;
  subTitle: string;
  config: {
    [key: string]: any;
  };
  icon: string;
}
function AddTransformationType({params}:{params:Params}) {
  const {type} = params
  const transform : TransformationType = transformationTypes[type as keyof typeof transformationTypes]
  return (
    <>
    <Header title={transform.title} subtitle={transform.subTitle}/>
    <AddTranFormationForm type={transform.type}/>
    </>
  )
}

export default AddTransformationType