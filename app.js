//Importando módulos necessários
const express = require("express");
const app = express();
const handlebars = require("express-handlebars").engine;
const bodyParser = require("body-parser");
const {initializeApp} = require("firebase/app");
const { getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
 } = require("firebase/auth");
const { getStorage } = require("firebase/storage");


//Configurações do Firebase 
const firebaseConfig = {
  apiKey: "AIzaSyB63sTWXFUAfC9aR49qi-7R4odcNaHB-hU",

  authDomain: "spider-storage-c77fa.firebaseapp.com",

  projectId: "spider-storage-c77fa",

  storageBucket: "spider-storage-c77fa.appspot.com",

  messagingSenderId: "864380831141",

  appId: "1:864380831141:web:5b78ba0f430f46eae6d44c",
};


//Inicializando o Firebase Admin
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

//Pastas estáticas
app.use('/public', express.static("public"));
app.use('/boxicons/css', express.static("node_modules/boxicons/css"));
app.use('/boxicons/dist', express.static("node_modules/boxicons/dist"));

//Configurações do Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Configurações do Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Porta e Abertura do Servidor
const PORT = 8081;
app.listen(PORT, () => {
    console.log("Servidor Ativo!");
    console.log("Servidor rodando na porta " + PORT);
});



//Rotas


//Rota para a página de login
app.get("/login", (req, res) => {
  res.render("login", {layout: "loginlayout"});
});

app.post("/login", (req, res) => {

  try {

  const email = req.body.email;
  const password = req.body.password;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      res.redirect("/");

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
  } catch (error) {
    res.redirect("/login");
  }

});

//Rota para a página de registro
app.get("/register", (req, res) => {
  res.render("register", {layout: "loginlayout"});
});

app.post("/register", (req, res) => {

  try {

  const email = req.body.email;
  const password = req.body.password;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        res.redirect("/login")

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
    } catch (error) {
      res.redirect("/register");
    }
});

//Rota para a página inicial
app.get("/", (req, res) => {

  onAuthStateChanged(auth, (user) => {
    if (user) {

      const uid = user.uid;
      const email = user.email;
      
      res.render("home", {email: email});

    } else {
      res.redirect("/login");
    }
  });

});

app.get("/logout", function (req, res) {

  signOut(auth)
    .then(() => {
      res.redirect("/login");
    })
    .catch((error) => {
      console.log(error);
    });

});
