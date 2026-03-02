import React, { useState, useEffect } from 'react';
import { getProjects, addProject, deleteProject, updateProject } from './services/api';
import './App.css'; 

function App() {
  const [projects, setProjects] = useState([]);
  
  // Naya State: Yeh check karne ke liye ki hum Add kar rahe hain ya Edit
  const [editingId, setEditingId] = useState(null); 

  const [newProject, setNewProject] = useState({ 
    title: '', description: '', assignee: '', deadline: '', status: 'Pending' 
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.log("Projects lane mein error:", error);
    }
  };

  // Jab Form submit ho (Add ke liye ya Update ke liye)
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      if (editingId) {
        // Agar Edit mode chal raha hai
        await updateProject(editingId, newProject);
        alert("✅ Project Successfully Updated!"); 
        setEditingId(null); // Edit mode band karo
      } else {
        // Naya add kar rahe hain
        await addProject(newProject);
        alert("🎉 Project Successfully Added!"); 
      }
      
      setNewProject({ title: '', description: '', assignee: '', deadline: '', status: 'Pending' }); 
      fetchProjects(); 
    } catch (error) {
      alert("❌ Error: Kuch gadbad ho gayi. Backend check karein!");
    }
  };

  // 🗑️ Delete Button ka function
  const handleDelete = async (id) => {
    if (window.confirm("⚠️ Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (error) {
        alert("❌ Error: Failed to delete project.");
      }
    }
  };

  // ✏️ Edit Button ka function (Data form mein daalega)
  const handleEdit = (proj) => {
    const formattedDate = proj.deadline ? proj.deadline.substring(0, 10) : '';
    setNewProject({
      title: proj.title,
      description: proj.description,
      assignee: proj.assignee,
      deadline: formattedDate,
      status: proj.status
    });
    setEditingId(proj._id); // System ko bata diya ki ab is ID ko edit karna hai
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Form ke paas upar le jao
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>🛠️ My Project Manager</h1>
      
      {/* Form Area */}
      <div style={{ backgroundColor: editingId ? '#e8f4f8' : '#f8f9fa', padding: '25px', borderRadius: '10px', border: '1px solid #ddd', marginBottom: '30px', transition: '0.3s' }}>
        <h3 style={{ marginTop: '0', color: '#333' }}>
          {editingId ? "✏️ Edit Project" : "➕ Add Project & Assign Task"}
        </h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Project Title" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="text" placeholder="Project Description" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="text" placeholder="Assign To (e.g., Harshita)" value={newProject.assignee} onChange={(e) => setNewProject({ ...newProject, assignee: e.target.value })} required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="date" value={newProject.deadline} onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })} required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} />
          
          <select value={newProject.status} onChange={(e) => setNewProject({ ...newProject, status: e.target.value })} style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer' }}>
            <option value="Pending">🔴 Pending</option>
            <option value="In Progress">🟡 In Progress</option>
            <option value="Completed">🟢 Completed</option>
          </select>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
            <button type="submit" style={{ flex: 1, padding: '14px', backgroundColor: editingId ? '#007bff' : '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
              {editingId ? "Update Project" : "Add Project"}
            </button>
            
            {/* Cancel Edit Button */}
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setNewProject({ title: '', description: '', assignee: '', deadline: '', status: 'Pending' }); }} style={{ padding: '14px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <h3 style={{ textAlign: 'center', color: '#333' }}>📋 Project List ({projects.length})</h3>
      {projects.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>No projects yet. Start adding some! 🚀</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {projects.map((proj, index) => (
            <li key={index} style={{ border: '1px solid #e0e0e0', padding: '20px', marginBottom: '15px', borderRadius: '8px', backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              
              <div style={{ float: 'right', display: 'flex', gap: '10px' }}>
                {/* ✏️ EDIT BUTTON */}
                <button onClick={() => handleEdit(proj)} style={{ padding: '6px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
                  ✏️ Edit
                </button>
                {/* 🗑️ DELETE BUTTON */}
                <button onClick={() => handleDelete(proj._id)} style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
                  🗑️ Delete
                </button>
              </div>

              <h4 style={{ margin: '0 0 10px 0', color: '#0056b3', fontSize: '18px', paddingRight: '150px' }}>{proj.title}</h4>
              <p style={{ margin: '0 0 15px 0', color: '#555', lineHeight: '1.5' }}>{proj.description}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', backgroundColor: '#f1f3f5', padding: '12px', borderRadius: '6px' }}>
                <span>👤 <strong>Assignee:</strong> {proj.assignee || "N/A"}</span>
                <span>📅 <strong>Deadline:</strong> {proj.deadline ? proj.deadline.substring(0, 10) : "N/A"}</span>
                <span>📊 <strong>Status:</strong> {proj.status || "Pending"}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;