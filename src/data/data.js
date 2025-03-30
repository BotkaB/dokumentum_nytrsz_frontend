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
      ügyfels: {
        elnevezes: "Ügyfelek",
        apik: {
          indexUrl: "api/ugyfelek",
          showUrl: "api/ugyfelek",
          storeUrl: "api/ugyfelek",
          updateUrl: "api/ugyfelek",
          destroyUrl: "api/ugyfelek",
        },
        adatok: {
          elsodleges_kulcs: ["belso_kod"],
          belso_kod: {
            tipus: "text",
            modosithato: false,
            kotelezo: true,
            fejlec: "azon",
            lathato: true,
          },
          név: {
            tipus: "text",
            modosithato: true,
            kotelezo: true,
            alapertek: "",
            regex:
              "([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)s([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)s?([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)?",
            fejlec: "név",
            lathato: true,
          },
          születési_név: {
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
          
          születési_hely: {
            tipus: "text",
            modosithato: true,
            kotelezo: true,
            alapertek:"",
            fejlec: "születési hely",
            lathato: true,
          },
          születési_idő: {
            tipus: "date",
            modosithato: true,
            kotelezo: true,
            alapertek:"",
            fejlec: "születési idő",
            lathato: true,
          },
          lakcím: {
            tipus: "text",
            modosithato: true,
            kotelezo: true,
            alapertek:"",
            fejlec: "lakcím",
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
          ügyfélkód: {
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
          belso_kod: "",
          név: "",
          születési_név: "",
          anyja_neve: "",
         születési_hely:"",
         születési_idő:"",
         lakcím:"",
         neme:"",
         ügyfélkód:""
        },
      },
  
     
    },
  ][0];
  
export default lista;  