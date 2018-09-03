const brain = require('brain.js');
const network = new brain.NeuralNetwork();

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');


//set port
const port = process.env.PORT || 3010;

//init app
const app = express();

//Set View Engine
app.engine('handlebars', exphbs({ defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

//body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Defining middleware to serve static files
app.use('/public', express.static('public'));

//method override
app.use(methodOverride('method'));


//default 
app.get('/', function(req, res){
    res.render('index');
})

//predict
app.get('/predict/loading', function(req, res){
    res.render('predict')
})

//Analytics
app.get('/predict/analytics', function(req, res){
    res.render('analytics')
})

app.listen(port, function(){ 
    TrainTank();
    console.log(`Server started on port ${port}`)
});

const dataObject = [];
    


app.post('/api/level', function(req, res){
    /** 
     * Desired tank
     */
    const tank = req.body.tank;

    /**
     * Desired volume in m3
     */
    const volume = req.body.volume;

    /**
     * Opening level before operation
     */
    const opening_level = req.body.opening_level;

    /**
     * compute approximate closing level from desired volume in m3
     */
    const closing_level = (opening_level - (volume/706)).toFixed(3);

    /**
     * Train Neural network
     */
    // TrainTank(tank);

    /**
     * predict
     */
    const input = { tank: tank, level: closing_level }
    const result = network.run(input);

    //update data object for chats
    const data_output = { 
        tank,
        sales_volume : volume,
        opening_level, 
        closing_level, 
        loss : (result.loss * 100).toFixed(3),
        gain : (result.gain * 100).toFixed(3)
     }
    dataObject.push(data_output)

    /**
     * result
     */
    if(!result){
        res.render('predict', {
            error : 'There was an error attempting to predict loss'
        })
        return; 
    }
    if(closing_level <= 0){
        res.render('predict', {
            error : 'Closing level cannot be less than or equal to zero'
        })
        return; 
    }
    res.render('predict', data_output)
})

app.get('/api/data', function(req, res){
    res.json(dataObject[dataObject.length - 1 ]);
})

function TrainTank(){
    const tank_1 = [
       
        { input : { tank:'01', level: 10.152 }, output: { loss: 1 } }, 
        { input : { tank:'01', level: 10.364 }, output: { loss: 1 } }, 
        { input : { tank:'01', level: 6.020 }, output: { loss: 1 } }, 
        { input : { tank:'01', level: 5.127 }, output: { loss: 1 } }, 
        { input : { tank:'01', level: 9.483 }, output: { loss: 1 } }, 
        { input : { tank:'01', level: 6.638 }, output: { loss: 1 } }, 
        { input : { tank:'01', level: 12.748 }, output: { loss: 1 } }, 
        { input : { tank:'01', level: 13.655 }, output: { loss: 1 } }, 
        { input : { tank:'01', level: 7.104 }, output: { loss: 1 } },
        { input : { tank:'01', level: 10.435 }, output: { loss: 1 } },

        { input : { tank:'01', level: 3.141 }, output: { gain : 1 } }, 
        { input : { tank:'01', level: 4.559 }, output: { gain : 1 } }, 
        { input : { tank:'01', level: 5.920 }, output: { gain: 1 } }, 
        { input : { tank:'01', level: 6.452 }, output: { gain: 1 } }, 
        { input : { tank:'01', level: 4.559 }, output: { gain: 1 } },
        { input : { tank:'01', level: 5.920 }, output: { gain: 1 } },
        { input : { tank:'01', level: 7.649 }, output: { gain: 1 } },
        { input : { tank:'01', level: 8.979 }, output: { gain: 1 } },
        { input : { tank:'01', level: 4.24 }, output: { gain: 1 } },
        { input : { tank:'01', level: 5.467 }, output: { gain: 1 } },
        { input : { tank:'01', level: 9.301 }, output: { gain: 1 } },
        { input : { tank:'01', level: 4.301 }, output: { gain: 1 } },
        { input : { tank:'01', level: 5.477 }, output: { gain: 1 } },
        { input : { tank:'01', level: 6.482 }, output: { gain: 1 } },
        { input : { tank:'01', level: 2.910 }, output: { gain: 1 } },
        { input : { tank:'01', level: 3.058 }, output: { gain: 1 } },
        { input : { tank:'01', level: 4.193 }, output: { gain: 1 } },
        { input : { tank:'01', level: 11.534 }, output: { gain: 1 } },
        { input : { tank:'01', level: 5.444 }, output: { gain: 1 } },
        { input : { tank:'01', level: 6.072 }, output: { gain: 1 } },
        { input : { tank:'01', level: 9.298 }, output: { gain: 1 } },
        { input : { tank:'01', level: 4.085 }, output: { gain: 1 } },
        { input : { tank:'01', level: 5.812 }, output: { gain: 1 } },
        { input : { tank:'01', level: 4.248 }, output: { gain: 1 } },
        { input : { tank:'01', level: 5.881 }, output: { gain: 1 } },
        { input : { tank:'01', level: 7.834 }, output: { gain: 1 } },
  
        { input : { tank:'11', level: 8.486 }, output: { loss: 1 } }, 
        { input : { tank:'11', level: 2.887 }, output: { loss: 1 } }, 
        { input : { tank:'11', level: 5.405 }, output: { loss: 1 } },  
        { input : { tank:'11', level: 11.544 }, output: { loss: 1 } }, 
        { input : { tank:'11', level: 12.850 }, output: { loss: 1 } },
        { input : { tank:'11', level: 12.020 }, output: { loss: 1 } },
        { input : { tank:'11', level: 2.925 }, output: { loss: 1 } },
        { input : { tank:'11', level: 12.163 }, output: { loss: 1 } },
        { input : { tank:'11', level: 10.738 }, output: { loss: 1 } },
        { input : { tank:'11', level: 9.018 }, output: { loss: 1 } },
        { input : { tank:'11', level: 7.344 }, output: { loss: 1 } },
        { input : { tank:'11', level: 11.129 }, output: { loss: 1 } },
        { input : { tank:'11', level: 10.732 }, output: { loss: 1 } },
        { input : { tank:'11', level: 9.343 }, output: { loss: 1 } },
        { input : { tank:'11', level: 4.900 }, output: { loss: 1 } },

        { input : { tank:'11', level: 6.020 }, output: { gain: 1 } }, 
        { input : { tank:'11', level: 6.020 }, output: { gain: 1 } }, 
        { input : { tank:'11', level: 2.855 }, output: { gain: 1 } }, 
        { input : { tank:'11', level: 3.535 }, output: { gain: 1 } },
        { input : { tank: '11', level: 4.494 }, output : { gain : 1} },
        { input : { tank: '11', level: 13.516}, output : { gain : 1} },
        { input : { tank: '11', level: 11.854 }, output : { gain : 1} },
        { input : { tank: '11', level: 9.923 }, output : { gain : 1} },
        { input : { tank: '11', level: 8.173 }, output : { gain : 1} },
        { input : { tank: '11', level: 6.617 }, output : { gain : 1} },
        { input : { tank: '11', level: 5.152 }, output : { gain : 1} },
        { input : { tank: '11', level: 3.107 }, output : { gain : 1} },
        { input : { tank: '11', level: 13.017 }, output : { gain : 1} },
        { input : { tank: '11', level:10.456 }, output : { gain : 1} },
        { input : { tank: '11', level:9.065 }, output : { gain : 1} },
        { input : { tank: '11', level:6.715 }, output : { gain : 1} },
        { input : { tank: '11', level:4.942 }, output : { gain : 1} },
        { input : { tank: '11', level:3.323 }, output : { gain : 1} },
        { input : { tank: '11', level:5.744 }, output : { gain : 1} },
        { input : { tank: '11', level:11.424 }, output : { gain : 1} },
        { input : { tank: '11', level:12.675 }, output : { gain : 1} }
    ]
    network.train(tank_1);
   
}