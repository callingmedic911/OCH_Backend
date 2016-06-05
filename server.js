var express= require('express');    //call for required models
var app= express();     //intializing app to use express
var bodyParser = require('body-Parser');    // intializing body-Parser
var mongoose = require('mongoose');     // intializing mongoose
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;
mongoose.connect('mongodb://localhost:27017/deviceslistfinal2');
var Device= require('./app/models/Devices');

var router = express.Router();    //getting instance of express routing
router.use(function(req,res,next){
  console.log("Something is happening");    //logging
  next();
});

router.get('/',function(req,res){
  res.json({message:'Welcome to our api'});
});


router.route('/Devices')
  .post(function(req,res){
  var device = new Device();
device.startSince =req.body.startSince;
device.suggestedValue = req.body.suggestedValue;
device.targetValue = req.body.targetValue;
device.currentStatus = req.body.currentStatus;
device.unit = req.body.unit;
device.switchBoolean = req.body.switchBoolean;
device.type= req.body.type;
device.name = req.body.name;
  device.save(function(err){
      if(err){
        res.send(err);
        res.json({message:'Error'});
    }
      else {
        res.json({'message':'Device added', '_id':''+ device.id});
      }
  });
})
  .get(function(req, res) {
    Device.find(function(err, device) {
        if (err)
            res.send(err);

        res.json(device);
    });
});

router.route('/Devices/:device_id')

  .get(function(req, res){
    Device.findById(req.params.device_id,function(err,device){
      if(err)
        res.send(err);

      res.json(device);
    });
  })
  .put(function(req,res){
    Device.findById(req.params.device_id, function(err, device){
      if(err)
        res.send(err);

      device.startSince = req.body.startSince;
      device.suggestedValue = req.body.suggestedValue;
      device.targetValue = req.body.targetValue;
      device.currentStatus = req.body.currentStatus;
      device.unit = req.body.unit;
      device.switchBoolean = req.body.switchBoolean;
      device.type = req.body.type;
      device.name = req.body.name;
      device.save(function(err){
        if(err)
          res.send(err);
        res.json({message:'Device Updated'});
      });
    });
  })
  .delete(function(req, res) {
        Device.remove({_id: req.params.device_id},function(err, device) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



    app.use('/api',router);   //all routes prefix with /api

  app.listen(port);   //start server
console.log('Magic Happens on port'+ port);
