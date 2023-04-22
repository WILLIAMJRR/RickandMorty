import React from "react";
import charactercss from "../styles/character.css";

const Character = ({ url }) => {
  return (
    <div className="character_box">
      <article className="character">
        <header className="character_header">
          <figure>
            <img className="character_img" src={url?.image} />
          </figure>
          <div className="character_container_status">
            <span className={`character_circle ${url?.status}`}></span>
            <span className="character_status">{url?.status}</span>
          </div>
        </header>
        <section className="character_body">
          <h3 className="character_name">{url?.name}</h3>
          <ul className="character_list">
            <li className="character_item">
              <span className="character_label">Specie:</span>
              {url?.species}
            </li>
            <li className="character_item">
              <span className="character_label">Origen:</span>
              {url?.origin.name}
            </li>
            <li className="character_item">
              <span className="character_label">Eppisodes where appear</span>
              {url?.episode.length}
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
};

export default Character;
