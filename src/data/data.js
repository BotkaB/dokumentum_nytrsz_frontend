const lista = [
    {
      users: {
        elnevezes: "Felhasználók",
        apik: {
          indexUrl: "api/users",
          showUrl: "api/users",
          storeUrl: "api/users",
          updateUrl: "api/users",
          destroyUrl: "api/users",
        },
        adatok: {
          elsodleges_kulcs: ["id"],
          id: {
            tipus: "text",
            modosithato: false,
            kotelezo: true,
            fejlec: "azon",
            lathato: true,
          },
          name: {
            tipus: "text",
            modosithato: true,
            kotelezo: true,
            alapertek: "",
            regex:
              "([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)s([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)s?([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)?",
            fejlec: "név",
            lathato: true,
          },
          email: {
            tipus: "email",
            modosithato: true,
            kotelezo: true,
            alapertek: "",
            regex: "[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}",
            fejlec: "e-mail",
            lathato: true,
          },
         
            role: {
              tipus: "text",
              modosithato: true,
              kotelezo: true,
              alapertek: "",
              regex: "[0-3]{1}",
              fejlec: "role",
              lathato: true,
            },
          email_verified_at: {
            tipus: "text",
            modosithato: false,
            kotelezo: false,
            alapertek: "",
            fejlec: "e-mail megerősítve",
            lathato: false,
          },
  
          password: {
            tipus: "password",
            modosithato: true,
            kotelezo: false,
            alapertek: "",
            regex: ".+",
            fejlec: "jelszó",
            lathato: true,
          },

          password_confirmation: {
            tipus: "password",
            modosithato: true,
            kotelezo: false,
            alapertek: "",
            regex: ".+",
            fejlec: "jelszó megerősítése",
            lathato: true,
          },

          created_at: {
            tipus: "text",
            modosithato: false,
            kotelezo: false,
            alapertek: "",
            fejlec: "létrehozva",
            lathato: false,
          },
          updated_at: {
            tipus: "text",
            modosithato: false,
            kotelezo: false,
            alapertek: "",
            fejlec: "módosítva",
            lathato: false,
          },
        },
        alapObj: {
          id: "",
          name: "",
          email: "",
          role:"",
          password: "",
        },
      },
      ugyfels: {
        elnevezes: "Ügyfelek",
        apik: {
          indexUrl: "api/ugyfels",
          showUrl: "api/ugyfels",
          storeUrl: "api/ugyfels",
          updateUrl: "api/ugyfels",
          destroyUrl: "api/ugyfels",
        },
        adatok: {
          elsodleges_kulcs: ["ugyfel_id"],
          ugyfel_id: {
            tipus: "number",
            modosithato: false,
            kotelezo: true,
            fejlec: "azon",
            lathato: true,
          },
          nev: {
            tipus: "text",
            modosithato: true,
            kotelezo: true,
            alapertek: "",
            regex:
              "([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)s([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)s?([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)?",
            fejlec: "név",
            lathato: true,
          },
          szuletesi_nev: {
            tipus: "text",
            modosithato: true,
            kotelezo: true,
            alapertek: "",
            regex:
              "([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)s([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)s?([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)?",
            fejlec: "születési név",
            lathato: true,
          },
          anyja_neve: {
            tipus: "text",
            modosithato: true,
            kotelezo: true,
            alapertek: "",
            regex:
              "([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)s([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)s?([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)?",
            fejlec: "anyja neve",
            lathato: true,
          },
          
          szuletesi_hely: {
            tipus: "text",
            modosithato: true,
            kotelezo: true,
            alapertek:"",
            fejlec: "születési hely",
            lathato: true,
          },
          szuletesi_ido: {
            tipus: "date",
            modosithato: true,
            kotelezo: true,
            alapertek:"",
            fejlec: "születési idő",
            lathato: true,
          },
          telepules: {
            tipus: "text",
            modosithato: true,
            kotelezo: true,
            alapertek:"",
            fejlec: "település",
            lathato: true,
          },
          neme: {
            tipus: "select",
            modosithato: true,
            kotelezo: true,
            lista:["férfi", "nő"],
            fejlec: "neme",
            lathato: true,
          },
          ugyfelkod: {
            tipus: "number",
            modosithato: true,
            kotelezo: true,
            alapérték:"",
            fejlec: "ügyfélkód",
            lathato: true,
            min:900000,
            max:99999999
          },
          created_at: {
            tipus: "text",
            modosithato: false,
            kotelezo: false,
            alapertek: "",
            fejlec: "létrehozva",
            lathato: false,
          },
          updated_at: {
            tipus: "text",
            modosithato: false,
            kotelezo: false,
            alapertek: "",
            fejlec: "módosítva",
            lathato: false,
          },
        },
        alapObj: {
          ugyfel_id: "",
          nev: "",
          szuletesi_nev: "",
          anyja_neve: "",
          szuletesi_hely:"",
          szuletesi_ido:"",
          telepules:"",
          neme:"férfi",
          ugyfelkod:""
        },
      },
      ugyfel_tipuses: {
        elnevezes: "Ügyféltípusok",
        apik: {
          indexUrl: "api/ugyfel_tipuses",
          showUrl: "api/ugyfel_tipuses",
          storeUrl: "api/ugyfel_tipuses",
          updateUrl: "api/ugyfel_tipuses",
          destroyUrl: "api/ugyfel_tipuses",
        },
        adatok: {
          elsodleges_kulcs: ["ugyfel_tipus_id"],
          ugyfel_id: {
            tipus: "number",
            modosithato: false,
            kotelezo: true,
            fejlec: "azon",
            lathato: true,
          },
          ugyfel_fotipus: {
            tipus: "selectQuerySelf",
            modosithato: true,
            kotelezo: true,
            fejlec: "főtípus",
            lathato: true,
          },

          elnevezes: {
            tipus: "text",
            modosithato: true,
            kotelezo: true,
            fejlec: "elnevezés",
            lathato: true,
          },
          created_at: {
            tipus: "text",
            modosithato: false,
            kotelezo: false,
            alapertek: "",
            fejlec: "létrehozva",
            lathato: false,
          },
          updated_at: {
            tipus: "text",
            modosithato: false,
            kotelezo: false,
            alapertek: "",
            fejlec: "módosítva",
            lathato: false,
          },
        },
        alapObj: {
          ugyfel_tipus_id: "",
          ugyfel_fotipus:"",
          elnevezés: "",
          
        },
     
    },
  }
  ][0];
  
export default lista;  