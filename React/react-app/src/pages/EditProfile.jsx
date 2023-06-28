import Cookies from 'js-cookie';
import React, { useState } from 'react';

const EditProfile = (props) => {
  const token = Cookies.get('token');
  const existingProfileData = Cookies.get('profileData');
  const [formData, setFormData] = useState(existingProfileData);
  console.log(existingProfileData.name);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      "name": formData.name || '',
      "password": formData.password || '',
      "email": formData.email || '',
      "role": formData.role || '',
      "state": formData.state || '',
      "profile": formData.profile || '',
      "landline": formData.landline || '',
      "phoneNumber": formData.phoneNumber || '',
      "occupation": formData.occupation || '',
      "address": formData.address || '',
      "nif": formData.nif || '',
      "department":formData.department || ''
    };

    fetch(
      `https://helical-ascent-385614.oa.r.appspot.com/rest/users/update?tokenObj=${token}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => {
        if (response.ok) {
          // Data updated successfully
          console.log('Data updated!');
          Cookies.set('password', formData.password);
          // Redirect to profile page
          props.onFormSwitch('profile');
        } else {
          // Error updating data
          console.log(JSON.stringify(updatedData));
          console.error('Error updating data');
        }
      })
      .catch((error) => {
        console.log('Error making request:', error);
      });
  };

  return (
    <div className='edit-container'>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type='text'
            name='name'
            value={formData.name || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Palavra-passe:
          <input
            type='text'
            name='password'
            value={formData.password || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type='text'
            name='email'
            value={formData.email || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Função:
          <input
            type='number'
            name='role'
            value={formData.role || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Estado:
          <input
            type='text'
            name='state'
            value={formData.state || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Profile:
          <input
            type='text'
            name='profile'
            value={formData.profile || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Telefone:
          <input
            type='text'
            name='phoneNumber'
            value={formData.phoneNumber || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Ocupação:
          <input
            type='text'
            name='occupation'
            value={formData.occupation || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Endereço:
          <input
            type='text'
            name='address'
            value={formData.address || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Nif:
          <input
            type='text'
            name='nif'
            value={formData.nif || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Departamento:
          <input
            type='text'
            name='department'
            value={formData.department || ''}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Guardar</button>
      </form>
    </div>
  );
};

export default EditProfile;
