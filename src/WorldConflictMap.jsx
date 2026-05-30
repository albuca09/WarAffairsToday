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
  "051": "Armenia",
  51: "Armenia",
  729: "Sudan",
  887: "Yemen",
};

const countryNameAliases = {
  "United States": "United States of America",
  "United States of America": "United States of America",
  "Russian Federation": "Russia",
};

const countryNewsByBulletin = {
  "2026-05-25": {
    "United States of America": {
      titlePt: "Estados Unidos",
      titleEn: "United States",
      summaryPt: "Negociações com o Irã e manutenção de pressão naval no Oriente Médio.",
      summaryEn: "Negotiations with Iran and continued naval pressure in the Middle East.",
      detailsPt: [
        "Participação na estrutura de um memorando de entendimento para cessar-fogo de 60 dias com o Irã.",
        "Pressão naval americana sobre portos iranianos.",
        "Implicações políticas internas e estratégicas para Washington.",
      ],
      detailsEn: [
        "Participation in the framework of a 60-day ceasefire memorandum with Iran.",
        "American naval pressure on Iranian ports.",
        "Domestic and strategic implications for Washington.",
      ],
    },
    Iran: {
      titlePt: "Irã",
      titleEn: "Iran",
      summaryPt: "Cessar-fogo em negociação, Estreito de Ormuz e pressão naval americana.",
      summaryEn: "Ceasefire talks, the Strait of Hormuz, and U.S. naval pressure.",
      detailsPt: [
        "O Irã aparece no centro das negociações sobre o Estreito de Ormuz.",
        "O acordo envolveria reabertura do estreito sem cobrança de pedágios.",
        "A pressão econômica e naval permanece como fator operacional relevante.",
      ],
      detailsEn: [
        "Iran is central to negotiations over the Strait of Hormuz.",
        "The arrangement would involve reopening the strait without tolls.",
        "Economic and naval pressure remains an important operational factor.",
      ],
    },
    Ukraine: {
      titlePt: "Ucrânia",
      titleEn: "Ukraine",
      summaryPt: "Ataques russos com mísseis e drones contra Kiev e infraestrutura civil.",
      summaryEn: "Russian missile and drone attacks against Kyiv and civilian infrastructure.",
      detailsPt: [
        "A Ucrânia sofreu grande ataque noturno com mísseis e drones.",
        "As defesas aéreas interceptaram parte expressiva dos drones e mísseis de cruzeiro.",
        "Mísseis balísticos seguem representando maior desafio de interceptação.",
      ],
      detailsEn: [
        "Ukraine suffered a major overnight attack involving missiles and drones.",
        "Air defenses intercepted many drones and cruise missiles.",
        "Ballistic missiles remain a greater interception challenge.",
      ],
    },
    Russia: {
      titlePt: "Rússia",
      titleEn: "Russia",
      summaryPt: "Ofensiva aérea de larga escala contra alvos ucranianos.",
      summaryEn: "Large-scale aerial offensive against Ukrainian targets.",
      detailsPt: [
        "Emprego combinado de drones, mísseis de cruzeiro e mísseis balísticos.",
        "A campanha reforça a centralidade de ataques de saturação.",
        "Pressão contínua sobre infraestrutura civil e militar ucraniana.",
      ],
      detailsEn: [
        "Combined use of drones, cruise missiles, and ballistic missiles.",
        "The campaign reinforces the importance of saturation attacks.",
        "Continued pressure on Ukrainian civilian and military infrastructure.",
      ],
    },
    Lebanon: {
      titlePt: "Líbano",
      titleEn: "Lebanon",
      summaryPt: "Tensão persistente envolvendo Israel e Hezbollah.",
      summaryEn: "Persistent tension involving Israel and Hezbollah.",
      detailsPt: [
        "Combates e bombardeios prosseguem apesar de acordos formais de cessar-fogo.",
        "O Hezbollah continua sendo fator central de instabilidade na fronteira.",
        "A situação mantém risco de escalada regional.",
      ],
      detailsEn: [
        "Fighting and airstrikes continued despite formal ceasefire arrangements.",
        "Hezbollah remains a central factor of border instability.",
        "The situation maintains regional escalation risk.",
      ],
    },
    Israel: {
      titlePt: "Israel",
      titleEn: "Israel",
      summaryPt: "Operações militares ligadas ao Líbano e tensões com o Hezbollah.",
      summaryEn: "Military operations linked to Lebanon and Hezbollah-related tensions.",
      detailsPt: [
        "Israel manteve operações no contexto do conflito com o Hezbollah.",
        "A fronteira norte segue como área de elevada tensão.",
        "A ameaça de drones e foguetes permanece relevante.",
      ],
      detailsEn: [
        "Israel maintained operations in the context of the Hezbollah conflict.",
        "The northern border remains a high-tension area.",
        "Drone and rocket threats remain relevant.",
      ],
    },
    Pakistan: {
      titlePt: "Paquistão",
      titleEn: "Pakistan",
      summaryPt: "Ataques atribuídos ao Exército de Libertação do Balochistão.",
      summaryEn: "Attacks attributed to the Balochistan Liberation Army.",
      detailsPt: [
        "O Paquistão aparece como foco adicional de violência armada.",
        "Ataques foram atribuídos ao Exército de Libertação do Balochistão.",
        "O caso indica persistência de ameaças insurgentes.",
      ],
      detailsEn: [
        "Pakistan appeared as an additional armed violence hotspot.",
        "Attacks were attributed to the Balochistan Liberation Army.",
        "The case indicates persistent insurgent threats.",
      ],
    },
    Mali: {
      titlePt: "Mali",
      titleEn: "Mali",
      summaryPt: "Ataques atribuídos ao grupo JNIM.",
      summaryEn: "Attacks attributed to JNIM.",
      detailsPt: [
        "O Mali segue como foco de instabilidade e violência armada.",
        "Ataques foram atribuídos ao grupo JNIM.",
        "A atividade insurgente continua afetando a segurança regional.",
      ],
      detailsEn: [
        "Mali remains a hotspot of instability and armed violence.",
        "Attacks were attributed to JNIM.",
        "Insurgent activity continues to affect regional security.",
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
        "Os EUA estão próximos de assinar memorando para cessar-fogo de 60 dias com o Irã.",
        "O acordo envolveria descongelamento de ativos iranianos.",
        "A decisão final dependeria de aprovação presidencial.",
      ],
      detailsEn: [
        "The U.S. is reportedly close to signing a 60-day ceasefire memorandum with Iran.",
        "The arrangement would involve unfreezing Iranian assets.",
        "The final decision would depend on presidential approval.",
      ],
    },
    Iran: {
      titlePt: "Irã",
      titleEn: "Iran",
      summaryPt: "Estreito de Ormuz, ativos congelados e demonstração de força regional.",
      summaryEn: "Strait of Hormuz, frozen assets, and regional show of force.",
      detailsPt: [
        "O Irã aparece como ator central nas negociações de cessar-fogo.",
        "O acordo exigiria liberação do Estreito de Ormuz sem cobrança de pedágios.",
        "O lançamento de míssil contra o Kuwait foi tratado como demonstração de força.",
      ],
      detailsEn: [
        "Iran appears as a central actor in ceasefire negotiations.",
        "The deal would require reopening the Strait of Hormuz without tolls.",
        "The missile launch toward Kuwait was treated as a show of force.",
      ],
    },
    Kuwait: {
      titlePt: "Kuwait",
      titleEn: "Kuwait",
      summaryPt: "Alvo de míssil balístico iraniano interceptado.",
      summaryEn: "Target of an intercepted Iranian ballistic missile.",
      detailsPt: [
        "O Kuwait foi citado como alvo de míssil balístico iraniano interceptado.",
        "O episódio funcionou como sinalização regional.",
        "O caso reforça o risco de ampliação geográfica do conflito.",
      ],
      detailsEn: [
        "Kuwait was cited as the target of an intercepted Iranian ballistic missile.",
        "The episode functioned as regional signaling.",
        "The case reinforces the risk of geographic expansion of the conflict.",
      ],
    },
    Lebanon: {
      titlePt: "Líbano",
      titleEn: "Lebanon",
      summaryPt: "Incursão israelense, ataques em Beirute, Tiro e Beaufort.",
      summaryEn: "Israeli incursion and strikes around Beirut, Tyre, and Beaufort.",
      detailsPt: [
        "Israel realizou ataques aéreos na região de Beirute.",
        "Tiro e áreas próximas ao Castelo de Beaufort foram bombardeadas.",
        "Autoridades libanesas reportaram milhares de mortos desde o início da incursão terrestre.",
      ],
      detailsEn: [
        "Israel carried out airstrikes in the Beirut area.",
        "Tyre and areas near Beaufort Castle were bombed.",
        "Lebanese authorities reported thousands killed since the start of the ground incursion.",
      ],
    },
    Israel: {
      titlePt: "Israel",
      titleEn: "Israel",
      summaryPt: "Operações no Líbano e confirmação de morte de comandante do Hamas.",
      summaryEn: "Operations in Lebanon and confirmation of a Hamas commander killed.",
      detailsPt: [
        "Israel intensificou operações no Líbano.",
        "As forças israelenses buscam estabelecer zona de amortecimento na fronteira.",
        "Israel confirmou a morte de Mohammed Odeh em Gaza.",
      ],
      detailsEn: [
        "Israel intensified operations in Lebanon.",
        "Israeli forces seek to establish a border buffer zone.",
        "Israel confirmed the death of Mohammed Odeh in Gaza.",
      ],
    },
    Ukraine: {
      titlePt: "Ucrânia",
      titleEn: "Ukraine",
      summaryPt: "Invasões táticas, campanhas de drones e pedido por sistemas Patriot.",
      summaryEn: "Tactical incursions, drone campaigns, and request for Patriot systems.",
      detailsPt: [
        "A Ucrânia rompeu parcialmente a guerra estática de posições.",
        "Campanhas de drones teriam causado elevadas baixas russas mensais.",
        "Zelensky pediu urgência no fornecimento de mísseis Patriot.",
      ],
      detailsEn: [
        "Ukraine reportedly broke elements of static positional warfare.",
        "Drone campaigns allegedly caused high monthly Russian casualties.",
        "Zelensky urged faster delivery of Patriot missiles.",
      ],
    },
    Russia: {
      titlePt: "Rússia",
      titleEn: "Russia",
      summaryPt: "Emprego do míssil hipersônico Oreshnik contra área próxima a Bila Tserkva.",
      summaryEn: "Use of the Oreshnik hypersonic missile near Bila Tserkva.",
      detailsPt: [
        "A Rússia disparou novamente o míssil balístico hipersônico Oreshnik.",
        "O ataque ocorreu perto de Bila Tserkva.",
        "Mísseis hipersônicos seguem como desafio para defesa aérea.",
      ],
      detailsEn: [
        "Russia again launched the Oreshnik hypersonic ballistic missile.",
        "The strike occurred near Bila Tserkva.",
        "Hypersonic missiles remain a challenge for air defense.",
      ],
    },
    Armenia: {
      titlePt: "Armênia",
      titleEn: "Armenia",
      summaryPt: "Disputa geopolítica entre Rússia, EUA e aproximação com o Ocidente.",
      summaryEn: "Geopolitical competition involving Russia, the U.S., and the West.",
      detailsPt: [
        "A Armênia aparece no centro da disputa de influência no Cáucaso.",
        "O país busca aproximação com a União Europeia e o Ocidente.",
        "A Rússia vê esse movimento como risco estratégico.",
      ],
      detailsEn: [
        "Armenia appears at the center of influence competition in the Caucasus.",
        "The country seeks closer ties with the European Union and the West.",
        "Russia sees this movement as a strategic risk.",
      ],
    },
    Sudan: {
      titlePt: "Sudão",
      titleEn: "Sudan",
      summaryPt: "Conflito prolongado citado entre os focos acompanhados.",
      summaryEn: "Prolonged conflict cited among monitored hotspots.",
      detailsPt: [
        "O Sudão aparece entre os conflitos acompanhados por fontes de referência.",
        "A guerra prolongada impõe alto custo humanitário.",
        "O caso permanece relevante para análise de conflitos contemporâneos.",
      ],
      detailsEn: [
        "Sudan appears among the conflicts monitored by reference sources.",
        "The prolonged war imposes a high humanitarian cost.",
        "The case remains relevant for contemporary conflict analysis.",
      ],
    },
    Yemen: {
      titlePt: "Iêmen",
      titleEn: "Yemen",
      summaryPt: "Ataques no Mar Vermelho e impacto sobre rotas marítimas.",
      summaryEn: "Red Sea attacks and impact on maritime routes.",
      detailsPt: [
        "Ataques no Mar Vermelho afetam a segurança marítima regional.",
        "O tema envolve rotas comerciais, energia e dissuasão naval.",
        "A instabilidade no eixo Mar Vermelho-Golfo permanece estratégica.",
      ],
      detailsEn: [
        "Red Sea attacks affect regional maritime security.",
        "The issue involves trade routes, energy, and naval deterrence.",
        "Instability along the Red Sea-Gulf axis remains strategic.",
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
            ? "Países com notícias cadastradas aparecem destacados no mapa. Ao clicar, o leitor vê um resumo operacional por país."
            : "Countries with registered news are highlighted on the map. Clicking one shows a country-level operational summary."}
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
          >
            <rect
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              rx="24"
              className="map-ocean"
            />

            {countries.map((geo) => {
              const countryName = getCountryName(geo);
              const countryKey = getCountryKey(geo, currentCountryNews);
              const hasNews = Boolean(countryKey);
              const isSelected =
                selectedCountry?.name === countryName ||
                Boolean(countryKey && selectedCountry?.key === countryKey);

              const pathData = pathGenerator(geo);

              if (!pathData) return null;

              return (
                <path
                  key={`${geo.id}-${countryName}`}
                  d={pathData}
                  className={[
                    "map-country",
                    hasNews ? "has-news" : "",
                    isSelected ? "is-selected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
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