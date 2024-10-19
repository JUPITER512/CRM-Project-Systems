// import { useForm,useFieldArray } from "react-hook-form";
// const ReactHookForm = () => {
//     const form=useForm({
//         defaultValues:{
//             name:"",
//             email:"",
//             address:{
//                 home:"",
//                 street:""
//             },
//             phone:["",""],
//             phNumbers:[{number:""}],
//             age:0,
//             date:new Date()
//         }
//     });
//     const {register,formState,handleSubmit,control,watch,getValues,setValue,reset}=form;
//     const {fields,append,remove}=useFieldArray({
//         name:"phNumbers",
//         control:control
//     })
//     const{errors,touchedFields,dirtyFields,isDirty,isValid,isSubmitting,isSubmitted,isSubmitSuccessful}=formState
//     function submit(data){
//         console.log(data);
//     }
//     function onError(errors){
//         // console.log("Forms  Error ",errors.message)
//     }
//     // useEffect(()=>{
//     //     const subscribe=watch((value)=>{
//     //         console.log(value)
//     //     })
//     //     return ()=>{
//     //         subscribe.unsubscribe()
//     //     }
//     // },[])
//     console.log({isSubmitting,isSubmitted,isSubmitSuccessful })
//     function handleGetValues(){
//         console.log("Get Values",getValues(["name","email"]))
//     }
//     function handleSetValues(){
//         // setValue('name','')
//         setValue('name','',{
//             shouldDirty:true,
//             shouldTouch:true,
//             shouldValidate:true
//         })
//     }
//     console.log({touchedFields,dirtyFields,isDirty});
//       return (
//     <>
//     <form onSubmit={handleSubmit(submit,onError)} noValidate className="flex flex-col ">
//         <input className=" border-2 m-2" type="text" {...register("name",{
//             required:"Name is Required"
//         })} />
//         <input className=" border-2 m-2" placeholder='age' type="number" {...register("age",{
//             valueAsNumber:true,
//             disabled:getValues("name")==='',
//             required:"Age is Required"
//         })} />
//         <input className=" border-2 m-2" placeholder='dov' type="date" {...register("date",{
//             valueAsDate:true,
//             required:"date is Required"
//         })} />
//         <input className=" border-2 m-2" type="email" {...register("email",{
//             required:{
//                 value:true,
//                 email:"Email is required"
//             },
//             pattern:{
//                 value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                 message:"Invalid Pattern"
//             },
//             validate:{
//                 notAllowed:(value)=>{
//                     if(value=='admin@gmail.com'){
//                     return 'this email is not allowed'
//                 }},
//                 emailAvailable  : async(fieldValue)=>{
//                     const response=await fetch(`https://jsonplaceholder.typicode.com/users?email${fieldValue}`)
//                     const data=await response.json();
//                     return data.length==0 || "Email Already Exits"
//                     }
//                 }
            
//         })} />
//         <input
//         className=" border-2 m-2" 
//         type="text" {...register('phone.0')}
//         />
//         <input
//         className=" border-2 m-2" 
//         type="text" {...register('phone.1')}
//         />
//         <input
//         className=" border-2 m-2" 
//         type="text" {...register('address.home')}
//         />
//         <input
//         className=" border-2 m-2" 
//         type="text" {...register('address.street')}
//         />
//         {errors.email && <p>{errors.email.message}</p>}
//         {errors.name && <p>{errors.name.message}</p>}
//         {
//             fields.map((field,index)=>{
//                 return (<div key={field.id} className="form-control">
//                         <input type="text" className="border-2 m-2" placeholder={`Phone # ${index+1}`} {...register(`phNumbers.${index}.number`)}/>
//                         {
//                             index>0 && (
//                                 <button type="button" onClick={()=>{remove(index)}}>Remove</button>
                            
//                             )
//                         }
//                 </div>)
//             })
//         }
//         <button type="button" onClick={()=>{append({number:""})}}>Add</button>
//         <button type="submit" >Submit</button>
//         <button type="button" onClick={()=>{handleGetValues()}}>Get Values</button>
//         <button type="button" onClick={()=>{handleSetValues()}}>Set Values</button>
//         <button type="button" onClick={()=>{reset()}}>RESET</button>
//     </form>
//     <DevTool control={control}/>
//     </>
//   )
// }

// //form submission have 4 states
// //1 isSubmitting
// //2 isSubmitted
// //3 isSubmitSuccessful
// //4 submitCount

// export default ReactHookForm