import { useFormik } from "formik";
import { formData } from "./formData";
import { createYupSchema } from "./yupSchemaCreator";
import * as yup from "yup";
const baseSchema = yup.object({
    room:yup.number().typeError("shoube be number").required(),
    toilet:yup.number().required("toilet is required")

})
const Form = () => {
    const initialValues = {};
    formData.forEach(item=>{
        initialValues[item.id] = item.value || ""
    })
    const yepSchema = formData.reduce(createYupSchema,{});
    const validateSchema = yup.object().shape(yepSchema);
    const combinedSchema = baseSchema.shape({
        overviews: validateSchema,
      });
const formik = useFormik({
    initialValues:{room:2,toilet:1,...initialValues},
    validationSchema:combinedSchema,
    onSubmit: (values,action)=>{
        console.log("values",values);
        console.log("actions",action);


    }
})
console.log(formik.errors);
  return (
    <div className="form">
            <h1>Form here</h1>

            <form onSubmit={formik.handleSubmit}>
                    <input type="number" name ="room" onChange={formik.handleChange} value={formik.values.room} /> 
                    <br />
                    <input type="number" name ="toilet" onChange={formik.handleChange} value={formik.values.toilet} /> 
                {formData.map(item=>{
                    return <div key={item.id}>
                        {item.type === "text" &&<> <input type="text" name={`overviews.${item.id}`} value={formik.values?.overviews?.[item.id]} onChange={formik.handleChange} /> {formik.errors.overviews?.[item.id] && <strong>{formik.errors.overviews?.[item.id]}</strong>}</>}
                        {item.type === "number" && <input type="number" name={item.id} value={formik.values[item.id]} onChange={formik.handleChange} />}
                        {item.type === "textarea" && <textarea name={item.id} value={formik.values[item.id]} onChange={formik.handleChange} />}
                        {item.type === "select" && <select name={item.id} value={formik.values[item.id]} onChange={formik.handleChange}>
                            {item.options.map(option=>{
                                return <option key={option.value} value={option.value}>{option.label}</option>
                            })}
                        </select>}
                    </div>
                })}

                <button type="submit">Submit</button>



            </form>
    </div>
  )
}

export default Form