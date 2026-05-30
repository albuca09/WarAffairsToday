import { useEffect, useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature as topojsonFeature } from "topojson-client";
import worldAtlas from "world-atlas/countries-110m.json";

const MAP_WIDTH = 1600;
const MAP_HEIGHT = 780;

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
        "Os Estados Unidos combinam negociação diplomática com pressão naval para estabilizar temporariamente a crise com o Irã sem abrir mão da capacidade de coerção militar. A presença marítima, o controle de acessos portuários e a proteção de rotas energéticas funcionam como instrumentos de dissuasão operacional. Sob a ótica militar, Washington procura manter liberdade de manobra no Golfo, reduzir riscos ao tráfego marítimo e preservar capacidade de resposta rápida contra drones, mísseis e ameaças assimétricas. A implicação prática é uma postura de pressão contínua sobre Teerã, com impacto direto sobre logística naval, segurança energética, proteção de bases regionais e cálculo estratégico de aliados.",
      summaryEn:
        "The United States combines diplomacy with naval pressure to temporarily stabilize the crisis with Iran without giving up military coercion capacity. Maritime presence, port-access control, and protection of energy routes operate as tools of operational deterrence. Militarily, Washington seeks to preserve freedom of maneuver in the Gulf, reduce risks to maritime traffic, and maintain rapid-response capability against drones, missiles, and asymmetric threats. The practical implication is sustained pressure on Tehran, directly affecting naval logistics, energy security, regional base protection, and allied strategic calculations.",
      implicationsPt: [
        "Pressão naval funciona como dissuasão sem emprego imediato de força terrestre.",
        "A postura americana condiciona o comportamento iraniano no Estreito de Ormuz.",
        "Bases, navios e cadeias logísticas exigem defesa antidrone, alerta antecipado e vigilância marítima persistente.",
      ],
      implicationsEn: [
        "Naval pressure works as deterrence without immediate ground-force employment.",
        "The U.S. posture shapes Iranian behavior in the Strait of Hormuz.",
        "Bases, ships, and logistics chains require counter-drone defense, early warning, and persistent maritime surveillance.",
      ],
    },

    Iran: {
      titlePt: "Irã",
      titleEn: "Iran",
      summaryPt:
        "O Irã utiliza sua posição geográfica no Golfo e a relevância do Estreito de Ormuz como alavanca estratégica. A possível reabertura do estreito sem cobrança de pedágios mostra que Teerã trata rotas marítimas, energia e liberdade de navegação como elementos centrais de barganha. Militarmente, o país compensa a superioridade naval americana por meio de ameaça assimétrica, drones, mísseis costeiros, pressão sobre navios e capacidade de gerar incerteza operacional. A implicação prática é que qualquer alteração no controle do estreito afeta logística global, preços de energia e liberdade de manobra das forças ocidentais.",
      summaryEn:
        "Iran uses its geographic position in the Gulf and the importance of the Strait of Hormuz as strategic leverage. The possible reopening of the strait without tolls shows Tehran treating maritime routes, energy flows, and freedom of navigation as central bargaining instruments. Militarily, Iran offsets U.S. naval superiority through asymmetric threats, drones, coastal missiles, pressure on shipping, and operational uncertainty. The practical implication is that any change in control over the strait affects global logistics, energy prices, and Western freedom of maneuver.",
      implicationsPt: [
        "O Estreito de Ormuz funciona como ponto de estrangulamento logístico e instrumento de pressão estratégica.",
        "Drones, mísseis costeiros e guerra assimétrica elevam o custo de qualquer operação naval adversária.",
        "A ameaça a rotas marítimas amplia a influência iraniana mesmo diante de forças convencionais superiores.",
      ],
      implicationsEn: [
        "The Strait of Hormuz functions as a logistical chokepoint and strategic pressure tool.",
        "Drones, coastal missiles, and asymmetric warfare raise the cost of any opposing naval operation.",
        "Threats to maritime routes increase Iranian influence despite superior conventional forces.",
      ],
    },

    Ukraine: {
      titlePt: "Ucrânia",
      titleEn: "Ukraine",
      summaryPt:
        "A Ucrânia enfrenta forte pressão aérea russa com ataques combinados de drones, mísseis de cruzeiro e mísseis balísticos contra Kiev e infraestrutura crítica. A defesa aérea ucraniana demonstra capacidade relevante contra drones e mísseis de cruzeiro, mas permanece vulnerável diante de vetores balísticos. A leitura militar aponta para uma disputa de atrito tecnológico: Moscou tenta saturar radares e interceptadores, enquanto Kiev depende de sensores integrados, defesa multicamada e reposição constante de munições defensivas. A implicação prática é a necessidade de dispersar infraestrutura, reforçar defesa antiaérea e proteger centros de comando.",
      summaryEn:
        "Ukraine faces intense Russian aerial pressure through combined drone, cruise-missile, and ballistic-missile attacks against Kyiv and critical infrastructure. Ukrainian air defense shows relevant capability against drones and cruise missiles, but remains vulnerable to ballistic vectors. The military reading points to technological attrition: Moscow seeks to saturate radars and interceptors, while Kyiv depends on integrated sensors, layered defense, and constant replenishment of defensive ammunition. The practical implication is the need to disperse infrastructure, reinforce air defense, and protect command centers.",
      implicationsPt: [
        "Ataques de saturação buscam esgotar interceptadores e revelar lacunas defensivas.",
        "A proteção de centros urbanos depende de radares, sensores, comunicações e defesa antiaérea multicamada.",
        "Estoques de interceptadores tornam-se fator decisivo para resiliência operacional.",
      ],
      implicationsEn: [
        "Saturation attacks seek to exhaust interceptors and expose defensive gaps.",
        "Urban protection depends on radars, sensors, communications, and layered air defense.",
        "Interceptor stocks become decisive for operational resilience.",
      ],
    },

    Russia: {
      titlePt: "Rússia",
      titleEn: "Russia",
      summaryPt:
        "A Rússia emprega uma ofensiva aérea de grande escala contra a Ucrânia, combinando drones, mísseis de cruzeiro e mísseis balísticos. A lógica militar é sobrecarregar radares, interceptadores, centros de comando e estoques defensivos ucranianos. Além de causar danos físicos, os ataques permitem observar padrões de resposta, tempos de reação e vulnerabilidades da defesa aérea adversária. A implicação prática é a manutenção de pressão contínua sobre infraestrutura civil e militar, buscando degradar a capacidade de sustentação ucraniana e testar os limites da assistência militar ocidental.",
      summaryEn:
        "Russia employs a large-scale aerial offensive against Ukraine, combining drones, cruise missiles, and ballistic missiles. The military logic is to overload Ukrainian radars, interceptors, command centers, and defensive stocks. Beyond physical damage, the attacks allow observation of response patterns, reaction times, and vulnerabilities in the opposing air-defense system. The practical implication is continued pressure on civilian and military infrastructure, seeking to degrade Ukrainian sustainment capacity and test the limits of Western military assistance.",
      implicationsPt: [
        "Ataques combinados aumentam a complexidade da defesa ucraniana.",
        "Diferentes vetores permitem mapear respostas defensivas e lacunas operacionais.",
        "A pressão aérea contínua busca degradar infraestrutura, moral e sustentação logística.",
      ],
      implicationsEn: [
        "Combined attacks increase the complexity of Ukrainian defense.",
        "Different vectors help map defensive responses and operational gaps.",
        "Continuous aerial pressure seeks to degrade infrastructure, morale, and logistical sustainment.",
      ],
    },

    Lebanon: {
      titlePt: "Líbano",
      titleEn: "Lebanon",
      summaryPt:
        "O Líbano permanece como zona de fricção militar entre Israel e Hezbollah. A continuidade de combates e bombardeios, mesmo após arranjos formais de cessar-fogo, indica baixa efetividade dos mecanismos de contenção. Operacionalmente, o território libanês funciona como área de contato, dispersão, ocultação e lançamento para forças não estatais. Isso dificulta inteligência, seleção de alvos e separação entre infraestrutura civil e militar. A implicação prática é risco permanente de escalada regional, especialmente se ataques com drones, foguetes ou bombardeios produzirem altas baixas civis.",
      summaryEn:
        "Lebanon remains a military friction zone between Israel and Hezbollah. Continued fighting and airstrikes despite formal ceasefire arrangements indicate weak containment mechanisms. Operationally, Lebanese territory functions as a contact, dispersion, concealment, and launch area for non-state forces. This complicates intelligence, targeting, and separation between civilian and military infrastructure. The practical implication is persistent regional-escalation risk, especially if drones, rockets, or airstrikes produce significant civilian casualties.",
      implicationsPt: [
        "Terreno urbano e presença de atores não estatais dificultam inteligência e controle de danos civis.",
        "O Hezbollah pode explorar dispersão, mobilidade e ocultação para manter pressão sobre a fronteira.",
        "A escalada no Líbano pode forçar redistribuição israelense de meios terrestres, aéreos e antidrone.",
      ],
      implicationsEn: [
        "Urban terrain and non-state actors complicate intelligence and civilian-harm mitigation.",
        "Hezbollah can exploit dispersion, mobility, and concealment to maintain border pressure.",
        "Escalation in Lebanon may force Israel to redistribute ground, air, and counter-drone assets.",
      ],
    },

    Israel: {
      titlePt: "Israel",
      titleEn: "Israel",
      summaryPt:
        "Israel atua sob pressão simultânea de defesa territorial e operações ofensivas associadas à ameaça do Hezbollah. O desafio militar é preservar superioridade aérea, realizar ataques precisos e proteger a fronteira norte contra drones, foguetes e infiltrações. A necessidade de evitar uma campanha prolongada de atrito exige equilíbrio entre ação ofensiva e defesa de comunidades fronteiriças. A implicação prática é maior demanda por inteligência em tempo real, defesa antidrone, alerta antecipado e coordenação entre forças terrestres, meios aéreos e sistemas de vigilância.",
      summaryEn:
        "Israel operates under simultaneous pressure from territorial defense and offensive operations linked to the Hezbollah threat. The military challenge is to preserve air superiority, conduct precision strikes, and protect the northern border against drones, rockets, and infiltrations. Avoiding a prolonged war of attrition requires balancing offensive action with defense of border communities. The practical implication is increased demand for real-time intelligence, counter-drone defense, early warning, and coordination between ground forces, air assets, and surveillance systems.",
      implicationsPt: [
        "A fronteira norte exige vigilância persistente e resposta rápida contra drones e foguetes.",
        "Ataques aéreos precisam ser calibrados para reduzir risco de escalada regional.",
        "A defesa de comunidades fronteiriças compete por recursos com outras frentes.",
      ],
      implicationsEn: [
        "The northern border requires persistent surveillance and rapid response against drones and rockets.",
        "Airstrikes must be calibrated to reduce regional escalation risk.",
        "Defense of border communities competes for resources with other fronts.",
      ],
    },

    Pakistan: {
      titlePt: "Paquistão",
      titleEn: "Pakistan",
      summaryPt:
        "O Paquistão enfrenta ameaça insurgente persistente associada a ataques atribuídos ao Exército de Libertação do Balochistão. A leitura militar indica exploração de áreas periféricas, rotas logísticas e vulnerabilidades de segurança interna. A resposta operacional precisa combinar inteligência humana, vigilância territorial, proteção de infraestrutura crítica e ações de contraterrorismo. A implicação prática é que corredores econômicos, instalações energéticas, bases e alvos simbólicos podem exigir proteção reforçada, enquanto operações mal calibradas podem gerar efeitos políticos adversos e ampliar recrutamento insurgente.",
      summaryEn:
        "Pakistan faces a persistent insurgent threat linked to attacks attributed to the Balochistan Liberation Army. The military reading indicates exploitation of peripheral areas, logistics routes, and internal-security vulnerabilities. The operational response must combine human intelligence, territorial surveillance, critical-infrastructure protection, and counterterrorism actions. The practical implication is that economic corridors, energy facilities, bases, and symbolic targets may require reinforced protection, while poorly calibrated operations may generate political backlash and expand insurgent recruitment.",
      implicationsPt: [
        "A ameaça insurgente exige inteligência local e resposta rápida em áreas periféricas.",
        "Infraestruturas energéticas, corredores logísticos e instalações militares tornam-se alvos prioritários.",
        "Operações excessivamente pesadas podem gerar efeitos políticos adversos.",
      ],
      implicationsEn: [
        "The insurgent threat requires local intelligence and rapid response in peripheral areas.",
        "Energy infrastructure, logistics corridors, and military facilities become priority targets.",
        "Overly heavy operations may generate political backlash.",
      ],
    },

    Mali: {
      titlePt: "Mali",
      titleEn: "Mali",
      summaryPt:
        "O Mali representa instabilidade persistente no Sahel, com ataques atribuídos ao JNIM. O cenário é típico de conflito assimétrico em ambiente de baixa governança, onde grupos armados exploram mobilidade, conhecimento do terreno e fragilidade institucional. A resposta militar baseada apenas em presença estática tende a ser insuficiente contra redes insurgentes dispersas. A implicação prática é priorizar inteligência, mobilidade tática, controle de rotas, proteção de comunidades vulneráveis e integração entre operações militares, estabilização política e proteção civil.",
      summaryEn:
        "Mali represents persistent instability in the Sahel, with attacks attributed to JNIM. The scenario reflects asymmetric conflict in a low-governance environment, where armed groups exploit mobility, terrain familiarity, and institutional weakness. A military response based only on static presence tends to be insufficient against dispersed insurgent networks. The practical implication is to prioritize intelligence, tactical mobility, route control, protection of vulnerable communities, and integration between military operations, political stabilization, and civilian protection.",
      implicationsPt: [
        "Controle de rotas e mobilidade tática são mais importantes que presença estática.",
        "A insurgência explora vazios de governança e fragilidade de forças locais.",
        "Resposta militar precisa ser combinada com estabilização política e proteção civil.",
      ],
      implicationsEn: [
        "Route control and tactical mobility are more important than static presence.",
        "Insurgency exploits governance gaps and weak local forces.",
        "Military response must be combined with political stabilization and civilian protection.",
      ],
    },
  },

  "2026-05-30": {
    "United States of America": {
      titlePt: "Estados Unidos",
      titleEn: "United States",
      summaryPt:
        "Os Estados Unidos tentam converter pressão operacional acumulada contra o Irã em ganho diplomático, preservando capacidade de coerção naval e evitando uma escalada regional mais ampla. A negociação de cessar-fogo pode reduzir o risco imediato no Estreito de Ormuz, liberar margem logística para outras frentes e diminuir exposição de bases americanas a ataques por drones e mísseis. Militarmente, a prontidão precisa continuar até que qualquer acordo seja verificável. A implicação prática é que hesitação política pode afetar credibilidade de dissuasão, percepção de aliados e cálculo estratégico iraniano.",
      summaryEn:
        "The United States seeks to convert accumulated operational pressure against Iran into diplomatic gain, while preserving naval coercion capacity and avoiding broader regional escalation. Ceasefire negotiations may reduce immediate risk in the Strait of Hormuz, free logistical bandwidth for other fronts, and reduce exposure of U.S. bases to drone and missile attacks. Militarily, readiness must continue until any agreement is verifiable. The practical implication is that political hesitation may affect deterrence credibility, allied perception, and Iranian strategic calculations.",
      implicationsPt: [
        "A negociação pode reduzir pressão sobre forças navais e bases americanas no Golfo.",
        "Prontidão militar continua necessária até que o cessar-fogo seja verificável.",
        "A decisão política afeta credibilidade de dissuasão e percepção de aliados.",
      ],
      implicationsEn: [
        "Negotiations may reduce pressure on U.S. naval forces and Gulf bases.",
        "Military readiness remains necessary until the ceasefire is verifiable.",
        "The political decision affects deterrence credibility and allied perception.",
      ],
    },

    Iran: {
      titlePt: "Irã",
      titleEn: "Iran",
      summaryPt:
        "O Irã combina negociação, exigências sobre o Estreito de Ormuz, ativos congelados e demonstração de força regional. Teerã busca negociar sem parecer pressionado militarmente, usando sinalização balística e controle de chokepoints marítimos para ampliar poder de barganha. Sob a ótica militar, o objetivo é preservar liberdade de ação, dissuasão e influência sobre fluxos energéticos. A implicação prática é que uma demonstração de força mal calibrada pode gerar escalada não intencional, especialmente em ambiente com bases americanas, aliados regionais e tráfego marítimo estratégico.",
      summaryEn:
        "Iran combines negotiations, demands over the Strait of Hormuz, frozen assets, and regional show-of-force behavior. Tehran seeks to negotiate without appearing militarily pressured, using ballistic signaling and control over maritime chokepoints to increase bargaining power. Militarily, the objective is to preserve freedom of action, deterrence, and influence over energy flows. The practical implication is that a poorly calibrated show of force may trigger unintended escalation, especially in an environment with U.S. bases, regional allies, and strategic maritime traffic.",
      implicationsPt: [
        "O Estreito de Ormuz permanece como principal alavanca operacional e econômica iraniana.",
        "Sinalização com mísseis reforça dissuasão, mas eleva risco de erro de cálculo.",
        "Forças navais, bases e aliados regionais dos EUA seguem expostos a ameaças assimétricas.",
      ],
      implicationsEn: [
        "The Strait of Hormuz remains Iran's main operational and economic lever.",
        "Missile signaling reinforces deterrence but increases miscalculation risk.",
        "U.S. naval forces, bases, and regional allies remain exposed to asymmetric threats.",
      ],
    },

    Kuwait: {
      titlePt: "Kuwait",
      titleEn: "Kuwait",
      summaryPt:
        "O Kuwait aparece como ponto sensível da escalada regional após ser citado como alvo de míssil balístico iraniano interceptado. Militarmente, o episódio demonstra que países do Golfo podem ser usados como alvos de sinalização, pressão indireta ou teste de defesa aérea. A implicação prática é reforçar defesa antimíssil, alerta antecipado, interoperabilidade com sistemas aliados e proteção de portos, bases, instalações energéticas e centros urbanos. O país ganha relevância na arquitetura regional de defesa integrada.",
      summaryEn:
        "Kuwait appears as a sensitive point in regional escalation after being cited as the target of an intercepted Iranian ballistic missile. Militarily, the episode shows that Gulf states can be used as targets for signaling, indirect pressure, or air-defense testing. The practical implication is to reinforce missile defense, early warning, interoperability with allied systems, and protection of ports, bases, energy facilities, and urban centers. The country gains relevance in the regional integrated-defense architecture.",
      implicationsPt: [
        "Defesa antimíssil e alerta antecipado tornam-se prioridades imediatas.",
        "Infraestrutura energética e portuária precisa de proteção reforçada.",
        "Interoperabilidade com sistemas americanos e aliados ganha importância operacional.",
      ],
      implicationsEn: [
        "Missile defense and early warning become immediate priorities.",
        "Energy and port infrastructure require reinforced protection.",
        "Interoperability with U.S. and allied systems gains operational importance.",
      ],
    },

    Lebanon: {
      titlePt: "Líbano",
      titleEn: "Lebanon",
      summaryPt:
        "O Líbano se torna teatro de intensificação militar israelense, com ataques em Beirute, Tiro e áreas próximas ao Castelo de Beaufort, além da tentativa de criação de zona de amortecimento. Israel busca degradar infraestrutura, profundidade defensiva e liberdade de manobra do Hezbollah, mas opera em ambiente urbano e politicamente sensível. A implicação prática é risco elevado de baixas civis, deslocamento populacional e ampliação da resistência local. Operacionalmente, uma faixa de segurança exige presença persistente, engenharia, vigilância e proteção contra drones, foguetes, minas e emboscadas.",
      summaryEn:
        "Lebanon becomes a theater of intensified Israeli military activity, with strikes in Beirut, Tyre, and areas near Beaufort Castle, along with efforts to create a buffer zone. Israel seeks to degrade Hezbollah infrastructure, defensive depth, and freedom of maneuver, but operates in an urban and politically sensitive environment. The practical implication is high risk of civilian casualties, population displacement, and expanded local resistance. Operationally, a security belt requires persistent presence, engineering, surveillance, and protection against drones, rockets, mines, and ambushes.",
      implicationsPt: [
        "Zona de amortecimento exige controle territorial contínuo e alto consumo de recursos.",
        "Ambiente urbano aumenta risco de baixas civis e desgaste político.",
        "Hezbollah pode responder com drones, foguetes, minas, emboscadas e guerra de atrito.",
      ],
      implicationsEn: [
        "A buffer zone requires continuous territorial control and high resource consumption.",
        "Urban terrain increases civilian-casualty risk and political attrition.",
        "Hezbollah may respond with drones, rockets, mines, ambushes, and attrition warfare.",
      ],
    },

    Israel: {
      titlePt: "Israel",
      titleEn: "Israel",
      summaryPt:
        "Israel conduz operações simultâneas no Líbano e em Gaza, combinando ataques aéreos, eliminação de lideranças e tentativa de criação de zona de segurança no norte. Militarmente, a prioridade é preservar iniciativa operacional e reduzir liberdade de ação de grupos armados. A implicação prática é aumento da pressão sobre comando, inteligência, reservas, defesa antidrone, defesa aérea e logística. Embora a eliminação de lideranças tenha valor tático, ela não elimina redes, arsenais e capacidade adaptativa de organizações armadas.",
      summaryEn:
        "Israel conducts simultaneous operations in Lebanon and Gaza, combining airstrikes, leadership targeting, and efforts to create a northern security zone. Militarily, the priority is to preserve operational initiative and reduce the freedom of action of armed groups. The practical implication is increased pressure on command, intelligence, reserves, counter-drone defense, air defense, and logistics. Although leadership targeting has tactical value, it does not eliminate networks, arsenals, or the adaptive capacity of armed organizations.",
      implicationsPt: [
        "Operações em múltiplas frentes aumentam pressão sobre reservas, inteligência e defesa aérea.",
        "Eliminação de lideranças produz efeito tático, mas pode gerar substituição rápida nas redes armadas.",
        "Zona de segurança exige presença, vigilância e capacidade de reação permanente.",
      ],
      implicationsEn: [
        "Multi-front operations increase pressure on reserves, intelligence, and air defense.",
        "Leadership targeting produces tactical effects but may be followed by rapid replacement within armed networks.",
        "A security zone requires permanent presence, surveillance, and reaction capability.",
      ],
    },

    Ukraine: {
      titlePt: "Ucrânia",
      titleEn: "Ukraine",
      summaryPt:
        "A Ucrânia tenta romper parcialmente a guerra estática por meio de incursões táticas e campanhas de drones, ao mesmo tempo em que solicita sistemas Patriot com urgência. A leitura militar indica tentativa de recuperar iniciativa local, impor custos à Rússia e reduzir liberdade de manobra inimiga em profundidade. Drones e ataques táticos compensam limitações de massa, mas exigem inteligência precisa, coordenação, reposição e capacidade de extração. A vulnerabilidade crítica permanece na defesa contra mísseis balísticos e hipersônicos.",
      summaryEn:
        "Ukraine seeks to partially break static warfare through tactical incursions and drone campaigns while urgently requesting Patriot systems. The military reading indicates an effort to regain local initiative, impose costs on Russia, and reduce enemy freedom of maneuver in depth. Drones and tactical attacks compensate for limitations in mass, but require precise intelligence, coordination, replenishment, and extraction capability. The critical vulnerability remains defense against ballistic and hypersonic missiles.",
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
        "A Rússia reforça a pressão sobre a Ucrânia por meio do emprego do míssil hipersônico Oreshnik, vetor difícil de interceptar e com forte valor operacional, psicológico e estratégico. O uso desse armamento ameaça infraestrutura crítica, testa a defesa aérea ucraniana e envia sinal à OTAN. A implicação prática é que Moscou busca compensar limitações no campo de batalha com ataques de alta velocidade, mantendo pressão sobre decisões ucranianas e ocidentais. A ameaça acelera a demanda por sensores, interceptadores e defesa multicamada.",
      summaryEn:
        "Russia reinforces pressure on Ukraine through the use of the Oreshnik hypersonic missile, a hard-to-intercept vector with strong operational, psychological, and strategic value. The use of this weapon threatens critical infrastructure, tests Ukrainian air defense, and sends a signal to NATO. The practical implication is that Moscow seeks to compensate for battlefield limitations with high-speed attacks, maintaining pressure on Ukrainian and Western decision-making. The threat accelerates demand for sensors, interceptors, and layered defense.",
      implicationsPt: [
        "Mísseis hipersônicos elevam a complexidade da defesa aérea ucraniana.",
        "O emprego do Oreshnik tem função militar, psicológica e estratégica.",
        "A ameaça pressiona aliados a acelerar fornecimento de sensores e interceptadores.",
      ],
      implicationsEn: [
        "Hypersonic missiles increase the complexity of Ukrainian air defense.",
        "Oreshnik use has military, psychological, and strategic functions.",
        "The threat pressures allies to accelerate the supply of sensors and interceptors.",
      ],
    },

    Armenia: {
      titlePt: "Armênia",
      titleEn: "Armenia",
      summaryPt:
        "A Armênia ocupa posição sensível na disputa geopolítica do Cáucaso, entre influência russa, aproximação com o Ocidente e competição estratégica regional. Embora não seja tratada como teatro de combate direto, sua posição afeta corredores terrestres, logística, presença militar russa e equilíbrio de dissuasão. A implicação prática é que uma mudança de alinhamento pode alterar rotas estratégicas, ampliar pressão indireta entre Rússia e Ocidente e modificar o cálculo de risco de atores regionais.",
      summaryEn:
        "Armenia occupies a sensitive position in the geopolitical competition over the Caucasus, between Russian influence, closer ties with the West, and regional strategic competition. Although not treated as a direct combat theater, its position affects land corridors, logistics, Russian military presence, and deterrence balance. The practical implication is that a shift in alignment may alter strategic routes, increase indirect pressure between Russia and the West, and change the risk calculations of regional actors.",
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
        "O Sudão representa um conflito prolongado com alto custo humanitário e relevância estratégica. Guerras desse tipo fragmentam comando, degradam infraestrutura, multiplicam milícias e criam economias de guerra. A estabilização por meios puramente militares torna-se limitada, pois controle territorial, proteção de civis, corredores humanitários e negociação local passam a ser tão importantes quanto superioridade de fogo. A implicação prática é aumento do risco de interferência externa, tráfico de armas, autonomia de grupos armados e persistência de instabilidade interna.",
      summaryEn:
        "Sudan represents a prolonged conflict with high humanitarian cost and strategic relevance. Wars of this type fragment command structures, degrade infrastructure, multiply militias, and create war economies. Stabilization through purely military means becomes limited, because territorial control, civilian protection, humanitarian corridors, and local negotiation become as important as firepower. The practical implication is increased risk of external interference, arms trafficking, armed-group autonomy, and persistent internal instability.",
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
        "O Iêmen funciona como plataforma geográfica para pressão assimétrica sobre o Mar Vermelho, comércio global, energia e linhas marítimas de comunicação. Atores com recursos limitados podem produzir efeitos estratégicos se ameaçarem navios, portos, corredores críticos ou fluxos energéticos. A implicação prática é que marinhas regionais e ocidentais precisam manter escolta, vigilância, defesa antimíssil, guerra eletrônica e resposta contra drones em área de alto valor econômico e militar. A instabilidade marítima afeta diretamente logística militar, comércio e segurança energética.",
      summaryEn:
        "Yemen functions as a geographic platform for asymmetric pressure over the Red Sea, global trade, energy, and sea lines of communication. Actors with limited resources can generate strategic effects if they threaten ships, ports, critical corridors, or energy flows. The practical implication is that regional and Western navies must maintain escort, surveillance, missile defense, electronic warfare, and counter-drone response in an area of high economic and military value. Maritime instability directly affects military logistics, trade, and energy security.",
      implicationsPt: [
        "Rotas marítimas tornam-se vulneráveis a drones, mísseis, minas e ataques assimétricos.",
        "Proteção do tráfego exige escolta naval, inteligência marítima e defesa multicamada.",
        "Instabilidade no Mar Vermelho afeta logística militar, comércio global e segurança energética.",
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
        [18, 18],
        [MAP_WIDTH - 18, MAP_HEIGHT - 18],
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
    <div
      className="world-map-panel"
      style={{
        margin: "0 0 32px",
        padding: "28px",
        borderRadius: "30px",
        background:
          "linear-gradient(135deg, rgba(15, 23, 42, 0.72), rgba(30, 41, 59, 0.54)), rgba(255, 255, 255, 0.06)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      <div
        className="map-copy"
        style={{
          maxWidth: "1100px",
          margin: "0 auto 24px",
          textAlign: "center",
        }}
      >
        <span className="tag">
          {lang === "pt" ? "Mapa Interativo" : "Interactive Map"}
        </span>

        <h3
          style={{
            margin: "10px 0 10px",
            fontSize: "clamp(1.7rem, 3vw, 2.4rem)",
            letterSpacing: "-0.04em",
          }}
        >
          {lang === "pt"
            ? "Clique em um país para ver as notícias"
            : "Click a country to view news"}
        </h3>

        <p
          style={{
            color: "#d7e2f2",
            lineHeight: 1.7,
            margin: 0,
            fontSize: "1.02rem",
          }}
        >
          {lang === "pt"
            ? "Países com notícias cadastradas aparecem destacados em verde. Ao clicar, o leitor vê uma análise operacional compacta e detalhada."
            : "Countries with registered news are highlighted in green. Clicking one shows a compact and detailed operational analysis."}
        </p>
      </div>

      <div
        className="map-layout"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "100%",
        }}
      >
        <div
          className="map-card"
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "26px",
            background: "rgba(2, 6, 23, 0.48)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
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
                  strokeWidth={0.85}
                  style={{
                    cursor: "pointer",
                    opacity: hasNews || isSelected ? 1 : 0.78,
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

          <div
            className="map-legend"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "22px",
              flexWrap: "wrap",
              marginTop: "14px",
              color: "#cbd5e1",
              fontSize: "0.95rem",
              fontWeight: 800,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
              }}
            >
              <i
                style={{
                  width: "11px",
                  height: "11px",
                  borderRadius: "999px",
                  display: "inline-block",
                  background: "#6ee7b7",
                }}
              />
              {lang === "pt" ? "Com notícia" : "With news"}
            </span>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
              }}
            >
              <i
                style={{
                  width: "11px",
                  height: "11px",
                  borderRadius: "999px",
                  display: "inline-block",
                  background: "#f87171",
                }}
              />
              {lang === "pt" ? "Selecionado" : "Selected"}
            </span>
          </div>
        </div>

        <section
          className="country-news-panel"
          style={{
            width: "100%",
            padding: "30px",
            borderRadius: "26px",
            background:
              "linear-gradient(180deg, rgba(248, 113, 113, 0.13), rgba(255, 255, 255, 0.05)), rgba(255, 255, 255, 0.07)",
            border: "1px solid rgba(248, 113, 113, 0.24)",
          }}
        >
          {!selectedCountry && (
            <div className="country-news-empty">
              <strong
                style={{
                  display: "block",
                  color: "#f8fafc",
                  fontSize: "1.15rem",
                  marginBottom: "10px",
                }}
              >
                {lang === "pt" ? "Nenhum país selecionado" : "No country selected"}
              </strong>

              <p
                style={{
                  color: "#d7e2f2",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {lang === "pt"
                  ? "Clique em um país destacado no mapa para abrir a análise correspondente."
                  : "Click a highlighted country on the map to open the corresponding analysis."}
              </p>
            </div>
          )}

          {selectedCountry && !selectedNews && (
            <div className="country-news-empty">
              <strong
                style={{
                  display: "block",
                  color: "#f8fafc",
                  fontSize: "1.15rem",
                  marginBottom: "10px",
                }}
              >
                {selectedCountry.name}
              </strong>

              <p
                style={{
                  color: "#d7e2f2",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {lang === "pt"
                  ? "Não há notícia cadastrada para este país neste boletim."
                  : "There is no registered news for this country in this bulletin."}
              </p>
            </div>
          )}

          {selectedNews && (
            <div>
              <span
                className="country-news-kicker"
                style={{
                  display: "inline-block",
                  marginBottom: "12px",
                  color: "#6ee7b7",
                  fontSize: "0.82rem",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {lang === "pt" ? "País selecionado" : "Selected country"}
              </span>

              <h3
                className="country-news-title"
                style={{
                  margin: "0 0 14px",
                  fontSize: "2rem",
                }}
              >
                {lang === "pt" ? selectedNews.titlePt : selectedNews.titleEn}
              </h3>

              <p
                className="country-news-summary"
                style={{
                  color: "#d7e2f2",
                  lineHeight: 1.82,
                  textAlign: "justify",
                  textJustify: "inter-word",
                  hyphens: "auto",
                  margin: "0 0 18px",
                  fontSize: "1.02rem",
                }}
              >
                {lang === "pt" ? selectedNews.summaryPt : selectedNews.summaryEn}
              </p>

              <strong
                className="country-news-section-title"
                style={{
                  display: "block",
                  margin: "18px 0 10px",
                  color: "#6ee7b7",
                  fontSize: "0.82rem",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {lang === "pt"
                  ? "Implicações práticas e operacionais"
                  : "Practical and operational implications"}
              </strong>

              <ul
                className="country-news-list"
                style={{
                  margin: "12px 0 0",
                  paddingLeft: "20px",
                }}
              >
                {(lang === "pt"
                  ? selectedNews.implicationsPt
                  : selectedNews.implicationsEn
                ).map((detail) => (
                  <li
                    key={detail}
                    style={{
                      color: "#d7e2f2",
                      lineHeight: 1.72,
                      marginBottom: "10px",
                      fontSize: "0.98rem",
                    }}
                  >
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default WorldConflictMap;