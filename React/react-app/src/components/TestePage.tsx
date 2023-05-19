import { useState } from "react";
import "./Teste.css";
//import MenuIcon from '@material-ui/icons/Menu';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <button>Opção 1</button>
            </li>
            <li>
              <button>Opção 2</button>
            </li>
            <li>
              <button>Opção 3</button>
            </li>
          </ul>
        </nav>
      </header>
      <div className="content">{/* Conteúdo da página */}</div>
      <aside className={isSidebarOpen ? "open" : ""}>
        <button className="toggle-button" onClick={toggleSidebar}>
          <span>{isSidebarOpen ? "Fechar" : "Abrir"}</span>
        </button>
        <ul>
          <li>Opção A</li>
          <li>Opção B</li>
          <li>Opção C</li>
        </ul>
      </aside>
    </div>
  );
}

export default Home;
