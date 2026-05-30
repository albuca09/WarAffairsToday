import { useEffect, useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature as topojsonFeature } from "topojson-client";
import worldAtlas from "world-atlas/countries-110m.json";

const MAP_WIDTH = 900;
const MAP_HEIGHT = 470;

const countryIdAliases = {
  840: "United States of America",
  643: "Russia",
  364: "Iran",
  804: "Ukraine",
  422: "Lebanon",
  376: "Israel",
  586: "Pakistan",
  466: "Mali",
  414: "Kuwait",
  51: "Armenia",
  729: "Sudan",
  887: "Yemen",
};

const countryNameAliases = {
  "United States": "United States of America",
  "Russian Federation": "Russia",
};

const countryNewsByBulletin = {
  "2026-05-25": {
    "United States of America": {
      titlePt: "Estados Unidos",
      titleEn: "United States",
      summaryPt: "Negociações com o Irã e pressão naval americana no Oriente Médio.",
      summaryEn: "Negotiations with Iran and U.S. naval pressure in the Middle East.",
      detailsPt: [
        "Participação na estrutura de cessar-fogo de 60 dias com o Irã.",
        "Pressão naval americana sobre portos iranianos.",
        "Impactos políticos e estratégicos para Washington.",
      ],
      detailsEn: [
        "Participation in the framework of a 60-day ceasefire with Iran.",
        "American naval pressure on Iranian ports.",
        "Political and strategic impacts for Washington.",
      ],
    },
    Iran: {
      titlePt: "Irã",
      titleEn: "Iran",
      summaryPt: "Cessar-fogo, Estreito de Ormuz e pressão naval americana.",
      summaryEn: "Ceasefire talks, Strait of Hormuz, and U.S. naval pressure.",
      detailsPt: [
        "O Irã aparece no centro das negociações sobre o Estreito de Ormuz.",
        "O acordo envolveria reabertura do estreito sem pedágios.",
        "Pressão econômica e naval segue relevante.",
      ],
      detailsEn: [
        "Iran is central to negotiations over the Strait of Hormuz.",
        "The arrangement would reopen the strait without tolls.",
        "Economic and naval pressure remains relevant.",
      ],
    },
    Ukraine: {
      titlePt: "Ucrânia",
      titleEn: "Ukraine",
      summaryPt: "Ataques russos com mísseis e drones contra Kiev.",
      summaryEn: "Russian missile and drone attacks against Kyiv.",
      detailsPt: [
        "Grande ataque noturno com drones e mísseis.",
        "Defesas aéreas interceptaram parte dos vetores.",
        "Mísseis balísticos seguem difíceis de interceptar.",
      ],
      detailsEn: [
        "Major overnight attack with drones and missiles.",
        "Air defenses intercepted part of the attack.",
        "Ballistic missiles remain difficult to intercept.",
      ],
    },
    Russia: {
      titlePt: "Rússia",
      titleEn: "Russia",
      summaryPt: "Ofensiva aérea de larga escala contra a Ucrânia.",
      summaryEn: "Large-scale aerial offensive against Ukraine.",
      detailsPt: [
        "Emprego combinado de drones e mísseis.",
        "Pressão sobre infraestrutura ucraniana.",
        "Ataques de saturação continuam relevantes.",
      ],
      detailsEn: [
        "Combined use of drones and missiles.",
        "Pressure on Ukrainian infrastructure.",
        "Saturation attacks remain relevant.",
      ],
    },
    Lebanon: {
      titlePt: "Líbano",
      titleEn: "Lebanon",
      summaryPt: "Tensão persistente envolvendo Israel e Hezbollah.",
      summaryEn: "Persistent tension involving Israel and Hezbollah.",
      detailsPt: [
        "Combates e bombardeios prosseguem.",
        "Hezbollah permanece fator central de instabilidade.",
        "Risco de escalada regional permanece.",
      ],
      detailsEn: [
        "Fighting and airstrikes continue.",
        "Hezbollah remains a central instability factor.",
        "Regional escalation risk remains.",
      ],
    },
    Israel: {
      titlePt: "Israel",
      titleEn: "Israel",
      summaryPt: "Operações militares no contexto do conflito com o Hezbollah.",
      summaryEn: "Military operations in the context of the Hezbollah conflict.",
      detailsPt: [
        "Operações associadas à fronteira norte.",
        "Ameaça de drones e foguetes permanece relevante.",
        "Pressão militar continua no teatro regional.",
      ],
      detailsEn: [
        "Operations linked to the northern border.",
        "Drone and rocket threats remain relevant.",
        "Military pressure continues in the regional theater.",
      ],
    },
    Pakistan: {
      titlePt: "Paquistão",
      titleEn: "Pakistan",
      summaryPt: "Ataques atribuídos ao Exército de Libertação do Balochistão.",
      summaryEn: "Attacks attributed to the Balochistan Liberation Army.",
      detailsPt: [
        "Foco adicional de violência armada.",
        "Ataques atribuídos ao BLA.",
        "Persistência de ameaça insurgente.",
      ],
      detailsEn: [
        "Additional armed violence hotspot.",
        "Attacks attributed to the BLA.",
        "Persistent insurgent threat.",
      ],
    },
    Mali: {
      titlePt: "Mali",
      titleEn: "Mali",
      summaryPt: "Ataques atribuídos ao grupo JNIM.",
      summaryEn: "Attacks attributed to JNIM.",
      detailsPt: [
        "Foco de instabilidade no Sahel.",
        "Ataques atribuídos ao JNIM.",
        "Ameaça insurgente continua afetando a região.",
      ],
      detailsEn: [
        "Instability hotspot in the Sahel.",
        "Attacks attributed to JNIM.",
        "Insurgent threat continues to affect the region.",
      ],
    },
  },

  "2026-05-30": {
    "United States of America": {
      titlePt: "Estados Unidos",
      titleEn: "United States",
      summaryPt: "Negociação de cessar-fogo com o Irã e decisão pendente da Casa Branca.",
      summaryEn: "Ceasefire negotiations with Iran and pending White House decision.",
      detailsPt: [
        "Memorando de entendimento para cessar-fogo de 60 dias.",
        "Possível descongelamento de ativos iranianos.",
        "Decisão final dependeria de aprovação presidencial.",
      ],
      detailsEn: [
        "Memorandum for a 60-day ceasefire.",
        "Possible unfreezing of Iranian assets.",
        "Final decision would depend on presidential approval.",
      ],
    },
    Iran: {
      titlePt: "Irã",
      titleEn: "Iran",
      summaryPt: "Estreito de Ormuz, ativos congelados e demonstração de força regional.",
      summaryEn: "Strait of Hormuz, frozen assets, and regional show of force.",
      detailsPt: [
        "Ator central nas negociações de cessar-fogo.",
        "Liberação do Estreito de Ormuz sem pedágios.",
        "Lançamento de míssil contra o Kuwait como sinalização.",
      ],
      detailsEn: [
        "Central actor in ceasefire negotiations.",
        "Reopening the Strait of Hormuz without tolls.",
        "Missile launch toward Kuwait as signaling.",
      ],
    },
    Kuwait: {
      titlePt: "Kuwait",
      titleEn: "Kuwait",
      summaryPt: "Alvo de míssil balístico iraniano interceptado.",
      summaryEn: "Target of an intercepted Iranian ballistic missile.",
      detailsPt: [
        "Citado como alvo de míssil iraniano.",
        "Episódio funcionou como sinalização regional.",
        "Indica risco de ampliação geográfica do conflito.",
      ],
      detailsEn: [
        "Cited as target of an Iranian missile.",
        "The episode functioned as regional signaling.",
        "It indicates risk of geographic expansion.",
      ],
    },
    Lebanon: {
      titlePt: "Líbano",
      titleEn: "Lebanon",
      summaryPt: "Incursão israelense, ataques em Beirute, Tiro e Beaufort.",
      summaryEn: "Israeli incursion and strikes around Beirut, Tyre, and Beaufort.",
      detailsPt: [
        "Ataques aéreos na região de Beirute.",
        "Bombardeios em Tiro e áreas próximas ao Castelo de Beaufort.",
        "Mortes reportadas desde o início da incursão terrestre.",
      ],
      detailsEn: [
        "Airstrikes in the Beirut area.",
        "Bombing in Tyre and near Beaufort Castle.",
        "Deaths reported since the start of the ground incursion.",
      ],
    },
    Israel: {
      titlePt: "Israel",
      titleEn: "Israel",
      summaryPt: "Operações no Líbano e confirmação de morte de comandante do Hamas.",
      summaryEn: "Operations in Lebanon and confirmation of a Hamas commander killed.",
      detailsPt: [
        "Intensificação de operações no Líbano.",
        "Busca por zona de amortecimento na fronteira.",
        "Confirmação da morte de Mohammed Odeh em Gaza.",
      ],
      detailsEn: [
        "Intensified operations in Lebanon.",
        "Search for a border buffer zone.",
        "Confirmation of Mohammed Odeh's death in Gaza.",
      ],
    },
    Ukraine: {
      titlePt: "Ucrânia",
      titleEn: "Ukraine",
      summaryPt: "Invasões táticas, campanhas de drones e pedido por sistemas Patriot.",
      summaryEn: "Tactical incursions, drone campaigns, and request for Patriot systems.",
      detailsPt: [
        "Rompimento parcial da guerra estática de posições.",
        "Campanhas de drones com impacto operacional.",
        "Pedido urgente por mísseis Patriot.",
      ],
      detailsEn: [
        "Partial break from static positional warfare.",
        "Drone campaigns with operational impact.",
        "Urgent request for Patriot missiles.",
      ],
    },
    Russia: {
      titlePt: "Rússia",
      titleEn: "Russia",
      summaryPt: "Emprego do míssil hipersônico Oreshnik.",
      summaryEn: "Use of the Oreshnik hypersonic missile.",
      detailsPt: [
        "Novo disparo do míssil balístico hipersônico Oreshnik.",
        "Ataque perto de Bila Tserkva.",
        "Desafio relevante para defesa aérea.",
      ],
      detailsEn: [
        "New launch of the Oreshnik hypersonic ballistic missile.",
        "Strike near Bila Tserkva.",
        "Relevant challenge for air defense.",
      ],
    },
    Armenia: {
      titlePt: "Armênia",
      titleEn: "Armenia",
      summaryPt: "Disputa geopolítica entre Rússia, EUA e aproximação com o Ocidente.",
      summaryEn: "Geopolitical competition involving Russia, the U.S., and the West.",
      detailsPt: [
        "Centro da disputa de influência no Cáucaso.",
        "Busca de aproximação com União Europeia e Ocidente.",
        "Risco estratégico percebido pela Rússia.",
      ],
      detailsEn: [
        "Center of influence competition in the Caucasus.",
        "Seeking closer ties with the EU and the West.",
        "Strategic risk perceived by Russia.",
      ],
    },
    Sudan: {
      titlePt: "Sudão",
      titleEn: "Sudan",
      summaryPt: "Conflito prolongado citado entre os focos acompanhados.",
      summaryEn: "Prolonged conflict cited among monitored hotspots.",
      detailsPt: [
        "Conflito prolongado com alto custo humanitário.",
        "Foco relevante para análise contemporânea.",
        "Persistência de instabilidade interna.",
      ],
      detailsEn: [
        "Prolonged conflict with high humanitarian cost.",
        "Relevant focus for contemporary analysis.",
        "Persistent internal instability.",
      ],
    },
    Yemen: {
      titlePt: "Iêmen",
      titleEn: "Yemen",
      summaryPt: "Ataques no Mar Vermelho e impacto sobre rotas marítimas.",
      summaryEn: "Red Sea attacks and impact on maritime routes.",
      detailsPt: [
        "Ataques afetam a segurança marítima regional.",
        "Impacto sobre rotas comerciais e energia.",
        "Eixo Mar Vermelho-Golfo permanece estratégico.",
      ],
      detailsEn: [
        "Attacks affect regional maritime security.",
        "Impact on trade routes and energy.",
        "The Red Sea-Gulf axis remains strategic.",
      ],
    },
  },
};

