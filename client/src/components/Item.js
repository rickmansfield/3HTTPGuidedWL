import React, { useEffect, useState } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import ItemDescription from './ItemDescription';
import ItemShipping from './ItemShipping';

function Item(props) {
  const [item, setItem] = useState({});
  const { id } = props.match.params;

  useEffect(()=>{
    axios.get(`http://localhost:3333/items/${id}`)
      .then(res=>{
        setItem(res.data);
      });
  }, []);

  if (!item) {
    return <h2>Loading item data...</h2>;
  }

  const handleEdit = ()=> {
    console.log('Item.js ln: 24 props:', props);
    console.log('Item.js ln:25 item', item);
    //Complete Edit Feature:
    //1. Connect code to the edit button.
    //2. Redirect to the update item page.
    props.history.push(`/item-update/${id}`);
  }

  const handleDelete = ()=> {
    //Complete Delete:
    //1. Connect button to handler.
    //2. make our api call for delete on current id
    //3. set local state to new items with deleted item
    //4. redirect to our item list page.
    axios.delete(`http://localhost:3333/items/${id}`)
      .then(res=> {
        props.setItems(res.data);
        props.history.push('/item-list');
      })
      .catch(err=> {
        console.log(err);
      })
  }

  return (
    <div className="item-wrapper">
      <div className="item-header">
        <div className="image-wrapper">
          <img src={item.imageUrl} alt={item.name} />
        </div>
        <div className="item-title-wrapper">
          <h2>{item.name}</h2>
          <h4>${item.price}</h4>
        </div>
      </div>
      <nav className="item-sub-nav">
        <NavLink exact to={`/item-list/${item.id}`}>
          the story
        </NavLink>
        <NavLink to={`/item-list/${item.id}/shipping`}>shipping</NavLink>
      </nav>
      <Route
        exact
        path="/item-list/:id"
        render={props => <ItemDescription {...props} item={item} />}
      />
      <Route
        path="/item-list/:id/shipping"
        render={props => <ItemShipping {...props} item={item} />}
      />
      <button onClick={handleEdit} className="md-button">
        Edit
      </button>
      <button onClick={handleDelete} className="md-button">
        Delete
      </button>
    </div>
  );
}

export default Item;
