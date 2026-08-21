import { useEffect, useMemo, useState } from 'react';
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [languageByProject, setLanguageByProject] = useState({});

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

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);

      const saved = await createProject(form);

      setProjects((current) => [saved, ...current]);
      setForm(emptyForm);
      setShowForm(false);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('¿Seguro que deseas eliminar este proyecto?')) {
      return;
    }

    try {
      await deleteProject(id);

      setProjects((current) =>
        current.filter((project) => project.id !== id)
      );

      setError('');
    } catch (err) {
      setError(err.message);
    }
  }

  function changeLanguage(id, language) {
    setLanguageByProject((current) => ({
      ...current,
      [id]: language,
    }));
  }

  const stats = useMemo(() => {
    return {
      total: projects.length,

      published: projects.filter(
        (project) => project.status === 'Publicado'
      ).length,

      development: projects.filter(
        (project) => project.status === 'En desarrollo'
      ).length,

      finished: projects.filter(
        (project) => project.status === 'Finalizado'
      ).length,
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const term = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesStatus =
        statusFilter === 'Todos' ||
        project.status === statusFilter;

      const matchesSearch =
        !term ||
        project.title_es?.toLowerCase().includes(term) ||
        project.title_en?.toLowerCase().includes(term) ||
        project.category?.toLowerCase().includes(term);

      return matchesStatus && matchesSearch;
    });
  }, [projects, search, statusFilter]);

  function getStatusClass(status) {
    if (status === 'Publicado') return 'published';
    if (status === 'Finalizado') return 'finished';

    return 'development';
  }

  return (
    <div className="app-shell">

      <aside className="sidebar">
        <div>
          <div className="brand">
            <div className="brand-icon">
              P
            </div>

            <div>
              <strong>Portfolio</strong>
              <span>.dev</span>
            </div>
          </div>

          <p className="sidebar-label">
            WORKSPACE
          </p>

          <nav className="nav-menu">
            <button className="nav-item active">
              <span className="nav-icon">⌘</span>
              Proyectos
              <span className="nav-count">
                {projects.length}
              </span>
            </button>

            <div className="nav-info">
              <span className="nav-icon">◈</span>

              <div>
                <strong>React</strong>
                <small>Frontend</small>
              </div>
            </div>

            <div className="nav-info">
              <span className="nav-icon">◇</span>

              <div>
                <strong>Laravel</strong>
                <small>REST API</small>
              </div>
            </div>

            <div className="nav-info">
              <span className="nav-icon">⬡</span>

              <div>
                <strong>MySQL</strong>
                <small>Database</small>
              </div>
            </div>
          </nav>
        </div>

        <div className="api-status">
          <span className="status-dot"></span>

          <div>
            <strong>API conectada</strong>
            <small>localhost:8000</small>
          </div>
        </div>
      </aside>

      <main className="dashboard">

        <header className="topbar">
          <div>
            <p className="eyebrow">
              PORTAFOLIO BILINGÜE
            </p>

            <h1>
              Projects Dashboard
            </h1>

            <p className="subtitle">
              Administra tus proyectos en español e inglés.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() => setShowForm(true)}
          >
            <span>＋</span>
            Nuevo proyecto
          </button>
        </header>

        <section className="stats-grid">

          <article className="stat-card">
            <div className="stat-icon purple">
              ◫
            </div>

            <div>
              <span>Total proyectos</span>
              <strong>{stats.total}</strong>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-icon green">
              ●
            </div>

            <div>
              <span>Publicados</span>
              <strong>{stats.published}</strong>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-icon yellow">
              ◐
            </div>

            <div>
              <span>En desarrollo</span>
              <strong>{stats.development}</strong>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-icon blue">
              ✓
            </div>

            <div>
              <span>Finalizados</span>
              <strong>{stats.finished}</strong>
            </div>
          </article>

        </section>

        <section className="projects-panel">

          <div className="projects-toolbar">
            <div>
              <h2>Mis proyectos</h2>
              <p>
                {filteredProjects.length}
                {' '}
                proyecto
                {filteredProjects.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="toolbar-actions">

              <div className="search-box">
                <span>⌕</span>

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Buscar proyecto..."
                />
              </div>

              <select
                className="filter-select"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="Todos">
                  Todos
                </option>

                <option value="En desarrollo">
                  En desarrollo
                </option>

                <option value="Finalizado">
                  Finalizados
                </option>

                <option value="Publicado">
                  Publicados
                </option>
              </select>

            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {loading ? (
            <div className="loading-state">
              <div className="loader"></div>

              <p>Cargando proyectos...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="empty-state">
              <span>◇</span>

              <h3>No hay proyectos</h3>

              <p>
                No encontramos proyectos con esos filtros.
              </p>
            </div>
          ) : (
            <div className="projects-grid">

              {filteredProjects.map((project) => {
                const language =
                  languageByProject[project.id] || 'es';

                const title =
                  language === 'es'
                    ? project.title_es
                    : project.title_en;

                const description =
                  language === 'es'
                    ? project.description_es
                    : project.description_en;

                return (
                  <article
                    className="project-card"
                    key={project.id}
                  >

                    <div className="project-card-top">

                      <span
                        className={`status-badge ${getStatusClass(
                          project.status
                        )}`}
                      >
                        <span></span>
                        {project.status}
                      </span>

                      <div className="language-switch">
                        <button
                          className={
                            language === 'es'
                              ? 'active'
                              : ''
                          }
                          onClick={() =>
                            changeLanguage(
                              project.id,
                              'es'
                            )
                          }
                        >
                          ES
                        </button>

                        <button
                          className={
                            language === 'en'
                              ? 'active'
                              : ''
                          }
                          onClick={() =>
                            changeLanguage(
                              project.id,
                              'en'
                            )
                          }
                        >
                          EN
                        </button>
                      </div>

                    </div>

                    <div className="category">
                      {project.category}
                    </div>

                    <h3>{title}</h3>

                    <p className="project-description">
                      {description ||
                        'Sin descripción disponible.'}
                    </p>

                    <div className="project-footer">

                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="view-button"
                        >
                          Ver proyecto
                          <span>↗</span>
                        </a>
                      ) : (
                        <span className="no-link">
                          Sin enlace
                        </span>
                      )}

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(project.id)
                        }
                        title="Eliminar proyecto"
                      >
                        ×
                      </button>

                    </div>

                  </article>
                );
              })}

            </div>
          )}

        </section>

      </main>

      {showForm && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <div className="modal">

            <div className="modal-header">
              <div>
                <p className="eyebrow">
                  NUEVO PROYECTO
                </p>

                <h2>
                  Agregar al portafolio
                </h2>

                <p>
                  Registra la información en ambos idiomas.
                </p>
              </div>

              <button
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form
              className="project-form"
              onSubmit={handleSubmit}
            >

              <div className="field-group">
                <label>Título en español</label>

                <input
                  name="title_es"
                  value={form.title_es}
                  onChange={handleChange}
                  placeholder="Ej. Sistema de inventario"
                  required
                />
              </div>

              <div className="field-group">
                <label>Title in English</label>

                <input
                  name="title_en"
                  value={form.title_en}
                  onChange={handleChange}
                  placeholder="E.g. Inventory System"
                  required
                />
              </div>

              <div className="field-group">
                <label>Descripción en español</label>

                <textarea
                  name="description_es"
                  value={form.description_es}
                  onChange={handleChange}
                  placeholder="Describe el proyecto..."
                />
              </div>

              <div className="field-group">
                <label>Description in English</label>

                <textarea
                  name="description_en"
                  value={form.description_en}
                  onChange={handleChange}
                  placeholder="Describe your project..."
                />
              </div>

              <div className="field-group">
                <label>URL del proyecto</label>

                <input
                  name="url"
                  type="url"
                  value={form.url}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com"
                />
              </div>

              <div className="field-group">
                <label>Categoría</label>

                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Ej. Desarrollo web"
                  required
                />
              </div>

              <div className="field-group full">
                <label>Estado</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  required
                >
                  <option value="En desarrollo">
                    En desarrollo
                  </option>

                  <option value="Finalizado">
                    Finalizado
                  </option>

                  <option value="Publicado">
                    Publicado
                  </option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setShowForm(false);
                    setForm(emptyForm);
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={saving}
                >
                  {saving
                    ? 'Guardando...'
                    : 'Guardar proyecto'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;