function getCountryName(geo) {
  return (
    geo.properties?.name ||
    geo.properties?.NAME ||
    geo.properties?.admin ||
    String(geo.id)
  );
}

function getCountryKey(geo, currentCountryNews) {
  const name = getCountryName(geo);
  const id = String(geo.id);

  if (currentCountryNews[name]) return name;

  const aliasByName = countryNameAliases[name];
  if (aliasByName && currentCountryNews[aliasByName]) return aliasByName;

  const aliasById = countryIdAliases[id];
  if (aliasById && currentCountryNews[aliasById]) return aliasById;

  return null;
}

function WorldConflictMap({ lang, selectedDay }) {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const currentCountryNews = countryNewsByBulletin[selectedDay] || {};

  useEffect(() => {
    setSelectedCountry(null);
  }, [selectedDay]);

  const countries = useMemo(() => {
    return topojsonFeature(worldAtlas, worldAtlas.objects.countries).features;
  }, []);

  const pathGenerator = useMemo(() => {
    const projection = geoNaturalEarth1().fitExtent(
      [
        [12, 12],
        [MAP_WIDTH - 12, MAP_HEIGHT - 12],
      ],
      {
        type: "FeatureCollection",
        features: countries,
      }
    );

    return geoPath(projection);
  }, [countries]);

  const selectedNews = selectedCountry?.key
    ? currentCountryNews[selectedCountry.key]
    : null;

  return (
    <div className="world-map-panel">
      <div className="map-copy">
        <span className="tag">
          {lang === "pt" ? "Mapa Interativo" : "Interactive Map"}
        </span>

        <h3>
          {lang === "pt"
            ? "Clique em um país para ver as notícias"
            : "Click a country to view news"}
        </h3>

        <p>
          {lang === "pt"
            ? "Países com notícias cadastradas aparecem destacados em verde. Ao clicar, o leitor vê um resumo por país."
            : "Countries with registered news are highlighted in green. Clicking one shows a country-level summary."}
        </p>
      </div>

      <div className="map-layout">
        <div className="map-card">
          <svg
            className="world-map"
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            role="img"
            aria-label={
              lang === "pt"
                ? "Mapa mundi interativo de conflitos"
                : "Interactive world conflict map"
            }
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              background: "#07111f",
              borderRadius: "24px",
            }}
          >
            <rect width={MAP_WIDTH} height={MAP_HEIGHT} rx="24" fill="#07111f" />

            {countries.map((geo) => {
              const countryName = getCountryName(geo);
              const countryKey = getCountryKey(geo, currentCountryNews);
              const hasNews = Boolean(countryKey);
              const isSelected =
                selectedCountry?.name === countryName ||
                Boolean(countryKey && selectedCountry?.key === countryKey);

              const pathData = pathGenerator(geo);
              if (!pathData) return null;

              const defaultFill = isSelected
                ? "#f87171"
                : hasNews
                ? "#6ee7b7"
                : "#334155";

              return (
                <path
                  key={`${geo.id}-${countryName}`}
                  d={pathData}
                  fill={defaultFill}
                  stroke="#020617"
                  strokeWidth={0.7}
                  style={{
                    cursor: "pointer",
                    opacity: hasNews || isSelected ? 1 : 0.72,
                    transition: "fill 0.2s ease, opacity 0.2s ease",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.setAttribute(
                      "fill",
                      hasNews ? "#facc15" : "#64748b"
                    );
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.setAttribute("fill", defaultFill);
                  }}
                  onClick={() =>
                    setSelectedCountry({
                      name: countryName,
                      key: countryKey,
                    })
                  }
                >
                  <title>
                    {hasNews
                      ? lang === "pt"
                        ? `${countryName} — há notícias neste boletim`
                        : `${countryName} — news available in this bulletin`
                      : lang === "pt"
                      ? `${countryName} — sem notícia cadastrada`
                      : `${countryName} — no registered news`}
                  </title>
                </path>
              );
            })}
          </svg>

          <div className="map-legend">
            <span>
              <i className="legend-dot news-dot" />
              {lang === "pt" ? "Com notícia" : "With news"}
            </span>

            <span>
              <i className="legend-dot selected-dot" />
              {lang === "pt" ? "Selecionado" : "Selected"}
            </span>
          </div>
        </div>

        <aside className="country-news-panel">
          {!selectedCountry && (
            <div className="country-news-empty">
              <strong>
                {lang === "pt" ? "Nenhum país selecionado" : "No country selected"}
              </strong>

              <p>
                {lang === "pt"
                  ? "Clique em um país destacado para abrir as notícias relacionadas."
                  : "Click a highlighted country to open related news."}
              </p>
            </div>
          )}

          {selectedCountry && !selectedNews && (
            <div className="country-news-empty">
              <strong>{selectedCountry.name}</strong>

              <p>
                {lang === "pt"
                  ? "Não há notícia cadastrada para este país neste boletim."
                  : "There is no registered news for this country in this bulletin."}
              </p>
            </div>
          )}

          {selectedNews && (
            <div>
              <span className="country-news-kicker">
                {lang === "pt" ? "País selecionado" : "Selected country"}
              </span>

              <h3 className="country-news-title">
                {lang === "pt" ? selectedNews.titlePt : selectedNews.titleEn}
              </h3>

              <p>
                {lang === "pt" ? selectedNews.summaryPt : selectedNews.summaryEn}
              </p>

              <ul className="country-news-list">
                {(lang === "pt"
                  ? selectedNews.detailsPt
                  : selectedNews.detailsEn
                ).map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default WorldConflictMap;