import { useEffect, useState } from 'react';
import {
  createProject,
  deleteProject,
  getProjects,
} from './services/api';
import './App.css';
const emptyForm = {
  title_es: '',
  title_en: '',
  description_es: '',
  description_en: '',
  url: '',
  category: '',
  status: 'En desarrollo',
};
function App() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  async function loadProjects() {
    try {
      setLoading(true);
      setProjects(await getProjects());
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadProjects();
  }, []);
  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const saved = await createProject(form);
      setProjects((current) => [saved, ...current]);
      setForm(emptyForm);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }
  async function handleDelete(id) {
    if (!window.confirm('¿Eliminar este proyecto?')) return;
    try {
      await deleteProject(id);
      setProjects((current) => current.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <main className="container">
      <header>
        <p className="eyebrow">Portafolio bilingüe</p>
        <h1>React + Laravel</h1>
        <p>Registre proyectos en español e inglés.</p>
      </header>
      <form className="project-form" onSubmit={handleSubmit}>
        <input
          name="title_es"
          value={form.title_es}
          onChange={handleChange}
                    placeholder="Título en español"
          required
        />
        <input
          name="title_en"
          value={form.title_en}
          onChange={handleChange}
          placeholder="Title in English"
          required
        />
        <textarea
          name="description_es"
          value={form.description_es}
          onChange={handleChange}
          placeholder="Descripción en español"
        />
        <textarea
          name="description_en"
          value={form.description_en}
          onChange={handleChange}
          placeholder="Description in English"
        />
        <input
          name="url"
          value={form.url}
          onChange={handleChange}
          placeholder="https://ejemplo.com"
          type="url"
        />
        <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Categoría del proyecto"
        required
        />

        <select
        name="status"
        value={form.status}
        onChange={handleChange}
        required
        >
  <option value="En desarrollo">En desarrollo</option>
  <option value="Finalizado">Finalizado</option>
  <option value="Publicado">Publicado</option>
</select>
        <button type="submit">Guardar proyecto</button>
      </form>
      {error && <p className="error">{error}</p>}
      {loading && <p>Cargando proyectos...</p>}
      <section className="grid">
        {projects.map((project) => (
          <article className="card" key={project.id}>
            <p>
            <strong>Categoría:</strong> {project.category}
            </p>

            <p>
            <strong>Estado:</strong> {project.status}
            </p>
            <span>ES</span>
            <h2>{project.title_es}</h2>
            <p>{project.description_es}</p>
            <span>EN</span>
            <h3>{project.title_en}</h3>
            <p>{project.description_en}</p>
            {project.url && (
              <a href={project.url} target="_blank" rel="noreferrer">
                Ver proyecto
              </a>
            )}
            <button
              className="danger"
              onClick={() => handleDelete(project.id)}
            >
              Eliminar
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
export default App;