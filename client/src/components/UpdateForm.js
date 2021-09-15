import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
  name: "",
  price: "",
  imageUrl: "",
  description: "",
  shipping: ""
};

const UpdateForm = props => {
  const [item, setItem] = useState(initialItem);
  console.log('UpdateForm.js ln:15 props:', props);
  console.log('UpdateForm.js ln:16 initialItem:', initialItem);
  const { push } = useHistory();
  const { id } = useParams();

  // const { id } = props.match.params;
  // const { push } = props.history;
  

  

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "price") {
      value = parseInt(value, 10);
    }

    setItem({
      ...item,
      [ev.target.name]: value
    });
  };

  useEffect(()=>{
    //3. Get the information for the item we are editing.
    axios.get(`http://localhost:3333/items/${id}`)
      .then(res=> {
        setItem(res.data);
      })
      .catch(err=> {
        console.log(err);
      });
  }, []);


  //Complete Edit Feature
    
    //4. Make our edit.
    //5. Click the update button.
  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:3333/items/${id}`, item)
      .then(res=> {
        console.log('UpdateForm.js ln:59 res', res);
        console.log('UpdateForm.js ln:60 res', res.data);
        //6. Redirect to the item page.
        push(`/item-list/${id}`);
        props.setItems(res.data);
      })
      .catch(err=> {
        console.log(err);
      })
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={changeHandler}
          placeholder="name"
          value={item.name}
        />
        <div className="baseline" />

        <input
          type="number"
          name="price"
          onChange={changeHandler}
          placeholder="Price"
          value={item.price}
        />
        <div className="baseline" />

        <input
          type="string"
          name="imageUrl"
          onChange={changeHandler}
          placeholder="Image"
          value={item.imageUrl}
        />
        <div className="baseline" />

        <input
          type="string"
          name="description"
          onChange={changeHandler}
          placeholder="Description"
          value={item.description}
        />
        <div className="baseline" />

        <input
          type="string"
          name="shipping"
          onChange={changeHandler}
          placeholder="Shipping"
          value={item.shipping}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;