import axios from "axios";
import React,{useState,useEffect} from "react";
import { Link ,useNavigate,useParams} from "react-router-dom";


export default function Update() {
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "", zipcode: "" },
    phone: "",
    website: "",
    company: { name: "", catchPhrase: "", bs: "" },
  });
  
  const { id } = useParams();
  const navigate = useNavigate();
  
  const handlesubmit = (event) => {
    event.preventDefault();
    console.log(values);
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${id}`, values)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setValues(response.data);
      })
      .catch((error) => console.log(error.message));
  }, []);
  const handleaddresschange=(event)=>
  {
   
    const{name,value}=event.target;
    console.log(name,value);
    const updatedaddress={...values.address,[name]:value}
     setValues({...values,address:updatedaddress})
  }
  const handlecomapnychages=(event)=>{
   
    const{name,value}=event.target;
    const updatedcomapnychanges={...values.company,[name]:value}
    setValues({...values,company:updatedcomapnychanges})
  }
  return (
    <>
     <form
        className="form"
        onSubmit={(e) => {
          handlesubmit(e);
        }}
      >
        <h1>Edit As your Wish</h1>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={(e) => setValues({ ...values, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Enter Street"
          name="street"
          value={values.address.street}
          onChange={(e)=>{handleaddresschange(e)}}
        />
        <input
          type="text"
          placeholder="Enter Suite"
          name="suite"
          value={values.address.suite}
          onChange={(e)=>{handleaddresschange(e)}}
          
        />
        <input
          type="text"
          placeholder="Enter city"
          name="city"
          value={values.address.city}
          onChange={(e)=>{handleaddresschange(e)}}
        />
        <input
          type="text"
          placeholder="Enter Zipcode"
          name="zipcode"
          value={values.address.zipcode}
          onChange={(e)=>{handleaddresschange(e)}}
        />

        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={values.phone}
          onChange={(event)=>{setValues({...values, phone:event.target.value})}}
        />
        <input
          type="text"
          placeholder="Website"
          name="website"
          value={values.website}
          onChange={(event)=>{setValues({...values, website:event.target.value})}}
        />
        <input
          type="text"
          placeholder="Company Name"
          name="name"
          value={values.company.name}
          onChange={(event)=>{handlecomapnychages(event)}}
        />
        <input
          type="text"
          placeholder="Company Catchphrase"
          name="catchPhrase"
          value={values.company.catchPhrase}
          onChange={(event)=>{handlecomapnychages(event)}}
        />
        <input
          type="text"
          placeholder="Company BS"
          name="bs"
          value={values.company.bs}
          onChange={(event)=>{handlecomapnychages(event)}}
        />
        <button>Submit</button>
        <Link to="/" className="link">
          <button className="back">Back</button>
        </Link>
      </form>
      
    </>
  );
}
