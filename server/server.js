const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

require('./config/mongoose.config');

require('./routes/ad.routes')(app);
// require('./routes/user.routes')(app);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));



// Login and Registration will need:
// ---------------------------------------------------------------
// require('dotenv').config()
// const PORT = process.env.PORT || 4000;
// const cookieParser = require('cookie-parser')

// app.use(cookieParser())

// app.get('URL_PATH',(req,res)=>{
//     // run the function
// })
