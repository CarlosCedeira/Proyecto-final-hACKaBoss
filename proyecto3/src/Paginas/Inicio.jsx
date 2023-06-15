import { useContext, useState } from "react";
import { UseOpiniones } from "../Hooks/UseOpiniones";
import { AuthContext } from "../Context/AuthContext";

export const Inicio = () => {
  const { opiniones, setOpiniones, cargando, error } = UseOpiniones();
  const { id } = useContext(AuthContext);
  const [ocultar, setOcultar] = useState("false");

  if (cargando) return <p>Cargando opiniones...</p>;
  if (error) return <p>{error}</p>;

  const borradoPrototipo = () => {
    const confirmarEliminidao = confirm(`¿Estas seguro de borrar la opinion?`);

    if (confirmarEliminidao) {
      const nuevasOpiniones = opiniones.filter(
        (opinion) => opinion.user_id !== id
      );

      setOpiniones(nuevasOpiniones);
    }
  };

  return (
    <>
      <h1>Ultimas opiniones</h1>
      {opiniones.map((opinion) => (
        <article key={opinion.id}>
          <h1>{opinion.titulo}</h1>
          <p>{opinion.text}</p>
          <p>{opinion.created_at}</p>
          <p>{opinion.user_name}</p>
          <p>{opinion.user_id}</p>
          <p>{opinion.id}</p>
          {id === opinion.user_id ? (
            <button onClick={borradoPrototipo}>{ocultar}</button>
          ) : null}
        </article>
      ))}
    </>
  );
};
