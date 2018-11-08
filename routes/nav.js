const express = require('express');
const router = express.Router();
const util = require('../util');
const data = require('../data');

router.get('/', function(req, res){
  res.render('intro.ejs');
});

router.get('/bower', function(req, res){
  res.render('datepicker.ejs');
});

// router.get('/output', function(req, res){
//   res.render('output.ejs');
// });

router.get('/place', function(req, res){
  res.render('place.ejs');
});

router.get('/emergency1', function(req, res){
  res.render('emergency1.ejs');
});

router.get('/cleanjf', function(req, res){
  res.render('cleanjf.ejs');
})

router.get('/nomura', function(req, res){
  if(req.session.haepari === undefined){
    res.redirect('/')
  }else if(req.session.haepari.Nomura.length===0 && req.session.haepari.Boreum.length===0 && req.session.haepari.Etc.length===0 ){
    // console.log(req.session.haepari.Nomura)
    res.redirect('/cleanjf')
  }
  else {
    res.render('nomura.ejs',{
      Nomura: req.session.haepari.Nomura,
      Boreum: req.session.haepari.Boreum,
      Etc: req.session.haepari.Etc
    })
  }

});

router.post('/output', function(req, res){
  console.log(req.body.place);
  console.log(req.body.startDate);
  console.log(req.body.endDate);

  var sijak = req.body.startDate;
  var ggued = req.body.endDate;

  var calStartDate = util.calculateDate(req.body.startDate);
  var calEndDate = util.calculateDate(req.body.endDate);

  var nomuraData = [],
      boreumData = [],
      etcData = []

  for(var i = 0 ; i < data[0].data.length ; i++){
      for(var j = 0 ; j < data[0].data[i].date.length ; j++){
          if(util.calculateDate(data[0].data[i].date[j]) > calStartDate && util.calculateDate(data[0].data[i].date[j]) < calEndDate){
              if(data[0].data[i].desc.includes(req.body.place)){

                nomuraData.push({
                    jellyfish: "노무라입깃해파리",
                    nomuraDate: data[0].data[i].date[j],
                    nomuraDesc: data[0].data[i].desc[data[0].data[i].desc.indexOf(req.body.place)],
                    nomuraLdesc: data[0].data[i].ldesc
                });

              }
              else if(data[0].data[i].desc.includes(req.body.place) === false){
              }
          }
      }
  }

  // console.log(nomuraData);

  for(i = 0 ; i < data[1].data.length ; i++){
      for(j = 0 ; j < data[1].data[i].date.length ; j++){
          if(util.calculateDate(data[1].data[i].date[j]) > calStartDate && util.calculateDate(data[1].data[i].date[j]) < calEndDate){
              if(data[1].data[i].desc.includes(req.body.place)){

                boreumData.push({
                      jellyfish: "보름달물해파리",
                      boreumDate: data[1].data[i].date[j],
                      boreumDesc: data[1].data[i].desc[data[1].data[i].desc.indexOf(req.body.place)],
                      boreumLdesc: data[1].data[i].ldesc
                  });

                // console.log(boreumData);

              }
              else if(data[1].data[i].desc.includes(req.body.place) === false){
              }
          }
      }
  }

  for(i = 0 ; i < data[2].data.length ; i++){
      for(j = 0 ; j < data[2].data[i].date.length ; j++){
          if(util.calculateDate(data[2].data[i].date[j]) > calStartDate && util.calculateDate(data[2].data[i].date[j]) < calEndDate){
              if(data[2].data[i].desc.includes(req.body.place)){

                etcData.push({
                      jellyfish: "기타해파리",
                      etcDate: data[2].data[i].date[j],
                      etcDesc: data[2].data[i].desc[data[2].data[i].desc.indexOf(req.body.place)],
                      etcLdesc: data[2].data[i].ldesc
                  });

                // console.log(etcData);

              }
              else if(data[2].data[i].desc.includes(req.body.place) === false){
              }
          }
      }
  }


  req.session.haepari = {
      Nomura: nomuraData,
      Boreum: boreumData,
      Etc: etcData
  }



    res.render('output.ejs',{
        Nomura: nomuraData,
        Boreum: boreumData,
        Etc: etcData
    });


});


module.exports = router;
