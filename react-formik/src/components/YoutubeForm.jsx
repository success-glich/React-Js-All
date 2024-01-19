import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = 
  {
    name:'saphal',
    email:'',
    channel:'',
  }

  // const validate =(values)=>{
  //   // values.name & values.email values.channel
  //   // errors.name & errors.email errors.channel
  //   let errors = {};
  //   if(!values.name){
  //     errors.name ="name is required"
  //   }
  //   if(!values.email){
  //     errors.email ="email is required"
  //   }
  //   if(!values.channel){
  //     errors.channel ="channel is required"
  //   }
  //   if(!values.email){
  //     errors.email ="email is required"
  //   }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
  //     errors.email ="email is invalid"
  //   }

    
  //   return errors;
  // }
  const validationSchema = Yup.object({
    name:Yup.string().required("Name is required"),
    email:Yup.string().required("Email is required").email("Email is invalid"),
    channel:Yup.string().required("Channel is required"),
  })
const handleSubmit = (values)=>{
  console.log("Form values",values);
}
function YoutubeForm() {

  /*
   1. managing form state
   2. handling form submission
   3. validation & error message
  */
  const formik =useFormik({
        initialValues,
        onSubmit:handleSubmit,
        validationSchema
    });

    console.log("vistited fields",formik.touched);
  return (
    <div>
      <form className="youtubeForm" onSubmit={formik.handleSubmit}>
      <div>  <label htmlFor="name">Name</label>
        <input
         type="text"
          id="name"
           name="name"
            // onBlur = {formik.handleBlur} onChange={formik.handleChange} value={formik.values.name}
            {...formik.getFieldProps('name')}
             />
        {formik.touched.name && formik.errors.name ? <div className="errors">{formik.errors.name}</div>:null}
        </div>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email"
              {...formik.getFieldProps('email')}
         
         />
        {formik.touched.email && formik.errors.email ? <div className="errors">{formik.errors.email}</div>:null}
        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" name="channel"
        
        // onBlur = {formik.handleBlur} onChange={formik.handleChange} value={formik.values.channel} 
        {...formik.getFieldProps('channel')}
        />
        {formik.touched.email && formik.errors.channel ? <div className="errors">{formik.errors.channel}</div>:null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// Formik Components
/*

  formik
  form 
  field 
  errorComponent
  
*/

export default YoutubeForm;
