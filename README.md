<p align="center">
  <a href="https://github.com/eythan/PronoteBOT">
    <img src="https://urlr.me/WRzYT" alt="Logo" width="120" height="120">
  </a>
  <h3 align="center">PronoteBOT</h1>
</p>


## Introduction

PronoteBOT allows you to send absences and homework to different Discord channels via the [pronotepy](https://github.com/bain3/pronotepy) API. It is available to most schools in mainland France.

## Dependencies

 - [Node.js](https://nodejs.org/en)
 - [python (3.12.6)](https://www.python.org/downloads/release/python-3126/)

 > [!WARNING]
>Only python 3.12.6 works don't download a newer version

## Installation

Clone repository with [git](https://git-scm.com/downloads)

```bash
git clone https://github.com/eythan/PronoteBOT
```
Install Node.js dependencies

```bash
npm i
```

Install Python dependencies

```bash
pip install pronotepy
```

Complete config.json file

```bash
{
    "pronoteURL": "URL of the Pronote portal",
    "username": "Your ENT username",
    "password": "Your ENT password",
    "ent": "Name of your ENT see complete list below",
    "local": "Local setting",
    "homeworkImageURL": "URL for an image related to homework",
    "absenceImageURL": "URL for an image related to absences",
    "absenceChannel": "ID of absence channel.",
    "homeworkChannel": "ID of homework channel",
    "token": "Token discord"
}
```

Example

```bash
{
    "pronoteURL": "https://0310047h.index-education.net/pronote/eleve.html",
    "username": "t.dubois1",
    "password": "mdE365eyQK={C-6",
    "ent": "occitanie_toulouse_edu",
    "local": "fr-FR",
    "homeworkImageURL": "https://urlr.me/WRzYT",
    "absenceImageURL": "https://urlr.me/WRzYT",
    "absenceChannel": "1286403078169296977",
    "homeworkChannel": "1283497573302272040",
    "token": "SPt8W0_w2xFsg.u2yF1gXa7aZWmMPr93YsNPHv.t2g8gJiyZ597QAY9cnBP2"
}
```

Start the bot

```bash
node index.js
```

## CAS / ENT

**Académies :**

 - Académie d'**Orléans-Tours** (ENT : **ac_orleans_tours**)
 - Académie de **Poitiers** (ENT : **ac_poitiers**)
 - Académie de la **Réunion** (ENT : **ac_reunion**)
 - Académie de **Reims** (ENT : **ac_reims**)
 - Académie de **Rennes** (ENT : **ac_rennes**)
 - Académie de **Nice** et d'**Aix Marseille** (ENT : **atrium_sud**)
 - Académie de **Bordeaux** (ENT : **bordeaux**)
 - Académie de **Mayotte** (ENT : **ent_mayotte**)
 - Académie de **Normandie** (ENT : **l_normandie**)
 - Académie de **Guadeloupe** (ENT : **neoconnect_guadeloupe**)
 - Académie de **Montpellier** (ENT : **occitanie_montpellier**)
 - Académie de **Montpellier** (ENT : **occitanie_montpellier_educonnect**)
 - Académie de **Toulouse** (ENT : **occitanie_toulouse_edu**)
 - Académie de **Paris** (ENT : **paris_classe_numerique**)

**Autres :**

 - Alpes-Maritimes (**Nice**) (ENT : **cas_agora06**)
 - Seine-Maritime (**Normandie**) (ENT : **cas_arsene76_edu**)
 - Loire (**Lyon**) (ENT : **cas_cybercolleges42_edu**)
 - Seine-Saint-Denis (**Créteil**) (ENT : **cas_seinesaintdenis_edu**)
 - Bourgogne-Franche-Compté (**Dijon**) (ENT : **eclat_bfc**)
 - Haute-Garonne (**Toulouse**) (ENT : **ecollege_haute_garonne_edu**)
 - Bouches-du-Rhône (**Aix Marseille**) (ENT : **ent_94**)
 - Auvergne-Rhône-Alpes (**Lyon**) (ENT : **ent_auvergnerhonealpe**)
 - Creuse (**Limoges**) (ENT : **ent_creuse**)
 - Creuse (**Limoges**) (ENT : **ent_creuse_educonnect**)
 - Loire-Atlantique (**Nantes**) (ENT : **ent_elyco**)
 - Essonne (**Versailles**) (ENT : **ent_essonne**)
 - Hauts-de-France (**Lille** et **Amiens**) (ENT : **ent_hdf**)
 - Somme (**Amiens**) (ENT : **ent_somme**)
 - Var (**Nice**) (ENT : **ent_var**)
 - Seine-et-Marne (**Créteil**) (ENT : **ent77**)
 - Yvelines (**Versailles**) (ENT : **ent_ecollege78**)
 - Somme (**Amiens**) (ENT : **extranet_colleges_somme**)
 - Île-de-France (**Paris**, **Versailles** et **Créteil**) (ENT : **ile_de_france**)
 - Métropole Grand Lyon (**Lyon**) (ENT : **laclasse_educonnect**)
 - Métropole Grand Lyon (**Lyon**) (ENT : **laclasse_lyon**)
 - Nouvelle-Aquitaine (**Bordeaux**, **Limoges** et **Poitiers**) (ENT : **lyceeconnecte_aquitaine**)
 - Nouvelle-Aquitaine (**Bordeaux**, **Limoges** et **Poitiers**) (ENT : **lyceeconnecte_edu**)
 - Région Grand Est (**Strasbourg**, **Nancy-Metz** et **Reims**) (ENT : **monbureaunumerique**)
 - Val-de-Marne (**Créteil**) (ENT : **val_de_marne**)
 - Val-d'Oise (**Versailles**) (ENT : **val_doise**)
 - France (**France**) (ENT : **cas_kosmos**)