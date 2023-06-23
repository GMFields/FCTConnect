import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';

// Resto do código...

const Page = (props) => {
  // Resto do código...

  const [editMode, setEditMode] = useState(false);

  // Função para lidar com o botão "Guardar"
  const handleSave = () => {
    // Enviar os dados atualizados para o servidor usando uma solicitação fetch do tipo PUT
    fetch(`https://helical-ascent-385614.oa.r.appspot.com/rest/users/update?tokenObj=${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        // Dados atualizados com sucesso
        console.log('Dados atualizados:', data);
        
        // Desativar o modo de edição
        setEditMode(false);
      })
      .catch(error => {
        console.error('Erro ao atualizar dados:', error);
      });
  };

  return (
    <div>
      {/* Resto do código... */}

      {/* Renderizar campos de input ou texto com base no modo de edição */}
      <MDBRow>
  <MDBCol sm="3">
    <MDBCardText>Name</MDBCardText>
  </MDBCol>
  <MDBCol sm="9">
    {editMode ? (
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
    ) : (
      <MDBCardText className="text-muted">{profileData.name}</MDBCardText>
    )}
  </MDBCol>
</MDBRow>

<MDBRow>
  <MDBCol sm="3">
    <MDBCardText>Email</MDBCardText>
  </MDBCol>
  <MDBCol sm="9">
    {editMode ? (
      <input
        type="text"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
    ) : (
      <MDBCardText className="text-muted">{profileData.email}</MDBCardText>
    )}
  </MDBCol>
</MDBRow>

<MDBRow>
  <MDBCol sm="3">
    <MDBCardText>Username</MDBCardText>
  </MDBCol>
  <MDBCol sm="9">
    {editMode ? (
      <input
        type="text"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
    ) : (
      <MDBCardText className="text-muted">{profileData.username}</MDBCardText>
    )}
  </MDBCol>
</MDBRow>

<MDBRow>
  <MDBCol sm="3">
    <MDBCardText>Password</MDBCardText>
  </MDBCol>
  <MDBCol sm="9">
    {editMode ? (
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
    ) : (
      <MDBCardText className="text-muted">{profileData.password}</MDBCardText>
    )}
  </MDBCol>
</MDBRow>
<MDBRow>
  <MDBCol sm="3">
    <MDBCardText>Role</MDBCardText>
  </MDBCol>
  <MDBCol sm="9">
    {editMode ? (
      <input
        type="number"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: parseInt(e.target.value) })}
      />
    ) : (
      <MDBCardText className="text-muted">{profileData.role}</MDBCardText>
    )}
  </MDBCol>
</MDBRow>

<MDBRow>
  <MDBCol sm="3">
    <MDBCardText>State</MDBCardText>
  </MDBCol>
  <MDBCol sm="9">
    {editMode ? (
      <input
        type="text"
        value={formData.state}
        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
      />
    ) : (
      <MDBCardText className="text-muted">{profileData.state}</MDBCardText>
    )}
  </MDBCol>
</MDBRow>

<MDBRow>
  <MDBCol sm="3">
    <MDBCardText>Profile</MDBCardText>
  </MDBCol>
  <MDBCol sm="9">
    {editMode ? (
      <input
        type="text"
        value={formData.profile}
        onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
      />
    ) : (
      <MDBCardText className="text-muted">{profileData.profile}</MDBCardText>
    )}
  </MDBCol>
</MDBRow>

<MDBRow>
  <MDBCol sm="3">
    <MDBCardText>Landline</MDBCardText>
  </MDBCol>
  <MDBCol sm="9">
    {editMode ? (
      <input
        type="text"
        value={formData.landline}
        onChange={(e) => setFormData({ ...formData, landline: e.target.value })}
      />
    ) : (
      <MDBCardText className="text-muted">{profileData.landline}</MDBCardText>
    )}
  </MDBCol>
</MDBRow>

<MDBRow>
  <MDBCol sm="3">
    <MDBCardText>Phone Number</MDBCardText>
  </MDBCol>
  <MDBCol sm="9">
    {editMode ? (
      <input
        type="text"
        value={formData.phoneNumber}
        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
      />
    ) : (
      <MDBCardText className="text-muted">{profileData.phoneNumber}</MDBCardText>
    )}
  </MDBCol>
</MDBRow>

<MDBRow>
  <MDBCol sm="3">
    <MDBCardText>Occupation</MDBCardText>
  </MDBCol>
  <MDBCol sm="9">
    {editMode ? (
      <input
        type="text"
        value={formData.occupation}
        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
      />
    ) : (
      <MDBCardText className="text-muted">{profileData.occupation}</MDBCardText>
    )}
  </MDBCol>
</MDBRow>

<MDBRow>
  <MDBCol sm="3">
    <MDBCardText>Address</MDBCardText>
  </MDBCol>
  <MDBCol sm="9">
    {editMode ? (
      <input
        type="text"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
    ) : (
      <MDBCardText className="text-muted">{profileData.address}</MDBCardText>
    )}
  </MDBCol>
</MDBRow>

<MDBRow>
  <MDBCol sm="3">
    <MDBCardText>NIF</MDBCardText>
  </MDBCol>
  <MDBCol sm="9">
    {editMode ? (
      <input
        type="text"
        value={formData.nif}
        onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
      />
    ) : (
      <MDBCardText className="text-muted">{profileData.nif}</MDBCardText>
    )}
  </MDBCol>
</MDBRow>

<MDBRow>
  <MDBCol sm="3">
    <MDBCardText>Department</MDBCardText>
  </MDBCol>
  <MDBCol sm="9">
    {editMode ? (
      <input
        type="text"
        value={formData.department}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
      />
    ) : (
      <MDBCardText className="text-muted">{profileData.department}</MDBCardText>
    )}
  </MDBCol>
</MDBRow>

{/* Repita o mesmo padrão para os campos restantes */}


{/* Repita o mesmo padrão para os campos restantes */}

      
      {/* Renderizar outros campos de input ou texto aqui */}
      {/* Resto do código... */}

      {/* Botões "Editar" e "Guardar" */}
      {editMode ? (
        <div>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => setEditMode(false)}>Cancelar</button>
        </div>
      ) : (
        <button onClick={() => setEditMode(true)}>Editar</button>
      )}

      {/* Resto do código... */}
    </div>
  );
}

export default Page;
