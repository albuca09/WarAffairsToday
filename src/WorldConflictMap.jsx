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
      summaryPt:
        "No boletim de 25 de maio, os Estados Unidos aparecem como ator central na tentativa de estabilização temporária do conflito com o Irã, combinando negociação diplomática com pressão naval. Do ponto de vista militar, a manutenção de presença marítima e controle de acessos portuários funciona como instrumento de coerção operacional, preservando capacidade de dissuasão sem necessariamente escalar para confronto direto de alta intensidade. A implicação prática é a sustentação de uma postura de pressão contínua sobre Teerã, com impacto sobre logística marítima, liberdade de navegação, abastecimento energético e cálculo estratégico de aliados e adversários.",
      summaryEn:
        "In the May 25 bulletin, the United States appears as a central actor in the attempt to temporarily stabilize the conflict with Iran, combining diplomacy with naval pressure. From a military perspective, maritime presence and port-access control work as operational coercion tools, preserving deterrence without necessarily escalating into high-intensity direct confrontation. The practical implication is sustained pressure on Tehran, affecting maritime logistics, freedom of navigation, energy flows, and the strategic calculations of allies and adversaries.",
      implicationsPt: [
        "Pressão naval atua como instrumento de dissuasão e coerção sem emprego imediato de força terrestre.",
        "A postura americana condiciona o comportamento iraniano no Estreito de Ormuz e nos portos estratégicos.",
        "A operação exige prontidão logística, vigilância marítima, defesa contra drones e proteção de bases regionais.",
      ],
      implicationsEn: [
        "Naval pressure functions as deterrence and coercion without immediate ground-force employment.",
        "The U.S. posture shapes Iranian behavior in the Strait of Hormuz and around strategic ports.",
        "The operation requires logistical readiness, maritime surveillance, counter-drone defense, and protection of regional bases.",
      ],
    },

    Iran: {
      titlePt: "Irã",
      titleEn: "Iran",
      summaryPt:
        "No boletim de 25 de maio, o Irã é apresentado como o eixo político-operacional da crise no Golfo, especialmente pela relevância do Estreito de Ormuz. A negociação de cessar-fogo e a possível reabertura do estreito sem cobrança de pedágios indicam que Teerã utiliza a geografia marítima como alavanca estratégica. Militarmente, o país explora a ameaça ao tráfego marítimo, o risco de ataques por drones e a pressão sobre cadeias energéticas como formas de compensar assimetrias frente ao poder naval americano. A implicação prática é que qualquer alteração no controle do estreito afeta imediatamente logística global, preços de energia e liberdade de manobra das forças ocidentais na região.",
      summaryEn:
        "In the May 25 bulletin, Iran is presented as the political-operational center of the Gulf crisis, especially due to the importance of the Strait of Hormuz. Ceasefire negotiations and the possible reopening of the strait without tolls show Tehran using maritime geography as strategic leverage. Militarily, Iran exploits threats to shipping, drone attacks, and pressure on energy chains to offset asymmetries against U.S. naval power. The practical implication is that any change in control over the strait immediately affects global logistics, energy prices, and Western freedom of maneuver in the region.",
      implicationsPt: [
        "O Estreito de Ormuz funciona como ponto de estrangulamento logístico e instrumento de pressão estratégica.",
        "A capacidade de negar ou ameaçar rotas marítimas amplia a influência iraniana mesmo diante de superioridade naval adversária.",
        "Drones, mísseis costeiros e operações assimétricas elevam o custo de qualquer operação naval contra o Irã.",
      ],
      implicationsEn: [
        "The Strait of Hormuz functions as a logistical chokepoint and strategic pressure tool.",
        "The ability to threaten maritime routes increases Iranian influence despite opposing naval superiority.",
        "Drones, coastal missiles, and asymmetric operations raise the cost of any naval operation against Iran.",
      ],
    },

    Ukraine: {
      titlePt: "Ucrânia",
      titleEn: "Ukraine",
      summaryPt:
        "No boletim de 25 de maio, a Ucrânia aparece sob forte pressão aérea russa, com ataques combinados de mísseis e drones contra Kiev e infraestrutura civil. O desempenho da defesa aérea indica capacidade relevante de interceptar drones e mísseis de cruzeiro, mas revela vulnerabilidade persistente diante de mísseis balísticos. Sob a ótica militar, o quadro mostra uma disputa de atrito tecnológico: a Rússia tenta saturar a defesa ucraniana, enquanto Kiev depende de camadas integradas de sensores, interceptadores e alerta antecipado. A implicação prática é a necessidade de reforçar defesa antiaérea, dispersar infraestrutura crítica e manter estoques de interceptadores.",
      summaryEn:
        "In the May 25 bulletin, Ukraine appears under intense Russian aerial pressure, with combined missile and drone attacks against Kyiv and civilian infrastructure. Ukrainian air defense shows relevant capability against drones and cruise missiles, but persistent vulnerability against ballistic missiles. From a military perspective, the situation reflects technological attrition: Russia seeks to saturate Ukrainian defenses, while Kyiv depends on integrated layers of sensors, interceptors, and early warning. The practical implication is the need to strengthen air defense, disperse critical infrastructure, and maintain interceptor stocks.",
      implicationsPt: [
        "Ataques de saturação buscam esgotar interceptadores e revelar lacunas na defesa aérea.",
        "A proteção de centros urbanos depende de integração entre radares, sensores, comunicações e defesa antiaérea multicamada.",
        "A manutenção de estoques de mísseis defensivos torna-se fator decisivo para a resiliência operacional.",
      ],
      implicationsEn: [
        "Saturation attacks seek to exhaust interceptors and expose gaps in air defense.",
        "Urban protection depends on integrating radars, sensors, communications, and layered air defense.",
        "Maintaining defensive missile stocks becomes decisive for operational resilience.",
      ],
    },

    Russia: {
      titlePt: "Rússia",
      titleEn: "Russia",
      summaryPt:
        "No boletim de 25 de maio, a Rússia é retratada como responsável por uma ofensiva aérea de grande escala contra a Ucrânia, combinando drones, mísseis de cruzeiro e mísseis balísticos. A lógica militar é a saturação: multiplicar vetores de ataque para sobrecarregar radares, interceptadores e centros de comando ucranianos. A implicação prática é dupla: pressionar a infraestrutura civil e militar de Kiev e testar os limites da defesa aérea ocidental fornecida à Ucrânia. Essa abordagem também permite à Rússia avaliar padrões de resposta, tempos de reação e vulnerabilidades do sistema defensivo adversário.",
      summaryEn:
        "In the May 25 bulletin, Russia is portrayed as conducting a large-scale aerial offensive against Ukraine, combining drones, cruise missiles, and ballistic missiles. The military logic is saturation: multiplying attack vectors to overload Ukrainian radars, interceptors, and command centers. The practical implication is twofold: pressuring Kyiv's civil and military infrastructure while testing the limits of Western-supplied air defense. This approach also allows Russia to assess response patterns, reaction times, and vulnerabilities in the opposing defense system.",
      implicationsPt: [
        "Ataques combinados aumentam a complexidade da defesa ucraniana.",
        "O emprego de diferentes vetores permite mapear respostas defensivas e lacunas operacionais.",
        "A pressão contínua busca degradar infraestrutura, moral e capacidade de sustentação ucraniana.",
      ],
      implicationsEn: [
        "Combined attacks increase the complexity of Ukrainian defense.",
        "Using different vectors helps map defensive responses and operational gaps.",
        "Continuous pressure seeks to degrade infrastructure, morale, and Ukrainian sustainment capacity.",
      ],
    },

    Lebanon: {
      titlePt: "Líbano",
      titleEn: "Lebanon",
      summaryPt:
        "No boletim de 25 de maio, o Líbano aparece como espaço de fricção militar persistente entre Israel e Hezbollah. Mesmo com acordos formais de cessar-fogo, a continuidade de ataques aéreos e combates indica baixa efetividade dos mecanismos de contenção. Sob perspectiva operacional, o território libanês funciona como zona de contato, dispersão e lançamento para forças não estatais, dificultando distinção entre infraestrutura civil e militar. A implicação prática é o risco constante de escalada localizada para conflito regional, especialmente se ataques com drones, foguetes ou bombardeios gerarem altas baixas civis.",
      summaryEn:
        "In the May 25 bulletin, Lebanon appears as a persistent military friction zone between Israel and Hezbollah. Despite formal ceasefire arrangements, continued airstrikes and fighting indicate weak containment mechanisms. Operationally, Lebanese territory functions as a contact, dispersion, and launch area for non-state forces, complicating the distinction between civilian and military infrastructure. The practical implication is constant risk of localized escalation into a regional conflict, especially if drones, rockets, or airstrikes cause significant civilian casualties.",
      implicationsPt: [
        "Terreno urbano e presença de atores não estatais dificultam inteligência, seleção de alvos e controle de danos civis.",
        "O Hezbollah pode explorar dispersão, mobilidade e ocultação para manter pressão na fronteira.",
        "A escalada no Líbano pode forçar Israel a redistribuir meios terrestres, aéreos e de defesa antidrone.",
      ],
      implicationsEn: [
        "Urban terrain and non-state actors complicate intelligence, targeting, and civilian-harm mitigation.",
        "Hezbollah can exploit dispersion, mobility, and concealment to maintain border pressure.",
        "Escalation in Lebanon may force Israel to redistribute ground, air, and counter-drone assets.",
      ],
    },

    Israel: {
      titlePt: "Israel",
      titleEn: "Israel",
      summaryPt:
        "No boletim de 25 de maio, Israel aparece envolvido em operações relacionadas ao Líbano e à ameaça do Hezbollah. Do ponto de vista militar, o desafio israelense é manter superioridade aérea e capacidade de ataque preciso enquanto protege a fronteira norte contra drones, foguetes e infiltrações. A implicação prática é a necessidade de equilibrar ações ofensivas com defesa territorial, evitando que uma campanha limitada se transforme em guerra prolongada de atrito. O ambiente operacional exige inteligência em tempo real, defesa antidrone e coordenação entre forças terrestres, aéreas e sistemas de alerta.",
      summaryEn:
        "In the May 25 bulletin, Israel appears engaged in operations linked to Lebanon and the Hezbollah threat. Militarily, Israel's challenge is to maintain air superiority and precision-strike capability while protecting the northern border against drones, rockets, and infiltrations. The practical implication is the need to balance offensive action with territorial defense, preventing a limited campaign from becoming a prolonged war of attrition. The operational environment requires real-time intelligence, counter-drone defense, and coordination between ground forces, air assets, and warning systems.",
      implicationsPt: [
        "A fronteira norte exige vigilância persistente e pronta resposta contra drones e foguetes.",
        "Ataques aéreos precisam ser calibrados para reduzir risco de escalada regional.",
        "A defesa de comunidades fronteiriças compete por recursos com outras frentes, incluindo Gaza.",
      ],
      implicationsEn: [
        "The northern border requires persistent surveillance and rapid response against drones and rockets.",
        "Airstrikes must be calibrated to reduce regional escalation risk.",
        "Defense of border communities competes for resources with other fronts, including Gaza.",
      ],
    },

    Pakistan: {
      titlePt: "Paquistão",
      titleEn: "Pakistan",
      summaryPt:
        "No boletim de 25 de maio, o Paquistão surge como foco adicional de violência armada, com ataques atribuídos ao Exército de Libertação do Balochistão. A leitura militar indica ameaça insurgente persistente, capaz de explorar áreas periféricas, rotas logísticas e vulnerabilidades de segurança interna. A implicação prática é que Islamabad precisa combinar inteligência humana, vigilância territorial, proteção de infraestrutura crítica e operações de contraterrorismo, evitando que ações insurgentes afetem corredores econômicos, instalações estratégicas e estabilidade política regional.",
      summaryEn:
        "In the May 25 bulletin, Pakistan appears as an additional armed-violence hotspot, with attacks attributed to the Balochistan Liberation Army. The military reading indicates a persistent insurgent threat able to exploit peripheral areas, logistical routes, and internal-security vulnerabilities. The practical implication is that Islamabad must combine human intelligence, territorial surveillance, critical-infrastructure protection, and counterterrorism operations, preventing insurgent actions from affecting economic corridors, strategic facilities, and regional political stability.",
      implicationsPt: [
        "A ameaça insurgente exige inteligência local e resposta rápida em áreas periféricas.",
        "Infraestruturas energéticas, corredores logísticos e instalações militares tornam-se alvos prioritários.",
        "Operações excessivamente pesadas podem gerar efeitos políticos adversos e alimentar recrutamento insurgente.",
      ],
      implicationsEn: [
        "The insurgent threat requires local intelligence and rapid response in peripheral areas.",
        "Energy infrastructure, logistics corridors, and military facilities become priority targets.",
        "Overly heavy operations may generate political backlash and feed insurgent recruitment.",
      ],
    },

    Mali: {
      titlePt: "Mali",
      titleEn: "Mali",
      summaryPt:
        "No boletim de 25 de maio, o Mali é tratado como foco de instabilidade no Sahel, com ataques atribuídos ao JNIM. Militarmente, o cenário é típico de conflito assimétrico em ambiente de baixa governança, onde grupos armados exploram mobilidade, conhecimento do terreno e fragilidade institucional. A implicação prática é que forças de segurança precisam priorizar inteligência, mobilidade, controle de rotas e proteção de comunidades vulneráveis, pois a simples ocupação territorial tende a ser insuficiente contra redes insurgentes dispersas.",
      summaryEn:
        "In the May 25 bulletin, Mali is treated as an instability hotspot in the Sahel, with attacks attributed to JNIM. Militarily, the scenario reflects asymmetric conflict in a low-governance environment, where armed groups exploit mobility, terrain familiarity, and institutional weakness. The practical implication is that security forces must prioritize intelligence, mobility, route control, and protection of vulnerable communities, because simple territorial occupation tends to be insufficient against dispersed insurgent networks.",
      implicationsPt: [
        "Controle de rotas e mobilidade tática são mais importantes que presença estática.",
        "A insurgência pode explorar vazios de governança e fragilidade de forças locais.",
        "A resposta militar precisa ser combinada com estabilização política e proteção civil.",
      ],
      implicationsEn: [
        "Route control and tactical mobility are more important than static presence.",
        "Insurgents can exploit governance gaps and weak local forces.",
        "Military response must be combined with political stabilization and civilian protection.",
      ],
    },
  },

  "2026-05-30": {
    "United States of America": {
      titlePt: "Estados Unidos",
      titleEn: "United States",
      summaryPt:
        "No boletim de 30 de maio, os Estados Unidos aparecem no centro da negociação de cessar-fogo com o Irã, mas ainda com decisão política pendente. A leitura militar é que Washington tenta converter pressão operacional acumulada em ganho diplomático, preservando capacidade de coerção naval e evitando uma escalada regional mais ampla. Na prática, o acordo permitiria reduzir risco imediato no Estreito de Ormuz, liberar margem logística para outras frentes e diminuir exposição de bases americanas a ataques por drones e mísseis. Ainda assim, qualquer hesitação política pode ser explorada por adversários como sinal de divisão estratégica.",
      summaryEn:
        "In the May 30 bulletin, the United States appears at the center of ceasefire negotiations with Iran, but with a pending political decision. The military reading is that Washington is trying to convert accumulated operational pressure into diplomatic gain, preserving naval coercion capacity while avoiding broader regional escalation. In practice, the deal could reduce immediate risk in the Strait of Hormuz, free logistical bandwidth for other fronts, and reduce exposure of U.S. bases to drone and missile attacks. However, political hesitation may be exploited by adversaries as a sign of strategic division.",
      implicationsPt: [
        "A negociação pode reduzir pressão sobre forças navais e bases americanas no Golfo.",
        "A manutenção de prontidão militar continua necessária até que o cessar-fogo seja verificável.",
        "A decisão política afeta credibilidade de dissuasão, percepção de aliados e cálculo iraniano.",
      ],
      implicationsEn: [
        "Negotiations may reduce pressure on U.S. naval forces and Gulf bases.",
        "Military readiness remains necessary until the ceasefire is verifiable.",
        "The political decision affects deterrence credibility, allied perception, and Iranian calculations.",
      ],
    },

    Iran: {
      titlePt: "Irã",
      titleEn: "Iran",
      summaryPt:
        "No boletim de 30 de maio, o Irã combina negociação de cessar-fogo, exigências sobre o Estreito de Ormuz, ativos congelados e demonstração de força regional. Sob a ótica militar, Teerã busca negociar sem parecer operacionalmente pressionado, usando sinalização balística e controle de chokepoints marítimos para reforçar poder de barganha. A implicação prática é que o Irã tenta preservar liberdade de ação, capacidade de dissuasão e influência sobre fluxos energéticos, enquanto testa a tolerância americana e regional. O risco é que uma demonstração de força mal calibrada produza escalada não intencional.",
      summaryEn:
        "In the May 30 bulletin, Iran combines ceasefire negotiations, demands over the Strait of Hormuz, frozen assets, and regional show-of-force behavior. From a military perspective, Tehran seeks to negotiate without appearing operationally pressured, using ballistic signaling and control over maritime chokepoints to reinforce bargaining power. The practical implication is that Iran is trying to preserve freedom of action, deterrence capacity, and influence over energy flows while testing American and regional tolerance. The risk is that a poorly calibrated show of force could trigger unintended escalation.",
      implicationsPt: [
        "O Estreito de Ormuz permanece como principal alavanca operacional e econômica iraniana.",
        "Sinalização com mísseis busca reforçar dissuasão, mas aumenta risco de erro de cálculo.",
        "A frota, bases e aliados regionais dos EUA seguem expostos a ameaças assimétricas.",
      ],
      implicationsEn: [
        "The Strait of Hormuz remains Iran's main operational and economic lever.",
        "Missile signaling seeks to reinforce deterrence but increases miscalculation risk.",
        "U.S. naval assets, bases, and regional allies remain exposed to asymmetric threats.",
      ],
    },

    Kuwait: {
      titlePt: "Kuwait",
      titleEn: "Kuwait",
      summaryPt:
        "No boletim de 30 de maio, o Kuwait aparece como alvo de um míssil balístico iraniano interceptado, o que o coloca como ponto sensível da escalada regional. Militarmente, o episódio demonstra que países do Golfo podem ser usados como alvos de sinalização ou pressão indireta, mesmo quando não são o centro político do conflito. A implicação prática é a necessidade de reforçar defesa antiaérea, integração de alerta regional e proteção de instalações energéticas, portos, bases e centros urbanos. O caso também eleva a importância de interoperabilidade com sistemas americanos e aliados.",
      summaryEn:
        "In the May 30 bulletin, Kuwait appears as the target of an intercepted Iranian ballistic missile, making it a sensitive point in regional escalation. Militarily, the episode shows that Gulf states can be used as targets for signaling or indirect pressure even when they are not the political center of the conflict. The practical implication is the need to reinforce air defense, regional early-warning integration, and protection of energy facilities, ports, bases, and urban centers. The case also increases the importance of interoperability with U.S. and allied systems.",
      implicationsPt: [
        "Defesa antimíssil e alerta antecipado tornam-se prioridades imediatas.",
        "Infraestrutura energética e portuária precisa de proteção reforçada.",
        "O Kuwait pode ganhar papel maior na arquitetura regional de defesa integrada.",
      ],
      implicationsEn: [
        "Missile defense and early warning become immediate priorities.",
        "Energy and port infrastructure require reinforced protection.",
        "Kuwait may gain a larger role in the regional integrated-defense architecture.",
      ],
    },

    Lebanon: {
      titlePt: "Líbano",
      titleEn: "Lebanon",
      summaryPt:
        "No boletim de 30 de maio, o Líbano é descrito como teatro de intensificação israelense, com ataques em Beirute, Tiro e áreas próximas ao Castelo de Beaufort, além da tentativa de criação de zona de amortecimento. Sob a ótica militar, Israel busca degradar infraestrutura, profundidade defensiva e liberdade de manobra do Hezbollah, mas opera em ambiente urbano e historicamente sensível. A implicação prática é o risco de elevado custo civil, deslocamento populacional e ampliação da resistência local. Operacionalmente, a criação de uma faixa de segurança exige presença persistente, engenharia, vigilância e proteção contra emboscadas, drones e foguetes.",
      summaryEn:
        "In the May 30 bulletin, Lebanon is described as a theater of intensified Israeli activity, with strikes in Beirut, Tyre, and areas near Beaufort Castle, alongside efforts to establish a buffer zone. From a military perspective, Israel seeks to degrade Hezbollah infrastructure, defensive depth, and freedom of maneuver, but operates in an urban and historically sensitive environment. The practical implication is the risk of high civilian cost, population displacement, and expanded local resistance. Operationally, creating a security belt requires persistent presence, engineering, surveillance, and protection against ambushes, drones, and rockets.",
      implicationsPt: [
        "A zona de amortecimento exige controle territorial contínuo e alto consumo de recursos.",
        "Ambiente urbano aumenta risco de baixas civis e desgaste político.",
        "Hezbollah pode responder com drones, foguetes, minas, emboscadas e guerra de atrito.",
      ],
      implicationsEn: [
        "The buffer zone requires continuous territorial control and high resource consumption.",
        "Urban terrain increases civilian-casualty risk and political attrition.",
        "Hezbollah may respond with drones, rockets, mines, ambushes, and attrition warfare.",
      ],
    },

    Israel: {
      titlePt: "Israel",
      titleEn: "Israel",
      summaryPt:
        "No boletim de 30 de maio, Israel aparece conduzindo operações simultâneas no Líbano e em Gaza, incluindo a confirmação da morte de Mohammed Odeh. Militarmente, o país tenta preservar iniciativa operacional por meio de ataques aéreos, eliminação de lideranças e criação de zona de segurança no norte. A implicação prática é uma pressão crescente sobre comando, inteligência, defesa antidrone e logística israelense, pois múltiplas frentes exigem alocação constante de meios. Embora a eliminação de lideranças tenha valor tático, ela não elimina redes, arsenais e capacidade adaptativa de grupos armados.",
      summaryEn:
        "In the May 30 bulletin, Israel appears to be conducting simultaneous operations in Lebanon and Gaza, including confirmation of Mohammed Odeh's death. Militarily, Israel seeks to preserve operational initiative through airstrikes, leadership targeting, and the creation of a northern security zone. The practical implication is growing pressure on Israeli command, intelligence, counter-drone defense, and logistics, as multiple fronts require constant allocation of assets. Although leadership removal has tactical value, it does not eliminate networks, arsenals, or the adaptive capacity of armed groups.",
      implicationsPt: [
        "Operações em múltiplas frentes aumentam pressão sobre reservas, inteligência e defesa aérea.",
        "A eliminação de lideranças produz efeito tático, mas pode gerar substituição rápida em redes armadas.",
        "A criação de zona de segurança exige presença, vigilância e capacidade de reação permanente.",
      ],
      implicationsEn: [
        "Multi-front operations increase pressure on reserves, intelligence, and air defense.",
        "Leadership targeting has tactical effect but may be followed by rapid replacement within armed networks.",
        "A security zone requires permanent presence, surveillance, and reaction capability.",
      ],
    },

    Ukraine: {
      titlePt: "Ucrânia",
      titleEn: "Ukraine",
      summaryPt:
        "No boletim de 30 de maio, a Ucrânia aparece tentando romper parcialmente a guerra estática por meio de incursões táticas e campanhas de drones, ao mesmo tempo em que solicita urgência no fornecimento de sistemas Patriot. A leitura militar indica tentativa de recuperar iniciativa local, impor custos à Rússia e reduzir a liberdade de manobra inimiga em profundidade. A implicação prática é que drones e ataques táticos podem compensar limitações de massa, mas dependem de inteligência, coordenação e reposição constante. A falta de defesa antiaérea suficiente, especialmente contra mísseis balísticos e hipersônicos, permanece vulnerabilidade crítica.",
      summaryEn:
        "In the May 30 bulletin, Ukraine appears to be partially breaking static warfare through tactical incursions and drone campaigns while urgently requesting Patriot systems. The military reading indicates an attempt to regain local initiative, impose costs on Russia, and reduce enemy freedom of maneuver in depth. The practical implication is that drones and tactical raids can compensate for limitations in mass, but depend on intelligence, coordination, and constant replenishment. Insufficient air defense, especially against ballistic and hypersonic missiles, remains a critical vulnerability.",
      implicationsPt: [
        "Drones permitem atacar profundidade e logística russa com menor custo relativo.",
        "Incursões táticas exigem inteligência precisa, mobilidade e rápida extração.",
        "Sistemas Patriot são essenciais para proteger centros críticos contra vetores balísticos.",
      ],
      implicationsEn: [
        "Drones allow attacks against Russian depth and logistics at relatively lower cost.",
        "Tactical incursions require precise intelligence, mobility, and rapid extraction.",
        "Patriot systems are essential to protect critical centers against ballistic threats.",
      ],
    },

    Russia: {
      titlePt: "Rússia",
      titleEn: "Russia",
      summaryPt:
        "No boletim de 30 de maio, a Rússia é associada ao emprego do míssil hipersônico Oreshnik, reforçando sua tentativa de pressionar a Ucrânia por meio de vetores difíceis de interceptar. Sob a ótica militar, o uso desse tipo de armamento tem valor operacional e psicológico: ameaça infraestrutura crítica, testa a defesa aérea ucraniana e envia sinal estratégico à OTAN. A implicação prática é que Moscou busca compensar limitações no campo de batalha com ataques de alta velocidade e difícil defesa, mantendo pressão sobre tomada de decisão ucraniana e ocidental.",
      summaryEn:
        "In the May 30 bulletin, Russia is associated with the use of the Oreshnik hypersonic missile, reinforcing its attempt to pressure Ukraine through hard-to-intercept vectors. From a military perspective, this type of weapon has both operational and psychological value: it threatens critical infrastructure, tests Ukrainian air defense, and sends a strategic signal to NATO. The practical implication is that Moscow seeks to compensate for battlefield limitations with high-speed, difficult-to-defend attacks, maintaining pressure on Ukrainian and Western decision-making.",
      implicationsPt: [
        "Mísseis hipersônicos elevam a complexidade da defesa aérea ucraniana.",
        "O emprego do Oreshnik tem função militar, psicológica e estratégica.",
        "A ameaça pressiona aliados a acelerar fornecimento de sensores, interceptadores e defesa multicamada.",
      ],
      implicationsEn: [
        "Hypersonic missiles increase the complexity of Ukrainian air defense.",
        "Oreshnik use has military, psychological, and strategic functions.",
        "The threat pressures allies to accelerate sensors, interceptors, and layered defense supplies.",
      ],
    },

    Armenia: {
      titlePt: "Armênia",
      titleEn: "Armenia",
      summaryPt:
        "No boletim de 30 de maio, a Armênia aparece como foco de disputa geopolítica no Cáucaso, em meio à competição entre Rússia, Estados Unidos e aproximação com o Ocidente. Embora não seja descrita como teatro de combate direto, sua posição tem implicações militares relevantes: corredores terrestres, influência russa, vulnerabilidade regional e equilíbrio entre segurança nacional e alinhamento externo. A implicação prática é que uma mudança de orientação estratégica armênia pode alterar rotas logísticas, presença militar russa, postura de dissuasão regional e cálculo de risco no Cáucaso.",
      summaryEn:
        "In the May 30 bulletin, Armenia appears as a geopolitical focal point in the Caucasus amid competition involving Russia, the United States, and closer ties with the West. Although not described as a direct combat theater, its position has relevant military implications: land corridors, Russian influence, regional vulnerability, and the balance between national security and external alignment. The practical implication is that a shift in Armenia's strategic orientation may alter logistics routes, Russian military presence, regional deterrence posture, and risk calculations in the Caucasus.",
      implicationsPt: [
        "Mudança de alinhamento pode afetar presença militar russa e arquitetura de segurança regional.",
        "Corredores terrestres no Cáucaso têm importância logística e estratégica.",
        "A Armênia pode se tornar ponto de pressão indireta entre Rússia e Ocidente.",
      ],
      implicationsEn: [
        "A shift in alignment may affect Russian military presence and the regional security architecture.",
        "Land corridors in the Caucasus have logistical and strategic importance.",
        "Armenia may become a point of indirect pressure between Russia and the West.",
      ],
    },

    Sudan: {
      titlePt: "Sudão",
      titleEn: "Sudan",
      summaryPt:
        "No boletim de 30 de maio, o Sudão aparece como conflito prolongado de alto custo humanitário e relevância estratégica. Militarmente, guerras prolongadas desse tipo tendem a fragmentar comando, degradar infraestrutura, multiplicar milícias e criar economias de guerra. A implicação prática é a dificuldade de estabilização por meios puramente militares: controle territorial, proteção de civis, corredores humanitários e negociação local tornam-se tão importantes quanto superioridade de fogo. O prolongamento do conflito também cria oportunidade para interferência externa, tráfico de armas e expansão de redes armadas.",
      summaryEn:
        "In the May 30 bulletin, Sudan appears as a prolonged conflict with high humanitarian cost and strategic relevance. Militarily, wars of this type tend to fragment command structures, degrade infrastructure, multiply militias, and create war economies. The practical implication is the difficulty of stabilization through purely military means: territorial control, civilian protection, humanitarian corridors, and local negotiation become as important as firepower. Prolonged conflict also creates opportunities for external interference, arms trafficking, and expansion of armed networks.",
      implicationsPt: [
        "Conflito prolongado reduz eficácia de soluções exclusivamente militares.",
        "Proteção de civis e corredores humanitários tornam-se prioridades operacionais.",
        "Fragmentação de forças amplia risco de milícias autônomas e economia de guerra.",
      ],
      implicationsEn: [
        "Prolonged conflict reduces the effectiveness of purely military solutions.",
        "Civilian protection and humanitarian corridors become operational priorities.",
        "Force fragmentation increases the risk of autonomous militias and war economies.",
      ],
    },

    Yemen: {
      titlePt: "Iêmen",
      titleEn: "Yemen",
      summaryPt:
        "No boletim de 30 de maio, o Iêmen é associado aos ataques no Mar Vermelho e ao impacto sobre rotas marítimas. Sob a ótica militar, o país funciona como plataforma geográfica para pressão assimétrica sobre comércio global, energia e linhas marítimas de comunicação. Mesmo atores com recursos limitados podem gerar efeitos estratégicos se conseguirem ameaçar navios, portos ou corredores críticos. A implicação prática é que marinhas regionais e ocidentais precisam manter escolta, vigilância, defesa antimíssil, guerra eletrônica e resposta contra drones em uma área de alto valor econômico e militar.",
      summaryEn:
        "In the May 30 bulletin, Yemen is linked to Red Sea attacks and their impact on maritime routes. From a military perspective, the country functions as a geographic platform for asymmetric pressure against global trade, energy, and sea lines of communication. Even actors with limited resources can generate strategic effects if they can threaten ships, ports, or critical corridors. The practical implication is that regional and Western navies must maintain escort, surveillance, missile defense, electronic warfare, and counter-drone response in an area of high economic and military value.",
      implicationsPt: [
        "Rotas marítimas tornam-se vulneráveis a drones, mísseis, minas e ataques assimétricos.",
        "A proteção do tráfego exige escolta naval, inteligência marítima e defesa multicamada.",
        "A instabilidade no Mar Vermelho afeta logística militar, comércio global e segurança energética.",
      ],
      implicationsEn: [
        "Maritime routes become vulnerable to drones, missiles, mines, and asymmetric attacks.",
        "Traffic protection requires naval escort, maritime intelligence, and layered defense.",
        "Red Sea instability affects military logistics, global trade, and energy security.",
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
            ? "Países com notícias cadastradas aparecem destacados em verde. Ao clicar, o leitor vê um resumo operacional por país, ajustado ao dia do boletim."
            : "Countries with registered news are highlighted in green. Clicking one shows a country-level operational summary adjusted to the bulletin date."}
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

              <p className="country-news-summary">
                {lang === "pt" ? selectedNews.summaryPt : selectedNews.summaryEn}
              </p>

              <strong className="country-news-section-title">
                {lang === "pt"
                  ? "Implicações práticas e operacionais"
                  : "Practical and operational implications"}
              </strong>

              <ul className="country-news-list">
                {(lang === "pt"
                  ? selectedNews.implicationsPt
                  : selectedNews.implicationsEn
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
