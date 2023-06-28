import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './ProfilePage.css';

const ProfilePage = (props) => {
  const token = Cookies.get('token');
  const password = Cookies.get('password');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [profileData, setProfileData] = useState({});


  useEffect(() => {
    // Fetch user profile data
    fetch(`https://helical-ascent-385614.oa.r.appspot.com/rest/users/profile?tokenObj=${token}` , {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Profile data result:', data);
        
        // Set profile data
        setProfileData(data);
        // Set form data with profile data
        setFormData(data);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, [token]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the updated data
    const updatedData = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      occupation: formData.occupation,
      address: formData.address,
    };

    // Send PUT request to update the data
    fetch(`https://helical-ascent-385614.oa.r.appspot.com/rest/users/update?tokenObj=${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => {
        if (response.ok) {
          // Data updated successfully
          console.log('Data updated!');
          // Redirect to profile page
          /* navigate('/perfil'); */
        } else {
          // Error updating data
          console.error('Error updating data');
        }
      })
      .catch(error => {
        console.error('Error making request:', error);
      });
  };

  return (
    <div className="profile-page">
      <h2>Perfil</h2>
      
      {profileData.profile && <img src={profileData.profile} alt="Foto de perfil" className="profile-picture" />}
      {profileData.email && <p>Email: {profileData.email}</p>}
      {profileData.name && <p>Nome: {profileData.name}</p>}
      {profileData.phoneNumber && <p>Número de telefone: {profileData.phoneNumber}</p>}
      {profileData.occupation && <p>Ocupação: {profileData.occupation}</p>}
      {profileData.address && <p>Endereço: {profileData.address}</p>}
      {profileData.username && <p>Nome de Utilizador: {profileData.username}</p>}
      {profileData.role && <p>Role: {profileData.role}</p>}
      {profileData.state && <p>Estado da conta: {profileData.state}</p>}
      {profileData.landline && <p>Landline: {profileData.lanline}</p>}
      {profileData.nif && <p>Nif: {profileData.nif}</p>}
      {profileData.department && <p>Departmento: {profileData.department}</p>}
      {profileData.password && <p>Password: {password}</p>}

      {editing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Número de telefone:
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Ocupação:
            <input
              type="text"
              name="occupation"
              value={formData.occupation || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
            />
            </label>
            <label>
            Username:
            <input
              type="text"
              name="password"
              value={formData.username || ''}
              onChange={handleChange}
            />
            </label>
            <label>
            Password:
            <input
              type="text"
              name="password"
              value={formData.pasword || ''}
              onChange={handleChange}
            />
            </label>
            <label>
            Role:
            <input
              type="text"
              name="role"
              value={formData.role || ''}
              onChange={handleChange}
            />
            </label>
            <label>
            State:
            <input
              type="text"
              name="state"
              value={formData.state || ''}
              onChange={handleChange}
            />
            </label>
            <label>
            Profile:
            <input
              type="text"
              name="profile"
              value={formData.profile || ''}
              onChange={handleChange}
            />
            </label>
            <label>
            Landline:
            <input
              type="text"
              name="landline"
              value={formData.landline || ''}
              onChange={handleChange}
            />
            </label>
            <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber || ''}
              onChange={handleChange}
            />
            </label>
            <label>
            Nif:
            <input
              type="text"
              name="nif"
              value={formData.nif || ''}
              onChange={handleChange}
            />
            </label>
            <label>
            Department:
            <input
              type="text"
              name="department"
              value={formData.department || ''}
              onChange={handleChange}
            />
            </label>
          <button type="submit">Guardar</button>
        </form>
      ) : (
        <button onC>Editar</button>
      )}
    </div>
  );
};

export default ProfilePage;
